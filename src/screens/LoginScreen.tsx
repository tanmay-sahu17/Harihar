import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');

interface LoginScreenProps {
  onBack?: () => void;
  onLogin?: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onBack, onLogin }) => {
  const [formData, setFormData] = useState({
    schoolCode: '',
    teacherName: '',
    phone: '',
    email: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleLogin = () => {
    if (!formData.schoolCode || !formData.teacherName || !formData.phone) {
      Alert.alert('त्रुटि', 'कृपया सभी आवश्यक फ़ील्ड भरें');
      return;
    }

    if (formData.phone.length !== 10) {
      Alert.alert('त्रुटि', 'कृपया सही मोबाइल नंबर डालें (10 अंक)');
      return;
    }

    if (onLogin) {
      onLogin();
    } else {
      Alert.alert(
        'सफल लॉगिन',
        `स्वागत है ${formData.teacherName}!\nस्कूल कोड: ${formData.schoolCode}`,
        [{ text: 'होम जाएं', onPress: () => console.log('Navigate to Home') }]
      );
    }
  };

  const schoolTypes = [
    'राजकीय प्राथमिक शाला',
    'राजकीय उच्च प्राथमिक शाला',
    'राजकीय माध्यमिक शाला',
    'राजकीय उच्चतर माध्यमिक शाला',
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {onBack && (
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Text style={styles.backButtonText}>← वापस</Text>
          </TouchableOpacity>
        )}
        <Text style={styles.logo}>🌱</Text>
        <Text style={styles.title}>एक पेड़ माँ के नाम 2.0</Text>
        <Text style={styles.subtitle}>रायपुर जिला इको क्लब पोर्टल</Text>
      </View>

      <ScrollView style={styles.formContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.welcomeCard}>
          <Text style={styles.welcomeTitle}>शिक्षक लॉगिन</Text>
          <Text style={styles.welcomeText}>
            कृपया अपने स्कूल की जानकारी भरें और इको क्लब में लॉगिन करें
          </Text>
        </View>

        {/* School Code */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>स्कूल कोड * (UDISE Code)</Text>
          <TextInput
            style={styles.input}
            placeholder="जैसे: 22010100101"
            value={formData.schoolCode}
            onChangeText={(value) => handleInputChange('schoolCode', value)}
            keyboardType="numeric"
            maxLength={11}
          />
        </View>

        {/* Teacher Name */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>शिक्षक का नाम *</Text>
          <TextInput
            style={styles.input}
            placeholder="पूरा नाम डालें"
            value={formData.teacherName}
            onChangeText={(value) => handleInputChange('teacherName', value)}
          />
        </View>

        {/* Phone Number */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>मोबाइल नंबर *</Text>
          <TextInput
            style={styles.input}
            placeholder="10 अंकों का नंबर"
            value={formData.phone}
            onChangeText={(value) => handleInputChange('phone', value)}
            keyboardType="phone-pad"
            maxLength={10}
          />
        </View>

        {/* Email (Optional) */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>ईमेल आईडी (वैकल्पिक)</Text>
          <TextInput
            style={styles.input}
            placeholder="teacher@example.com"
            value={formData.email}
            onChangeText={(value) => handleInputChange('email', value)}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* School Types Info */}
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>स्कूल प्रकार</Text>
          {schoolTypes.map((type, index) => (
            <View key={index} style={styles.infoItem}>
              <Text style={styles.infoBullet}>•</Text>
              <Text style={styles.infoText}>{type}</Text>
            </View>
          ))}
        </View>

        {/* Login Button */}
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>लॉगिन करें 🚀</Text>
        </TouchableOpacity>

        {/* Help Section */}
        <View style={styles.helpSection}>
          <Text style={styles.helpTitle}>सहायता चाहिए?</Text>
          
          <TouchableOpacity 
            style={styles.helpButton}
            onPress={() => Alert.alert('सहायता', 'UDISE कोड अपने स्कूल के प्रिंसिपल से पूछें')}
          >
            <Text style={styles.helpEmoji}>❓</Text>
            <Text style={styles.helpText}>UDISE कोड कैसे पता करें?</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.helpButton}
            onPress={() => Alert.alert('वीडियो सहायता', 'https://youtu.be/8Z7vLcJl7g8')}
          >
            <Text style={styles.helpEmoji}>🎥</Text>
            <Text style={styles.helpText}>सहायता वीडियो देखें</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.helpButton}
            onPress={() => Alert.alert('संपर्क', 'रायपुर जिला शिक्षा कार्यालय से संपर्क करें')}
          >
            <Text style={styles.helpEmoji}>📞</Text>
            <Text style={styles.helpText}>मदद के लिए कॉल करें</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            रायपुर जिला शिक्षा विभाग द्वारा संचालित
          </Text>
          <Text style={styles.footerSubText}>
            इको क्लब पोर्टल - छत्तीसगढ़ सरकार
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F5E8',
  },
  header: {
    backgroundColor: '#2E7D32',
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 70,
    left: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  backButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  logo: {
    fontSize: 50,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    opacity: 0.9,
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  welcomeCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  welcomeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 8,
    textAlign: 'center',
  },
  welcomeText: {
    fontSize: 14,
    color: '#4CAF50',
    textAlign: 'center',
    lineHeight: 20,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2E7D32',
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#C8E6C9',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#2E7D32',
  },
  infoCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    elevation: 2,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 12,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoBullet: {
    fontSize: 16,
    color: '#4CAF50',
    marginRight: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#4CAF50',
    flex: 1,
  },
  loginButton: {
    backgroundColor: '#2E7D32',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 30,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  loginButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  helpSection: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    elevation: 2,
  },
  helpTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 12,
  },
  helpButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: '#E8F5E8',
    borderRadius: 8,
    marginBottom: 8,
  },
  helpEmoji: {
    fontSize: 20,
    marginRight: 12,
  },
  helpText: {
    fontSize: 14,
    color: '#2E7D32',
    flex: 1,
  },
  footer: {
    alignItems: 'center',
    marginBottom: 30,
    paddingTop: 20,
  },
  footerText: {
    fontSize: 12,
    color: '#4CAF50',
    textAlign: 'center',
    marginBottom: 4,
  },
  footerSubText: {
    fontSize: 11,
    color: '#4CAF50',
    textAlign: 'center',
    opacity: 0.8,
  },
});

export default LoginScreen;
