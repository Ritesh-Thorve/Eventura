import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Menu, X, Calendar, LogOut, User, Shield } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useAdminAuth } from '../contexts/AdminAuthContext';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, login, logout } = useAuth();
  const { admin, adminLogin, adminLogout } = useAdminAuth();

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-900 text-white shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <Calendar className="h-8 w-8 text-white" />
            <span className="ml-2 text-2xl font-bold">Eventura</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden sm:flex sm:items-center">
            <Link to="/" className="px-3 py-2 hover:text-indigo-300">Home</Link>
            <Link to="/venues" className="px-3 py-2 hover:text-indigo-300">Venues</Link>
            <Link to="/about" className="px-3 py-2 hover:text-indigo-300">About</Link>
            {admin && <Link to="/admin" className="px-3 py-2 hover:text-indigo-300">Admin</Link>}
            {user && !admin && <Link to="/mybookings" className="px-3 py-2 hover:text-indigo-300">My Bookings</Link>}
            {user || admin ? (
              <button
                onClick={admin ? adminLogout : logout}
                className="ml-4 flex items-center px-4 py-2 bg-pink-500 font-semibold rounded-md hover:bg-red-600 transition-colors"
              >
                <LogOut className="h-4 w-4 mr-2" /> Logout
              </button>
            ) : (
              <button
                onClick={() => setSidebarOpen(true)}
                className="ml-4 px-4 py-2 bg-pink-500 font-semibold rounded-md hover:bg-red-600 transition-colors"
              >
                Login
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <button onClick={() => setIsOpen(!isOpen)} className="sm:hidden text-white">
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="sm:hidden bg-gray-800 p-4">
          <Link to="/" className="block py-2 hover:text-indigo-300" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/venues" className="block py-2 hover:text-indigo-300" onClick={() => setIsOpen(false)}>Venues</Link>
          {admin && <Link to="/admin" className="block py-2 hover:text-indigo-300">Admin</Link>}
          {user && !admin && <Link to="/mybookings" className="block py-2 hover:text-indigo-300">My Bookings</Link>}
          {user || admin ? (
            <button
              onClick={() => {
                admin ? adminLogout() : logout();
                setIsOpen(false);
              }}
              className="mt-4 w-full bg-pink-500 py-2 rounded-md hover:bg-red-600"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => setSidebarOpen(true)}
              className="mt-4 w-full bg-pink-500 py-2 rounded-md hover:bg-red-600"
            >
              Login
            </button>
          )}
        </motion.div>
      )}

      {/* Login Sidebar */}
      {sidebarOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          className="fixed top-0 right-0 h-auto w-72 bg-gray-800 shadow-lg p-6 flex flex-col items-center"
        >
          <button onClick={() => setSidebarOpen(false)} className="absolute top-4 right-4 text-white">
            <X className="h-6 w-6" />
          </button>
          <h2 className="text-xl font-bold text-white mb-4">Login as</h2>
          <button
            onClick={() => {
              navigate('/login')
              setSidebarOpen(false);
            }}
            className="w-full bg-blue-500 text-white py-2 rounded-md flex items-center justify-center hover:bg-blue-600 transition-colors mb-2"
          >
            <User className="h-5 w-5 mr-2" /> User
          </button>
          <button
            onClick={() => {
              navigate('/admin-login')
              setSidebarOpen(false);
            }}
            className="w-full bg-green-500 text-white py-2 rounded-md flex items-center justify-center hover:bg-green-600 transition-colors"
          >
            <Shield className="h-5 w-5 mr-2" /> Admin
          </button>
        </motion.div>
      )}
    </nav>
  );
}
