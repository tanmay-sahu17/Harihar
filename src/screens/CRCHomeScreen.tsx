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
}

const CRCHomeScreen: React.FC<CRCHomeScreenProps> = ({ onBack }) => {
  const clusterStats = [
    { label: 'कुल स्कूल', value: '12', icon: '🏫' },
    { label: 'कुल शिक्षक', value: '48', icon: '👨‍🏫' },
    { label: 'कुल पेड़', value: '384', icon: '🌳' },
    { label: 'जीवित पेड़', value: '326', icon: '🌱' },
  ];

  const schoolsList = [
    { 
      id: 1, 
      name: 'राजकीय प्राथमिक शाला खुर्सीपार', 
      teachers: 4, 
      plants: 32, 
      photos: 28,
      performance: '88%' 
    },
    { 
      id: 2, 
      name: 'राजकीय मध्य शाला देवरी', 
      teachers: 6, 
      plants: 45, 
      photos: 42,
      performance: '93%' 
    },
    { 
      id: 3, 
      name: 'राजकीय प्राथमिक शाला सिमगा', 
      teachers: 3, 
      plants: 24, 
      photos: 20,
      performance: '83%' 
    },
    { 
      id: 4, 
      name: 'राजकीय उच्च प्राथमिक शाला रायपुर', 
      teachers: 8, 
      plants: 64, 
      photos: 55,
      performance: '86%' 
    },
    { 
      id: 5, 
      name: 'राजकीय प्राथमिक शाला नांदगांव', 
      teachers: 2, 
      plants: 16, 
      photos: 14,
      performance: '88%' 
    },
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
            <Text style={styles.welcomeText}>नमस्ते CRC साहब! 🙏</Text>
            <Text style={styles.subtitle}>Cluster Resource Coordinator</Text>
            <Text style={styles.clusterInfo}>खुर्सीपार क्लस्टर, रायपुर</Text>
          </View>
        </View>

        {/* Cluster Statistics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📊 क्लस्टर आंकड़े</Text>
          <View style={styles.statsGrid}>
            {clusterStats.map((stat, index) => (
              <View key={index} style={styles.statCard}>
                <Text style={styles.statIcon}>{stat.icon}</Text>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Schools List */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🏫 स्कूल सूची</Text>
          <View style={styles.schoolsContainer}>
            {schoolsList.map((school) => (
              <TouchableOpacity key={school.id} style={styles.schoolCard}>
                <View style={styles.schoolHeader}>
                  <Text style={styles.schoolName}>{school.name}</Text>
                  <Text style={styles.schoolPerformance}>{school.performance}</Text>
                </View>
                <View style={styles.schoolStats}>
                  <View style={styles.schoolStat}>
                    <Text style={styles.schoolStatIcon}>👨‍🏫</Text>
                    <Text style={styles.schoolStatText}>{school.teachers} शिक्षक</Text>
                  </View>
                  <View style={styles.schoolStat}>
                    <Text style={styles.schoolStatIcon}>🌳</Text>
                    <Text style={styles.schoolStatText}>{school.plants} पेड़</Text>
                  </View>
                  <View style={styles.schoolStat}>
                    <Text style={styles.schoolStatIcon}>📸</Text>
                    <Text style={styles.schoolStatText}>{school.photos} फोटो</Text>
                  </View>
                </View>
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
    backgroundColor: '#F3F8FF',
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
  clusterInfo: {
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
    color: '#1976D2',
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
    borderColor: '#E3F2FD',
  },
  statIcon: {
    fontSize: 30,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1976D2',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  schoolsContainer: {
    marginTop: 10,
  },
  schoolCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#E3F2FD',
  },
  schoolHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  schoolName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1976D2',
    flex: 1,
    marginRight: 10,
  },
  schoolPerformance: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4CAF50',
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  schoolStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  schoolStat: {
    alignItems: 'center',
    flex: 1,
  },
  schoolStatIcon: {
    fontSize: 20,
    marginBottom: 5,
  },
  schoolStatText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  bottomSpace: {
    height: 20,
  },
});

export default CRCHomeScreen;
