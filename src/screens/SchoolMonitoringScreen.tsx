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

interface SchoolMonitoringScreenProps {
  onBack: () => void;
}

const SchoolMonitoringScreen: React.FC<SchoolMonitoringScreenProps> = ({ onBack }) => {
  const schoolData = [
    { name: 'राजकीय प्राथमिक शाला, रायपुर', trees: 45, status: 'फोटो अपलोड बाकी', teachers: 3 },
    { name: 'सरस्वती विद्या मंदिर', trees: 38, status: 'आंशिक अपलोड', teachers: 2 },
    { name: 'गांधी प्राथमिक शाला', trees: 52, status: 'पूर्ण अपलोड', teachers: 4 },
    { name: 'नेहरू बाल शिक्षालय', trees: 23, status: 'शुरुआत नहीं', teachers: 2 },
    { name: 'आदर्श प्राथमिक शाला', trees: 41, status: 'आंशिक अपलोड', teachers: 3 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'पूर्ण अपलोड': return '#4CAF50';
      case 'आंशिक अपलोड': return '#FF9800';
      case 'फोटो अपलोड बाकी': return '#F44336';
      case 'शुरुआत नहीं': return '#9E9E9E';
      default: return '#666';
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
          
          <View style={styles.titleSection}>
            <Text style={styles.title}>स्कूल फोटो अपलोड स्थिति</Text>
            <Text style={styles.subtitle}>School Photo Upload Status</Text>
          </View>
        </View>

        {/* Summary Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>45</Text>
            <Text style={styles.statLabel}>कुल स्कूल</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>फोटो अपलोड पूर्ण</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>35%</Text>
            <Text style={styles.statLabel}>जिला प्रतिशत</Text>
          </View>
        </View>

        {/* Schools List */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>स्कूल फोटो अपलोड स्थिति</Text>
          {schoolData.map((school, index) => (
            <View key={index} style={styles.schoolCard}>
              <View style={styles.schoolHeader}>
                <Text style={styles.schoolName}>{school.name}</Text>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(school.status) }]}>
                  <Text style={styles.statusText}>{school.status}</Text>
                </View>
              </View>
              <View style={styles.schoolStats}>
                <View style={styles.schoolStat}>
                  <Text style={styles.schoolStatNumber}>{school.trees}</Text>
                  <Text style={styles.schoolStatLabel}>पेड़</Text>
                </View>
                <View style={styles.schoolStat}>
                  <Text style={styles.schoolStatNumber}>{school.teachers}</Text>
                  <Text style={styles.schoolStatLabel}>शिक्षक</Text>
                </View>
              </View>
            </View>
          ))}
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
    paddingBottom: 25,
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
  titleSection: {
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: 'white',
    opacity: 0.9,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: -20,
    marginBottom: 20,
  },
  statCard: {
    backgroundColor: 'white',
    flex: 1,
    marginHorizontal: 5,
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    elevation: 3,
  },
  statNumber: {
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
  section: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1565C0',
    marginBottom: 15,
  },
  schoolCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#E3F2FD',
  },
  schoolHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  schoolName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  schoolStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  schoolStat: {
    alignItems: 'center',
  },
  schoolStatNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1565C0',
  },
  schoolStatLabel: {
    fontSize: 12,
    color: '#666',
  },
  bottomSpace: {
    height: 20,
  },
});

export default SchoolMonitoringScreen;
