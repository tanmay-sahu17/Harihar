import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import api from '../utils/api';

interface TeacherLoginScreenProps {
  onBack: () => void;
  onLogin: () => void;
}

const TeacherLoginScreen: React.FC<TeacherLoginScreenProps> = ({ onBack, onLogin }) => {
  const [udiseId, setUdiseId] = useState('');
  const [teacherName, setTeacherName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('लॉगिन हो रहा है...');

  const handleLogin = async () => {
    if (!udiseId.trim() || !teacherName.trim() || !password.trim()) {
      Alert.alert('त्रुटि', 'कृपया सभी फील्ड भरें');
      return;
    }

    setIsLoading(true);
    setLoadingMessage('Credentials verify हो रहे हैं...');
    
    try {
      // Use API for login with credential validation
      const result = await api.auth.teacherLogin(udiseId, teacherName, password);
      
      if (result.success) {
        setLoadingMessage('लॉगिन सफल!');
        
        // Show success message briefly then navigate
        setTimeout(() => {
          onLogin();
        }, 500);
      } else {
        // Credentials not found in database - show proper error
        Alert.alert(
          'लॉगिन असफल', 
          'गलत UDISE कोड, शिक्षक नाम या पासवर्ड। कृपया सही जानकारी डालें।\n\nValid credentials के लिए valid_login_credentials.md file देखें।'
        );
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('त्रुटि', 'लॉगिन में समस्या हुई। कृपया पुनः प्रयास करें।');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>← वापस</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.loginContent}>
        <View style={styles.logoSection}>
          <Text style={styles.loginTitle}>शिक्षक लॉगिन</Text>
          <Text style={styles.loginSubtitle}>एक पेड़ माँ के नाम 2.0</Text>
        </View>

        <View style={styles.loginForm}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>UDISE ID</Text>
            <TextInput
              style={styles.input}
              value={udiseId}
              onChangeText={setUdiseId}
              placeholder="स्कूल का UDISE ID"
              keyboardType="default"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>शिक्षक का नाम</Text>
            <TextInput
              style={styles.input}
              value={teacherName}
              onChangeText={setTeacherName}
              placeholder="पूरा नाम"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>पासवर्ड</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="पासवर्ड"
              secureTextEntry
            />
          </View>

          <TouchableOpacity 
            style={[styles.loginButton, isLoading && { opacity: 0.7 }]} 
            onPress={handleLogin}
            disabled={isLoading}
          >
            <Text style={styles.loginButtonText}>
              {isLoading ? loadingMessage : 'लॉगिन'}
            </Text>
          </TouchableOpacity>

          <View style={styles.credentialsHint}>
            <Text style={styles.hintText}>डेमो जानकारी:</Text>
            <Text style={styles.hintText}>UDISE ID: 123</Text>
            <Text style={styles.hintText}>नाम: teacher</Text>
            <Text style={styles.hintText}>पासवर्ड: 123</Text>
            <Text style={styles.hintText}>या</Text>
            <Text style={styles.hintText}>UDISE ID: 456</Text>
            <Text style={styles.hintText}>नाम: admin</Text>
            <Text style={styles.hintText}>पासवर्ड: 456</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F5E8',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  backButton: {
    alignSelf: 'flex-start',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 25,
    backgroundColor: '#4CAF50',
  },
  backButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  loginContent: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  loginTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2E7D32',
    textAlign: 'center',
    marginBottom: 10,
  },
  loginSubtitle: {
    fontSize: 16,
    color: '#4CAF50',
    textAlign: 'center',
  },
  loginForm: {
    backgroundColor: 'white',
    padding: 25,
    borderRadius: 15,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#C8E6C9',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 8,
  },
  input: {
    borderWidth: 2,
    borderColor: '#C8E6C9',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#F1F8E9',
  },
  loginButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  credentialsHint: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#E8F5E8',
    borderRadius: 8,
  },
  hintText: {
    fontSize: 12,
    color: '#2E7D32',
    textAlign: 'center',
    marginBottom: 2,
  },
});

export default TeacherLoginScreen;
