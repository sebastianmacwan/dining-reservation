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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50/30 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-inter pt-20">
      <div className="max-w-4xl w-full space-y-8 bg-white/95 backdrop-blur-sm p-10 rounded-2xl shadow-2xl border border-primary-100">
        {successMessage && (
          <div className="mb-4 p-4 border border-primary-500 text-primary-700 bg-primary-100 rounded-xl">
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
              <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl flex items-center justify-center flex-shrink-0">
                <Mail className="text-primary-600" size={20} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-dark-800">Email</h3>
                <p className="text-gray-600">contact@diningapp.com</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl flex items-center justify-center flex-shrink-0">
                <Phone className="text-primary-600" size={20} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-dark-800">Phone</h3>
                <p className="text-gray-600">+1 (123) 456-7890</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl flex items-center justify-center flex-shrink-0">
                <MapPin className="text-primary-600" size={20} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-dark-800">Office</h3>
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
                className="appearance-none rounded-xl relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 bg-primary-50/50 focus:bg-white shadow-sm"
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
                className="appearance-none rounded-xl relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 bg-primary-50/50 focus:bg-white shadow-sm"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
              ></textarea>
            </div>
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:hover:scale-100"
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
