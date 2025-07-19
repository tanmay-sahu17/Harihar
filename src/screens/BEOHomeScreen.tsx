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
}

const BEOHomeScreen: React.FC<BEOHomeScreenProps> = ({ onBack }) => {
  const blockStats = [
    { label: 'कुल क्लस्टर', value: '15', icon: '📍' },
    { label: 'कुल स्कूल', value: '176', icon: '🏫' },
    { label: 'कुल शिक्षक', value: '650', icon: '👨‍🏫' },
    { label: 'कुल पेड़', value: '5,240', icon: '🌳' },
  ];

  const clusterPerformance = [
    { name: 'खुर्सीपार क्लस्टर', crc: 'श्री राम कुमार', schools: 12, performance: 85, status: 'excellent' },
    { name: 'देवरी क्लस्टर', crc: 'श्रीमती सुनीता देवी', schools: 10, performance: 78, status: 'good' },
    { name: 'भिलाई क्लस्टर', crc: 'श्री अजय सिंह', schools: 14, performance: 65, status: 'average' },
    { name: 'अभनपुर क्लस्टर', crc: 'श्री विकास गुप्ता', schools: 8, performance: 45, status: 'poor' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return '#4CAF50';
      case 'good': return '#8BC34A';
      case 'average': return '#FF9800';
      case 'poor': return '#F44336';
      default: return '#666';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'excellent': return 'उत्कृष्ट';
      case 'good': return 'अच्छा';
      case 'average': return 'औसत';
      case 'poor': return 'सुधार चाहिए';
      default: return '-';
    }
  };

  const quickActions = [
    { id: 'clusters', title: 'क्लस्टर मॉनिटरिंग', icon: '📍', color: '#9C27B0' },
    { id: 'reports', title: 'ब्लॉक रिपोर्ट्स', icon: '📊', color: '#4CAF50' },
    { id: 'crc', title: 'CRC मैनेजमेंट', icon: '👨‍💼', color: '#2196F3' },
    { id: 'targets', title: 'लक्ष्य निर्धारण', icon: '🎯', color: '#FF9800' },
  ];

  const monthlyTargets = [
    { title: 'पेड़ लगाने का लक्ष्य', target: 1000, achieved: 850, percentage: 85 },
    { title: 'सफलता दर का लक्ष्य', target: 80, achieved: 72, percentage: 90 },
    { title: 'स्कूल विजिट का लक्ष्य', target: 50, achieved: 35, percentage: 70 },
  ];

  const schoolsList = [
    // खुर्सीपार क्लस्टर
    { id: 1, crcName: 'खुर्सीपार क्लस्टर', name: 'राजकीय प्राथमिक शाला खुर्सीपार', teachers: 4, plants: 32, photos: 28, performance: '88%' },
    { id: 2, crcName: 'खुर्सीपार क्लस्टर', name: 'राजकीय मध्य शाला देवरी', teachers: 6, plants: 45, photos: 42, performance: '93%' },
    { id: 3, crcName: 'खुर्सीपार क्लस्टर', name: 'राजकीय प्राथमिक शाला सिमगा', teachers: 3, plants: 24, photos: 20, performance: '83%' },
    
    // देवरी क्लस्टर
    { id: 4, crcName: 'देवरी क्लस्टर', name: 'राजकीय उच्च प्राथमिक शाला देवरी', teachers: 8, plants: 64, photos: 55, performance: '86%' },
    { id: 5, crcName: 'देवरी क्लस्टर', name: 'राजकीय प्राथमिक शाला नांदगांव', teachers: 2, plants: 16, photos: 14, performance: '88%' },
    
    // भिलाई क्लस्टर
    { id: 6, crcName: 'भिलाई क्लस्टर', name: 'राजकीय मध्य शाला भिलाई', teachers: 5, plants: 40, photos: 35, performance: '75%' },
    { id: 7, crcName: 'भिलाई क्लस्टर', name: 'राजकीय प्राथमिक शाला धमतरी', teachers: 3, plants: 24, photos: 18, performance: '82%' },
    
    // अभनपुर क्लस्टर
    { id: 8, crcName: 'अभनपुर क्लस्टर', name: 'राजकीय प्राथमिक शाला अभनपुर', teachers: 4, plants: 30, photos: 22, performance: '73%' },
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
            <Text style={styles.welcomeText}>नमस्ते BEO साहब! 🙏</Text>
            <Text style={styles.subtitle}>Block Education Officer</Text>
            <Text style={styles.blockInfo}>रायपुर ब्लॉक-1</Text>
          </View>
        </View>

        {/* Block Statistics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📊 ब्लॉक आंकड़े</Text>
          <View style={styles.statsGrid}>
            {blockStats.map((stat, index) => (
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
              <TouchableOpacity key={action.id} style={[styles.actionCard, { borderColor: action.color }]}>
                <View style={[styles.actionIcon, { backgroundColor: action.color }]}>
                  <Text style={styles.actionEmoji}>{action.icon}</Text>
                </View>
                <Text style={styles.actionTitle}>{action.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Schools List by CRC */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>� CRC-wise स्कूल सूची</Text>
          
          {/* Group schools by CRC */}
          {clusterPerformance.map((cluster) => (
            <View key={cluster.name} style={styles.crcSection}>
              <View style={styles.crcHeader}>
                <Text style={styles.crcName}>{cluster.name}</Text>
                <Text style={styles.crcPerformance}>{cluster.performance}%</Text>
              </View>
              
              <View style={styles.schoolsInCrc}>
                {schoolsList
                  .filter(school => school.crcName === cluster.name)
                  .map((school) => (
                    <TouchableOpacity key={school.id} style={styles.schoolCard}>
                      <View style={styles.schoolHeader}>
                        <Text style={styles.schoolName}>{school.name}</Text>
                        <Text style={styles.schoolPerformance}>{school.performance}</Text>
                      </View>
                      <View style={styles.schoolStats}>
                        <View style={styles.schoolStat}>
                          <Text style={styles.schoolStatIcon}>👨‍🏫</Text>
                          <Text style={styles.schoolStatText}>{school.teachers}</Text>
                        </View>
                        <View style={styles.schoolStat}>
                          <Text style={styles.schoolStatIcon}>🌳</Text>
                          <Text style={styles.schoolStatText}>{school.plants}</Text>
                        </View>
                        <View style={styles.schoolStat}>
                          <Text style={styles.schoolStatIcon}>📸</Text>
                          <Text style={styles.schoolStatText}>{school.photos}</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  ))}
              </View>
            </View>
          ))}
        </View>

        {/* Cluster Performance */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📍 क्लस्टर प्रदर्शन</Text>
          <View style={styles.performanceContainer}>
            {clusterPerformance.map((cluster, index) => (
              <TouchableOpacity key={index} style={styles.clusterCard}>
                <View style={styles.clusterHeader}>
                  <View style={styles.clusterInfo}>
                    <Text style={styles.clusterName}>{cluster.name}</Text>
                    <Text style={styles.crcCoordinatorName}>CRC: {cluster.crc}</Text>
                  </View>
                  <View style={[styles.statusBadge, { backgroundColor: getStatusColor(cluster.status) }]}>
                    <Text style={styles.statusText}>{getStatusText(cluster.status)}</Text>
                  </View>
                </View>
                <View style={styles.clusterStats}>
                  <View style={styles.clusterStat}>
                    <Text style={styles.clusterStatValue}>{cluster.schools}</Text>
                    <Text style={styles.clusterStatLabel}>स्कूल</Text>
                  </View>
                  <View style={styles.clusterStat}>
                    <Text style={styles.clusterStatValue}>{cluster.performance}%</Text>
                    <Text style={styles.clusterStatLabel}>प्रदर्शन</Text>
                  </View>
                  <TouchableOpacity style={styles.viewButton}>
                    <Text style={styles.viewButtonText}>विस्तार →</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Activities */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🕐 हाल की गतिविधि</Text>
          <View style={styles.activityContainer}>
            <View style={styles.activityItem}>
              <Text style={styles.activityIcon}>📊</Text>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>मासिक रिपोर्ट DEO को भेजी</Text>
                <Text style={styles.activityTime}>आज, 4:15 PM</Text>
              </View>
            </View>
            <View style={styles.activityItem}>
              <Text style={styles.activityIcon}>👨‍💼</Text>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>15 CRC के साथ वीडियो मीटिंग</Text>
                <Text style={styles.activityTime}>कल, 10:00 AM</Text>
              </View>
            </View>
            <View style={styles.activityItem}>
              <Text style={styles.activityIcon}>🎯</Text>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>नए लक्ष्य निर्धारित किए</Text>
                <Text style={styles.activityTime}>2 दिन पहले</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Priority Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🚨 प्राथमिकता कार्य</Text>
          <View style={styles.priorityContainer}>
            <View style={styles.priorityItem}>
              <Text style={styles.priorityIcon}>⚠️</Text>
              <View style={styles.priorityContent}>
                <Text style={styles.priorityTitle}>अभनपुर क्लस्टर का प्रदर्शन कम</Text>
                <Text style={styles.priorityDesc}>CRC के साथ तुरंत मीटिंग आवश्यक</Text>
              </View>
              <TouchableOpacity style={styles.priorityButton}>
                <Text style={styles.priorityButtonText}>कार्य करें</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.priorityItem}>
              <Text style={styles.priorityIcon}>📋</Text>
              <View style={styles.priorityContent}>
                <Text style={styles.priorityTitle}>त्रैमासिक रिपोर्ट तैयार करें</Text>
                <Text style={styles.priorityDesc}>15 दिन में DEO को जमा करना है</Text>
              </View>
              <TouchableOpacity style={styles.priorityButton}>
                <Text style={styles.priorityButtonText}>शुरू करें</Text>
              </TouchableOpacity>
            </View>
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
  statIcon: {
    fontSize: 30,
    marginBottom: 8,
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
  },
  actionTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  targetsContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    elevation: 2,
  },
  targetCard: {
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  targetTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  targetProgress: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  progressBarContainer: {
    flex: 1,
    height: 8,
    backgroundColor: '#F0F0F0',
    borderRadius: 4,
    marginRight: 10,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#9C27B0',
    borderRadius: 4,
  },
  targetPercentage: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#9C27B0',
    minWidth: 35,
  },
  targetNumbers: {
    fontSize: 12,
    color: '#666',
  },
  performanceContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 10,
    elevation: 2,
  },
  clusterCard: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  clusterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  clusterInfo: {
    flex: 1,
  },
  clusterName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 3,
  },
  crcCoordinatorName: {
    fontSize: 12,
    color: '#666',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 10,
    color: 'white',
    fontWeight: 'bold',
  },
  clusterStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  clusterStat: {
    marginRight: 20,
  },
  clusterStatValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#7B1FA2',
  },
  clusterStatLabel: {
    fontSize: 11,
    color: '#666',
  },
  viewButton: {
    flex: 1,
    alignItems: 'flex-end',
  },
  viewButtonText: {
    fontSize: 12,
    color: '#7B1FA2',
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
  priorityContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    elevation: 2,
  },
  priorityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  priorityIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  priorityContent: {
    flex: 1,
  },
  priorityTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 3,
  },
  priorityDesc: {
    fontSize: 12,
    color: '#666',
  },
  priorityButton: {
    backgroundColor: '#F3E5F5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  priorityButtonText: {
    fontSize: 11,
    color: '#9C27B0',
    fontWeight: 'bold',
  },
  crcSection: {
    marginBottom: 20,
  },
  crcHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F3E5F5',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  crcName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#9C27B0',
    flex: 1,
  },
  crcPerformance: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4CAF50',
    backgroundColor: 'white',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  schoolsInCrc: {
    paddingLeft: 10,
  },
  schoolCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F3E5F5',
    borderLeftWidth: 4,
    borderLeftColor: '#9C27B0',
  },
  schoolHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  schoolName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#9C27B0',
    flex: 1,
    marginRight: 10,
  },
  schoolPerformance: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#4CAF50',
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
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
    fontSize: 16,
    marginBottom: 2,
  },
  schoolStatText: {
    fontSize: 11,
    color: '#666',
    textAlign: 'center',
  },
  bottomSpace: {
    height: 20,
  },
});

export default BEOHomeScreen;
