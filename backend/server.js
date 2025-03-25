const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./src/config/db');
const authRoute = require('./src/routes/authRoute');
const venueRoute = require('./src/routes/venueRoutes');
const bookingRoute = require('./src/routes/bookingRoute');
const adminRoute = require('./src/routes/adminRoute'); 
const messageRoute = require('./src/routes/messageRoute');
dotenv.config();

connectDB();

const app = express();
app.use(express.json());
//change the origin to the frontend url
app.use(cors({
    origin: process.env.FRONTEND_URL,  
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true
}));
console.log("Allowed Frontend:", process.env.FRONTEND_URL);

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", process.env.FRONTEND_URL);
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    if (req.method === "OPTIONS") {
        return res.sendStatus(204);
    }
    next();
});


app.get(('/', (req,res) => {
    res.send('Welcome to Eventura API');
}));

app.use('/api/auth', authRoute);
app.use('/api/venues', venueRoute);
app.use('/api/bookings', bookingRoute);
app.use('/api/admin', adminRoute);
app.use('/api/messages', messageRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
