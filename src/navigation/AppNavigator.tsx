// App Navigator with Routes - HariHar Pathshala
import React, { useState, useEffect } from 'react';
import { View } from 'react-native';

// Import all screens
import UserTypeSelection from '../screens/UserTypeSelection';
import TeacherLoginScreen from '../screens/TeacherLoginScreen';
import CRCLoginScreen from '../screens/CRCLoginScreen';
import TeacherHomeScreen from '../screens/TeacherHomeScreen';
import CRCHomeScreen from '../screens/CRCHomeScreen';
import PhotoUploadScreen from '../screens/PhotoUploadScreen';
import PreviousPhotosScreen from '../screens/PreviousPhotosScreen';
import StudentsDataScreen from '../screens/StudentsDataScreen';
import CertificateScreen from '../screens/CertificateScreen';
import SchoolMonitoringScreen from '../screens/SchoolMonitoringScreen';
import TeacherReportsScreen from '../screens/TeacherReportsScreen';
import DataVerificationScreen from '../screens/DataVerificationScreen';
import ProgressTrackingScreen from '../screens/ProgressTrackingScreen';

// Route types
export type RouteNames = 
  | 'userSelection'
  | 'teacherLogin'
  | 'crcLogin'
  | 'teacherHome'
  | 'crcHome'
  | 'photoUpload'
  | 'previousPhotos'
  | 'studentsData'
  | 'certificate'
  | 'schoolMonitoring'
  | 'teacherReports'
  | 'dataVerification'
  | 'progressTracking';

interface AppNavigatorProps {}

interface NavigationState {
  currentRoute: RouteNames;
  userType: 'teacher' | 'crc' | null;
  isAuthenticated: boolean;
}

const AppNavigator: React.FC<AppNavigatorProps> = () => {
  const [navigationState, setNavigationState] = useState<NavigationState>({
    currentRoute: 'userSelection',
    userType: null,
    isAuthenticated: false,
  });

  // Debug logging
  useEffect(() => {
    console.log('Navigation State Updated:', navigationState);
  }, [navigationState]);

  // Navigation helper functions
  const navigateTo = (route: RouteNames) => {
    console.log('Navigating to:', route);
    setNavigationState(prev => {
      const newState = {
        ...prev,
        currentRoute: route,
      };
      console.log('New Navigation State:', newState);
      return newState;
    });
  };

  const handleUserTypeSelection = (userType: 'teacher' | 'crc') => {
    console.log('User type selected:', userType);
    
    // Update state first
    setNavigationState(prev => ({
      ...prev,
      userType,
    }));

    // Then navigate after a small delay to ensure state is updated
    setTimeout(() => {
      if (userType === 'teacher') {
        navigateTo('teacherLogin');
      } else if (userType === 'crc') {
        navigateTo('crcLogin');
      }
    }, 100);
  };

  const handleLoginSuccess = (userType: 'teacher' | 'crc') => {
    console.log('Login successful for:', userType);
    
    setNavigationState(prev => ({
      ...prev,
      isAuthenticated: true,
    }));

    // Navigate to respective home screen after small delay
    setTimeout(() => {
      if (userType === 'teacher') {
        navigateTo('teacherHome');
      } else if (userType === 'crc') {
        navigateTo('crcHome');
      }
    }, 100);
  };

  const handleLogout = () => {
    console.log('Logging out...');
    setNavigationState({
      currentRoute: 'userSelection',
      userType: null,
      isAuthenticated: false,
    });
  };

  const goBack = () => {
    const { currentRoute } = navigationState;
    console.log('Going back from:', currentRoute);
    
    // Define back navigation logic
    switch (currentRoute) {
      case 'teacherLogin':
      case 'crcLogin':
        navigateTo('userSelection');
        break;
      
      case 'teacherHome':
      case 'crcHome':
        handleLogout();
        break;
      
      case 'photoUpload':
      case 'previousPhotos':
      case 'studentsData':
      case 'certificate':
        navigateTo('teacherHome');
        break;
      
      case 'schoolMonitoring':
      case 'teacherReports':
      case 'dataVerification':
      case 'progressTracking':
        navigateTo('crcHome');
        break;
      
      default:
        navigateTo('userSelection');
        break;
    }
  };

  // Screen renderer based on current route
  const renderCurrentScreen = () => {
    const { currentRoute } = navigationState;

    switch (currentRoute) {
      case 'userSelection':
        return (
          <UserTypeSelection 
            onSelectUserType={handleUserTypeSelection}
          />
        );

      case 'teacherLogin':
        return (
          <TeacherLoginScreen
            onBack={goBack}
            onLogin={() => handleLoginSuccess('teacher')}
          />
        );

      case 'crcLogin':
        return (
          <CRCLoginScreen
            onBack={goBack}
            onLogin={() => handleLoginSuccess('crc')}
          />
        );

      case 'teacherHome':
        return (
          <TeacherHomeScreen
            onBack={handleLogout}
            onNavigate={(screenName: string) => navigateTo(screenName as RouteNames)}
          />
        );

      case 'crcHome':
        return (
          <CRCHomeScreen
            onBack={handleLogout}
            onNavigate={(screenName: string) => navigateTo(screenName as RouteNames)}
          />
        );

      case 'photoUpload':
        return (
          <PhotoUploadScreen
            onBack={goBack}
          />
        );

      case 'previousPhotos':
        return (
          <PreviousPhotosScreen
            onBack={goBack}
          />
        );

      case 'studentsData':
        return (
          <StudentsDataScreen
            onBack={goBack}
          />
        );

      case 'certificate':
        return (
          <CertificateScreen
            onBack={goBack}
          />
        );

      case 'schoolMonitoring':
        return (
          <SchoolMonitoringScreen
            onBack={goBack}
          />
        );

      case 'teacherReports':
        return (
          <TeacherReportsScreen
            onBack={goBack}
          />
        );

      case 'dataVerification':
        return (
          <DataVerificationScreen
            onBack={goBack}
          />
        );

      case 'progressTracking':
        return (
          <ProgressTrackingScreen
            onBack={goBack}
          />
        );

      default:
        return (
          <UserTypeSelection 
            onSelectUserType={handleUserTypeSelection}
          />
        );
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {renderCurrentScreen()}
    </View>
  );
};

export default AppNavigator;
