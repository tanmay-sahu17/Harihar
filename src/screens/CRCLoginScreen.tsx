import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

interface CRCLoginScreenProps {
  onBack: () => void;
  onLogin: () => void;
}

const CRCLoginScreen: React.FC<CRCLoginScreenProps> = ({ onBack, onLogin }) => {
  const [formData, setFormData] = useState({
    crcId: '',
    name: '',
    phone: '',
    email: '',
    cluster: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleLogin = () => {
    if (!formData.crcId || !formData.name || !formData.phone || !formData.cluster) {
      Alert.alert('त्रुटि', 'कृपया सभी आवश्यक फ़ील्ड भरें');
      return;
    }

    if (formData.phone.length !== 10) {
      Alert.alert('त्रुटि', 'कृपया सही मोबाइल नंबर डालें (10 अंक)');
      return;
    }

    Alert.alert(
      'CRC लॉगिन सफल',
      `स्वागत है ${formData.name}!\nCRC ID: ${formData.crcId}\nक्लस्टर: ${formData.cluster}`,
      [{ text: 'डैशबोर्ड जाएं', onPress: onLogin }]
    );
  };

  const clusterExamples = [
    'रायपुर क्लस्टर-1 (10 स्कूल)',
    'रायपुर क्लस्टर-2 (8 स्कूल)',
    'रायपुर क्लस्टर-3 (12 स्कूल)',
    'रायपुर क्लस्टर-4 (9 स्कूल)',
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>← वापस</Text>
        </TouchableOpacity>
        <Text style={styles.logo}>👨‍💼</Text>
        <Text style={styles.title}>CRC लॉगिन</Text>
        <Text style={styles.subtitle}>Cluster Resource Coordinator</Text>
      </View>

      <ScrollView style={styles.formContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.welcomeCard}>
          <Text style={styles.welcomeTitle}>क्लस्टर रिसोर्स कोऑर्डिनेटर</Text>
          <Text style={styles.welcomeText}>
            अपने क्लस्टर के स्कूलों की निगरानी और रिपोर्टिंग के लिए लॉगिन करें
          </Text>
        </View>

        {/* CRC ID */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>CRC आईडी * (Employee ID)</Text>
          <TextInput
            style={styles.input}
            placeholder="जैसे: CRC/RAI/001"
            value={formData.crcId}
            onChangeText={(value) => handleInputChange('crcId', value)}
            autoCapitalize="characters"
          />
        </View>

        {/* Name */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>CRC का नाम *</Text>
          <TextInput
            style={styles.input}
            placeholder="पूरा नाम डालें"
            value={formData.name}
            onChangeText={(value) => handleInputChange('name', value)}
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

        {/* Email */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>ईमेल आईडी (वैकल्पिक)</Text>
          <TextInput
            style={styles.input}
            placeholder="crc@education.cg.gov.in"
            value={formData.email}
            onChangeText={(value) => handleInputChange('email', value)}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* Cluster */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>क्लस्टर का नाम *</Text>
          <TextInput
            style={styles.input}
            placeholder="जैसे: रायपुर क्लस्टर-1"
            value={formData.cluster}
            onChangeText={(value) => handleInputChange('cluster', value)}
          />
        </View>

        {/* Cluster Examples */}
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>क्लस्टर उदाहरण</Text>
          {clusterExamples.map((cluster, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.infoItem}
              onPress={() => handleInputChange('cluster', cluster.split(' (')[0])}
            >
              <Text style={styles.infoBullet}>•</Text>
              <Text style={styles.infoText}>{cluster}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Login Button */}
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>CRC डैशबोर्ड में जाएं 🚀</Text>
        </TouchableOpacity>

        {/* CRC Responsibilities */}
        <View style={styles.responsibilitiesCard}>
          <Text style={styles.responsibilitiesTitle}>📋 CRC की जिम्मेदारियां</Text>
          <View style={styles.responsibilityItem}>
            <Text style={styles.responsibilityIcon}>🏫</Text>
            <Text style={styles.responsibilityText}>क्लस्टर के सभी स्कूलों की मॉनिटरिंग</Text>
          </View>
          <View style={styles.responsibilityItem}>
            <Text style={styles.responsibilityIcon}>📊</Text>
            <Text style={styles.responsibilityText}>मासिक प्रगति रिपोर्ट तैयार करना</Text>
          </View>
          <View style={styles.responsibilityItem}>
            <Text style={styles.responsibilityIcon}>👨‍🏫</Text>
            <Text style={styles.responsibilityText}>शिक्षकों को तकनीकी सहायता प्रदान करना</Text>
          </View>
          <View style={styles.responsibilityItem}>
            <Text style={styles.responsibilityIcon}>📈</Text>
            <Text style={styles.responsibilityText}>फोटो अपलोड की प्रगति देखना</Text>
          </View>
        </View>

        {/* Help Section */}
        <View style={styles.helpSection}>
          <Text style={styles.helpTitle}>सहायता चाहिए?</Text>
          
          <TouchableOpacity 
            style={styles.helpButton}
            onPress={() => Alert.alert('सहायता', 'CRC ID अपने BEO से पूछें')}
          >
            <Text style={styles.helpEmoji}>❓</Text>
            <Text style={styles.helpText}>CRC ID कैसे पता करें?</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.helpButton}
            onPress={() => Alert.alert('वीडियो सहायता', 'CRC के लिए विशेष प्रशिक्षण वीडियो')}
          >
            <Text style={styles.helpEmoji}>🎥</Text>
            <Text style={styles.helpText}>CRC प्रशिक्षण वीडियो</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.helpButton}
            onPress={() => Alert.alert('संपर्क', 'BEO कार्यालय से संपर्क करें')}
          >
            <Text style={styles.helpEmoji}>📞</Text>
            <Text style={styles.helpText}>BEO से संपर्क करें</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            रायपुर जिला शिक्षा विभाग द्वारा संचालित
          </Text>
          <Text style={styles.footerSubText}>
            CRC पोर्टल - छत्तीसगढ़ सरकार
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E3F2FD',
  },
  header: {
    backgroundColor: '#1976D2',
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
  },
  welcomeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1976D2',
    marginBottom: 8,
    textAlign: 'center',
  },
  welcomeText: {
    fontSize: 14,
    color: '#1565C0',
    textAlign: 'center',
    lineHeight: 20,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1976D2',
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#BBDEFB',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#1976D2',
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
    color: '#1976D2',
    marginBottom: 12,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    paddingVertical: 4,
  },
  infoBullet: {
    fontSize: 16,
    color: '#1565C0',
    marginRight: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#1565C0',
    flex: 1,
  },
  loginButton: {
    backgroundColor: '#1976D2',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 30,
    elevation: 4,
  },
  loginButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  responsibilitiesCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    elevation: 2,
  },
  responsibilitiesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1976D2',
    marginBottom: 12,
  },
  responsibilityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingVertical: 4,
  },
  responsibilityIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  responsibilityText: {
    fontSize: 14,
    color: '#1565C0',
    flex: 1,
    lineHeight: 18,
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
    color: '#1976D2',
    marginBottom: 12,
  },
  helpButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: '#E3F2FD',
    borderRadius: 8,
    marginBottom: 8,
  },
  helpEmoji: {
    fontSize: 20,
    marginRight: 12,
  },
  helpText: {
    fontSize: 14,
    color: '#1976D2',
    flex: 1,
  },
  footer: {
    alignItems: 'center',
    marginBottom: 30,
    paddingTop: 20,
  },
  footerText: {
    fontSize: 12,
    color: '#1565C0',
    textAlign: 'center',
    marginBottom: 4,
  },
  footerSubText: {
    fontSize: 11,
    color: '#1565C0',
    textAlign: 'center',
    opacity: 0.8,
  },
});

export default CRCLoginScreen;
