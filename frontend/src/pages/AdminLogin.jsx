import React, { useState } from 'react';
import { useAdminAuth } from '../contexts/AdminAuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Loader2, Mail, Lock } from 'lucide-react'; 

export default function AdminLogin() {
  const { login } = useAdminAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login(email, password);
      navigate('/admin');
    } catch {
      setError('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <motion.div
        className="bg-white shadow-lg rounded-xl flex max-w-4xl w-full overflow-hidden"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Left Side - Image */}
        <div className="hidden md:block w-1/2">
          <img src="/Loginimg.jpg" alt="Admin Login" className="max-w-full object-cover" />
        </div>

        {/* Right Side - Login Form */}
        <div className="p-8 w-full md:w-1/2 flex flex-col justify-center">
          <h2 className="text-center text-3xl font-bold text-gray-900">Admin Login</h2>

          <form onSubmit={handleSubmit} className="mt-6 space-y-6">
            <div> 
              <div className="flex items-center border-b-2 border-gray-300 focus-within:border-indigo-500 transition">
                <Mail className="w-5 h-5 text-gray-400 mr-2" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full py-2 bg-transparent outline-none text-gray-900"
                  placeholder='Email'
                />
              </div>
            </div>

            <div> 
              <div className="flex items-center border-b-2 border-gray-300 focus-within:border-indigo-500 transition">
                <Lock className="w-5 h-5 text-gray-400 mr-2" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full py-2 bg-transparent outline-none text-gray-900"
                  placeholder='Secret Password'
                />
              </div>
            </div>

            {error && (
              <motion.div
                className="bg-red-50 border border-red-200 text-red-700 rounded-md p-3 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {error}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center py-3 px-4 bg-indigo-600 text-white font-medium rounded-lg shadow-lg hover:bg-indigo-700 transition duration-300 disabled:bg-indigo-400"
            >
              {loading ? <Loader2 className="animate-spin w-5 h-5 mr-2" /> : 'Sign in'}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
