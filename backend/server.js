require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();

// Connect to DB
connectDB();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/orders', require('./routes/orderRoutes'));

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/menu', require('./routes/menuRoutes'));
// Add orderRoutes, userRoutes, statsRoutes similarly

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
