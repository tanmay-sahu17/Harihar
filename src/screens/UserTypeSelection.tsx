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
  onSelectUserType: (userType: 'teacher' | 'crc') => void;
}

const UserTypeSelection: React.FC<UserTypeSelectionProps> = ({ onSelectUserType }) => {
  const loginOptions = [
    {
      id: 'teacher',
      title: 'शिक्षक लॉगिन',
      subtitle: 'Teacher Login Portal',
      description: 'पेड़ लगाने वाले शिक्षकों के लिए',
      bgColor: '#4CAF50',
      lightColor: '#E8F5E8',
    },
    {
      id: 'crc',
      title: 'सुपरवाइजर लॉगिन',
      subtitle: 'Supervisor Login Portal',
      description: 'स्कूल निगरानी अधिकारी',
      bgColor: '#2196F3',
      lightColor: '#E3F2FD',
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header Section */}
        <View style={styles.headerSection}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoEmoji}></Text>
            <Text style={styles.appTitle}>एक पेड़ माँ के नाम 2.0</Text>
            <Text style={styles.appSubtitle}>रायपुर जिला शिक्षा पोर्टल</Text>
            <View style={styles.divider} />
            <Text style={styles.loginPrompt}>
              अपने रोल का चयन करें
            </Text>
          </View>
        </View>

        {/* Login Options */}
        <View style={styles.optionsContainer}>
          {loginOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[styles.loginCard, { backgroundColor: option.lightColor }]}
              onPress={() => onSelectUserType(option.id as 'teacher' | 'crc')}
              activeOpacity={0.8}
            >
              <View style={styles.cardContent}>
                <View style={styles.cardHeader}>
                  <View style={styles.titleContainer}>
                    <Text style={[styles.cardTitle, { color: option.bgColor }]}>{option.title}</Text>
                    <Text style={styles.cardSubtitle}>{option.subtitle}</Text>
                  </View>
                  <View style={[styles.arrowContainer, { backgroundColor: option.bgColor }]}>
                    <Text style={styles.arrow}>→</Text>
                  </View>
                </View>
                <Text style={styles.cardDescription}>{option.description}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F5E8',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  headerSection: {
    backgroundColor: '#4CAF50',
    paddingVertical: 40,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 8,
  },
  logoContainer: {
    alignItems: 'center',
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
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginBottom: 20,
  },
  divider: {
    height: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    width: '60%',
    marginBottom: 20,
  },
  loginPrompt: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
  },
  optionsContainer: {
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 20,
  },
  loginCard: {
    borderRadius: 15,
    marginBottom: 20,
    elevation: 4,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  cardContent: {
    padding: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  titleContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
  arrowContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrow: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  cardDescription: {
    fontSize: 16,
    color: '#555',
    lineHeight: 22,
  },
});

export default UserTypeSelection;
