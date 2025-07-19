import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';

interface UserTypeSelectionProps {
  onSelectUserType: (userType: 'teacher' | 'crc' | 'beo' | 'deo') => void;
}

const UserTypeSelection: React.FC<UserTypeSelectionProps> = ({ onSelectUserType }) => {
  const loginOptions = [
    {
      id: 'teacher',
      title: 'शिक्षक लॉगिन',
      subtitle: 'Teacher Login Portal',
      description: 'पेड़ लगाने वाले शिक्षकों के लिए',
      icon: '👨‍🏫',
      bgColor: '#4CAF50',
      lightColor: '#E8F5E8',
    },
    {
      id: 'crc',
      title: 'CRC लॉगिन',
      subtitle: 'Cluster Resource Coordinator',
      description: 'क्लस्टर निगरानी अधिकारी',
      icon: '👨‍💼',
      bgColor: '#2196F3',
      lightColor: '#E3F2FD',
    },
    {
      id: 'beo',
      title: 'BEO लॉगिन',
      subtitle: 'Block Education Officer',
      description: 'ब्लॉक शिक्षा अधिकारी',
      icon: '👨‍💻',
      bgColor: '#9C27B0',
      lightColor: '#F3E5F5',
    },
    {
      id: 'deo',
      title: 'DEO लॉगिन',
      subtitle: 'District Education Officer',
      description: 'जिला शिक्षा अधिकारी',
      icon: '🏛️',
      bgColor: '#FF5722',
      lightColor: '#FFF3E0',
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Section */}
      <View style={styles.headerSection}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoEmoji}>🌳</Text>
          <Text style={styles.appTitle}>एक पेड़ माँ के नाम 2.0</Text>
          <Text style={styles.appSubtitle}>रायपुर जिला शिक्षा पोर्टल</Text>
          <View style={styles.divider} />
          <Text style={styles.loginPrompt}>
            🚪 अपने रोल के अनुसार लॉगिन करें
          </Text>
        </View>
      </View>

      {/* Login Options */}
      <ScrollView style={styles.optionsContainer} showsVerticalScrollIndicator={false}>
        {loginOptions.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={[styles.loginCard, { backgroundColor: option.lightColor }]}
            onPress={() => onSelectUserType(option.id as 'teacher' | 'crc' | 'beo' | 'deo')}
            activeOpacity={0.8}
          >
            <View style={styles.cardContent}>
              {/* Icon and Title */}
              <View style={styles.cardHeader}>
                <View style={[styles.iconContainer, { backgroundColor: option.bgColor }]}>
                  <Text style={styles.cardIcon}>{option.icon}</Text>
                </View>
                <View style={styles.titleContainer}>
                  <Text style={[styles.cardTitle, { color: option.bgColor }]}>{option.title}</Text>
                  <Text style={styles.cardSubtitle}>{option.subtitle}</Text>
                </View>
                <View style={[styles.arrowContainer, { backgroundColor: option.bgColor }]}>
                  <Text style={styles.arrow}>→</Text>
                </View>
              </View>

              {/* Description */}
              <Text style={styles.cardDescription}>{option.description}</Text>
            </View>
          </TouchableOpacity>
        ))}

        {/* Info Section */}
        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>📝 महत्वपूर्ण जानकारी</Text>
          <View style={styles.infoItem}>
            <Text style={styles.infoBullet}>•</Text>
            <Text style={styles.infoText}>सभी यूजर अपने-अपने अधिकार क्षेत्र के अनुसार लॉगिन करें</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoBullet}>•</Text>
            <Text style={styles.infoText}>गलत लॉगिन करने पर सही डैशबोर्ड नहीं मिलेगा</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoBullet}>•</Text>
            <Text style={styles.infoText}>अगर कोई समस्या हो तो अपने senior से संपर्क करें</Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>छत्तीसगढ़ सरकार - शिक्षा विभाग</Text>
          <Text style={styles.footerSubText}>डिजिटल इंडिया पहल 🇮🇳</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  headerSection: {
    backgroundColor: '#2E7D32',
    paddingVertical: 40,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 8,
  },
  logoContainer: {
    alignItems: 'center',
    paddingTop: 20,
  },
  logoEmoji: {
    fontSize: 60,
    marginBottom: 10,
  },
  appTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 8,
  },
  appSubtitle: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    opacity: 0.9,
    marginBottom: 20,
  },
  divider: {
    width: 60,
    height: 3,
    backgroundColor: 'white',
    marginBottom: 20,
    borderRadius: 2,
  },
  loginPrompt: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
  },
  optionsContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  loginCard: {
    borderRadius: 16,
    marginBottom: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardContent: {
    padding: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  cardIcon: {
    fontSize: 24,
  },
  titleContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#666',
  },
  arrowContainer: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrow: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  cardDescription: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
    textAlign: 'center',
  },
  infoSection: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    elevation: 2,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 12,
    textAlign: 'center',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  infoBullet: {
    fontSize: 16,
    color: '#2E7D32',
    marginRight: 8,
    marginTop: 2,
  },
  infoText: {
    fontSize: 14,
    color: '#444',
    flex: 1,
    lineHeight: 20,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 30,
    marginBottom: 20,
  },
  footerText: {
    fontSize: 14,
    color: '#2E7D32',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  footerSubText: {
    fontSize: 12,
    color: '#666',
  },
});

export default UserTypeSelection;
