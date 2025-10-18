/**
 * Server Entry Point
 * Requirement: Start the Express server on specified port
 */

require('dotenv').config();
const app = require('./src/app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`📍 Profile endpoint available at: http://localhost:${PORT}/me`);
});