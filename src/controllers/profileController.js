/**
 * Profile Controller
 * Requirements addressed:
 * - Return JSON with exact structure (Requirement 4)
 * - Include all required fields (Requirement: Acceptance criteria)
 * - Generate dynamic timestamp in ISO 8601 format (Requirement 5)
 * - Timestamp updates with every request (Requirement 5)
 * - Fetch new cat fact per request (Requirement 6)
 * - Return 200 OK status (Requirement 8)
 */

const { getCatFact } = require('../services/catFactService');
const { USER_PROFILE } = require('../config/constants');

/**
 * Handles GET /me endpoint
 * Returns user profile with dynamic timestamp and cat fact
 */
async function getProfile(req, res) {
  try {
    console.log('📋 Processing /me request...');
    
    // Requirement 6: Fetch a new cat fact on every request (not cached)
    const catFact = await getCatFact();
    
    // Requirement 5: Generate current UTC timestamp in ISO 8601 format
    // This updates dynamically with every new request
    const timestamp = new Date().toISOString();
    
    // Requirement 4: Response structure strictly follows the defined JSON schema
    const response = {
      status: 'success', // Required field: Always "success"
      user: {
        email: USER_PROFILE.email,    // Required field
        name: USER_PROFILE.name,       // Required field
        stack: USER_PROFILE.stack      // Required field
      },
      timestamp: timestamp,  // Required field: Current UTC time in ISO 8601
      fact: catFact          // Required field: Cat fact from external API
    };
    
    console.log('✅ Response prepared successfully');
    
    // Requirement 8: Return 200 OK status
    // Requirement 2: Content-Type is application/json (set by express.json())
    res.status(200).json(response);
    
  } catch (error) {
    console.error('❌ Error in getProfile controller:', error);
    
    // Return appropriate error response
    res.status(500).json({
      status: 'error',
      message: 'Failed to generate profile response'
    });
  }
}

module.exports = { getProfile };