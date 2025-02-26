import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Calendar, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const { user, logout } = useAuth();

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-900 text-white shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex items-center">
              <Calendar className="h-8 w-8 text-white" />
              <span className="ml-2 text-2xl font-bold c">Eventura</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden sm:flex sm:items-center ">
            <Link to="/" className="px-3 py-2 text-white hover:text-indigo-300">
              Home
            </Link>
            <Link to="/venues" className="px-3 py-2 text-white hover:text-indigo-300">
              Venues
            </Link>
            {user ? (
              <>
                <Link to="/mybookings" className="px-3 py-2 text-white hover:text-indigo-300">
                  My Bookings
                </Link>
                <button
                  onClick={logout}
                  className="ml-4 flex items-center px-4 py-2 text-white  bg-pink-500 font-semibold rounded-md hover:bg-red-600 transition-colors"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="ml-4 px-4 py-2 text-white  bg-pink-500 font-semibold rounded-md hover:bg-red-600 transition-colors"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="sm:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-indigo-300"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="sm:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="block px-3 py-2 text-white hover:text-indigo-300"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/events"
              className="block px-3 py-2 text-white hover:text-indigo-300"
              onClick={() => setIsOpen(false)}
            >
              Events
            </Link>
            {user ? (
              <>
                <Link
                  to="/booking"
                  className="block px-3 py-2 text-white hover:text-indigo-300"
                  onClick={() => setIsOpen(false)}
                >
                  Book Venue
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="w-full mt-2 flex items-center px-3 py-2 text-white  bg-pink-500 font-semibold rounded-md hover:bg-red-600 transition-colors"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="block mt-2 px-3 py-2 text-center text-white  bg-pink-500 font-semibold rounded-md hover:bg-red-600 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}