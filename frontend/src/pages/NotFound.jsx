// src/pages/NotFound.jsx

import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-7xl w-full items-center">
        
        {/* Left Image */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center"
        >
          <img
            src="/Page_not_found.jpg"
            alt="404 Illustration"
            className="max-w-xl w-full"
          />
        </motion.div>

        {/* Right Text Section */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center md:text-left"
        >
          <h1 className="text-9xl md:text-6xl font-extrabold text-gray-900 mb-4">
            Oops, <span className="text-blue-600">nothing</span> here...
          </h1>
          <p className="text-gray-500 text-base md:text-lg mb-6">
            Uh oh, we can’t seem to find the page you’re looking for.
            <br />
            Try going back to the previous page or home page.
          </p>

          <Link
            to="/"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-xl shadow hover:bg-blue-700 transition"
          >
            Go Back
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
