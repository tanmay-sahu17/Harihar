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

interface BEOLoginScreenProps {
  onBack: () => void;
  onLogin: () => void;
}

const BEOLoginScreen: React.FC<BEOLoginScreenProps> = ({ onBack, onLogin }) => {
  const [formData, setFormData] = useState({
    beoId: '',
    name: '',
    phone: '',
    email: '',
    block: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleLogin = () => {
    if (!formData.beoId || !formData.name || !formData.phone || !formData.block) {
      Alert.alert('त्रुटि', 'कृपया सभी आवश्यक फ़ील्ड भरें');
      return;
    }

    if (formData.phone.length !== 10) {
      Alert.alert('त्रुटि', 'कृपया सही मोबाइल नंबर डालें (10 अंक)');
      return;
    }

    Alert.alert(
      'BEO लॉगिन सफल',
      `स्वागत है ${formData.name}!\nBEO ID: ${formData.beoId}\nब्लॉक: ${formData.block}`,
      [{ text: 'डैशबोर्ड जाएं', onPress: onLogin }]
    );
  };

  const blockExamples = [
    'रायपुर ब्लॉक-1 (4 क्लस्टर, 45 स्कूल)',
    'रायपुर ब्लॉक-2 (3 क्लस्टर, 38 स्कूल)',
    'धरसीवा ब्लॉक (5 क्लस्टर, 52 स्कूल)',
    'तिल्दा ब्लॉक (3 क्लस्टर, 41 स्कूल)',
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>← वापस</Text>
        </TouchableOpacity>
        <Text style={styles.logo}>👨‍💻</Text>
        <Text style={styles.title}>BEO लॉगिन</Text>
        <Text style={styles.subtitle}>Block Education Officer</Text>
      </View>

      <ScrollView style={styles.formContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.welcomeCard}>
          <Text style={styles.welcomeTitle}>ब्लॉक एजुकेशन ऑफिसर</Text>
          <Text style={styles.welcomeText}>
            अपने ब्लॉक के सभी CRC और स्कूलों की निगरानी के लिए लॉगिन करें
          </Text>
        </View>

        {/* BEO ID */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>BEO आईडी * (Officer ID)</Text>
          <TextInput
            style={styles.input}
            placeholder="जैसे: BEO/RAI/001"
            value={formData.beoId}
            onChangeText={(value) => handleInputChange('beoId', value)}
            autoCapitalize="characters"
          />
        </View>

        {/* Name */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>BEO का नाम *</Text>
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
            placeholder="beo@education.cg.gov.in"
            value={formData.email}
            onChangeText={(value) => handleInputChange('email', value)}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* Block */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>ब्लॉक का नाम *</Text>
          <TextInput
            style={styles.input}
            placeholder="जैसे: रायपुर ब्लॉक-1"
            value={formData.block}
            onChangeText={(value) => handleInputChange('block', value)}
          />
        </View>

        {/* Block Examples */}
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>ब्लॉक उदाहरण</Text>
          {blockExamples.map((block, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.infoItem}
              onPress={() => handleInputChange('block', block.split(' (')[0])}
            >
              <Text style={styles.infoBullet}>•</Text>
              <Text style={styles.infoText}>{block}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Login Button */}
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>BEO डैशबोर्ड में जाएं 🚀</Text>
        </TouchableOpacity>

        {/* BEO Responsibilities */}
        <View style={styles.responsibilitiesCard}>
          <Text style={styles.responsibilitiesTitle}>📋 BEO की जिम्मेदारियां</Text>
          <View style={styles.responsibilityItem}>
            <Text style={styles.responsibilityIcon}>🏛️</Text>
            <Text style={styles.responsibilityText}>पूरे ब्लॉक की शैक्षणिक गतिविधियों की निगरानी</Text>
          </View>
          <View style={styles.responsibilityItem}>
            <Text style={styles.responsibilityIcon}>👨‍💼</Text>
            <Text style={styles.responsibilityText}>सभी CRC की कार्यप्रणाली देखना</Text>
          </View>
          <View style={styles.responsibilityItem}>
            <Text style={styles.responsibilityIcon}>📊</Text>
            <Text style={styles.responsibilityText}>ब्लॉक स्तरीय रिपोर्ट्स तैयार करना</Text>
          </View>
          <View style={styles.responsibilityItem}>
            <Text style={styles.responsibilityIcon}>📈</Text>
            <Text style={styles.responsibilityText}>ब्लॉक की समग्र प्रगति की समीक्षा</Text>
          </View>
          <View style={styles.responsibilityItem}>
            <Text style={styles.responsibilityIcon}>🎯</Text>
            <Text style={styles.responsibilityText}>लक्ष्य निर्धारण और अनुवर्तन</Text>
          </View>
        </View>

        {/* Block Statistics */}
        <View style={styles.statsCard}>
          <Text style={styles.statsTitle}>📈 ब्लॉक सांख्यिकी (उदाहरण)</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>15</Text>
              <Text style={styles.statLabel}>कुल क्लस्टर</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>176</Text>
              <Text style={styles.statLabel}>कुल स्कूल</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>15</Text>
              <Text style={styles.statLabel}>CRC</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>68%</Text>
              <Text style={styles.statLabel}>प्रगति</Text>
            </View>
          </View>
        </View>

        {/* Help Section */}
        <View style={styles.helpSection}>
          <Text style={styles.helpTitle}>सहायता चाहिए?</Text>
          
          <TouchableOpacity 
            style={styles.helpButton}
            onPress={() => Alert.alert('सहायता', 'BEO ID अपने DEO से पूछें')}
          >
            <Text style={styles.helpEmoji}>❓</Text>
            <Text style={styles.helpText}>BEO ID कैसे पता करें?</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.helpButton}
            onPress={() => Alert.alert('वीडियो सहायता', 'BEO के लिए विशेष प्रशिक्षण वीडियो')}
          >
            <Text style={styles.helpEmoji}>🎥</Text>
            <Text style={styles.helpText}>BEO प्रशिक्षण वीडियो</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.helpButton}
            onPress={() => Alert.alert('संपर्क', 'DEO कार्यालय से संपर्क करें')}
          >
            <Text style={styles.helpEmoji}>📞</Text>
            <Text style={styles.helpText}>DEO से संपर्क करें</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            रायपुर जिला शिक्षा विभाग द्वारा संचालित
          </Text>
          <Text style={styles.footerSubText}>
            BEO पोर्टल - छत्तीसगढ़ सरकार
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3E5F5',
  },
  header: {
    backgroundColor: '#7B1FA2',
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
    color: '#7B1FA2',
    marginBottom: 8,
    textAlign: 'center',
  },
  welcomeText: {
    fontSize: 14,
    color: '#6A1B9A',
    textAlign: 'center',
    lineHeight: 20,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#7B1FA2',
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#CE93D8',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#7B1FA2',
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
    color: '#7B1FA2',
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
    color: '#6A1B9A',
    marginRight: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#6A1B9A',
    flex: 1,
  },
  loginButton: {
    backgroundColor: '#7B1FA2',
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
    color: '#7B1FA2',
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
    color: '#6A1B9A',
    flex: 1,
    lineHeight: 18,
  },
  statsCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    elevation: 2,
  },
  statsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#7B1FA2',
    marginBottom: 16,
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#7B1FA2',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    color: '#6A1B9A',
    textAlign: 'center',
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
    color: '#7B1FA2',
    marginBottom: 12,
  },
  helpButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: '#F3E5F5',
    borderRadius: 8,
    marginBottom: 8,
  },
  helpEmoji: {
    fontSize: 20,
    marginRight: 12,
  },
  helpText: {
    fontSize: 14,
    color: '#7B1FA2',
    flex: 1,
  },
  footer: {
    alignItems: 'center',
    marginBottom: 30,
    paddingTop: 20,
  },
  footerText: {
    fontSize: 12,
    color: '#6A1B9A',
    textAlign: 'center',
    marginBottom: 4,
  },
  footerSubText: {
    fontSize: 11,
    color: '#6A1B9A',
    textAlign: 'center',
    opacity: 0.8,
  },
});

export default BEOLoginScreen;
