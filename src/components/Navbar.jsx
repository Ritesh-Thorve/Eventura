import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Calendar, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex items-center">
              <Calendar className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-2xl font-bold text-gray-900">Eventura</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden sm:flex sm:items-center">
            <Link to="/" className="px-3 py-2 text-gray-700 hover:text-indigo-600">
              Home
            </Link>
            <Link to="/events" className="px-3 py-2 text-gray-700 hover:text-indigo-600">
              Events
            </Link>
            {user ? (
              <>
                <Link to="/booking" className="px-3 py-2 text-gray-700 hover:text-indigo-600">
                  Book Venue
                </Link>
                <button
                  onClick={logout}
                  className="ml-4 flex items-center px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="ml-4 px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="sm:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-indigo-600"
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
              className="block px-3 py-2 text-gray-700 hover:text-indigo-600"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/events"
              className="block px-3 py-2 text-gray-700 hover:text-indigo-600"
              onClick={() => setIsOpen(false)}
            >
              Events
            </Link>
            {user ? (
              <>
                <Link
                  to="/booking"
                  className="block px-3 py-2 text-gray-700 hover:text-indigo-600"
                  onClick={() => setIsOpen(false)}
                >
                  Book Venue
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="w-full mt-2 flex items-center px-3 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="block mt-2 px-3 py-2 text-center text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
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