const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin"); 

const adminAuth = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) { 
      return res.status(401).json({ message: "Access Denied" });
    }
 
    const decoded = jwt.verify(token, process.env.JWT_SECRET); 

    const admin = await Admin.findById(decoded.id);
    if (!admin) {
      console.error("Login with valid credentials");
      return res.status(403).json({ message: "Forbidden" });
    }

    req.user = admin; 
    next();
  } catch (error) {
    console.error("Invalid Token:", error.message);
    res.status(401).json({ message: "Invalid Token" });
  }
};

module.exports = adminAuth;
