// server.js

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path'); 

// Load env variables from .env file
dotenv.config();

// Create Express app
const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // Parses incoming JSON requests


//app.use('/uploads', express.static('uploads'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/incidents', require('./routes/incident')); // ✅ Add this line

// Root route
app.get('/', (req, res) => {
  res.send('Incident Management System API is running 🚀');
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    //console.log("✅ MongoDB connected successfully");

    // Start the server after DB is connected
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch(err => console.error("❌ MongoDB connection error:", err));
