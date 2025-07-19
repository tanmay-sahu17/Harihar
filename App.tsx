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
        return <TeacherHomeScreen onBack={handleBackToUserSelection} />;
      
      case 'crcHome':
        return <CRCHomeScreen onBack={handleBackToUserSelection} />;
      
      case 'beoHome':
        return <BEOHomeScreen onBack={handleBackToUserSelection} />;
      
      case 'deoHome':
        return <DEOHomeScreen onBack={handleBackToUserSelection} />;

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
