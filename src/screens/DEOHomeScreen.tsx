import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

interface DEOHomeScreenProps {
  onBack?: () => void;
  onNavigate?: (screen: string) => void;
}

const DEOHomeScreen: React.FC<DEOHomeScreenProps> = ({ onBack, onNavigate }) => {
  const districtStats = [
    { label: 'कुल ब्लॉक', value: '8', icon: '🏛️' },
    { label: 'कुल CRC', value: '120', icon: '📍' },
    { label: 'कुल स्कूल', value: '1,408', icon: '🏫' },
    { label: 'कुल पेड़', value: '41,920', icon: '🌳' },
  ];

  const quickActions = [
    { id: 'blockTable', title: 'ब्लॉक-वार विस्तृत प्रदर्शन', icon: '🟦', color: '#2196F3' },
    { id: 'filtersFlags', title: 'फ़िल्टर + डेटा फ्लैगिंग', icon: '🟨', color: '#FFC107' },
    { id: 'reports', title: 'रिपोर्ट्स डाउनलोड/एक्सपोर्ट', icon: '🟧', color: '#FF9800' },
    { id: 'activityLog', title: 'गतिविधि लॉग (दिनांक-वार)', icon: '🟪', color: '#9C27B0' },
  ];

  const handleQuickAction = (actionId: string) => {
    if (onNavigate) {
      onNavigate(actionId);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          {/* Back Button */}
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Text style={styles.backButtonText}>← वापस</Text>
          </TouchableOpacity>
          
          <View style={styles.welcomeSection}>
            <Text style={styles.welcomeText}>नमस्ते DEO महोदय! 🙏</Text>
            <Text style={styles.subtitle}>District Education Officer</Text>
            <Text style={styles.districtInfo}>रायपुर जिला</Text>
          </View>
        </View>

        {/* District Statistics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🟩 जिला आंकड़े</Text>
          <View style={styles.statsGrid}>
            {districtStats.map((stat, index) => (
              <View key={index} style={styles.statCard}>
                <Text style={styles.statIcon}>{stat.icon}</Text>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>⚡ त्वरित कार्य</Text>
          <View style={styles.actionsGrid}>
            {quickActions.map((action) => (
              <TouchableOpacity 
                key={action.id} 
                style={[styles.actionCard, { borderColor: action.color }]}
                onPress={() => handleQuickAction(action.id)}
              >
                <View style={[styles.actionIcon, { backgroundColor: action.color }]}>
                  <Text style={styles.actionEmoji}>{action.icon}</Text>
                </View>
                <Text style={styles.actionTitle}>{action.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.bottomSpace} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8E1',
  },
  header: {
    backgroundColor: '#FF5722',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  backButton: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginBottom: 15,
  },
  backButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  welcomeSection: {
    marginBottom: 10,
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
    opacity: 0.9,
    marginBottom: 5,
  },
  districtInfo: {
    fontSize: 14,
    color: 'white',
    opacity: 0.8,
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E65100',
    marginBottom: 15,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: 'white',
    width: (width - 60) / 2,
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 15,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#FFCCBC',
  },
  statIcon: {
    fontSize: 30,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#E65100',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    backgroundColor: 'white',
    width: (width - 60) / 2,
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 2,
    elevation: 3,
  },
  actionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  actionEmoji: {
    fontSize: 22,
  },
  actionTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  bottomSpace: {
    height: 20,
  },
});

export default DEOHomeScreen;
