/**
 * Test Script for /me Endpoint
 * Run this after starting the server to verify all requirements
 * 
 * Usage: node test-endpoint.js
 */

const axios = require('axios');

const API_URL = process.env.API_URL || 'http://localhost:3000/me';

async function testEndpoint() {
  console.log('🧪 Testing /me endpoint...\n');
  console.log(`Target URL: ${API_URL}\n`);
  
  try {
    // Test 1: Make first request
    console.log('📝 Test 1: Making first request...');
    const response1 = await axios.get(API_URL);
    
    // Verify status code
    console.log(`✅ Status Code: ${response1.status} ${response1.status === 200 ? '(PASS)' : '(FAIL)'}`);
    
    // Verify Content-Type
    const contentType = response1.headers['content-type'];
    console.log(`✅ Content-Type: ${contentType} ${contentType.includes('application/json') ? '(PASS)' : '(FAIL)'}`);
    
    const data1 = response1.data;
    console.log('\n📦 Response Body:');
    console.log(JSON.stringify(data1, null, 2));
    
    // Verify required fields
    console.log('\n🔍 Field Validation:');
    console.log(`✅ status field: ${data1.status ? 'Present' : 'Missing'} ${data1.status === 'success' ? '(PASS)' : '(FAIL)'}`);
    console.log(`✅ user object: ${data1.user ? 'Present (PASS)' : 'Missing (FAIL)'}`);
    console.log(`✅ user.email: ${data1.user?.email ? 'Present (PASS)' : 'Missing (FAIL)'}`);
    console.log(`✅ user.name: ${data1.user?.name ? 'Present (PASS)' : 'Missing (FAIL)'}`);
    console.log(`✅ user.stack: ${data1.user?.stack ? 'Present (PASS)' : 'Missing (FAIL)'}`);
    console.log(`✅ timestamp: ${data1.timestamp ? 'Present (PASS)' : 'Missing (FAIL)'}`);
    console.log(`✅ fact: ${data1.fact ? 'Present (PASS)' : 'Missing (FAIL)'}`);
    
    // Verify ISO 8601 format
    const isValidISO = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(data1.timestamp);
    console.log(`✅ Timestamp ISO 8601 format: ${isValidISO ? 'Valid (PASS)' : 'Invalid (FAIL)'}`);
    
    // Test 2: Make second request after 2 seconds
    console.log('\n⏳ Waiting 2 seconds before second request...');
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('\n📝 Test 2: Making second request...');
    const response2 = await axios.get(API_URL);
    const data2 = response2.data;
    
    console.log('\n📦 Second Response Timestamp:', data2.timestamp);
    console.log('📦 Second Response Fact:', data2.fact);
    
    // Verify dynamic updates
    console.log('\n🔄 Dynamic Update Verification:');
    const timestampChanged = data1.timestamp !== data2.timestamp;
    console.log(`✅ Timestamp updated: ${timestampChanged ? 'Yes (PASS)' : 'No (FAIL)'}`);
    console.log(`   First:  ${data1.timestamp}`);
    console.log(`   Second: ${data2.timestamp}`);
    
    const factChanged = data1.fact !== data2.fact;
    console.log(`✅ Cat fact updated: ${factChanged ? 'Yes (PASS)' : 'No - Same fact (May be coincidence)'}`);
    console.log(`   First:  "${data1.fact.substring(0, 50)}..."`);
    console.log(`   Second: "${data2.fact.substring(0, 50)}..."`);
    
    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('📊 TEST SUMMARY');
    console.log('='.repeat(60));
    
    const allTests = [
      response1.status === 200,
      contentType.includes('application/json'),
      data1.status === 'success',
      !!data1.user,
      !!data1.user?.email,
      !!data1.user?.name,
      !!data1.user?.stack,
      !!data1.timestamp,
      !!data1.fact,
      isValidISO,
      timestampChanged
    ];
    
    const passedTests = allTests.filter(Boolean).length;
    const totalTests = allTests.length;
    
    console.log(`✅ Tests Passed: ${passedTests}/${totalTests}`);
    console.log(`${passedTests === totalTests ? '🎉 ALL TESTS PASSED!' : '⚠️  Some tests failed - review output above'}`);
    console.log('='.repeat(60));
    
  } catch (error) {
    console.error('\n❌ TEST FAILED');
    console.error('='.repeat(60));
    
    if (error.response) {
      console.error(`Status: ${error.response.status}`);
      console.error(`Data:`, error.response.data);
    } else if (error.request) {
      console.error('No response received. Is the server running?');
      console.error('Start the server with: npm start');
    } else {
      console.error('Error:', error.message);
    }
    
    console.error('='.repeat(60));
    process.exit(1);
  }
}

// Run the test
testEndpoint();