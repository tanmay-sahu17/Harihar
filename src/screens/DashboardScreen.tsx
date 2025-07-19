import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  Alert,
} from 'react-native';

const { width } = Dimensions.get('window');

const DashboardScreen = () => {
  const [selectedTab, setSelectedTab] = useState('overview');

  const overviewStats = {
    totalStudents: 145,
    photosUploaded: 89,
    certificatesGenerated: 72,
    progress: 61,
    targetDate: '31 मार्च 2024',
    daysLeft: 45,
  };

  const districtStats = {
    raipur: { total: 2500, uploaded: 1530, percentage: 61 },
    bilaspur: { total: 2200, uploaded: 1650, percentage: 75 },
    korba: { total: 1800, uploaded: 1260, percentage: 70 },
    durg: { total: 2100, uploaded: 1470, percentage: 70 },
  };

  const monthlyProgress = [
    { month: 'दिसंबर', target: 50, achieved: 32 },
    { month: 'जनवरी', target: 75, achieved: 58 },
    { month: 'फरवरी', target: 100, achieved: 89 },
    { month: 'मार्च', target: 145, achieved: 89 },
  ];

  const urgentAlerts = [
    {
      id: 1,
      type: 'warning',
      title: 'फोटो अपलोड धीमी',
      message: 'रायपुर जिले की प्रगति धीमी है। तुरंत छात्र फोटो अपलोड करें।',
      color: '#FF9800',
    },
    {
      id: 2,
      type: 'info',
      title: 'नई अपडेट',
      message: 'पोर्टल में नए फीचर्स जोड़े गए हैं। वीडियो गाइड देखें।',
      color: '#2196F3',
    },
    {
      id: 3,
      type: 'success',
      title: 'सफलता',
      message: 'बिलासपुर जिला अपने टारगेट के 75% तक पहुंच गया है।',
      color: '#4CAF50',
    },
  ];

  const renderOverview = () => (
    <View>
      {/* Main Stats Cards */}
      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Text style={styles.statEmoji}>👥</Text>
          <Text style={styles.statNumber}>{overviewStats.totalStudents}</Text>
          <Text style={styles.statLabel}>कुल छात्र</Text>
        </View>
        
        <View style={styles.statCard}>
          <Text style={styles.statEmoji}>📸</Text>
          <Text style={styles.statNumber}>{overviewStats.photosUploaded}</Text>
          <Text style={styles.statLabel}>फोटो अपलोड</Text>
        </View>
        
        <View style={styles.statCard}>
          <Text style={styles.statEmoji}>🏆</Text>
          <Text style={styles.statNumber}>{overviewStats.certificatesGenerated}</Text>
          <Text style={styles.statLabel}>प्रमाणपत्र</Text>
        </View>
        
        <View style={styles.statCard}>
          <Text style={styles.statEmoji}>📈</Text>
          <Text style={styles.statNumber}>{overviewStats.progress}%</Text>
          <Text style={styles.statLabel}>प्रगति</Text>
        </View>
      </View>

      {/* Progress Circle */}
      <View style={styles.progressCard}>
        <Text style={styles.progressTitle}>कुल प्रगति</Text>
        <View style={styles.progressCircle}>
          <Text style={styles.progressPercentage}>{overviewStats.progress}%</Text>
          <Text style={styles.progressSubtext}>पूर्ण</Text>
        </View>
        <Text style={styles.progressInfo}>
          {overviewStats.photosUploaded} / {overviewStats.totalStudents} छात्र
        </Text>
      </View>

      {/* Target Info */}
      <View style={styles.targetCard}>
        <Text style={styles.targetTitle}>🎯 टारगेट की जानकारी</Text>
        <Text style={styles.targetDate}>अंतिम तारीख: {overviewStats.targetDate}</Text>
        <Text style={styles.targetDays}>{overviewStats.daysLeft} दिन बाकी</Text>
        <Text style={styles.targetRemaining}>
          बाकी: {overviewStats.totalStudents - overviewStats.photosUploaded} छात्र फोटो
        </Text>
      </View>
    </View>
  );

  const renderDistrictComparison = () => (
    <View>
      <Text style={styles.sectionTitle}>जिलावार प्रगति तुलना</Text>
      
      {Object.entries(districtStats).map(([district, stats]) => (
        <View key={district} style={styles.districtCard}>
          <View style={styles.districtHeader}>
            <Text style={styles.districtName}>{district.toUpperCase()}</Text>
            <Text style={styles.districtPercentage}>{stats.percentage}%</Text>
          </View>
          
          <View style={styles.districtProgressBar}>
            <View 
              style={[
                styles.districtProgressFill, 
                { width: `${stats.percentage}%` }
              ]} 
            />
          </View>
          
          <View style={styles.districtStats}>
            <Text style={styles.districtStatsText}>
              {stats.uploaded} / {stats.total} छात्र
            </Text>
            <Text style={styles.districtRemaining}>
              बाकी: {stats.total - stats.uploaded}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );

  const renderMonthlyProgress = () => (
    <View>
      <Text style={styles.sectionTitle}>मासिक प्रगति रिपोर्ट</Text>
      
      {monthlyProgress.map((month, index) => (
        <View key={index} style={styles.monthCard}>
          <View style={styles.monthHeader}>
            <Text style={styles.monthName}>{month.month}</Text>
            <Text style={styles.monthPercentage}>
              {Math.round((month.achieved / month.target) * 100)}%
            </Text>
          </View>
          
          <View style={styles.monthProgressBar}>
            <View 
              style={[
                styles.monthProgressFill, 
                { width: `${(month.achieved / month.target) * 100}%` }
              ]} 
            />
          </View>
          
          <Text style={styles.monthStats}>
            लक्ष्य: {month.target} | प्राप्त: {month.achieved}
          </Text>
        </View>
      ))}
    </View>
  );

  const renderAlerts = () => (
    <View>
      <Text style={styles.sectionTitle}>महत्वपूर्ण सूचनाएं</Text>
      
      {urgentAlerts.map((alert) => (
        <View key={alert.id} style={[styles.alertCard, { borderLeftColor: alert.color }]}>
          <Text style={styles.alertTitle}>{alert.title}</Text>
          <Text style={styles.alertMessage}>{alert.message}</Text>
          <TouchableOpacity 
            style={[styles.alertButton, { backgroundColor: alert.color }]}
            onPress={() => Alert.alert(alert.title, alert.message)}
          >
            <Text style={styles.alertButtonText}>विस्तार से देखें</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );

  const tabs = [
    { id: 'overview', label: 'सारांश', emoji: '📊' },
    { id: 'district', label: 'जिलावार', emoji: '🏛️' },
    { id: 'monthly', label: 'मासिक', emoji: '📅' },
    { id: 'alerts', label: 'सूचनाएं', emoji: '🔔' },
  ];

  const renderContent = () => {
    switch (selectedTab) {
      case 'overview':
        return renderOverview();
      case 'district':
        return renderDistrictComparison();
      case 'monthly':
        return renderMonthlyProgress();
      case 'alerts':
        return renderAlerts();
      default:
        return renderOverview();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>📊 डैशबोर्ड</Text>
        <Text style={styles.headerSubtitle}>प्रगति रिपोर्ट और आंकड़े</Text>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabScrollContainer}
        >
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.id}
              style={[
                styles.tab,
                selectedTab === tab.id && styles.activeTab,
              ]}
              onPress={() => setSelectedTab(tab.id)}
            >
              <Text style={styles.tabEmoji}>{tab.emoji}</Text>
              <Text style={[
                styles.tabLabel,
                selectedTab === tab.id && styles.activeTabLabel,
              ]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {renderContent()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F5E8',
  },
  header: {
    backgroundColor: '#2E7D32',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'white',
    opacity: 0.9,
  },
  tabContainer: {
    backgroundColor: 'white',
    paddingVertical: 8,
    elevation: 2,
  },
  tabScrollContainer: {
    paddingHorizontal: 16,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
    backgroundColor: '#F5F5F5',
  },
  activeTab: {
    backgroundColor: '#2E7D32',
  },
  tabEmoji: {
    fontSize: 16,
    marginRight: 4,
  },
  tabLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  activeTabLabel: {
    color: 'white',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    backgroundColor: 'white',
    width: (width - 48) / 2,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
    elevation: 2,
  },
  statEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#4CAF50',
    textAlign: 'center',
  },
  progressCard: {
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 3,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 16,
  },
  progressCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 8,
    borderColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  progressPercentage: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  progressSubtext: {
    fontSize: 12,
    color: '#4CAF50',
  },
  progressInfo: {
    fontSize: 14,
    color: '#4CAF50',
  },
  targetCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    elevation: 2,
  },
  targetTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 12,
  },
  targetDate: {
    fontSize: 14,
    color: '#4CAF50',
    marginBottom: 4,
  },
  targetDays: {
    fontSize: 14,
    color: '#FF9800',
    marginBottom: 4,
    fontWeight: '600',
  },
  targetRemaining: {
    fontSize: 14,
    color: '#F44336',
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 16,
  },
  districtCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
  },
  districtHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  districtName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  districtPercentage: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  districtProgressBar: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    marginBottom: 8,
    overflow: 'hidden',
  },
  districtProgressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 4,
  },
  districtStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  districtStatsText: {
    fontSize: 12,
    color: '#4CAF50',
  },
  districtRemaining: {
    fontSize: 12,
    color: '#F44336',
  },
  monthCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
  },
  monthHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  monthName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  monthPercentage: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  monthProgressBar: {
    height: 6,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
    marginBottom: 8,
    overflow: 'hidden',
  },
  monthProgressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 3,
  },
  monthStats: {
    fontSize: 12,
    color: '#4CAF50',
  },
  alertCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    marginBottom: 12,
    elevation: 2,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 8,
  },
  alertMessage: {
    fontSize: 14,
    color: '#4CAF50',
    marginBottom: 12,
    lineHeight: 20,
  },
  alertButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  alertButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default DashboardScreen;
