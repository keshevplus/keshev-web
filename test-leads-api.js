/**
 * Test script for the leads API endpoints
 * 
 * This script tests the following functionality:
 * - Getting all leads
 * - Getting a single lead
 * - Creating a new lead
 * - Marking a lead as read
 * - Deleting a lead
 */

// This script uses the native fetch API in Node.js (which is available in newer Node.js versions)
// No external dependencies required

async function testLeadsAPI() {
  // Get token from command line arguments if provided
  const args = process.argv.slice(2);
  let token = process.env.TEST_AUTH_TOKEN;
  
  // Check if a token was provided as a command line argument
  if (args.length > 0) {
    token = args[0];
    console.log('Using token from command line arguments');
  }
  
  // Configuration
  const API_BASE_URL = process.env.VITE_API_BASE_URL || 'https://api.keshevplus.co.il';
  
  if (!token) {
    console.error('ERROR: No authentication token provided. Please provide a token as a command line argument:');
    console.error('node test-leads-api.js YOUR_AUTH_TOKEN');
    console.error('You can get a token by logging into the admin dashboard and copying it from localStorage.');
    process.exit(1);
  }

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };

  console.log('🧪 Starting leads API tests');
  console.log(`🔗 Using API URL: ${API_BASE_URL}`);
  
  // Test 1: Get all leads
  console.log('\n📋 TEST 1: Getting all leads');
  try {
    const response = await fetch(`${API_BASE_URL}/api/leads`, {
      method: 'GET',
      headers
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log(`✅ Successfully retrieved ${data.leads ? data.leads.length : 0} leads`);
    console.log(`📊 Data structure: ${JSON.stringify(Object.keys(data), null, 2)}`);
    
    // Save a lead ID for later tests if available
    const testLeadId = data.leads && data.leads.length > 0 ? data.leads[0].id : null;
    
    if (testLeadId) {
      // Test 2: Get a single lead
      console.log(`\n📋 TEST 2: Getting lead with ID ${testLeadId}`);
      try {
        const singleResponse = await fetch(`${API_BASE_URL}/api/leads/${testLeadId}`, {
          method: 'GET',
          headers
        });
        
        if (!singleResponse.ok) {
          throw new Error(`HTTP error! status: ${singleResponse.status}`);
        }
        
        const singleLead = await singleResponse.json();
        console.log(`✅ Successfully retrieved lead: ${singleLead.name || 'Unknown'}`);
        
        // Test 3: Mark lead as read
        console.log(`\n📋 TEST 3: Marking lead as read (ID: ${testLeadId})`);
        try {
          const markResponse = await fetch(`${API_BASE_URL}/api/leads/${testLeadId}/read`, {
            method: 'PUT',
            headers
          });
          
          if (!markResponse.ok) {
            throw new Error(`HTTP error! status: ${markResponse.status}`);
          }
          
          const markResult = await markResponse.json();
          console.log(`✅ Successfully marked lead as read: ${JSON.stringify(markResult)}`);
          
        } catch (error) {
          console.error(`❌ Failed to mark lead as read: ${error.message}`);
        }
      } catch (error) {
        console.error(`❌ Failed to get single lead: ${error.message}`);
      }
    } else {
      console.log('⚠️ No leads found for testing single lead operations');
    }
    
    // Test 4: Create a new lead
    console.log('\n📋 TEST 4: Creating a new lead');
    try {
      const newLead = {
        name: 'Test Lead',
        email: 'test@example.com',
        phone: '+1234567890',
        message: 'This is a test lead created by the API test script',
        source: 'API Test'
      };
      
      const createResponse = await fetch(`${API_BASE_URL}/api/leads`, {
        method: 'POST',
        headers,
        body: JSON.stringify(newLead)
      });
      
      if (!createResponse.ok) {
        throw new Error(`HTTP error! status: ${createResponse.status}`);
      }
      
      const createdLead = await createResponse.json();
      console.log(`✅ Successfully created new lead: ${JSON.stringify(createdLead)}`);
      
      // Test 5: Delete the newly created lead
      if (createdLead.id) {
        console.log(`\n📋 TEST 5: Deleting lead (ID: ${createdLead.id})`);
        try {
          const deleteResponse = await fetch(`${API_BASE_URL}/api/leads/${createdLead.id}`, {
            method: 'DELETE',
            headers
          });
          
          if (!deleteResponse.ok) {
            throw new Error(`HTTP error! status: ${deleteResponse.status}`);
          }
          
          const deleteResult = await deleteResponse.json();
          console.log(`✅ Successfully deleted lead: ${JSON.stringify(deleteResult)}`);
          
        } catch (error) {
          console.error(`❌ Failed to delete lead: ${error.message}`);
        }
      }
      
    } catch (error) {
      console.error(`❌ Failed to create new lead: ${error.message}`);
    }
    
  } catch (error) {
    console.error(`❌ Failed to get all leads: ${error.message}`);
  }
  
  console.log('\n🏁 Finished testing leads API');
}

// Run the tests
testLeadsAPI().catch(error => {
  console.error('Unhandled error during tests:', error);
});
