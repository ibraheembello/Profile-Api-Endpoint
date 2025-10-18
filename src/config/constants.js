/**
 * Configuration Constants
 * Requirement: Store user profile information
 * Note: In production, sensitive data like email should be in environment variables
 */

module.exports = {
  USER_PROFILE: {
    email: process.env.USER_EMAIL || 'belloibrahimolawale@gmail.com',
    name: process.env.USER_NAME || 'Ibraheem Bello',
    stack: process.env.USER_STACK || 'Node.js/Express'
  },
  
  CAT_FACTS_API: {
    url: 'https://catfact.ninja/fact',
    timeout: 5000 // 5 seconds timeout (Requirement: Set appropriate timeout values)
  },
  
  FALLBACK_CAT_FACT: 'Cats are amazing creatures!' // Requirement: Fallback for API failures
};