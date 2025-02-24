import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext'; 
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home'; 
import Booking from './pages/Booking';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <AuthProvider> 
          <div className="zmin-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} /> 
                <Route path="/booking" element={
                  <ProtectedRoute>
                    <Booking />
                  </ProtectedRoute>
                } />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Routes>
            </main>
            <Footer />
          </div> 
      </AuthProvider>
    </Router>
  );
}

export default App;