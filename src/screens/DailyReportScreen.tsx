import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Alert,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

interface DailyReportScreenProps {
  onBack?: () => void;
}

const DailyReportScreen: React.FC<DailyReportScreenProps> = ({ onBack }) => {
  const [selectedDate, setSelectedDate] = useState('2024-12-16');
  const [reportType, setReportType] = useState('summary');

  // Sample daily progress data
  const dailyData = {
    date: '2024-12-16',
    summary: {
      totalSchools: 176,
      activeSchools: 142,
      totalUploads: 1265,
      newUploadsToday: 89,
      targetAchievement: 78.5,
      topPerformer: 'रायपुर ब्लॉक',
      needsAttention: 'कोरबा ब्लॉक',
    },
    blockWiseData: [
      {
        blockName: 'रायपुर ब्लॉक',
        schools: 45,
        activeToday: 38,
        uploadsToday: 28,
        totalUploads: 421,
        achievement: 92.5,
        trend: 'up',
        issues: 0,
      },
      {
        blockName: 'भिलाई ब्लॉक',
        schools: 52,
        activeToday: 41,
        uploadsToday: 22,
        totalUploads: 389,
        achievement: 78.8,
        trend: 'stable',
        issues: 2,
      },
      {
        blockName: 'दुर्ग ब्लॉक',
        schools: 38,
        activeToday: 28,
        uploadsToday: 18,
        totalUploads: 267,
        achievement: 65.2,
        trend: 'down',
        issues: 5,
      },
      {
        blockName: 'कोरबा ब्लॉक',
        schools: 41,
        activeToday: 35,
        uploadsToday: 21,
        totalUploads: 188,
        achievement: 44.8,
        trend: 'down',
        issues: 8,
      },
    ],
    hourlyActivity: [
      { hour: '09:00', uploads: 12 },
      { hour: '10:00', uploads: 18 },
      { hour: '11:00', uploads: 15 },
      { hour: '12:00', uploads: 9 },
      { hour: '13:00', uploads: 6 },
      { hour: '14:00', uploads: 14 },
      { hour: '15:00', uploads: 10 },
      { hour: '16:00', uploads: 5 },
    ],
    alerts: [
      {
        type: 'critical',
        message: 'कोरबा ब्लॉक में 8 स्कूल निष्क्रिय',
        timestamp: '14:30',
      },
      {
        type: 'warning',
        message: 'दुर्ग ब्लॉक में लक्ष्य से 20% पीछे',
        timestamp: '13:15',
      },
      {
        type: 'success',
        message: 'रायपुर ब्लॉक ने दैनिक लक्ष्य पूरा किया',
        timestamp: '12:45',
      },
    ],
    teacherActivity: {
      mostActive: 'श्री राम कुमार शर्मा (28 uploads)',
      newTeachers: 3,
      inactiveTeachers: 12,
    }
  };

  const reportTypes = [
    { id: 'summary', label: '📊 सारांश', icon: '📋' },
    { id: 'detailed', label: '📈 विस्तृत', icon: '📊' },
    { id: 'comparative', label: '🔍 तुलनात्मक', icon: '⚖️' },
    { id: 'trends', label: '📈 ट्रेंड्स', icon: '📉' },
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return '📈';
      case 'down': return '📉';
      case 'stable': return '➡️';
      default: return '📊';
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return '#4CAF50';
      case 'down': return '#F44336';
      case 'stable': return '#FF9800';
      default: return '#666';
    }
  };

  const getAchievementColor = (achievement: number) => {
    if (achievement >= 90) return '#4CAF50';
    if (achievement >= 70) return '#8BC34A';
    if (achievement >= 50) return '#FF9800';
    return '#F44336';
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'critical': return '#F44336';
      case 'warning': return '#FF9800';
      case 'success': return '#4CAF50';
      default: return '#666';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical': return '🚨';
      case 'warning': return '⚠️';
      case 'success': return '✅';
      default: return 'ℹ️';
    }
  };

  const handleExportReport = () => {
    Alert.alert(
      'रिपोर्ट एक्सपोर्ट करें',
      'किस फॉर्मेट में रिपोर्ट एक्सपोर्ट करना चाहते हैं?',
      [
        { text: 'PDF रिपोर्ट', onPress: () => Alert.alert('सफलता!', 'PDF रिपोर्ट जेनरेट हो गई') },
        { text: 'Excel डेटा', onPress: () => Alert.alert('सफलता!', 'Excel फाइल तैयार हो गई') },
        { text: 'Email भेजें', onPress: () => Alert.alert('ईमेल', 'रिपोर्ट ईमेल भेजी जा रही है') },
        { text: 'रद्द करें', style: 'cancel' },
      ]
    );
  };

  const handleShareReport = () => {
    Alert.alert(
      'रिपोर्ट साझा करें',
      'रिपोर्ट किसके साथ साझा करना चाहते हैं?',
      [
        { text: 'WhatsApp', onPress: () => Alert.alert('WhatsApp', 'WhatsApp पर भेजी जा रही है') },
        { text: 'Email', onPress: () => Alert.alert('Email', 'ईमेल भेजी जा रही है') },
        { text: 'सभी अधिकारी', onPress: () => Alert.alert('सफलता!', 'सभी संबंधित अधिकारियों को भेजी गई') },
        { text: 'रद्द करें', style: 'cancel' },
      ]
    );
  };

  const handleScheduleReport = () => {
    Alert.alert(
      'ऑटो रिपोर्ट शेड्यूल करें',
      'दैनिक रिपोर्ट को ऑटोमेटिक भेजने की सेटिंग करें',
      [
        { text: 'रोज सुबह 9 बजे', onPress: () => Alert.alert('शेड्यूल', 'दैनिक 9 AM रिपोर्ट सेट की गई') },
        { text: 'रोज शाम 6 बजे', onPress: () => Alert.alert('शेड्यूल', 'दैनिक 6 PM रिपोर्ट सेट की गई') },
        { text: 'कस्टम टाइम', onPress: () => Alert.alert('कस्टम', 'कस्टम टाइम सेटिंग जल्द आएगी') },
        { text: 'रद्द करें', style: 'cancel' },
      ]
    );
  };

  const renderSummaryView = () => (
    <View style={styles.contentContainer}>
      {/* Key Metrics */}
      <View style={styles.metricsContainer}>
        <Text style={styles.sectionTitle}>📊 मुख्य मेट्रिक्स</Text>
        <View style={styles.metricsGrid}>
          <View style={styles.metricCard}>
            <Text style={styles.metricIcon}>🏫</Text>
            <Text style={styles.metricValue}>{dailyData.summary.activeSchools}/{dailyData.summary.totalSchools}</Text>
            <Text style={styles.metricLabel}>सक्रिय स्कूल</Text>
          </View>
          
          <View style={styles.metricCard}>
            <Text style={styles.metricIcon}>📸</Text>
            <Text style={styles.metricValue}>{dailyData.summary.newUploadsToday}</Text>
            <Text style={styles.metricLabel}>आज के अपलोड</Text>
          </View>
          
          <View style={styles.metricCard}>
            <Text style={styles.metricIcon}>🎯</Text>
            <Text style={[styles.metricValue, { color: getAchievementColor(dailyData.summary.targetAchievement) }]}>
              {dailyData.summary.targetAchievement}%
            </Text>
            <Text style={styles.metricLabel}>लक्ष्य प्राप्ति</Text>
          </View>
          
          <View style={styles.metricCard}>
            <Text style={styles.metricIcon}>📈</Text>
            <Text style={styles.metricValue}>{dailyData.summary.totalUploads}</Text>
            <Text style={styles.metricLabel}>कुल अपलोड</Text>
          </View>
        </View>
      </View>

      {/* Block Performance */}
      <View style={styles.blockPerformanceContainer}>
        <Text style={styles.sectionTitle}>🏛️ ब्लॉक-वार प्रदर्शन</Text>
        {dailyData.blockWiseData.map((block, index) => (
          <View key={index} style={styles.blockCard}>
            <View style={styles.blockHeader}>
              <Text style={styles.blockName}>{block.blockName}</Text>
              <View style={styles.trendIndicator}>
                <Text style={styles.trendIcon}>{getTrendIcon(block.trend)}</Text>
                <Text style={[styles.achievementText, { color: getAchievementColor(block.achievement) }]}>
                  {block.achievement}%
                </Text>
              </View>
            </View>
            
            <View style={styles.blockStats}>
              <View style={styles.blockStat}>
                <Text style={styles.blockStatValue}>{block.activeToday}/{block.schools}</Text>
                <Text style={styles.blockStatLabel}>सक्रिय स्कूल</Text>
              </View>
              
              <View style={styles.blockStat}>
                <Text style={styles.blockStatValue}>{block.uploadsToday}</Text>
                <Text style={styles.blockStatLabel}>आज अपलोड</Text>
              </View>
              
              <View style={styles.blockStat}>
                <Text style={[styles.blockStatValue, { color: block.issues > 0 ? '#F44336' : '#4CAF50' }]}>
                  {block.issues}
                </Text>
                <Text style={styles.blockStatLabel}>समस्याएं</Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* Hourly Activity Chart */}
      <View style={styles.activityContainer}>
        <Text style={styles.sectionTitle}>⏰ घंटे-वार गतिविधि</Text>
        <View style={styles.chartContainer}>
          {dailyData.hourlyActivity.map((activity, index) => (
            <View key={index} style={styles.chartBar}>
              <View style={[styles.bar, { height: Math.max(activity.uploads * 3, 10) }]} />
              <Text style={styles.chartLabel}>{activity.hour}</Text>
              <Text style={styles.chartValue}>{activity.uploads}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Alerts */}
      <View style={styles.alertsContainer}>
        <Text style={styles.sectionTitle}>🚨 आज की अलर्ट्स</Text>
        {dailyData.alerts.map((alert, index) => (
          <View key={index} style={[styles.alertCard, { borderLeftColor: getAlertColor(alert.type) }]}>
            <Text style={styles.alertIcon}>{getAlertIcon(alert.type)}</Text>
            <View style={styles.alertContent}>
              <Text style={styles.alertMessage}>{alert.message}</Text>
              <Text style={styles.alertTime}>{alert.timestamp}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Text style={styles.backButtonText}>← वापस</Text>
          </TouchableOpacity>
          
          <View style={styles.titleSection}>
            <Text style={styles.title}>📋 Daily Progress Report View/Export</Text>
            <Text style={styles.subtitle}>दैनिक प्रगति रिपोर्ट - {selectedDate}</Text>
          </View>
        </View>

        {/* Date and Report Type Selection */}
        <View style={styles.controlsContainer}>
          <View style={styles.dateSelector}>
            <TouchableOpacity style={styles.dateButton}>
              <Text style={styles.dateButtonText}>📅 {selectedDate}</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.reportTypeScroll}>
            {reportTypes.map((type) => (
              <TouchableOpacity
                key={type.id}
                style={[
                  styles.reportTypeButton,
                  reportType === type.id && styles.activeReportTypeButton
                ]}
                onPress={() => setReportType(type.id)}
              >
                <Text style={styles.reportTypeIcon}>{type.icon}</Text>
                <Text style={[
                  styles.reportTypeText,
                  reportType === type.id && styles.activeReportTypeText
                ]}>
                  {type.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity style={[styles.actionButton, styles.exportButton]} onPress={handleExportReport}>
            <Text style={styles.actionButtonText}>📤 एक्सपोर्ट</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.actionButton, styles.shareButton]} onPress={handleShareReport}>
            <Text style={styles.actionButtonText}>📢 साझा करें</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.actionButton, styles.scheduleButton]} onPress={handleScheduleReport}>
            <Text style={styles.actionButtonText}>⏰ शेड्यूल</Text>
          </TouchableOpacity>
        </View>

        {/* Report Content */}
        {renderSummaryView()}

        <View style={styles.bottomSpace} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3E5F5',
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
  titleSection: {
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: 'white',
    opacity: 0.9,
  },
  controlsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  dateSelector: {
    marginBottom: 15,
  },
  dateButton: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 15,
    alignSelf: 'center',
    elevation: 2,
  },
  dateButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  reportTypeScroll: {
    flexDirection: 'row',
  },
  reportTypeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 15,
    marginRight: 8,
    elevation: 2,
  },
  activeReportTypeButton: {
    backgroundColor: '#9C27B0',
  },
  reportTypeIcon: {
    fontSize: 14,
    marginRight: 5,
  },
  reportTypeText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  activeReportTypeText: {
    color: 'white',
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingBottom: 20,
    justifyContent: 'space-around',
  },
  actionButton: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 15,
    elevation: 2,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  exportButton: {
    backgroundColor: '#4CAF50',
  },
  shareButton: {
    backgroundColor: '#2196F3',
  },
  scheduleButton: {
    backgroundColor: '#FF9800',
  },
  actionButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  contentContainer: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  metricsContainer: {
    marginBottom: 25,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  metricCard: {
    backgroundColor: 'white',
    width: (width - 50) / 2,
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 15,
    marginBottom: 10,
    elevation: 2,
  },
  metricIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  metricValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  metricLabel: {
    fontSize: 11,
    color: '#666',
    textAlign: 'center',
  },
  blockPerformanceContainer: {
    marginBottom: 25,
  },
  blockCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    marginBottom: 10,
    elevation: 2,
    overflow: 'hidden',
  },
  blockHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    padding: 15,
  },
  blockName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  trendIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trendIcon: {
    fontSize: 16,
    marginRight: 5,
  },
  achievementText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  blockStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
  },
  blockStat: {
    alignItems: 'center',
  },
  blockStatValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  blockStatLabel: {
    fontSize: 10,
    color: '#666',
  },
  activityContainer: {
    marginBottom: 25,
  },
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderRadius: 15,
    elevation: 2,
  },
  chartBar: {
    alignItems: 'center',
  },
  bar: {
    backgroundColor: '#9C27B0',
    width: 20,
    borderRadius: 2,
    marginBottom: 5,
  },
  chartLabel: {
    fontSize: 9,
    color: '#666',
    marginBottom: 2,
  },
  chartValue: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#333',
  },
  alertsContainer: {
    marginBottom: 25,
  },
  alertCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 8,
    elevation: 2,
    borderLeftWidth: 4,
    padding: 12,
  },
  alertIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  alertContent: {
    flex: 1,
  },
  alertMessage: {
    fontSize: 13,
    color: '#333',
    fontWeight: '500',
    marginBottom: 3,
  },
  alertTime: {
    fontSize: 11,
    color: '#666',
  },
  bottomSpace: {
    height: 20,
  },
});

export default DailyReportScreen;
