import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';
import { Loader2, UserRound, LockKeyhole } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(email, password);
      toast.success("Login successful!" );
      navigate('/'); 
      window.location.reload();
    } catch (err) {
      toast.error("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <motion.div
        className="bg-white shadow-lg rounded-lg p-8 flex flex-col md:flex-row items-center md:space-x-10"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Image Section */}
        <div className="hidden md:block w-1/2">
          <img src="/Loginimg.jpg" alt="Login Illustration" className="w-full object-cover" />
        </div>

        {/* Login Form Section */}
        <div className="w-full md:w-1/2">
          <h2 className="text-center text-3xl font-bold text-gray-900">Sign in to Eventura</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500 transition">
              create a new account
            </Link>
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-6">
            {/* Email Input */}
            <div className="relative">
              <UserRound className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500 transition"
                placeholder="Email"
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <LockKeyhole className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500 transition"
                placeholder="Password"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 transition duration-300 ease-in-out disabled:bg-indigo-400"
            >
              {loading ? <Loader2 className="animate-spin w-5 h-5 mr-2" /> : 'Sign in'}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
