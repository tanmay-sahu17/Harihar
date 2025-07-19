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
}

const TeacherHomeScreen: React.FC<TeacherHomeScreenProps> = ({ onBack }) => {
  const quickActions = [
    {
      id: 'photo',
      title: 'फोटो अपलोड',
      subtitle: 'पेड़ का फोटो लें',
      icon: '📸',
      color: '#4CAF50',
    },
    {
      id: 'students',
      title: 'छात्र डेटा',
      subtitle: 'स्टूडेंट्स की जानकारी',
      icon: '👥',
      color: '#2196F3',
    },
    {
      id: 'progress',
      title: 'प्रगति रिपोर्ट',
      subtitle: 'अपना प्रदर्शन देखें',
      icon: '📊',
      color: '#FF9800',
    },
    {
      id: 'certificate',
      title: 'प्रमाणपत्र',
      subtitle: 'अपना सर्टिफिकेट',
      icon: '🏆',
      color: '#9C27B0',
    },
  ];

  const todaysTasks = [
    'पेड़ों को पानी देना',
    '5 छात्रों का रजिस्ट्रेशन पूरा करना',
    'साप्ताहिक रिपोर्ट भेजना',
    'मॉर्निंग असेंबली में पर्यावरण की बात करना',
  ];

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

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>⚡ त्वरित कार्य</Text>
          <View style={styles.actionsGrid}>
            {quickActions.map((action) => (
              <TouchableOpacity key={action.id} style={[styles.actionCard, { borderColor: action.color }]}>
                <View style={[styles.actionIcon, { backgroundColor: action.color }]}>
                  <Text style={styles.actionEmoji}>{action.icon}</Text>
                </View>
                <Text style={styles.actionTitle}>{action.title}</Text>
                <Text style={styles.actionSubtitle}>{action.subtitle}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Today's Tasks */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📋 आज के कार्य</Text>
          <View style={styles.tasksContainer}>
            {todaysTasks.map((task, index) => (
              <View key={index} style={styles.taskItem}>
                <View style={styles.taskCheckbox}>
                  <Text style={styles.taskNumber}>{index + 1}</Text>
                </View>
                <Text style={styles.taskText}>{task}</Text>
                <TouchableOpacity style={styles.taskButton}>
                  <Text style={styles.taskButtonText}>✓</Text>
                </TouchableOpacity>
              </View>
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
                <Text style={styles.activityTitle}>5 पेड़ों का फोटो अपलोड किया</Text>
                <Text style={styles.activityTime}>2 घंटे पहले</Text>
              </View>
            </View>
            <View style={styles.activityItem}>
              <Text style={styles.activityIcon}>👥</Text>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>10 छात्रों का रजिस्ट्रेशन पूरा</Text>
                <Text style={styles.activityTime}>1 दिन पहले</Text>
              </View>
            </View>
            <View style={styles.activityItem}>
              <Text style={styles.activityIcon}>📊</Text>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>साप्ताहिक रिपोर्ट सबमिट की</Text>
                <Text style={styles.activityTime}>3 दिन पहले</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Tips Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>💡 आज का टिप्स</Text>
          <View style={styles.tipCard}>
            <Text style={styles.tipText}>
              🌱 पेड़ों को सुबह के समय पानी देना सबसे अच्छा होता है। इससे पूरे दिन भर पेड़ को नमी मिलती रहती है।
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
  bottomSpace: {
    height: 20,
  },
});

export default TeacherHomeScreen;
