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

interface TeacherHomeScreenProps {
  onBack?: () => void;
  onNavigate?: (screenName: string) => void;
}

const TeacherHomeScreen: React.FC<TeacherHomeScreenProps> = ({ onBack, onNavigate }) => {
  const quickActions = [
    {
      id: 'photo',
      title: 'फोटो अपलोड',
      subtitle: 'छात्र + पेड़ + शिक्षिका फोटो',
      icon: '📸',
      color: '#4CAF50',
    },
    {
      id: 'students',
      title: 'छात्र रजिस्ट्रेशन',
      subtitle: 'प्रत्येक छात्र की जानकारी',
      icon: '�',
      color: '#2196F3',
    },
    {
      id: 'certificate',
      title: 'सर्टिफिकेट डाउनलोड',
      subtitle: 'छात्रों के लिए प्रमाणपत्र',
      icon: '🏆',
      color: '#9C27B0',
    },
    {
      id: 'previousPhotos',
      title: 'अपलोडेड फोटो देखें',
      subtitle: 'पहले अपलोड किए फोटो',
      icon: '🖼️',
      color: '#FF5722',
    },
  ];

  const handleQuickAction = (actionId: string) => {
    switch (actionId) {
      case 'photo':
        if (onNavigate) {
          onNavigate('photoUpload');
        }
        break;
      case 'previousPhotos':
        if (onNavigate) {
          onNavigate('previousPhotos');
        }
        break;
      case 'students':
        if (onNavigate) {
          onNavigate('studentsData');
        }
        break;
      case 'certificate':
        if (onNavigate) {
          onNavigate('certificate');
        }
        break;
      default:
        console.log('Unknown action:', actionId);
        break;
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
            <Text style={styles.welcomeText}>नमस्ते शिक्षक जी! 🙏</Text>
            <Text style={styles.subtitle}>एक पेड़ माँ के नाम 2.0</Text>
            <Text style={styles.schoolInfo}>राजकीय प्राथमिक शाला, रायपुर</Text>
            <Text style={styles.importantNotice}>⚠️ प्रत्येक छात्र का फोटो पेड़ एवं शिक्षिका के साथ अपलोड अनिवार्य</Text>
          </View>
          <View style={styles.headerStats}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>25</Text>
              <Text style={styles.statLabel}>कुल पेड़</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>18</Text>
              <Text style={styles.statLabel}>जीवित पेड़</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>85%</Text>
              <Text style={styles.statLabel}>सफलता दर</Text>
            </View>
          </View>
        </View>

        {/* Important Instructions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📋 महत्वपूर्ण निर्देश</Text>
          <View style={styles.instructionCard}>
            <Text style={styles.instructionTitle}>एक पेड़ माँ के नाम 2.0 - अनिवार्य प्रक्रिया:</Text>
            <Text style={styles.instructionText}>
              • प्रत्येक छात्र के नाम पर एक पेड़ लगाना है{'\n'}
              • छात्र + पेड़ + महिला शिक्षिका का साथ में फोटो लेना है{'\n'}
              • पोर्टल में फोटो अपलोड करना अनिवार्य है{'\n'}
              • सर्टिफिकेट डाउनलोड करके छात्रों को देना है{'\n'}
              • रायपुर जिले का प्रतिशत बढ़ाने में सहयोग करें
            </Text>
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
                <Text style={styles.actionSubtitle}>{action.subtitle}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🕐 हाल की गतिविधि</Text>
          <View style={styles.activityContainer}>
            <View style={styles.activityItem}>
              <Text style={styles.activityIcon}>📸</Text>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>15 छात्रों का फोटो पेड़ और शिक्षिका के साथ अपलोड</Text>
                <Text style={styles.activityTime}>2 घंटे पहले</Text>
              </View>
            </View>
            <View style={styles.activityItem}>
              <Text style={styles.activityIcon}>🏆</Text>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>12 छात्रों के सर्टिफिकेट डाउनलोड किए</Text>
                <Text style={styles.activityTime}>1 दिन पहले</Text>
              </View>
            </View>
            <View style={styles.activityItem}>
              <Text style={styles.activityIcon}>�</Text>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>25 छात्रों का रजिस्ट्रेशन पूर्ण</Text>
                <Text style={styles.activityTime}>2 दिन पहले</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Progress Status */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>� प्रगति स्थिति</Text>
          <View style={styles.tipCard}>
            <Text style={styles.tipText}>
              � रायपुर जिला: वर्तमान में पीछे है{'\n'}
              📈 लक्ष्य: 100% छात्रों का फोटो अपलोड{'\n'}
              ⚡ तत्काल कार्रवाई आवश्यक - प्रतिदिन प्रगति दिखानी है
            </Text>
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
    backgroundColor: '#F5F9F5',
  },
  header: {
    backgroundColor: '#4CAF50',
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
    marginBottom: 20,
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
  schoolInfo: {
    fontSize: 14,
    color: 'white',
    opacity: 0.8,
  },
  importantNotice: {
    fontSize: 12,
    color: '#FFEB3B',
    marginTop: 8,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  headerStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 3,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 3,
  },
  statLabel: {
    fontSize: 11,
    color: 'white',
    opacity: 0.9,
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 15,
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
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 3,
    textAlign: 'center',
  },
  actionSubtitle: {
    fontSize: 11,
    color: '#666',
    textAlign: 'center',
  },
  tasksContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    elevation: 2,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  taskCheckbox: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  taskNumber: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  taskText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  taskButton: {
    backgroundColor: '#E8F5E8',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  taskButtonText: {
    color: '#4CAF50',
    fontSize: 16,
    fontWeight: 'bold',
  },
  activityContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    elevation: 2,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  activityIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    color: '#333',
    marginBottom: 3,
  },
  activityTime: {
    fontSize: 12,
    color: '#666',
  },
  tipCard: {
    backgroundColor: '#FFF3C4',
    padding: 15,
    borderRadius: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#FFC107',
  },
  tipText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  instructionCard: {
    backgroundColor: '#E3F2FD',
    padding: 15,
    borderRadius: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#2196F3',
  },
  instructionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1565C0',
    marginBottom: 8,
  },
  instructionText: {
    fontSize: 13,
    color: '#333',
    lineHeight: 18,
  },
  bottomSpace: {
    height: 20,
  },
});

export default TeacherHomeScreen;
