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

interface BlockProgressScreenProps {
  onBack?: () => void;
}

const BlockProgressScreen: React.FC<BlockProgressScreenProps> = ({ onBack }) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('today');

  // Sample block-wise progress data
  const blockProgress = [
    {
      blockName: 'रायपुर ब्लॉक',
      totalSchools: 45,
      uploadedSchools: 38,
      totalStudents: 1250,
      uploadedPhotos: 1050,
      percentage: 84,
      status: 'excellent',
      lastUpdated: '2024-12-16 14:30',
      clusters: 6,
      activeTeachers: 67,
    },
    {
      blockName: 'भिलाई ब्लॉक',
      totalSchools: 52,
      uploadedSchools: 41,
      totalStudents: 1480,
      uploadedPhotos: 1180,
      percentage: 79,
      status: 'good',
      lastUpdated: '2024-12-16 13:45',
      clusters: 7,
      activeTeachers: 74,
    },
    {
      blockName: 'दुर्ग ब्लॉक',
      totalSchools: 38,
      uploadedSchools: 25,
      totalStudents: 980,
      uploadedPhotos: 650,
      percentage: 66,
      status: 'average',
      lastUpdated: '2024-12-16 12:15',
      clusters: 5,
      activeTeachers: 52,
    },
    {
      blockName: 'कोरबा ब्लॉक',
      totalSchools: 41,
      uploadedSchools: 18,
      totalStudents: 1120,
      uploadedPhotos: 490,
      percentage: 44,
      status: 'poor',
      lastUpdated: '2024-12-16 10:30',
      clusters: 6,
      activeTeachers: 58,
    },
  ];

  const timeframes = [
    { id: 'today', label: 'आज' },
    { id: 'week', label: 'इस सप्ताह' },
    { id: 'month', label: 'इस महीने' },
    { id: 'quarter', label: 'तिमाही' },
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
      case 'excellent': return '🌟 उत्कृष्ट';
      case 'good': return '👍 अच्छा';
      case 'average': return '📊 औसत';
      case 'poor': return '⚠️ सुधार चाहिए';
      default: return '-';
    }
  };

  const calculateTotalStats = () => {
    const totals = blockProgress.reduce((acc, block) => ({
      schools: acc.schools + block.totalSchools,
      uploadedSchools: acc.uploadedSchools + block.uploadedSchools,
      students: acc.students + block.totalStudents,
      photos: acc.photos + block.uploadedPhotos,
      clusters: acc.clusters + block.clusters,
      teachers: acc.teachers + block.activeTeachers,
    }), { schools: 0, uploadedSchools: 0, students: 0, photos: 0, clusters: 0, teachers: 0 });

    const overallPercentage = Math.round((totals.uploadedSchools / totals.schools) * 100);
    
    return { ...totals, overallPercentage };
  };

  const totalStats = calculateTotalStats();

  const handleExportData = () => {
    Alert.alert(
      'डेटा एक्सपोर्ट करें',
      'आप किस फॉर्मेट में डेटा एक्सपोर्ट करना चाहते हैं?',
      [
        { text: 'Excel', onPress: () => Alert.alert('सफलता!', 'Excel file generated successfully') },
        { text: 'PDF', onPress: () => Alert.alert('सफलता!', 'PDF report generated successfully') },
        { text: 'रद्द करें', style: 'cancel' },
      ]
    );
  };

  const renderBlockCard = (block: any, index: number) => {
    return (
      <TouchableOpacity key={index} style={styles.blockCard}>
        <View style={styles.cardHeader}>
          <View style={styles.blockInfo}>
            <Text style={styles.blockName}>{block.blockName}</Text>
            <Text style={styles.lastUpdated}>Last Updated: {block.lastUpdated}</Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(block.status) }]}>
            <Text style={styles.statusText}>{getStatusText(block.status)}</Text>
          </View>
        </View>

        <View style={styles.progressSection}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { 
              width: `${block.percentage}%`,
              backgroundColor: getStatusColor(block.status)
            }]} />
          </View>
          <Text style={styles.percentageText}>{block.percentage}%</Text>
        </View>

        <View style={styles.statsGrid}>
          <View style={styles.statBox}>
            <Text style={styles.statIcon}>🏫</Text>
            <Text style={styles.statValue}>{block.uploadedSchools}/{block.totalSchools}</Text>
            <Text style={styles.statLabel}>स्कूल अपलोड</Text>
          </View>
          
          <View style={styles.statBox}>
            <Text style={styles.statIcon}>👨‍🎓</Text>
            <Text style={styles.statValue}>{block.uploadedPhotos}</Text>
            <Text style={styles.statLabel}>फोटो अपलोड</Text>
          </View>
          
          <View style={styles.statBox}>
            <Text style={styles.statIcon}>👨‍🏫</Text>
            <Text style={styles.statValue}>{block.activeTeachers}</Text>
            <Text style={styles.statLabel}>सक्रिय शिक्षक</Text>
          </View>
          
          <View style={styles.statBox}>
            <Text style={styles.statIcon}>📍</Text>
            <Text style={styles.statValue}>{block.clusters}</Text>
            <Text style={styles.statLabel}>क्लस्टर</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.detailButton}>
          <Text style={styles.detailButtonText}>📊 विस्तृत रिपोर्ट देखें</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
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
            <Text style={styles.title}>📊 Block-wise Progress Summary</Text>
            <Text style={styles.subtitle}>एक पेड़ माँ के नाम 2.0 - प्रगति रिपोर्ट</Text>
          </View>
        </View>

        {/* Overall Summary */}
        <View style={styles.summaryContainer}>
          <Text style={styles.summaryTitle}>📈 कुल प्रगति सारांश</Text>
          <View style={styles.overallStats}>
            <View style={styles.overallStatBox}>
              <Text style={styles.overallStatValue}>{totalStats.overallPercentage}%</Text>
              <Text style={styles.overallStatLabel}>कुल प्रगति</Text>
            </View>
            <View style={styles.overallStatBox}>
              <Text style={styles.overallStatValue}>{totalStats.uploadedSchools}/{totalStats.schools}</Text>
              <Text style={styles.overallStatLabel}>स्कूल कवरेज</Text>
            </View>
            <View style={styles.overallStatBox}>
              <Text style={styles.overallStatValue}>{totalStats.photos}</Text>
              <Text style={styles.overallStatLabel}>कुल फोटो</Text>
            </View>
            <View style={styles.overallStatBox}>
              <Text style={styles.overallStatValue}>{totalStats.teachers}</Text>
              <Text style={styles.overallStatLabel}>सक्रिय शिक्षक</Text>
            </View>
          </View>
        </View>

        {/* Time Filter */}
        <View style={styles.filterContainer}>
          <Text style={styles.filterTitle}>🕐 समय अवधि चुनें:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.timefilterScroll}>
            {timeframes.map((timeframe) => (
              <TouchableOpacity
                key={timeframe.id}
                style={[
                  styles.timeButton,
                  selectedTimeframe === timeframe.id && styles.activeTimeButton
                ]}
                onPress={() => setSelectedTimeframe(timeframe.id)}
              >
                <Text style={[
                  styles.timeButtonText,
                  selectedTimeframe === timeframe.id && styles.activeTimeButtonText
                ]}>
                  {timeframe.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Block Cards */}
        <View style={styles.blocksContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>🏛️ ब्लॉक-वार प्रदर्शन</Text>
            <TouchableOpacity style={styles.exportButton} onPress={handleExportData}>
              <Text style={styles.exportButtonText}>📤 Export</Text>
            </TouchableOpacity>
          </View>
          
          {blockProgress.map(renderBlockCard)}
        </View>

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
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: 'white',
    opacity: 0.9,
  },
  summaryContainer: {
    backgroundColor: 'white',
    margin: 20,
    padding: 20,
    borderRadius: 15,
    elevation: 3,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#9C27B0',
    marginBottom: 15,
    textAlign: 'center',
  },
  overallStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  overallStatBox: {
    alignItems: 'center',
    flex: 1,
  },
  overallStatValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  overallStatLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  filterContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  timefilterScroll: {
    flexDirection: 'row',
  },
  timeButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'white',
    marginRight: 10,
    elevation: 2,
  },
  activeTimeButton: {
    backgroundColor: '#9C27B0',
  },
  timeButtonText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  activeTimeButtonText: {
    color: 'white',
  },
  blocksContainer: {
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  exportButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#4CAF50',
  },
  exportButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  blockCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    marginBottom: 15,
    elevation: 3,
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    padding: 15,
  },
  blockInfo: {
    flex: 1,
  },
  blockName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 3,
  },
  lastUpdated: {
    fontSize: 12,
    color: '#666',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  statusText: {
    color: 'white',
    fontSize: 11,
    fontWeight: 'bold',
  },
  progressSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    marginRight: 10,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  percentageText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    minWidth: 45,
  },
  statsGrid: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#FAFAFA',
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statIcon: {
    fontSize: 20,
    marginBottom: 5,
  },
  statValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 10,
    color: '#666',
    textAlign: 'center',
  },
  detailButton: {
    backgroundColor: '#9C27B0',
    paddingVertical: 12,
    alignItems: 'center',
  },
  detailButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  bottomSpace: {
    height: 20,
  },
});

export default BlockProgressScreen;
