import React, { useState } from "react";
import { Mail, Phone, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Contact: React.FC = () => {
  // State to manage form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  // ✅ New state to manage the success message visibility and text
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate an API call to your backend
    try {
      // In a real application, you would use fetch() here
      // await fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) });
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // ✅ Set the success message and clear the form on success
      setSuccessMessage("Thank you for your message! We'll get back to you shortly.");
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => navigate('/'), 1500); 
    } catch (error) {
      console.error('Submission failed:', error);
      setSuccessMessage('Failed to send your message. Please try again.');
    } finally {
      setIsSubmitting(false);
      // ✅ Automatically hide the message after 5 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 2000);
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-inter">
      <div className="max-w-4xl w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
        {successMessage && (
          <div className="mb-4 p-4 border border-green-500 text-green-700 bg-green-100 rounded">
            {successMessage}
          </div>
        )}
        {/* Header Section */}
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900">
            Contact Us
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            We'd love to hear from you. Please fill out the form below or reach out to us directly.
          </p>
        </div>

        {/* Contact Information & Form Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <Mail className="text-indigo-600 flex-shrink-0" size={24} />
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Email</h3>
                <p className="text-gray-600">contact@diningapp.com</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Phone className="text-indigo-600 flex-shrink-0" size={24} />
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Phone</h3>
                <p className="text-gray-600">+1 (123) 456-7890</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <MapPin className="text-indigo-600 flex-shrink-0" size={24} />
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Office</h3>
                <p className="text-gray-600">123 Main Street, Suite 400<br />City, State 12345</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="sr-only">Your Name</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="message" className="sr-only">Message</label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
              ></textarea>
            </div>
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
