import axios from 'axios';
import { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminAuthContext = createContext();

export function AdminAuthProvider({ children }) {
  const [admin, setAdmin] = useState(localStorage.getItem('adminToken') || null);
  const navigate = useNavigate();  
  const URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios.defaults.headers.common['Authorization'] = admin ? `Bearer ${admin}` : '';
  }, [admin]);

  const login = async (email, password) => {
    try {
      const { data } = await axios.post(`${URL}/admin/login`, { email, password });
      localStorage.setItem('adminToken', data.token);
      setAdmin(data.token);
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    setAdmin(null);
    delete axios.defaults.headers.common['Authorization'];  
    navigate('/');  
  };

  return (
    <AdminAuthContext.Provider value={{ admin, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export const useAdminAuth = () => useContext(AdminAuthContext);
