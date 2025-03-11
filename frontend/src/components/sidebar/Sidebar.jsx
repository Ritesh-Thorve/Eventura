import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  LogOut,
  User,
  Shield,
  Home,
  Book,
  Building,
  X,
  Menu,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useAdminAuth } from '../../contexts/AdminAuthContext';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify'; 

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { user, logout: userLogout } = useAuth();
  const { admin, logout: adminLogout } = useAdminAuth();

  const handleLogoutConfirm = () => {
    toast.success('Logged out successfully', {
      position: 'top-right',
      autoClose: 3000,
    });

    setTimeout(() => {
      if (admin) adminLogout();
      else userLogout();
    }, 1000);

    setShowLogoutModal(false);
    setIsOpen(false);
  };

  // Auto-close sidebar after 8 seconds
  useEffect(() => {
    let timer;
    if (isOpen) {
      timer = setTimeout(() => {
        setIsOpen(false);
      }, 8000);
    }
    return () => clearTimeout(timer);
  }, [isOpen]);

  return (
    <div className="relative flex items-center">
      {/* Welcome Message */}
      {user || admin ? (
        <span className="mr-3 text-white font-semibold text-sm sm:text-base">
          {admin ? `Welcome, Admin 👋` : `Welcome, ${user.name} 👋`}
        </span>
      ) : null}

      {/* Sidebar Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gray-900 text-white p-3 rounded-md z-50"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Sidebar Panel */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: isOpen ? 0 : '100%' }}
        transition={{ type: 'spring', stiffness: 120 }}
        className="fixed top-16 right-0 h-auto w-72 bg-gray-900 text-white shadow-lg p-6 rounded-bl-lg rounded-tl-lg z-40"
      >
        <div className="space-y-4">
          <Link to="/" className="block py-2 hover:text-indigo-300">
            <Home className="inline-block mr-2" /> Home
          </Link>
          <Link to="/venues" className="block py-2 hover:text-indigo-300">
            <Building className="inline-block mr-2" /> Venues
          </Link>

          {admin && (
            <Link to="/admin" className="block py-2 hover:text-indigo-300">
              <Shield className="inline-block mr-2" /> Admin
            </Link>
          )}
          {user && !admin && (
            <Link to="/mybookings" className="block py-2 hover:text-indigo-300">
              <Book className="inline-block mr-2" /> My Bookings
            </Link>
          )}

          {user || admin ? (
            <button
              onClick={() => setShowLogoutModal(true)}
              className="mt-4 w-full bg-pink-500 py-2 rounded-md hover:bg-red-600"
            >
              <LogOut className="inline-block mr-2" /> Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="block mt-4 bg-blue-500 py-2 rounded-md text-center hover:bg-blue-600"
              >
                <User className="inline-block mr-2" /> User Login
              </Link>
              <Link
                to="/admin-login"
                className="block mt-2 bg-green-500 py-2 rounded-md text-center hover:bg-green-600"
              >
                <Shield className="inline-block mr-2" /> Admin Login
              </Link>
            </>
          )}
        </div>
      </motion.div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-lg p-6 w-auto h-auto text-center shadow-lg"
          >
            <h2 className="text-3xl font-semibold mb-4 text-gray-800">Confirm Logout</h2>
            <p className="text-base text-gray-600 mb-6">Are you sure you want to log out?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleLogoutConfirm}
                className="px-5 py-2 bg-red-600 text-xl text-white rounded hover:bg-red-700 transition"
              >
                Yes, Logout
              </button>
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-5 text-xl py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </div>
      )} 
    </div>
  );
}
