/**
 * Quick Leads API Test
 * This script performs a minimal test of the leads API
 */

// Usage: node quick-leads-test.js YOUR_AUTH_TOKEN
const token = process.argv[2];

if (!token) {
  console.error('Error: No token provided');
  console.error('Usage: node quick-leads-test.js YOUR_AUTH_TOKEN');
  process.exit(1);
}

async function quickTest() {
  const API_BASE_URL = 'https://api.keshevplus.co.il';
  
  console.log('\n🧪 KESHEV+ LEADS API QUICK TEST');
  console.log('--------------------------------');
  console.log('Using API URL:', API_BASE_URL);
  console.log('Token provided:', token.substring(0, 10) + '...');
  
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
  
  try {
    console.log('\n📋 Fetching all leads...');
    const response = await fetch(`${API_BASE_URL}/api/leads`, {
      method: 'GET',
      headers
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('API Response structure:', Object.keys(data));
    
    // Check if data.leads is an array
    if (!data.leads || !Array.isArray(data.leads)) {
      console.log('Warning: data.leads is not an array:', data.leads);
      console.log('Full response:', JSON.stringify(data, null, 2).substring(0, 500) + '...');
      return;
    }
    
    const totalLeads = data.leads.length;
    // Make sure we handle leads that might not have is_read property
    const unreadLeads = data.leads.filter(lead => lead && lead.is_read === false).length;
    
    console.log(`✅ Success! Retrieved ${totalLeads} leads`);
    console.log(`📊 Unread leads: ${unreadLeads}`);
    
    if (totalLeads > 0) {
      // Show info about the first lead
      const firstLead = data.leads[0];
      console.log('\n📝 First lead details:');
      console.log(`   ID: ${firstLead.id}`);
      console.log(`   Name: ${firstLead.name}`);
      console.log(`   Email: ${firstLead.email}`);
      console.log(`   Read status: ${firstLead.is_read ? 'Read' : 'Unread'}`);
      
      // Test marking as read
      if (!firstLead.is_read) {
        console.log('\n📋 Marking lead as read...');
        const markResponse = await fetch(`${API_BASE_URL}/api/leads/${firstLead.id}/read`, {
          method: 'PUT',
          headers
        });
        
        if (markResponse.ok) {
          console.log('✅ Successfully marked lead as read');
        } else {
          console.log('❌ Failed to mark lead as read');
        }
      }
    }
    
    console.log('\n🏁 Quick test completed successfully!\n');
  } catch (error) {
    console.error(`\n❌ Error: ${error.message}`);
    console.error('Check that:');
    console.error('1. Your authentication token is valid');
    console.error('2. The API server is running');
    console.error('3. You have network connectivity to the API\n');
  }
}

quickTest();
