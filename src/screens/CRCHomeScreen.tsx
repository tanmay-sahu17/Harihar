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

interface CRCHomeScreenProps {
  onBack?: () => void;
  onNavigate?: (screenName: string) => void;
}

const CRCHomeScreen: React.FC<CRCHomeScreenProps> = ({ onBack, onNavigate }) => {
  const supervisorStats = [
    { label: 'कुल स्कूल', value: '45' },
    { label: 'फोटो अपलोड बाकी', value: '178' },
    { label: 'अपलोड प्रतिशत', value: '35%' },
    { label: 'पूर्ण स्कूल', value: '12' },
  ];

  const quickActions = [
    { id: 'schoolMonitoring', title: 'स्कूल फोटो स्थिति' },
    { id: 'teacherReports', title: 'शिक्षक अपलोड रिपोर्ट' },
    { id: 'dataVerification', title: 'फोटो सत्यापन' },
    { id: 'progressTracking', title: 'जिला प्रगति ट्रैकिंग' },
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
            <Text style={styles.welcomeText}>सुपरवाइजर डैशबोर्ड</Text>
            <Text style={styles.subtitle}>Supervisor Control Panel</Text>
            <Text style={styles.blockInfo}>एक पेड़ माँ के नाम 2.0 निगरानी</Text>
            <Text style={styles.urgentNotice}> रायपुर जिला पीछे है - तत्काल कार्रवाई करें</Text>
          </View>
        </View>

        {/* Supervisor Statistics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>निगरानी आंकड़े</Text>
          <View style={styles.statsGrid}>
            {supervisorStats.map((stat, index) => (
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
                style={styles.actionCard}
                onPress={() => handleQuickAction(action.id)}
              >
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
    backgroundColor: '#F1F8FF',
  },
  header: {
    backgroundColor: '#2196F3',
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
  urgentNotice: {
    fontSize: 12,
    color: '#FFEB3B',
    marginTop: 8,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1565C0',
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
    borderColor: '#BBDEFB',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1565C0',
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
    elevation: 3,
    borderWidth: 1,
    borderColor: '#BBDEFB',
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

export default CRCHomeScreen;
