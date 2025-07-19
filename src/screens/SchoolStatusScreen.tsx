import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Alert,
  TextInput,
} from 'react-native';

interface SchoolStatusScreenProps {
  onBack?: () => void;
}

const SchoolStatusScreen: React.FC<SchoolStatusScreenProps> = ({ onBack }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Sample school data with upload status
  const schoolsData = [
    {
      id: 1,
      name: 'राजकीय प्राथमिक शाला खुर्सीपार',
      udiseCode: '20140304501',
      block: 'रायपुर',
      cluster: 'खुर्सीपार',
      totalStudents: 85,
      uploadedPhotos: 78,
      pendingUploads: 7,
      uploadPercentage: 92,
      status: 'excellent',
      lastUpload: '2024-12-16 14:30',
      headTeacher: 'श्री राम कुमार शर्मा',
      contactNumber: '9876543210',
    },
    {
      id: 2,
      name: 'राजकीय मध्य शाला देवरी',
      udiseCode: '20140304502',
      block: 'रायपुर',
      cluster: 'देवरी',
      totalStudents: 120,
      uploadedPhotos: 95,
      pendingUploads: 25,
      uploadPercentage: 79,
      status: 'good',
      lastUpload: '2024-12-16 13:15',
      headTeacher: 'श्रीमती सुनीता देवी',
      contactNumber: '9876543211',
    },
    {
      id: 3,
      name: 'राजकीय प्राथमिक शाला सिमगा',
      udiseCode: '20140304503',
      block: 'भिलाई',
      cluster: 'सिमगा',
      totalStudents: 65,
      uploadedPhotos: 42,
      pendingUploads: 23,
      uploadPercentage: 65,
      status: 'average',
      lastUpload: '2024-12-16 11:45',
      headTeacher: 'श्री अजय सिंह',
      contactNumber: '9876543212',
    },
    {
      id: 4,
      name: 'राजकीय उच्च प्राथमिक शाला नांदगांव',
      udiseCode: '20140304504',
      block: 'दुर्ग',
      cluster: 'नांदगांव',
      totalStudents: 95,
      uploadedPhotos: 35,
      pendingUploads: 60,
      uploadPercentage: 37,
      status: 'poor',
      lastUpload: '2024-12-15 16:20',
      headTeacher: 'श्री विकास गुप्ता',
      contactNumber: '9876543213',
    },
    {
      id: 5,
      name: 'राजकीय प्राथमिक शाला भिलाई',
      udiseCode: '20140304505',
      block: 'कोरबा',
      cluster: 'भिलाई',
      totalStudents: 78,
      uploadedPhotos: 15,
      pendingUploads: 63,
      uploadPercentage: 19,
      status: 'critical',
      lastUpload: '2024-12-14 09:30',
      headTeacher: 'श्रीमती प्रिया मिश्रा',
      contactNumber: '9876543214',
    },
  ];

  const filterOptions = [
    { id: 'all', label: 'सभी स्कूल', color: '#333' },
    { id: 'excellent', label: 'उत्कृष्ट (90%+)', color: '#4CAF50' },
    { id: 'good', label: 'अच्छा (70-89%)', color: '#8BC34A' },
    { id: 'average', label: 'औसत (50-69%)', color: '#FF9800' },
    { id: 'poor', label: 'सुधार चाहिए (30-49%)', color: '#F44336' },
    { id: 'critical', label: 'गंभीर (<30%)', color: '#D32F2F' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return '#4CAF50';
      case 'good': return '#8BC34A';
      case 'average': return '#FF9800';
      case 'poor': return '#F44336';
      case 'critical': return '#D32F2F';
      default: return '#666';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'excellent': return '🌟';
      case 'good': return '👍';
      case 'average': return '📊';
      case 'poor': return '⚠️';
      case 'critical': return '🚨';
      default: return '❓';
    }
  };

  const getStatusText = (percentage: number) => {
    if (percentage >= 90) return { status: 'excellent', text: 'उत्कृष्ट' };
    if (percentage >= 70) return { status: 'good', text: 'अच्छा' };
    if (percentage >= 50) return { status: 'average', text: 'औसत' };
    if (percentage >= 30) return { status: 'poor', text: 'सुधार चाहिए' };
    return { status: 'critical', text: 'गंभीर स्थिति' };
  };

  const filteredSchools = schoolsData.filter((school) => {
    const matchesSearch = school.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         school.udiseCode.includes(searchQuery) ||
                         school.headTeacher.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedFilter === 'all') return matchesSearch;
    return matchesSearch && school.status === selectedFilter;
  });

  const handleContactSchool = (school: any) => {
    Alert.alert(
      'स्कूल से संपर्क करें',
      `${school.name}\nप्रधान शिक्षक: ${school.headTeacher}\nफोन: ${school.contactNumber}`,
      [
        { text: 'कॉल करें', onPress: () => Alert.alert('कॉल', `कॉल किया जा रहा है: ${school.contactNumber}`) },
        { text: 'SMS भेजें', onPress: () => Alert.alert('SMS', 'अनुस्मारक SMS भेजा गया') },
        { text: 'बंद करें', style: 'cancel' },
      ]
    );
  };

  const renderSchoolCard = (school: any) => {
    const statusInfo = getStatusText(school.uploadPercentage);
    
    return (
      <View key={school.id} style={styles.schoolCard}>
        <View style={styles.cardHeader}>
          <View style={styles.schoolInfo}>
            <Text style={styles.schoolName}>{school.name}</Text>
            <Text style={styles.udiseCode}>UDISE: {school.udiseCode}</Text>
            <Text style={styles.locationInfo}>📍 {school.block} ब्लॉक, {school.cluster} क्लस्टर</Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(statusInfo.status) }]}>
            <Text style={styles.statusEmoji}>{getStatusIcon(statusInfo.status)}</Text>
            <Text style={styles.statusText}>{statusInfo.text}</Text>
          </View>
        </View>

        <View style={styles.progressSection}>
          <View style={styles.progressInfo}>
            <Text style={styles.progressLabel}>फोटो अपलोड प्रगति:</Text>
            <Text style={styles.progressStats}>
              {school.uploadedPhotos}/{school.totalStudents} छात्र
            </Text>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { 
              width: `${school.uploadPercentage}%`,
              backgroundColor: getStatusColor(statusInfo.status)
            }]} />
          </View>
          <Text style={[styles.percentageText, { color: getStatusColor(statusInfo.status) }]}>
            {school.uploadPercentage}%
          </Text>
        </View>

        <View style={styles.detailsSection}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>प्रधान शिक्षक:</Text>
            <Text style={styles.detailValue}>{school.headTeacher}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>अंतिम अपलोड:</Text>
            <Text style={styles.detailValue}>{school.lastUpload}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>बकाया फोटो:</Text>
            <Text style={[styles.detailValue, { 
              color: school.pendingUploads > 20 ? '#F44336' : '#4CAF50' 
            }]}>
              {school.pendingUploads} छात्र
            </Text>
          </View>
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={[styles.actionButton, styles.contactButton]}
            onPress={() => handleContactSchool(school)}
          >
            <Text style={styles.actionButtonText}>📞 संपर्क करें</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.actionButton, styles.detailsButton]}>
            <Text style={styles.actionButtonText}>📊 विस्तृत रिपोर्ट</Text>
          </TouchableOpacity>
        </View>
      </View>
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
            <Text style={styles.title}>🏫 Har School ka Upload Status</Text>
            <Text style={styles.subtitle}>स्कूल-वार फोटो अपलोड स्थिति</Text>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="स्कूल का नाम, UDISE कोड या प्रधान शिक्षक का नाम खोजें..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Filter Options */}
        <View style={styles.filterContainer}>
          <Text style={styles.filterTitle}>📋 स्थिति के अनुसार फिल्टर करें:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
            {filterOptions.map((filter) => (
              <TouchableOpacity
                key={filter.id}
                style={[
                  styles.filterButton,
                  selectedFilter === filter.id && styles.activeFilterButton,
                  { borderColor: filter.color }
                ]}
                onPress={() => setSelectedFilter(filter.id)}
              >
                <Text style={[
                  styles.filterButtonText,
                  selectedFilter === filter.id && { color: 'white' },
                  selectedFilter === filter.id && { backgroundColor: filter.color }
                ]}>
                  {filter.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Results Summary */}
        <View style={styles.summaryContainer}>
          <Text style={styles.summaryText}>
            📊 कुल स्कूल: {schoolsData.length} | फिल्टर परिणाम: {filteredSchools.length}
          </Text>
        </View>

        {/* Schools List */}
        <View style={styles.schoolsContainer}>
          {filteredSchools.length > 0 ? (
            filteredSchools.map(renderSchoolCard)
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>🔍</Text>
              <Text style={styles.emptyTitle}>कोई स्कूल नहीं मिला</Text>
              <Text style={styles.emptyText}>
                कृपया अलग फिल्टर या खोज शब्द का प्रयास करें
              </Text>
            </View>
          )}
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
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: 'white',
    opacity: 0.9,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  searchInput: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 25,
    fontSize: 14,
    elevation: 2,
  },
  filterContainer: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  filterTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  filterScroll: {
    flexDirection: 'row',
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    backgroundColor: 'white',
    marginRight: 8,
    borderWidth: 1,
    elevation: 1,
  },
  activeFilterButton: {
    backgroundColor: '#9C27B0',
  },
  filterButtonText: {
    fontSize: 11,
    color: '#666',
    fontWeight: '500',
  },
  summaryContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  summaryText: {
    fontSize: 14,
    color: '#666',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  schoolsContainer: {
    paddingHorizontal: 20,
  },
  schoolCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    marginBottom: 15,
    elevation: 3,
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: '#F8F9FA',
    padding: 15,
  },
  schoolInfo: {
    flex: 1,
    marginRight: 10,
  },
  schoolName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 3,
  },
  udiseCode: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  locationInfo: {
    fontSize: 12,
    color: '#666',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignItems: 'center',
    minWidth: 60,
  },
  statusEmoji: {
    fontSize: 16,
    marginBottom: 2,
  },
  statusText: {
    color: 'white',
    fontSize: 9,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  progressSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#FAFAFA',
  },
  progressInfo: {
    flex: 1,
  },
  progressLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  progressStats: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  progressBar: {
    width: 80,
    height: 6,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
    marginHorizontal: 10,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  percentageText: {
    fontSize: 14,
    fontWeight: 'bold',
    minWidth: 40,
  },
  detailsSection: {
    padding: 15,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  detailLabel: {
    fontSize: 13,
    color: '#666',
    flex: 1,
  },
  detailValue: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    textAlign: 'right',
  },
  actionButtons: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  actionButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactButton: {
    backgroundColor: '#4CAF50',
  },
  detailsButton: {
    backgroundColor: '#2196F3',
    borderLeftWidth: 1,
    borderLeftColor: '#F0F0F0',
  },
  actionButtonText: {
    color: 'white',
    fontSize: 13,
    fontWeight: 'bold',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 50,
    paddingHorizontal: 20,
  },
  emptyIcon: {
    fontSize: 60,
    marginBottom: 15,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  emptyText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  bottomSpace: {
    height: 20,
  },
});

export default SchoolStatusScreen;
