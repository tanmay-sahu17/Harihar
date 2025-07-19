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

interface BEOHomeScreenProps {
  onBack?: () => void;
  onNavigate?: (screen: string) => void;
}

const BEOHomeScreen: React.FC<BEOHomeScreenProps> = ({ onBack, onNavigate }) => {
  const blockStats = [
    { label: 'कुल क्लस्टर', value: '15' },
    { label: 'कुल स्कूल', value: '176' },
    { label: 'कुल शिक्षक', value: '650' },
    { label: 'कुल पेड़', value: '5,240' },
  ];

  const quickActions = [
    { id: 'blockProgress', title: 'ब्लॉक-वार प्रगति सारांश', color: '#9C27B0' },
    { id: 'schoolStatus', title: 'हर स्कूल का अपलोड स्टेटस', color: '#4CAF50' },
    { id: 'missingData', title: 'गुमशुदा डेटा की ऑटो फ्लैगिंग', color: '#F44336' },
    { id: 'filterSort', title: 'फ़िल्टरिंग + सॉर्टिंग विकल्प', color: '#2196F3' },
    { id: 'dailyReport', title: 'दैनिक प्रगति रिपोर्ट देखें/निर्यात', color: '#FF9800' },
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
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Text style={styles.backButtonText}>← वापस</Text>
          </TouchableOpacity>
          
          <View style={styles.welcomeSection}>
            <Text style={styles.welcomeText}>BEO डैशबोर्ड</Text>
            <Text style={styles.subtitle}>ब्लॉक शिक्षा अधिकारी पोर्टल</Text>
            <Text style={styles.blockInfo}>एक पेड़ माँ के नाम 2.0 प्रबंधन</Text>
          </View>
        </View>

        {/* Block Statistics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ब्लॉक आंकड़े</Text>
          <View style={styles.statsGrid}>
            {blockStats.map((stat, index) => (
              <View key={index} style={styles.statCard}>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>त्वरित कार्य</Text>
          <View style={styles.actionsGrid}>
            {quickActions.map((action) => (
              <TouchableOpacity 
                key={action.id} 
                style={[styles.actionCard, { borderColor: action.color }]}
                onPress={() => handleQuickAction(action.id)}
              >
                <View style={[styles.actionIcon, { backgroundColor: action.color }]}>
                  <Text style={styles.actionEmoji}>●</Text>
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
    backgroundColor: '#F8F5FF',
  },
  header: {
    backgroundColor: '#9C27B0',
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
  blockInfo: {
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
    color: '#7B1FA2',
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
    borderColor: '#F3E5F5',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#7B1FA2',
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
    color: 'white',
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

export default BEOHomeScreen;
