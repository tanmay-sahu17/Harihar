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

interface TeacherLoginScreenProps {
  onBack: () => void;
  onLogin: () => void;
}

const TeacherLoginScreen: React.FC<TeacherLoginScreenProps> = ({ onBack, onLogin }) => {
  const [udiseId, setUdiseId] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [teacherName, setTeacherName] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);

  const handleSendOtp = () => {
    if (!udiseId.trim() || !phoneNumber.trim() || !teacherName.trim()) {
      Alert.alert('त्रुटि', 'कृपया सभी फील्ड भरें');
      return;
    }

    if (phoneNumber.length !== 10) {
      Alert.alert('त्रुटि', 'कृपया सही मोबाइल नंबर दर्ज करें');
      return;
    }

    // For demo purposes, simulate OTP sending
    Alert.alert('सफलता', 'OTP आपके मोबाइल नंबर पर भेजा गया है');
    setIsOtpSent(true);
  };

  const handleLogin = () => {
    if (!isOtpSent) {
      handleSendOtp();
      return;
    }

    if (!otp.trim()) {
      Alert.alert('त्रुटि', 'कृपया OTP दर्ज करें');
      return;
    }

    // Simple validation for teacher (demo OTP: 1234)
    if (otp === '1234') {
      onLogin();
    } else {
      Alert.alert('त्रुटि', 'गलत OTP दर्ज किया गया');
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
          <Text style={styles.logoEmoji}>👨‍🏫</Text>
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
              placeholder="स्कूल का UDISE ID दर्ज करें"
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>शिक्षक का नाम</Text>
            <TextInput
              style={styles.input}
              value={teacherName}
              onChangeText={setTeacherName}
              placeholder="अपना पूरा नाम दर्ज करें"
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

          {isOtpSent && (
            <View style={styles.inputGroup}>
              <Text style={styles.label}>OTP</Text>
              <TextInput
                style={styles.input}
                value={otp}
                onChangeText={setOtp}
                placeholder="4 अंकों का OTP दर्ज करें"
                keyboardType="numeric"
                maxLength={4}
              />
            </View>
          )}

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>
              {isOtpSent ? 'लॉगिन करें' : 'OTP भेजें'}
            </Text>
          </TouchableOpacity>

          <View style={styles.credentialsHint}>
            <Text style={styles.hintText}>डेमो जानकारी:</Text>
            <Text style={styles.hintText}>UDISE ID: कोई भी</Text>
            <Text style={styles.hintText}>नाम: कोई भी</Text>
            <Text style={styles.hintText}>फोन: कोई 10 अंक</Text>
            <Text style={styles.hintText}>OTP: 1234</Text>
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
  logoEmoji: {
    fontSize: 60,
    marginBottom: 15,
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
