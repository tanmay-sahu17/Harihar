import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';

interface TeacherReportsScreenProps {
  onBack: () => void;
}

const TeacherReportsScreen: React.FC<TeacherReportsScreenProps> = ({ onBack }) => {
  const teacherReports = [
    { 
      name: 'राधा शर्मा जी', 
      school: 'राजकीय प्राथमिक शाला', 
      treesPlanted: 45, 
      status: 'सक्रिय',
      lastReport: '2 दिन पहले'
    },
    { 
      name: 'सुनीता वर्मा जी', 
      school: 'सरस्वती विद्या मंदिर', 
      treesPlanted: 38, 
      status: 'सक्रिय',
      lastReport: '1 दिन पहले'
    },
    { 
      name: 'अजय कुमार जी', 
      school: 'गांधी प्राथमिक शाला', 
      treesPlanted: 52, 
      status: 'सक्रिय',
      lastReport: '3 घंटे पहले'
    },
    { 
      name: 'प्रीति पटेल जी', 
      school: 'नेहरू बाल शिक्षालय', 
      treesPlanted: 23, 
      status: 'निष्क्रिय',
      lastReport: '1 सप्ताह पहले'
    },
    { 
      name: 'विकास गुप्ता जी', 
      school: 'आदर्श प्राथमिक शाला', 
      treesPlanted: 41, 
      status: 'सक्रिय',
      lastReport: '5 घंटे पहले'
    },
  ];

  const getStatusColor = (status: string) => {
    return status === 'सक्रिय' ? '#4CAF50' : '#F44336';
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
            <Text style={styles.title}>शिक्षक रिपोर्ट</Text>
            <Text style={styles.subtitle}>Teacher Activity Reports</Text>
          </View>
        </View>

        {/* Summary Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>178</Text>
            <Text style={styles.statLabel}>कुल शिक्षक</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>165</Text>
            <Text style={styles.statLabel}>सक्रिय</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>13</Text>
            <Text style={styles.statLabel}>निष्क्रिय</Text>
          </View>
        </View>

        {/* Teacher Reports List */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>शिक्षकों की गतिविधि</Text>
          {teacherReports.map((teacher, index) => (
            <View key={index} style={styles.teacherCard}>
              <View style={styles.teacherHeader}>
                <View style={styles.teacherInfo}>
                  <Text style={styles.teacherName}>{teacher.name}</Text>
                  <Text style={styles.schoolName}>{teacher.school}</Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(teacher.status) }]}>
                  <Text style={styles.statusText}>{teacher.status}</Text>
                </View>
              </View>
              
              <View style={styles.teacherStats}>
                <View style={styles.statRow}>
                  <Text style={styles.statLabel}>लगाए गए पेड़:</Text>
                  <Text style={styles.statValue}>{teacher.treesPlanted}</Text>
                </View>
                <View style={styles.statRow}>
                  <Text style={styles.statLabel}>अंतिम रिपोर्ट:</Text>
                  <Text style={styles.statValue}>{teacher.lastReport}</Text>
                </View>
              </View>

              <TouchableOpacity style={styles.viewDetailsButton}>
                <Text style={styles.viewDetailsText}>विस्तार से देखें</Text>
              </TouchableOpacity>
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
  teacherCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#E3F2FD',
  },
  teacherHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  teacherInfo: {
    flex: 1,
  },
  teacherName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 3,
  },
  schoolName: {
    fontSize: 12,
    color: '#666',
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
  teacherStats: {
    marginBottom: 10,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  statValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1565C0',
  },
  viewDetailsButton: {
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-end',
  },
  viewDetailsText: {
    color: '#1565C0',
    fontSize: 12,
    fontWeight: 'bold',
  },
  bottomSpace: {
    height: 20,
  },
});

export default TeacherReportsScreen;
