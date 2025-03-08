const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const adminAuth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ message: 'Access Denied' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded.id);
    
    if (!admin) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    req.user = admin;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid Token', error: error.message });
  }
};

module.exports = adminAuth;
