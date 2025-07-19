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

interface DEOLoginScreenProps {
  onBack: () => void;
  onLogin: () => void;
}

const DEOLoginScreen: React.FC<DEOLoginScreenProps> = ({ onBack, onLogin }) => {
  const [formData, setFormData] = useState({
    deoId: '',
    name: '',
    phone: '',
    email: '',
    district: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleLogin = () => {
    if (!formData.deoId || !formData.name || !formData.phone || !formData.district) {
      Alert.alert('त्रुटि', 'कृपया सभी आवश्यक फ़ील्ड भरें');
      return;
    }

    if (formData.phone.length !== 10) {
      Alert.alert('त्रुटि', 'कृपया सही मोबाइल नंबर डालें (10 अंक)');
      return;
    }

    Alert.alert(
      'DEO लॉगिन सफल',
      `स्वागत है ${formData.name}!\nDEO ID: ${formData.deoId}\nजिला: ${formData.district}`,
      [{ text: 'कंट्रोल सेंटर जाएं', onPress: onLogin }]
    );
  };

  const districtData = [
    'रायपुर जिला (85 ब्लॉक, 350+ स्कूल)',
    'महासमुंद जिला (65 ब्लॉक, 280+ स्कूल)',
    'धमतरी जिला (45 ब्लॉक, 220+ स्कूल)',
    'बिलासपुर जिला (120 ब्लॉक, 500+ स्कूल)',
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>← वापस</Text>
        </TouchableOpacity>
        <Text style={styles.logo}>🏛️</Text>
        <Text style={styles.title}>DEO लॉगिन</Text>
        <Text style={styles.subtitle}>District Education Officer</Text>
      </View>

      <ScrollView style={styles.formContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.welcomeCard}>
          <Text style={styles.welcomeTitle}>जिला शिक्षा अधिकारी</Text>
          <Text style={styles.welcomeText}>
            पूरे जिले की शैक्षणिक गतिविधियों की निगरानी के लिए DEO डैशबोर्ड में जाएं
          </Text>
        </View>

        {/* DEO ID */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>DEO आईडी * (Officer ID)</Text>
          <TextInput
            style={styles.input}
            placeholder="जैसे: DEO/RAI/2024"
            value={formData.deoId}
            onChangeText={(value) => handleInputChange('deoId', value)}
            autoCapitalize="characters"
          />
        </View>

        {/* Name */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>DEO का नाम *</Text>
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
            placeholder="deo@education.cg.gov.in"
            value={formData.email}
            onChangeText={(value) => handleInputChange('email', value)}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* District */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>जिला का नाम *</Text>
          <TextInput
            style={styles.input}
            placeholder="जैसे: रायपुर"
            value={formData.district}
            onChangeText={(value) => handleInputChange('district', value)}
          />
        </View>

        {/* District Examples */}
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>जिला उदाहरण</Text>
          {districtData.map((district, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.infoItem}
              onPress={() => handleInputChange('district', district.split(' (')[0])}
            >
              <Text style={styles.infoBullet}>•</Text>
              <Text style={styles.infoText}>{district}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Login Button */}
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>DEO कंट्रोल सेंटर में जाएं 🏛️</Text>
        </TouchableOpacity>

        {/* DEO Powers */}
        <View style={styles.powersCard}>
          <Text style={styles.powersTitle}>⚡ DEO के विशेष अधिकार</Text>
          <View style={styles.powerItem}>
            <Text style={styles.powerIcon}>📊</Text>
            <Text style={styles.powerText}>पूरे जिले की रियल-टाइम रिपोर्ट्स</Text>
          </View>
          <View style={styles.powerItem}>
            <Text style={styles.powerIcon}>🎯</Text>
            <Text style={styles.powerText}>जिला स्तरीय लक्ष्य निर्धारण</Text>
          </View>
          <View style={styles.powerItem}>
            <Text style={styles.powerIcon}>📈</Text>
            <Text style={styles.powerText}>सभी ब्लॉक्स की प्रगति ट्रैकिंग</Text>
          </View>
          <View style={styles.powerItem}>
            <Text style={styles.powerIcon}>🏆</Text>
            <Text style={styles.powerText}>बेस्ट परफॉर्मर की पहचान</Text>
          </View>
          <View style={styles.powerItem}>
            <Text style={styles.powerIcon}>📝</Text>
            <Text style={styles.powerText}>राज्य सरकार को रिपोर्टिंग</Text>
          </View>
          <View style={styles.powerItem}>
            <Text style={styles.powerIcon}>🎖️</Text>
            <Text style={styles.powerText}>अवार्ड और सम्मान वितरण</Text>
          </View>
        </View>

        {/* District Dashboard Preview */}
        <View style={styles.dashboardCard}>
          <Text style={styles.dashboardTitle}>🖥️ DEO डैशबोर्ड प्रीव्यू</Text>
          <View style={styles.dashboardGrid}>
            <View style={styles.dashboardItem}>
              <Text style={styles.dashboardNumber}>85</Text>
              <Text style={styles.dashboardLabel}>कुल ब्लॉक</Text>
              <Text style={styles.dashboardIcon}>🏢</Text>
            </View>
            <View style={styles.dashboardItem}>
              <Text style={styles.dashboardNumber}>1,350</Text>
              <Text style={styles.dashboardLabel}>कुल स्कूल</Text>
              <Text style={styles.dashboardIcon}>🏫</Text>
            </View>
            <View style={styles.dashboardItem}>
              <Text style={styles.dashboardNumber}>850</Text>
              <Text style={styles.dashboardLabel}>कुल टीचर</Text>
              <Text style={styles.dashboardIcon}>👨‍🏫</Text>
            </View>
            <View style={styles.dashboardItem}>
              <Text style={styles.dashboardNumber}>75%</Text>
              <Text style={styles.dashboardLabel}>लक्ष्य पूर्ति</Text>
              <Text style={styles.dashboardIcon}>🎯</Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.actionsCard}>
          <Text style={styles.actionsTitle}>⚡ त्वरित कार्य</Text>
          
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => Alert.alert('रिपोर्ट', 'जिला स्तरीय मासिक रिपोर्ट जनरेट हो रही है')}
          >
            <Text style={styles.actionEmoji}>📊</Text>
            <Text style={styles.actionText}>मासिक जिला रिपोर्ट</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => Alert.alert('ब्लॉक रैंकिंग', 'सभी ब्लॉक्स की परफॉर्मेंस रैंकिंग')}
          >
            <Text style={styles.actionEmoji}>🏆</Text>
            <Text style={styles.actionText}>ब्लॉक रैंकिंग देखें</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => Alert.alert('वीडियो कॉन्फ्रेंस', 'सभी BEO के साथ मीटिंग शेड्यूल करें')}
          >
            <Text style={styles.actionEmoji}>📹</Text>
            <Text style={styles.actionText}>BEO मीटिंग शेड्यूल करें</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => Alert.alert('लाइव ट्रैकिंग', 'सभी स्कूलों की लाइव अपडेट्स')}
          >
            <Text style={styles.actionEmoji}>🔴</Text>
            <Text style={styles.actionText}>लाइव स्कूल ट्रैकिंग</Text>
          </TouchableOpacity>
        </View>

        {/* Contact Information */}
        <View style={styles.contactCard}>
          <Text style={styles.contactTitle}>📞 संपर्क सूत्र</Text>
          <View style={styles.contactItem}>
            <Text style={styles.contactIcon}>🏛️</Text>
            <View>
              <Text style={styles.contactText}>राज्य शिक्षा विभाग</Text>
              <Text style={styles.contactSubText}>0771-2234567</Text>
            </View>
          </View>
          <View style={styles.contactItem}>
            <Text style={styles.contactIcon}>💻</Text>
            <View>
              <Text style={styles.contactText}>टेक्निकल सपोर्ट</Text>
              <Text style={styles.contactSubText}>support@edu.cg.gov.in</Text>
            </View>
          </View>
          <View style={styles.contactItem}>
            <Text style={styles.contactIcon}>🆘</Text>
            <View>
              <Text style={styles.contactText}>इमरजेंसी हेल्पलाइन</Text>
              <Text style={styles.contactSubText}>1800-123-4567</Text>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            छत्तीसगढ़ राज्य शिक्षा विभाग
          </Text>
          <Text style={styles.footerSubText}>
            DEO कंट्रोल सेंटर - डिजिटल इंडिया पहल
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF3E0',
  },
  header: {
    backgroundColor: '#E65100',
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
    color: '#E65100',
    marginBottom: 8,
    textAlign: 'center',
  },
  welcomeText: {
    fontSize: 14,
    color: '#D84315',
    textAlign: 'center',
    lineHeight: 20,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#E65100',
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#FFB74D',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#E65100',
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
    color: '#E65100',
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
    color: '#D84315',
    marginRight: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#D84315',
    flex: 1,
  },
  loginButton: {
    backgroundColor: '#E65100',
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
  powersCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    elevation: 2,
  },
  powersTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E65100',
    marginBottom: 12,
  },
  powerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingVertical: 4,
  },
  powerIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  powerText: {
    fontSize: 14,
    color: '#D84315',
    flex: 1,
    lineHeight: 18,
  },
  dashboardCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    elevation: 2,
  },
  dashboardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E65100',
    marginBottom: 16,
    textAlign: 'center',
  },
  dashboardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  dashboardItem: {
    width: '48%',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#FFF3E0',
    padding: 12,
    borderRadius: 8,
  },
  dashboardNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#E65100',
    marginBottom: 4,
  },
  dashboardLabel: {
    fontSize: 11,
    color: '#D84315',
    textAlign: 'center',
    marginBottom: 4,
  },
  dashboardIcon: {
    fontSize: 16,
  },
  actionsCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    elevation: 2,
  },
  actionsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E65100',
    marginBottom: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: '#FFF3E0',
    borderRadius: 8,
    marginBottom: 8,
  },
  actionEmoji: {
    fontSize: 20,
    marginRight: 12,
  },
  actionText: {
    fontSize: 14,
    color: '#E65100',
    flex: 1,
  },
  contactCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    elevation: 2,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E65100',
    marginBottom: 12,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingVertical: 4,
  },
  contactIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  contactText: {
    fontSize: 14,
    color: '#E65100',
    fontWeight: '600',
  },
  contactSubText: {
    fontSize: 12,
    color: '#D84315',
  },
  footer: {
    alignItems: 'center',
    marginBottom: 30,
    paddingTop: 20,
  },
  footerText: {
    fontSize: 12,
    color: '#D84315',
    textAlign: 'center',
    marginBottom: 4,
  },
  footerSubText: {
    fontSize: 11,
    color: '#D84315',
    textAlign: 'center',
    opacity: 0.8,
  },
});

export default DEOLoginScreen;
