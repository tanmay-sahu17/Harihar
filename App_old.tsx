import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView } from 'react-native';

import UserTypeSelection from './src/screens/UserTypeSelection';
import CRCHomeScreen from './src/screens/CRCHomeScreen';
import CRCLoginScreen from './src/screens/CRCLoginScreen';
import TeacherLoginScreen from './src/screens/TeacherLoginScreen';
import TeacherHomeScreen from './src/screens/TeacherHomeScreen';
import PhotoUploadScreen from './src/screens/PhotoUploadScreen';
import PreviousPhotosScreen from './src/screens/PreviousPhotosScreen';
import StudentsDataScreen from './src/screens/StudentsDataScreen';
import CertificateScreen from './src/screens/CertificateScreen';
import SchoolMonitoringScreen from './src/screens/SchoolMonitoringScreen';
import TeacherReportsScreen from './src/screens/TeacherReportsScreen';
import DataVerificationScreen from './src/screens/DataVerificationScreen';
import ProgressTrackingScreen from './src/screens/ProgressTrackingScreen';

// App with navigation between screens
export default function App() {
  const [currentScreen, setCurrentScreen] = useState('userTypeSelection');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState<'teacher' | 'crc' | null>(null);

  // Screen navigation function
  const navigateToScreen = (screenName: string) => {
    console.log('Navigation called with screenName:', screenName);
    if (screenName === 'userTypeSelection') {
      setIsLoggedIn(false);
      setUserType(null);
    } else if (screenName === 'home' && !isLoggedIn) {
      setIsLoggedIn(true);
    }
    setCurrentScreen(screenName);
    console.log('Current screen set to:', screenName);
  };

  // Handle user type selection
  const handleUserTypeSelection = (type: 'teacher' | 'crc') => {
    setUserType(type);
    switch (type) {
      case 'teacher':
        setCurrentScreen('teacherLogin');
        break;
      case 'crc':
        setCurrentScreen('crcLogin');
        break;
    }
  };

  // Handle Teacher login success
  const handleTeacherLoginSuccess = () => {
    setIsLoggedIn(true);
    setCurrentScreen('teacherHome');
  };

  // Handle CRC login success
  const handleCRCLoginSuccess = () => {
    setIsLoggedIn(true);
    setCurrentScreen('crcHome');
  };

  // Handle back to user selection
  const handleBackToUserSelection = () => {
    setCurrentScreen('userTypeSelection');
    setUserType(null);
  };

  // Handle logout
  const handleLogout = () => {
    setCurrentScreen('userTypeSelection');
    setUserType(null);
    setIsLoggedIn(false);
  };

  // Render current screen
  const renderCurrentScreen = () => {
    console.log('Rendering screen:', currentScreen);
    switch (currentScreen) {
      case 'userTypeSelection':
        return <UserTypeSelection onSelectUserType={handleUserTypeSelection} />;
      
      // Teacher Login Screen
      case 'teacherLogin':
        return <TeacherLoginScreen 
          onBack={handleBackToUserSelection} 
          onLogin={handleTeacherLoginSuccess}
        />;
      
      // CRC Login Screen
      case 'crcLogin':
        return <CRCLoginScreen 
          onBack={handleBackToUserSelection} 
          onLogin={handleCRCLoginSuccess}
        />;
      
      // Role-specific home screens
      case 'teacherHome':
        return <TeacherHomeScreen onBack={handleBackToUserSelection} onNavigate={navigateToScreen} />;
      
      case 'crcHome':
        return <CRCHomeScreen onBack={handleBackToUserSelection} onNavigate={navigateToScreen} />;

      // CRC/Supervisor specific screens
      case 'schoolMonitoring':
        return <SchoolMonitoringScreen onBack={() => setCurrentScreen('crcHome')} />;

      case 'teacherReports':
        return <TeacherReportsScreen onBack={() => setCurrentScreen('crcHome')} />;

      case 'dataVerification':
        return <DataVerificationScreen onBack={() => setCurrentScreen('crcHome')} />;

      case 'progressTracking':
        return <ProgressTrackingScreen onBack={() => setCurrentScreen('crcHome')} />;

      // Photo Upload Screen
      case 'photoUpload':
        return <PhotoUploadScreen onBack={() => setCurrentScreen('teacherHome')} />;

      // Previous Photos Screen
      case 'previousPhotos':
        return <PreviousPhotosScreen onBack={() => setCurrentScreen('teacherHome')} />;

      // Students Data Screen
      case 'studentsData':
        return <StudentsDataScreen onBack={() => setCurrentScreen('teacherHome')} />;

      // Certificate Screen
      case 'certificate':
        return <CertificateScreen onBack={() => setCurrentScreen('teacherHome')} />;

      default:
        return <UserTypeSelection onSelectUserType={handleUserTypeSelection} />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" backgroundColor="#2E7D32" />
      
      {/* Render Current Screen */}
      {renderCurrentScreen()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F5E8',
  },
});
