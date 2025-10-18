/**
 * Express Application Setup
 * Requirements addressed:
 * - CORS headers (Requirement: Best practices)
 * - JSON parsing
 * - Logging (Requirement: Basic logging for debugging)
 * - Route mounting
 */

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const profileRoutes = require('./routes/profileRoutes');

const app = express();

// Middleware
app.use(cors()); // Requirement: Include proper CORS headers
app.use(express.json());
app.use(morgan('dev')); // Requirement: Add basic logging for debugging

// Routes
app.use('/', profileRoutes);

// Health check endpoint (optional, for deployment verification)
app.get('/', (req, res) => {
  res.json({ 
    message: 'API is running',
    endpoints: {
      profile: '/me'
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Endpoint not found'
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    status: 'error',
    message: 'Internal server error'
  });
});

module.exports = app;