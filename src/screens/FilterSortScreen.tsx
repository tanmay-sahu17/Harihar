import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Alert,
  Switch,
} from 'react-native';

interface FilterSortScreenProps {
  onBack?: () => void;
}

const FilterSortScreen: React.FC<FilterSortScreenProps> = ({ onBack }) => {
  const [appliedFilters, setAppliedFilters] = useState({
    dateRange: 'today',
    uploadStatus: 'all',
    performanceLevel: 'all',
    block: 'all',
    cluster: 'all',
  });

  const [sortingOptions, setSortingOptions] = useState({
    sortBy: 'uploadPercentage',
    sortOrder: 'desc',
  });

  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // Sample data with filtering and sorting applied
  const allSchoolsData = [
    {
      id: 1,
      name: 'राजकीय प्राथमिक शाला खुर्सीपार',
      block: 'रायपुर',
      cluster: 'खुर्सीपार',
      uploadPercentage: 92,
      totalStudents: 85,
      uploadedPhotos: 78,
      lastUpload: '2024-12-16',
      performance: 'excellent',
      headTeacher: 'श्री राम कुमार',
    },
    {
      id: 2,
      name: 'राजकीय मध्य शाला देवरी',
      block: 'रायपुर',
      cluster: 'देवरी',
      uploadPercentage: 79,
      totalStudents: 120,
      uploadedPhotos: 95,
      lastUpload: '2024-12-16',
      performance: 'good',
      headTeacher: 'श्रीमती सुनीता देवी',
    },
    {
      id: 3,
      name: 'राजकीय प्राथमिक शाला सिमगा',
      block: 'भिलाई',
      cluster: 'सिमगा',
      uploadPercentage: 65,
      totalStudents: 65,
      uploadedPhotos: 42,
      lastUpload: '2024-12-15',
      performance: 'average',
      headTeacher: 'श्री अजय सिंह',
    },
    {
      id: 4,
      name: 'राजकीय उच्च प्राथमिक शाला नांदगांव',
      block: 'दुर्ग',
      cluster: 'नांदगांव',
      uploadPercentage: 37,
      totalStudents: 95,
      uploadedPhotos: 35,
      lastUpload: '2024-12-14',
      performance: 'poor',
      headTeacher: 'श्री विकास गुप्ता',
    },
    {
      id: 5,
      name: 'राजकीय प्राथमिक शाला भिलाई',
      block: 'कोरबा',
      cluster: 'भिलाई',
      uploadPercentage: 19,
      totalStudents: 78,
      uploadedPhotos: 15,
      lastUpload: '2024-12-13',
      performance: 'critical',
      headTeacher: 'श्रीमती प्रिया मिश्रा',
    },
  ];

  const filterOptions = {
    dateRange: [
      { id: 'today', label: 'आज', icon: '📅' },
      { id: 'week', label: 'इस सप्ताह', icon: '🗓️' },
      { id: 'month', label: 'इस महीने', icon: '📆' },
      { id: 'quarter', label: 'तिमाही', icon: '🗓️' },
      { id: 'year', label: 'वार्षिक', icon: '📅' },
    ],
    uploadStatus: [
      { id: 'all', label: 'सभी', icon: '📊' },
      { id: 'completed', label: 'पूर्ण (90%+)', icon: '✅' },
      { id: 'inProgress', label: 'प्रगति में (50-89%)', icon: '🔄' },
      { id: 'pending', label: 'बकाया (<50%)', icon: '⏳' },
      { id: 'notStarted', label: 'शुरू नहीं हुआ (0%)', icon: '❌' },
    ],
    performanceLevel: [
      { id: 'all', label: 'सभी स्तर', icon: '📈' },
      { id: 'excellent', label: 'उत्कृष्ट', icon: '🌟', color: '#4CAF50' },
      { id: 'good', label: 'अच्छा', icon: '👍', color: '#8BC34A' },
      { id: 'average', label: 'औसत', icon: '📊', color: '#FF9800' },
      { id: 'poor', label: 'सुधार चाहिए', icon: '⚠️', color: '#F44336' },
      { id: 'critical', label: 'गंभीर', icon: '🚨', color: '#D32F2F' },
    ],
    blocks: [
      { id: 'all', label: 'सभी ब्लॉक' },
      { id: 'raipur', label: 'रायपुर ब्लॉक' },
      { id: 'bhilai', label: 'भिलाई ब्लॉक' },
      { id: 'durg', label: 'दुर्ग ब्लॉक' },
      { id: 'korba', label: 'कोरबा ब्लॉक' },
    ],
    clusters: [
      { id: 'all', label: 'सभी क्लस्टर' },
      { id: 'khursipar', label: 'खुर्सीपार' },
      { id: 'devri', label: 'देवरी' },
      { id: 'simga', label: 'सिमगा' },
      { id: 'nandgaon', label: 'नांदगांव' },
      { id: 'bhilai', label: 'भिलाई' },
    ],
  };

  const sortOptions = [
    { id: 'uploadPercentage', label: 'अपलोड प्रतिशत', icon: '📊' },
    { id: 'totalStudents', label: 'कुल छात्र संख्या', icon: '👨‍🎓' },
    { id: 'uploadedPhotos', label: 'अपलोड की गई फोटो', icon: '📸' },
    { id: 'lastUpload', label: 'अंतिम अपलोड', icon: '⏰' },
    { id: 'schoolName', label: 'स्कूल का नाम', icon: '🏫' },
    { id: 'block', label: 'ब्लॉक', icon: '📍' },
  ];

  const applyFiltersAndSort = () => {
    let filteredData = [...allSchoolsData];

    // Apply filters
    if (appliedFilters.block !== 'all') {
      // Filter by block logic here
    }
    
    if (appliedFilters.performanceLevel !== 'all') {
      filteredData = filteredData.filter(school => school.performance === appliedFilters.performanceLevel);
    }

    // Apply sorting
    filteredData.sort((a, b) => {
      let comparison = 0;
      
      switch (sortingOptions.sortBy) {
        case 'uploadPercentage':
          comparison = a.uploadPercentage - b.uploadPercentage;
          break;
        case 'totalStudents':
          comparison = a.totalStudents - b.totalStudents;
          break;
        case 'uploadedPhotos':
          comparison = a.uploadedPhotos - b.uploadedPhotos;
          break;
        case 'schoolName':
          comparison = a.name.localeCompare(b.name);
          break;
        default:
          comparison = 0;
      }

      return sortingOptions.sortOrder === 'desc' ? -comparison : comparison;
    });

    return filteredData;
  };

  const filteredAndSortedData = applyFiltersAndSort();

  const handleFilterChange = (filterType: string, value: string) => {
    setAppliedFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleSortChange = (sortBy: string) => {
    setSortingOptions(prev => ({
      ...prev,
      sortBy
    }));
  };

  const toggleSortOrder = () => {
    setSortingOptions(prev => ({
      ...prev,
      sortOrder: prev.sortOrder === 'asc' ? 'desc' : 'asc'
    }));
  };

  const clearAllFilters = () => {
    setAppliedFilters({
      dateRange: 'today',
      uploadStatus: 'all',
      performanceLevel: 'all',
      block: 'all',
      cluster: 'all',
    });
    setSortingOptions({
      sortBy: 'uploadPercentage',
      sortOrder: 'desc',
    });
    Alert.alert('फिल्टर साफ किए गए', 'सभी फिल्टर और सॉर्टिंग रीसेट हो गए हैं');
  };

  const saveFilterPreset = () => {
    Alert.alert(
      'फिल्टर प्रीसेट सेव करें',
      'क्या आप वर्तमान फिल्टर सेटिंग को सेव करना चाहते हैं?',
      [
        { text: 'रद्द करें', style: 'cancel' },
        { text: 'सेव करें', onPress: () => Alert.alert('सफलता!', 'फिल्टर प्रीसेट सेव हो गया') }
      ]
    );
  };

  const exportFilteredData = () => {
    Alert.alert(
      'डेटा एक्सपोर्ट करें',
      'फिल्टर किए गए डेटा को किस फॉर्मेट में एक्सपोर्ट करें?',
      [
        { text: 'Excel', onPress: () => Alert.alert('सफलता!', 'Excel file generated') },
        { text: 'PDF', onPress: () => Alert.alert('सफलता!', 'PDF report generated') },
        { text: 'CSV', onPress: () => Alert.alert('सफलता!', 'CSV file generated') },
        { text: 'रद्द करें', style: 'cancel' }
      ]
    );
  };

  const getPerformanceColor = (performance: string) => {
    switch (performance) {
      case 'excellent': return '#4CAF50';
      case 'good': return '#8BC34A';
      case 'average': return '#FF9800';
      case 'poor': return '#F44336';
      case 'critical': return '#D32F2F';
      default: return '#666';
    }
  };

  const renderFilterSection = (title: string, filterKey: string, options: any[]) => {
    return (
      <View style={styles.filterSection}>
        <Text style={styles.filterSectionTitle}>{title}</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterOptionsScroll}>
          {options.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.filterOption,
                appliedFilters[filterKey as keyof typeof appliedFilters] === option.id && styles.activeFilterOption
              ]}
              onPress={() => handleFilterChange(filterKey, option.id)}
            >
              {option.icon && <Text style={styles.filterOptionIcon}>{option.icon}</Text>}
              <Text style={[
                styles.filterOptionText,
                appliedFilters[filterKey as keyof typeof appliedFilters] === option.id && styles.activeFilterOptionText
              ]}>
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  };

  const renderSchoolResultCard = (school: any) => {
    return (
      <View key={school.id} style={styles.resultCard}>
        <View style={styles.resultHeader}>
          <View style={styles.schoolInfo}>
            <Text style={styles.schoolName}>{school.name}</Text>
            <Text style={styles.locationInfo}>📍 {school.block} ब्लॉक, {school.cluster} क्लस्टर</Text>
          </View>
          <View style={styles.performanceIndicator}>
            <Text style={styles.percentageText}>{school.uploadPercentage}%</Text>
            <View style={[styles.performanceDot, { backgroundColor: getPerformanceColor(school.performance) }]} />
          </View>
        </View>

        <View style={styles.resultStats}>
          <View style={styles.statItem}>
            <Text style={styles.statIcon}>👨‍🎓</Text>
            <Text style={styles.statValue}>{school.totalStudents}</Text>
            <Text style={styles.statLabel}>छात्र</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statIcon}>📸</Text>
            <Text style={styles.statValue}>{school.uploadedPhotos}</Text>
            <Text style={styles.statLabel}>फोटो</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statIcon}>⏰</Text>
            <Text style={styles.statValue}>{school.lastUpload}</Text>
            <Text style={styles.statLabel}>अंतिम</Text>
          </View>
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
            <Text style={styles.title}>🔍 Filtering + Sorting Options</Text>
            <Text style={styles.subtitle}>डेटा फिल्टरिंग और सॉर्टिंग टूल</Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsContainer}>
          <TouchableOpacity style={styles.quickActionButton} onPress={clearAllFilters}>
            <Text style={styles.quickActionText}>🗑️ सभी साफ करें</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.quickActionButton} onPress={saveFilterPreset}>
            <Text style={styles.quickActionText}>💾 प्रीसेट सेव करें</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.quickActionButton} onPress={exportFilteredData}>
            <Text style={styles.quickActionText}>📤 एक्सपोर्ट करें</Text>
          </TouchableOpacity>
        </View>

        {/* Advanced Filters Toggle */}
        <View style={styles.advancedToggle}>
          <TouchableOpacity 
            style={styles.advancedToggleButton}
            onPress={() => setShowAdvancedFilters(!showAdvancedFilters)}
          >
            <Text style={styles.advancedToggleText}>
              {showAdvancedFilters ? '🔽' : '▶️'} एडवांस्ड फिल्टर
            </Text>
          </TouchableOpacity>
        </View>

        {/* Filter Sections */}
        <View style={styles.filtersContainer}>
          {/* Date Range Filter */}
          {renderFilterSection('📅 समय अवधि', 'dateRange', filterOptions.dateRange)}
          
          {/* Upload Status Filter */}
          {renderFilterSection('📊 अपलोड स्थिति', 'uploadStatus', filterOptions.uploadStatus)}
          
          {/* Performance Level Filter */}
          {renderFilterSection('🎯 प्रदर्शन स्तर', 'performanceLevel', filterOptions.performanceLevel)}

          {/* Advanced Filters */}
          {showAdvancedFilters && (
            <>
              {renderFilterSection('🏛️ ब्लॉक', 'block', filterOptions.blocks)}
              {renderFilterSection('📍 क्लस्टर', 'cluster', filterOptions.clusters)}
            </>
          )}
        </View>

        {/* Sorting Options */}
        <View style={styles.sortingContainer}>
          <Text style={styles.sortingSectionTitle}>🔄 सॉर्टिंग विकल्प</Text>
          
          <View style={styles.sortingControls}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.sortOptionsScroll}>
              {sortOptions.map((option) => (
                <TouchableOpacity
                  key={option.id}
                  style={[
                    styles.sortOption,
                    sortingOptions.sortBy === option.id && styles.activeSortOption
                  ]}
                  onPress={() => handleSortChange(option.id)}
                >
                  <Text style={styles.sortOptionIcon}>{option.icon}</Text>
                  <Text style={[
                    styles.sortOptionText,
                    sortingOptions.sortBy === option.id && styles.activeSortOptionText
                  ]}>
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            
            <TouchableOpacity style={styles.sortOrderButton} onPress={toggleSortOrder}>
              <Text style={styles.sortOrderText}>
                {sortingOptions.sortOrder === 'asc' ? '⬆️ बढ़ते क्रम में' : '⬇️ घटते क्रम में'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Results Summary */}
        <View style={styles.resultsSummary}>
          <Text style={styles.summaryText}>
            📋 परिणाम: {filteredAndSortedData.length}/{allSchoolsData.length} स्कूल
          </Text>
        </View>

        {/* Filtered Results */}
        <View style={styles.resultsContainer}>
          <Text style={styles.resultsTitle}>📊 फिल्टर किए गए परिणाम</Text>
          
          {filteredAndSortedData.length > 0 ? (
            filteredAndSortedData.map(renderSchoolResultCard)
          ) : (
            <View style={styles.emptyResults}>
              <Text style={styles.emptyIcon}>🔍</Text>
              <Text style={styles.emptyTitle}>कोई परिणाम नहीं मिला</Text>
              <Text style={styles.emptyText}>कृपया अलग फिल्टर का प्रयास करें</Text>
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
  quickActionsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 15,
    justifyContent: 'space-around',
  },
  quickActionButton: {
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 15,
    elevation: 2,
  },
  quickActionText: {
    fontSize: 12,
    color: '#9C27B0',
    fontWeight: 'bold',
  },
  advancedToggle: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  advancedToggleButton: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 15,
    elevation: 2,
  },
  advancedToggleText: {
    fontSize: 14,
    color: '#666',
    fontWeight: 'bold',
  },
  filtersContainer: {
    paddingHorizontal: 20,
  },
  filterSection: {
    marginBottom: 20,
  },
  filterSectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  filterOptionsScroll: {
    flexDirection: 'row',
  },
  filterOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 15,
    marginRight: 8,
    elevation: 2,
  },
  activeFilterOption: {
    backgroundColor: '#9C27B0',
  },
  filterOptionIcon: {
    fontSize: 14,
    marginRight: 5,
  },
  filterOptionText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  activeFilterOptionText: {
    color: 'white',
  },
  sortingContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sortingSectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  sortingControls: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    elevation: 2,
  },
  sortOptionsScroll: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  sortOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    marginRight: 8,
  },
  activeSortOption: {
    backgroundColor: '#9C27B0',
  },
  sortOptionIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  sortOptionText: {
    fontSize: 11,
    color: '#666',
  },
  activeSortOptionText: {
    color: 'white',
  },
  sortOrderButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: 'center',
  },
  sortOrderText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  resultsSummary: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  summaryText: {
    fontSize: 14,
    color: '#666',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  resultsContainer: {
    paddingHorizontal: 20,
  },
  resultsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  resultCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    marginBottom: 10,
    elevation: 2,
    overflow: 'hidden',
  },
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#F8F9FA',
  },
  schoolInfo: {
    flex: 1,
  },
  schoolName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 3,
  },
  locationInfo: {
    fontSize: 11,
    color: '#666',
  },
  performanceIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  percentageText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 5,
  },
  performanceDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  resultStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  statItem: {
    alignItems: 'center',
  },
  statIcon: {
    fontSize: 16,
    marginBottom: 2,
  },
  statValue: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
  },
  statLabel: {
    fontSize: 9,
    color: '#666',
  },
  emptyResults: {
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

export default FilterSortScreen;
