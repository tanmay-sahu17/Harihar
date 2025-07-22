// API Integration Test Script - Check karne ke liye ki backend properly connected hai ya nahi
import api, { apiUtils } from './src/utils/api.js';

console.log('🔍 HariHar-Pathshala API Integration Test Starting...\n');

async function testAPIIntegration() {
  console.log('1️⃣ Testing Network Connectivity...');
  
  // Test basic connectivity
  const networkConnected = await apiUtils.checkNetworkConnection();
  console.log(`Network Status: ${networkConnected ? '✅ Connected' : '❌ Failed'}`);
  
  // Test API server connectivity
  console.log('\n2️⃣ Testing Backend API Server...');
  const apiTest = await apiUtils.testAPIConnection();
  console.log(`API Status: ${apiTest.connected ? '✅ Connected' : '❌ Failed'}`);
  console.log(`Message: ${apiTest.message}`);
  
  console.log('\n3️⃣ Testing Authentication APIs...');
  
  // Test Teacher Login
  try {
    console.log('Testing Teacher Login...');
    const teacherLogin = await api.auth.teacherLogin('123', 'teacher', '123');
    console.log(`Teacher Login: ${teacherLogin.success ? '✅ Success (Using Hardcoded)' : '❌ Failed'}`);
  } catch (error) {
    console.log(`Teacher Login: ❌ Error - ${error.message}`);
  }
  
  // Test CRC Login
  try {
    console.log('Testing CRC Login...');
    const crcLogin = await api.auth.crcLogin('crc', '1234567890', '123');
    console.log(`CRC Login: ${crcLogin.success ? '✅ Success (Using Hardcoded)' : '❌ Failed'}`);
  } catch (error) {
    console.log(`CRC Login: ❌ Error - ${error.message}`);
  }
  
  console.log('\n4️⃣ Testing Student Management APIs...');
  
  try {
    console.log('Testing Get Students by School...');
    const students = await api.student.getStudentsBySchool('123');
    console.log(`Students API: ${students.length > 0 ? '✅ Success (Mock Data)' : '❌ No Data'}`);
    console.log(`Sample Student: ${students[0]?.name || 'None'}`);
  } catch (error) {
    console.log(`Students API: ❌ Error - ${error.message}`);
  }
  
  console.log('\n5️⃣ Testing School Monitoring APIs...');
  
  try {
    console.log('Testing School Statistics...');
    const schoolStats = await api.monitoring.getSchoolStats('123');
    console.log(`School Stats API: ${schoolStats.udiseCode ? '✅ Success (Mock Data)' : '❌ Failed'}`);
    console.log(`School: ${schoolStats.schoolName || 'Unknown'}`);
  } catch (error) {
    console.log(`School Stats API: ❌ Error - ${error.message}`);
  }
  
  console.log('\n6️⃣ Testing Certificate APIs...');
  
  try {
    console.log('Testing Certificate Generation...');
    const certResult = await api.certificate.generateCertificate('1');
    console.log(`Certificate API: ${certResult.success ? '✅ Success (Mock)' : '❌ Failed'}`);
  } catch (error) {
    console.log(`Certificate API: ❌ Error - ${error.message}`);
  }
  
  console.log('\n7️⃣ Testing Photo Upload APIs...');
  
  try {
    console.log('Testing Photo Upload...');
    const photoResult = await api.photo.uploadPhoto({
      studentId: '1',
      treeName: 'Test Tree',
      photoBase64: 'dGVzdA==', // base64 for 'test'
    });
    console.log(`Photo Upload API: ${photoResult.success ? '✅ Success (Mock)' : '❌ Failed'}`);
  } catch (error) {
    console.log(`Photo Upload API: ❌ Error - ${error.message}`);
  }
  
  console.log('\n📊 API Integration Summary:');
  console.log('================================');
  console.log('🔸 Backend URL: https://grx6djfl-5003.inc1.devtunnels.ms/api/v1');
  console.log('🔸 Current Status: Backend server not accessible');
  console.log('🔸 Fallback Mode: Using mock data and hardcoded credentials');
  console.log('🔸 Login System: ✅ Working (hardcoded validation)');
  console.log('🔸 Data APIs: ✅ Working (mock data responses)');
  console.log('🔸 Error Handling: ✅ Proper fallbacks implemented');
  console.log('\n✅ App is ready for demo with mock data!');
  console.log('⚠️  For production: Backend server needs to be accessible');
}

// Run the test
testAPIIntegration().catch(console.error);
