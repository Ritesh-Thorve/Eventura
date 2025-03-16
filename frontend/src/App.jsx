import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { AdminAuthProvider } from './contexts/AdminAuthContext';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import MyBookings from './pages/MyBookings';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import Venues from './pages/Venues';
import AdminDashboard from './pages/AdminDashboard';
import AdminRoute from './components/Auth/AdminRoute';
import AdminLogin from './pages/AdminLogin'
import NotFound from './pages/NotFound';
import About from './pages/About';

function App() {
  return (
    <div>
      <Router>
        <AuthProvider>
          <AdminAuthProvider>
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
                  <Route path="/admin-login" element={<AdminLogin />} />
                  <Route path="/venues" element={<Venues />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/mybookings" element={<ProtectedRoute><MyBookings /></ProtectedRoute>} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </AdminAuthProvider>
        </AuthProvider>
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable />
    </div>
  );
}

export default App;
