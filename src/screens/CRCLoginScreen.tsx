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

interface CRCLoginScreenProps {
  onBack: () => void;
  onLogin: () => void;
}

const CRCLoginScreen: React.FC<CRCLoginScreenProps> = ({ onBack, onLogin }) => {
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!username.trim() || !phoneNumber.trim() || !password.trim()) {
      Alert.alert('त्रुटि', 'कृपया सभी फील्ड भरें');
      return;
    }

    if (phoneNumber.length !== 10) {
      Alert.alert('त्रुटि', 'कृपया सही मोबाइल नंबर दर्ज करें');
      return;
    }

    // Accept any username, phone and password for supervisor login
    onLogin();
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
          <Text style={styles.logoEmoji}></Text>
          <Text style={styles.loginTitle}>सुपरवाइजर लॉगिन</Text>
          <Text style={styles.loginSubtitle}>एक पेड़ माँ के नाम 2.0</Text>
        </View>

        <View style={styles.loginForm}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>उपयोगकर्ता नाम</Text>
            <TextInput
              style={styles.input}
              value={username}
              onChangeText={setUsername}
              placeholder="अपना उपयोगकर्ता नाम दर्ज करें"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>मोबाइल नंबर</Text>
            <TextInput
              style={styles.input}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              placeholder="10 अंकों का मोबाइल नंबर"
              keyboardType="phone-pad"
              maxLength={10}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>पासवर्ड</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="अपना पासवर्ड दर्ज करें"
              secureTextEntry
            />
          </View>

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>लॉगिन करें</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F8FF',
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
    backgroundColor: '#2196F3',
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
  logoEmoji: {
    fontSize: 60,
    marginBottom: 15,
  },
  loginTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1565C0',
    textAlign: 'center',
    marginBottom: 10,
  },
  loginSubtitle: {
    fontSize: 16,
    color: '#2196F3',
    textAlign: 'center',
  },
  loginForm: {
    backgroundColor: 'white',
    padding: 25,
    borderRadius: 15,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#BBDEFB',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1565C0',
    marginBottom: 8,
  },
  input: {
    borderWidth: 2,
    borderColor: '#BBDEFB',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#F8FBFF',
  },
  loginButton: {
    backgroundColor: '#2196F3',
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
    backgroundColor: '#E3F2FD',
    borderRadius: 8,
  },
  hintText: {
    fontSize: 12,
    color: '#1565C0',
    textAlign: 'center',
    marginBottom: 2,
  },
});

export default CRCLoginScreen;
