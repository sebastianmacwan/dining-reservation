import express from 'express';
import cors from 'cors';
import helmet from 'helmet'; // Import helmet
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { pool, connectDB } from './config/db.js';
import paymentRoutes from './routes/payment.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Connect to DB
connectDB();

// Add Helmet and configure CSP before other middleware and routes
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", "https://js.stripe.com"],
    styleSrc: ["'self'", "'unsafe-inline'", "https://m.stripe.network"],
    frameSrc: ["'self'", "https://js.stripe.com"],
    fontSrc: ["'self'", "https://fonts.gstatic.com", "data:"],
    imgSrc: ["'self'", "https://q.stripe.com"],
    connectSrc: ["'self'", "https://api.stripe.com", "https://m.stripe.network", "https://q.stripe.com"],
  },
}));


// app.use(cors());
app.use(cors({
  origin: "http://localhost:5173", // Your React app URL
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));
app.use(express.json());

app.use('/api/payment', paymentRoutes);
// ========== Middleware ========== //
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access token required' });
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
};

// ========== Auth Routes ========== //
app.post('/api/auth/signup', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (users.length > 0) return res.status(400).json({ message: 'Email already exists' });

    const hashed = await bcrypt.hash(password, 10);
    const [result] = await pool.query(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
      [name, email, hashed, 'user']
    );

    const userId = result.insertId;
    const token = jwt.sign({ id: userId, email, role: 'user' }, JWT_SECRET);
    res.json({ token, user: { id: userId, name, email, role: 'user' } });

  } catch (err) {
    console.error('Signup Error:', err);
    res.status(500).json({ message: 'Signup failed' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (users.length === 0) return res.status(400).json({ message: 'Invalid credentials' });

    const user = users[0];
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET);
    res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });

  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).json({ message: 'Login failed' });
  }
});

app.get('/api/auth/me', authenticateToken, async (req, res) => {
  try {
    const [users] = await pool.query('SELECT id, name, email, role FROM users WHERE id = ?', [req.user.id]);
    if (users.length === 0) return res.status(404).json({ message: 'User not found' });
    res.json(users[0]);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user' });
  }
});

// ========== Restaurants ========== //
app.get('/api/restaurants', async (req, res) => {
  try {
    const { featured, search, cuisine, priceRange, sort, limit } = req.query;
    let sql = 'SELECT * FROM restaurants WHERE 1=1';
    const params = [];

    if (featured === 'true') sql += ' AND featured = 1';
    if (cuisine) { sql += ' AND cuisine = ?'; params.push(cuisine); }
    if (priceRange) { sql += ' AND priceRange = ?'; params.push(priceRange); }
    if (search) {
      sql += ' AND (name LIKE ? OR cuisine LIKE ? OR address LIKE ?)';
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }
    if (sort === 'rating') sql += ' ORDER BY rating DESC';
    else if (sort === 'name') sql += ' ORDER BY name ASC';
    if (limit) { sql += ' LIMIT ?'; params.push(Number(limit)); }

    const [rows] = await pool.query(sql, params);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Error loading restaurants' });
  }
});

app.get('/api/restaurants/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM restaurants WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Restaurant not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Error loading restaurant' });
  }
});

// ========== Booking ========== //
app.post('/api/bookings', authenticateToken, async (req, res) => {
  const { restaurantId, restaurantName, date, time, guests, specialRequests, totalAmount } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO bookings (userId, restaurantId, restaurantName, date, time, guests, specialRequests, totalAmount, status, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())',
      [req.user.id, restaurantId, restaurantName, date, time, guests, specialRequests, totalAmount, 'confirmed']
    );
    const [rows] = await pool.query('SELECT * FROM bookings WHERE id = ?', [result.insertId]);
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Booking failed' });
  }
});

app.get('/api/bookings/user', authenticateToken, async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM bookings WHERE userId = ?', [req.user.id]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Error loading your bookings' });
  }
});

app.put('/api/bookings/:id/cancel', authenticateToken, async (req, res) => {
  try {
    const [result] = await pool.query(
      'UPDATE bookings SET status = ? WHERE id = ? AND userId = ?',
      ['cancelled', req.params.id, req.user.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Booking not found' });

    const [rows] = await pool.query('SELECT * FROM bookings WHERE id = ?', [req.params.id]);
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Error cancelling booking' });
  }
});

// ========== Admin ========== //
app.get('/api/admin/bookings', authenticateToken, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Admin access required' });
  try {
    const [rows] = await pool.query(`
      SELECT b.*, u.name AS userName, r.name AS restaurantName
      FROM bookings b
      LEFT JOIN users u ON b.userId = u.id
      LEFT JOIN restaurants r ON b.restaurantId = r.id
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Error loading admin bookings' });
  }
});

// ========== Frontend Static ========== //
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  });
}

// ========== Start Server ========== //
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
