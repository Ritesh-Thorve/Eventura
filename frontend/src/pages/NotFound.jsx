import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20 max-w-6xl w-full items-center">
        {/* Left Illustration */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center"
        >
          <img
            src="/Page_not_found.jpg"
            alt="page not found"
            className="max-w-screen-lg w-full object-cover"
          />
        </motion.div>

        {/* Right Text Section */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center md:text-left "
        >
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-4 ">
            Page <span className="text-blue-600">Not</span> Found
          </h1>
          <p className="text-gray-500 text-base md:text-lg mb-6 mt-10">
            The page you are looking for doesn’t exist or an other error
              <br />
            occurred. 
          </p>

          <button
            onClick={() => navigate("/")}
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-xl shadow hover:bg-blue-700 hover:scale-105 transition-all duration-300 ease-in-out"
          >
             Go back to Home
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
