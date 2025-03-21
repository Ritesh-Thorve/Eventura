import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loader2, User, Mail, Lock } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "../contexts/AuthContext"; // Import the AuthContext
import { toast } from "react-toastify";

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth(); // Use the register function from AuthContext
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Validate password match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      await register(formData.name, formData.email, formData.password); // Use the register function from AuthContext
      toast.success("Registration successful! You are now logged in.");
      navigate("/"); // Redirect to home page after successful registration
    } catch (err) {
      setError("Failed to create account. Please try again.");
      toast.error("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <motion.div
        className="w-full max-w-3xl bg-white rounded-xl shadow-lg flex overflow-hidden"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Left Side: Image */}
        <div className="hidden md:flex w-1/2  items-center justify-center p-6">
          <motion.img
            src="/register.jpg" // Replace with your actual image path
            alt="Register"
            className="h-64 w-auto"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4 }}
          />
        </div>

        {/* Right Side: Form */}
        <div className="w-full md:w-1/2 p-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">Create an Account</h2>
            <p className="text-gray-500 mt-1">
              Already have an account?{" "}
              <Link to="/login" className="text-indigo-600 hover:underline">
                Sign in
              </Link>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <div className="relative">
              <User className="absolute left-3 top-3 text-gray-400" />
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="pl-10 pr-4 py-2 w-full border-b-2 border-gray-300 focus:border-indigo-500 outline-none"
              />
            </div>

            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400" />
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="Email address"
                className="pl-10 pr-4 py-2 w-full border-b-2 border-gray-300 focus:border-indigo-500 outline-none"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400" />
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="pl-10 pr-4 py-2 w-full border-b-2 border-gray-300 focus:border-indigo-500 outline-none"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400" />
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                className="pl-10 pr-4 py-2 w-full border-b-2 border-gray-300 focus:border-indigo-500 outline-none"
              />
            </div>

            {error && (
              <motion.div
                className="bg-red-100 border border-red-300 text-red-700 rounded-md p-3 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {error}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center py-3 px-4 bg-indigo-600 text-white font-medium rounded-lg shadow-lg hover:bg-indigo-700 transition duration-300 disabled:bg-indigo-400"
            >
              {loading ? <Loader2 className="animate-spin w-5 h-5 mr-2" /> : "Create Account"}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}