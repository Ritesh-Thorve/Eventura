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
app.use(cors());
 
app.use('/api/auth', authRoute);
app.use('/api/venues', venueRoute);
app.use('/api/bookings', bookingRoute);
app.use('/api/admin', adminRoute);
app.use('/api/messages', messageRoute);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
