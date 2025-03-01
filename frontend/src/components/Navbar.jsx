import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/sidebar/Sidebar';
import { Calendar } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-900 text-white shadow-lg z-50  ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between h-16 items-center">
        {/* Eventura Logo */}
        <Link to="/" className="flex items-center">
          <Calendar className="h-8 w-8 text-white" />
          <span className="ml-2 text-2xl font-bold">Eventura</span>
        </Link>

        {/* Sidebar Button */} 
         <Sidebar /> 
      </div>
    </nav>  
  );
}
