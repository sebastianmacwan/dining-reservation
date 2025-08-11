import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// Always resolve path to root for ES modules
import { fileURLToPath } from 'url';
import path from 'path';

// Required to find .env reliably
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from project root
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: 'srv1647.hstgr.io', // Change if your MySQL is hosted elsewhere
  user: 'u497023065_root',
  password: 'Iamroot2025',
  database: 'u497023065_Dining',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const connectDB = async () => {
  try {
    const connection = await pool.getConnection();
    console.log("✅ MySQL connected");
    connection.release();
  } catch (err) {
    console.error("❌ MySQL connection error:", err);
    process.exit(1);
  }
};

// export default connectDB;
export { pool, connectDB };
