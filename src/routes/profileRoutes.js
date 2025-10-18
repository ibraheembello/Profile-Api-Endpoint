/**
 * Profile Routes
 * Requirement 1: Create a GET endpoint at /me
 */

const express = require('express');
const { getProfile } = require('../controllers/profileController');

const router = express.Router();

// Requirement 1: GET endpoint at /me
router.get('/me', getProfile);

module.exports = router;