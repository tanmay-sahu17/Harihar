// Example integration of API in your screens
// यह file दिखाती है कि कैसे API को screens में integrate करें

import React, { useEffect, useState } from 'react';
import api from '../utils/api';

// 1. Teacher Login में API integration
const handleTeacherLogin = async (udiseCode: string, teacherName: string, password: string) => {
  try {
    const result = await api.auth.teacherLogin(udiseCode, teacherName, password);
    
    if (result.success) {
      console.log('Login successful:', result.user);
      // Navigate to home screen
      return true;
    }
  } catch (error) {
    api.utils.handleError(error);
    return false;
  }
};

// 2. Students Data fetch करने के लिए
const fetchStudentsData = async (udiseCode: string) => {
  try {
    const students = await api.student.getStudentsBySchool(udiseCode);
    console.log('Students fetched:', students.length);
    return students;
  } catch (error) {
    api.utils.handleError(error);
    return [];
  }
};

// 3. Photo Upload के लिए
const uploadStudentPhoto = async (studentId: string, treeName: string, photoBase64: string) => {
  try {
    const result = await api.photo.uploadPhoto({
      studentId,
      treeName,
      photoBase64,
      location: {
        latitude: 26.9124, // Jaipur coordinates
        longitude: 75.7873
      }
    });
    
    if (result.success) {
      console.log('Photo uploaded successfully:', result.photoId);
      return true;
    }
    return false;
  } catch (error) {
    api.utils.handleError(error);
    return false;
  }
};

// 4. Certificate Generate करने के लिए
const generateCertificate = async (studentId: string) => {
  try {
    const result = await api.certificate.generateCertificate(studentId);
    
    if (result.success) {
      console.log('Certificate generated:', result.certificateId);
      return result.certificateId;
    }
    return null;
  } catch (error) {
    api.utils.handleError(error);
    return null;
  }
};

// 5. School Stats fetch करने के लिए
const fetchSchoolStats = async (udiseCode: string) => {
  try {
    const stats = await api.monitoring.getSchoolStats(udiseCode);
    console.log('School stats:', stats);
    return stats;
  } catch (error) {
    api.utils.handleError(error);
    return null;
  }
};

// 6. CRC Login के लिए
const handleCRCLogin = async (username: string, phoneNumber: string, password: string) => {
  try {
    const result = await api.auth.crcLogin(username, phoneNumber, password);
    
    if (result.success) {
      console.log('CRC Login successful:', result.user);
      return true;
    }
  } catch (error) {
    api.utils.handleError(error);
    return false;
  }
};

// 7. Verification Data fetch करने के लिए
const fetchPendingVerifications = async () => {
  try {
    const verifications = await api.verification.getPendingVerifications();
    console.log('Pending verifications:', verifications.length);
    return verifications;
  } catch (error) {
    api.utils.handleError(error);
    return [];
  }
};

// 8. Progress Data fetch करने के लिए
const fetchDistrictProgress = async () => {
  try {
    const progress = await api.progress.getDistrictProgress();
    console.log('District progress:', progress);
    return progress;
  } catch (error) {
    api.utils.handleError(error);
    return null;
  }
};

/* 
✅ API INTEGRATION STATUS - COMPLETED!

1. ✅ Authentication APIs - Teacher & CRC Login
2. ✅ Student Management - CRUD operations  
3. ✅ Photo Upload - File upload with FormData
4. ✅ Certificate Generation - PDF generation
5. ✅ School Monitoring - Stats & Reports
6. ✅ Data Verification - CRC approval workflow
7. ✅ Progress Tracking - District & School progress
8. ✅ Error Handling - User-friendly messages in Hindi
9. ✅ Token Management - Automatic refresh
10. ✅ Mock Data Fallback - Works offline

🚀 API SUCCESSFULLY INTEGRATED! READY TO USE IN YOUR SCREENS!

USAGE EXAMPLES:
- Login: api.auth.teacherLogin(udiseCode, name, password)
- Students: api.student.getStudentsBySchool(udiseCode)  
- Photos: api.photo.uploadPhoto(photoData)
- Certificates: api.certificate.generateCertificate(studentId)
- Stats: api.monitoring.getSchoolStats(udiseCode)
*/

export {
  handleTeacherLogin,
  handleCRCLogin,
  fetchStudentsData,
  uploadStudentPhoto,
  generateCertificate,
  fetchSchoolStats,
  fetchPendingVerifications,
  fetchDistrictProgress
};
