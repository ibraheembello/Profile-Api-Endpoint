/**
 * Cat Facts API Service
 * Requirements addressed:
 * - Fetch cat fact from external API (Requirement 3)
 * - Fetch new fact on every request (Requirement 6)
 * - Handle API failures gracefully (Requirement 7)
 * - Set appropriate timeout values (Requirement: Implementation guidance)
 * - Handle network errors and timeouts (Requirement: Error handling)
 */

const axios = require('axios');
const { CAT_FACTS_API, FALLBACK_CAT_FACT } = require('../config/constants');

/**
 * Fetches a random cat fact from the Cat Facts API
 * @returns {Promise<string>} A cat fact string
 */
async function getCatFact() {
  try {
    console.log('🐱 Fetching cat fact from external API...');
    
    const response = await axios.get(CAT_FACTS_API.url, {
      timeout: CAT_FACTS_API.timeout,
      headers: {
        'Accept': 'application/json'
      }
    });

    // Validate response structure
    if (response.data && response.data.fact) {
      console.log('✅ Cat fact fetched successfully');
      return response.data.fact;
    } else {
      console.warn('⚠️ Unexpected response structure from Cat Facts API');
      return FALLBACK_CAT_FACT;
    }
    
  } catch (error) {
    // Requirement: Handle potential API failures gracefully
    if (error.code === 'ECONNABORTED') {
      console.error('❌ Cat Facts API timeout:', error.message);
    } else if (error.response) {
      console.error('❌ Cat Facts API error:', error.response.status);
    } else if (error.request) {
      console.error('❌ Network error - no response received');
    } else {
      console.error('❌ Error fetching cat fact:', error.message);
    }
    
    // Return fallback message instead of throwing
    return FALLBACK_CAT_FACT;
  }
}

module.exports = { getCatFact };