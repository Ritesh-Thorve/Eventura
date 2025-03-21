import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch user data on initial load if token exists
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUser();
    } else {
      setIsLoading(false);
    }
  }, []);

  // Fetch user data from the backend
  const fetchUser = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/auth/me", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setUser(response.data);
    } catch (error) { 
      setUser(null);
      localStorage.removeItem("token"); // Clear invalid token
    } finally {
      setIsLoading(false);
    }
  };

  // Login function
  const login = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:8000/api/auth/login", { email, password });
      localStorage.setItem("token", response.data.token);
      setUser(response.data.user);
      toast.success("Logged in successfully!");
    } catch (error) { 
      toast.error("Login failed. Please check your credentials.");
      throw error; // Re-throw the error for handling in the component
    }
  };

  // Register function
  const register = async (name, email, password) => {
    try {
      const response = await axios.post("http://localhost:8000/api/auth/register", {
        name,
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      setUser(response.data.user); 
    } catch (error) { 
      toast.error("Registration failed. Please try again.");
      throw error; // Re-throw the error for handling in the component
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null); 
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}