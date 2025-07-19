import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView } from 'react-native';

import LoginScreen from './src/screens/LoginScreen';
import UserTypeSelection from './src/screens/UserTypeSelection';
import CRCLoginScreen from './src/screens/CRCLoginScreen';
import BEOLoginScreen from './src/screens/BEOLoginScreen';
import DEOLoginScreen from './src/screens/DEOLoginScreen';
import TeacherHomeScreen from './src/screens/TeacherHomeScreen';
import CRCHomeScreen from './src/screens/CRCHomeScreen';
import BEOHomeScreen from './src/screens/BEOHomeScreen';
import DEOHomeScreen from './src/screens/DEOHomeScreen';
import PhotoUploadScreen from './src/screens/PhotoUploadScreen';
import PreviousPhotosScreen from './src/screens/PreviousPhotosScreen';
import StudentsDataScreen from './src/screens/StudentsDataScreen';
import CertificateScreen from './src/screens/CertificateScreen';
import BlockProgressScreen from './src/screens/BlockProgressScreen';
import SchoolStatusScreen from './src/screens/SchoolStatusScreen';
import MissingDataScreen from './src/screens/MissingDataScreen';
import FilterSortScreen from './src/screens/FilterSortScreen';
import DailyReportScreen from './src/screens/DailyReportScreen';

// App with navigation between screens
export default function App() {
  const [currentScreen, setCurrentScreen] = useState('userTypeSelection');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState<'teacher' | 'crc' | 'beo' | 'deo' | null>(null);

  // Screen navigation function
  const navigateToScreen = (screenName: string) => {
    if (screenName === 'userTypeSelection') {
      setIsLoggedIn(false);
      setUserType(null);
    } else if (screenName === 'home' && !isLoggedIn) {
      setIsLoggedIn(true);
    }
    setCurrentScreen(screenName);
  };

  // Handle user type selection
  const handleUserTypeSelection = (type: 'teacher' | 'crc' | 'beo' | 'deo') => {
    setUserType(type);
    switch (type) {
      case 'teacher':
        setCurrentScreen('login');
        break;
      case 'crc':
        setCurrentScreen('crcLogin');
        break;
      case 'beo':
        setCurrentScreen('beoLogin');
        break;
      case 'deo':
        setCurrentScreen('deoLogin');
        break;
    }
  };

  // Handle login success
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    // Navigate to role-specific home screen
    switch (userType) {
      case 'teacher':
        setCurrentScreen('teacherHome');
        break;
      case 'crc':
        setCurrentScreen('crcHome');
        break;
      case 'beo':
        setCurrentScreen('beoHome');
        break;
      case 'deo':
        setCurrentScreen('deoHome');
        break;
      default:
        setCurrentScreen('home');
    }
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
    switch (currentScreen) {
      case 'userTypeSelection':
        return <UserTypeSelection onSelectUserType={handleUserTypeSelection} />;
      
      case 'login':
        return (
          <LoginScreen 
            onBack={handleBackToUserSelection}
            onLogin={handleLoginSuccess}
          />
        );
      
      case 'crcLogin':
        return (
          <CRCLoginScreen 
            onBack={handleBackToUserSelection}
            onLogin={handleLoginSuccess}
          />
        );
      
      case 'beoLogin':
        return (
          <BEOLoginScreen 
            onBack={handleBackToUserSelection}
            onLogin={handleLoginSuccess}
          />
        );
      
      case 'deoLogin':
        return (
          <DEOLoginScreen 
            onBack={handleBackToUserSelection}
            onLogin={handleLoginSuccess}
          />
        );
      
      // Role-specific home screens
      case 'teacherHome':
        return <TeacherHomeScreen onBack={handleBackToUserSelection} onNavigate={navigateToScreen} />;
      
      case 'crcHome':
        return <CRCHomeScreen onBack={handleBackToUserSelection} />;
      
      case 'beoHome':
        return <BEOHomeScreen onBack={handleBackToUserSelection} onNavigate={navigateToScreen} />;
      
      case 'deoHome':
        return <DEOHomeScreen onBack={handleBackToUserSelection} onNavigate={navigateToScreen} />;

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

      // BEO specific screens
      case 'blockProgress':
        return <BlockProgressScreen onBack={() => setCurrentScreen('beoHome')} />;

      case 'schoolStatus':
        return <SchoolStatusScreen onBack={() => setCurrentScreen('beoHome')} />;

      case 'missingData':
        return <MissingDataScreen onBack={() => setCurrentScreen('beoHome')} />;

      case 'filterSort':
        return <FilterSortScreen onBack={() => setCurrentScreen('beoHome')} />;

      case 'dailyReport':
        return <DailyReportScreen onBack={() => setCurrentScreen('beoHome')} />;

      // DEO specific screens
      case 'blockTable':
        return <BlockProgressScreen onBack={() => setCurrentScreen('deoHome')} />;

      case 'filtersFlags':
        return <FilterSortScreen onBack={() => setCurrentScreen('deoHome')} />;

      case 'reports':
        return <DailyReportScreen onBack={() => setCurrentScreen('deoHome')} />;

      case 'activityLog':
        return <MissingDataScreen onBack={() => setCurrentScreen('deoHome')} />;

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
