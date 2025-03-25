import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const URL = import.meta.env.VITE_API_URL;

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
      const response = await axios.get(`${URL}/auth/me`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setUser(response.data);
    } catch (error) { 
      setUser(null);
      localStorage.removeItem("token");  
    } finally {
      setIsLoading(false);
    }
  };

  // Login function
  const login = async (email, password) => {
    try {
      const response = await axios.post(`${URL}/auth/login`, { email, password });
      localStorage.setItem("token", response.data.token);
      setUser(response.data.user);
       toast.success("Login successful. Welcome back!");
    } catch (error) { 
      toast.error("Login failed. Please check your credentials.");
      throw error; // Re-throw the error for handling in the component
    }
  };

  // Register function
  const register = async (name, email, password) => {
    try {
      const response = await axios.post(`${URL}/auth/register`, {
        name,
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      setUser(response.data.user); 
      toast.success("Registration successful. Welcome to Eventura!");
    } catch (error) { 
      toast.error("Registration failed. Please try again.");
      throw error;  
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