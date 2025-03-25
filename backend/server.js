const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./src/config/db");
const authRoute = require("./src/routes/authRoute");
const venueRoute = require("./src/routes/venueRoutes");
const bookingRoute = require("./src/routes/bookingRoute");
const adminRoute = require("./src/routes/adminRoute");
const messageRoute = require("./src/routes/messageRoute");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
app.use(express.json());

// Allowed origins for CORS
const allowedOrigins = [
  "http://localhost:5173", // Development
  process.env.FRONTEND_URL // Deployed frontend
];

// Configure CORS
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"), false);
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true // Allow cookies and authentication headers
  })
);

// Middleware for CORS headers
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", process.env.FRONTEND_URL);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }
  next();
});

// Routes
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/auth", authRoute);
app.use("/api/venues", venueRoute);
app.use("/api/bookings", bookingRoute);
app.use("/api/admin", adminRoute);
app.use("/api/messages", messageRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
