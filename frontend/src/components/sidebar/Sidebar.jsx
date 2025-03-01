import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, LogOut, User, Shield, Home, Book, Building, Info, X, Menu } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useAdminAuth } from '../../contexts/AdminAuthContext';
import { motion } from 'framer-motion';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout: userLogout } = useAuth();
  const { admin, logout: adminLogout } = useAdminAuth();

  const handleLogout = () => {
    if (admin) adminLogout();
    else userLogout();
  };

  return (
    <div className="relative flex items-center">
      {/* Welcome Message (Always visible) */}
      {user || admin ? (
        <span className="mr-3 text-white font-semibold text-sm sm:text-base">
          {admin ? `Welcome, Admin ${admin.name} 👋` : `Welcome, ${user.name} 👋`}
        </span>
      ) : null}

      {/* Sidebar Toggle Button (☰ or ✖) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gray-900 text-white p-3 rounded-md z-50"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Sidebar Menu */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: isOpen ? 0 : "100%" }}
        transition={{ type: "spring", stiffness: 120 }}
        className="fixed top-16 right-0 h-auto w-72 bg-gray-900 text-white shadow-lg p-6 rounded-bl-lg rounded-tl-lg"
      >
        {/* Sidebar Links */}
        <div className="space-y-4">
          <Link to="/" className="block py-2 hover:text-indigo-300"><Home className="inline-block mr-2" /> Home</Link>
          <Link to="/venues" className="block py-2 hover:text-indigo-300"><Building className="inline-block mr-2" /> Venues</Link>

          {admin && <Link to="/admin" className="block py-2 hover:text-indigo-300"><Shield className="inline-block mr-2" /> Admin</Link>}
          {user && !admin && <Link to="/mybookings" className="block py-2 hover:text-indigo-300"><Book className="inline-block mr-2" /> My Bookings</Link>}

          {user || admin ? (
            <button onClick={handleLogout} className="mt-4 w-full bg-pink-500 py-2 rounded-md hover:bg-red-600">
              <LogOut className="inline-block mr-2" /> Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="block mt-4 bg-blue-500 py-2 rounded-md text-center hover:bg-blue-600">
                <User className="inline-block mr-2" /> User Login
              </Link>
              <Link to="/admin-login" className="block mt-2 bg-green-500 py-2 rounded-md text-center hover:bg-green-600">
                <Shield className="inline-block mr-2" /> Admin Login
              </Link>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}