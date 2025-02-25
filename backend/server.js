const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./src/config/db');
const authRoute = require('./src/routes/authRoute')
const venueRoute = require('./src/routes/venueRoutes')

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoute);
app.use("/api/venues", venueRoute);  
app.use("/api/venues/:id", venueRoute); 
app.use("/api/venues/createvenue", venueRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    