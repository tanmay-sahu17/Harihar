import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TextInput,
  Alert,
} from 'react-native';

interface StudentsDataScreenProps {
  onBack?: () => void;
}

const StudentsDataScreen: React.FC<StudentsDataScreenProps> = ({ onBack }) => {
  const [searchText, setSearchText] = useState('');
  const [filterStatus, setFilterStatus] = useState('all'); // all, uploaded, not-uploaded

  // Sample students data
  const studentsData = [
    {
      id: '1',
      name: 'अमन शर्मा',
      rollNumber: 'R001',
      udiseCode: 'UD001',
      pedStatus: 'uploaded',
      certificateStatus: 'generated',
      uploadDate: '2024-12-15',
    },
    {
      id: '2',
      name: 'प्रिया गुप्ता',
      rollNumber: 'R002',
      udiseCode: 'UD002',
      pedStatus: 'uploaded',
      certificateStatus: 'generated',
      uploadDate: '2024-12-14',
    },
    {
      id: '3',
      name: 'राहुल वर्मा',
      rollNumber: 'R003',
      udiseCode: 'UD003',
      pedStatus: 'uploaded',
      certificateStatus: 'not-generated',
      uploadDate: '2024-12-13',
    },
    {
      id: '4',
      name: 'अनीता देवी',
      rollNumber: 'R004',
      udiseCode: 'UD004',
      pedStatus: 'not-uploaded',
      certificateStatus: 'not-generated',
      uploadDate: null,
    },
    {
      id: '5',
      name: 'विकास कुमार',
      rollNumber: 'R005',
      udiseCode: 'UD005',
      pedStatus: 'uploaded',
      certificateStatus: 'generated',
      uploadDate: '2024-12-11',
    },
    {
      id: '6',
      name: 'सुनीता राय',
      rollNumber: 'R006',
      udiseCode: 'UD006',
      pedStatus: 'not-uploaded',
      certificateStatus: 'not-generated',
      uploadDate: null,
    },
    {
      id: '7',
      name: 'अजय सिंह',
      rollNumber: 'R007',
      udiseCode: 'UD007',
      pedStatus: 'uploaded',
      certificateStatus: 'generated',
      uploadDate: '2024-12-10',
    },
    {
      id: '8',
      name: 'पूजा मिश्रा',
      rollNumber: 'R008',
      udiseCode: 'UD008',
      pedStatus: 'not-uploaded',
      certificateStatus: 'not-generated',
      uploadDate: null,
    },
    {
      id: '9',
      name: 'रोहित पटेल',
      rollNumber: 'R009',
      udiseCode: 'UD009',
      pedStatus: 'uploaded',
      certificateStatus: 'not-generated',
      uploadDate: '2024-12-09',
    },
    {
      id: '10',
      name: 'माया शुक्ला',
      rollNumber: 'R010',
      udiseCode: 'UD010',
      pedStatus: 'not-uploaded',
      certificateStatus: 'not-generated',
      uploadDate: null,
    },
  ];

  // Filter students based on search and status
  const filteredStudents = studentsData.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchText.toLowerCase()) ||
                         student.rollNumber.toLowerCase().includes(searchText.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || 
                         (filterStatus === 'uploaded' && student.pedStatus === 'uploaded') ||
                         (filterStatus === 'not-uploaded' && student.pedStatus === 'not-uploaded');
    
    return matchesSearch && matchesFilter;
  });

  // Calculate stats
  const totalStudents = studentsData.length;
  const uploadedCount = studentsData.filter(s => s.pedStatus === 'uploaded').length;
  const certificateCount = studentsData.filter(s => s.certificateStatus === 'generated').length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'uploaded':
      case 'generated':
        return '#4CAF50';
      case 'not-uploaded':
      case 'not-generated':
        return '#FF5722';
      default:
        return '#666';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'uploaded':
        return 'अपलोड किया गया';
      case 'not-uploaded':
        return 'अपलोड नहीं किया';
      case 'generated':
        return 'जेनरेट किया गया';
      case 'not-generated':
        return 'जेनरेट नहीं किया';
      default:
        return status;
    }
  };

  const handleStudentAction = (student: any) => {
    Alert.alert(
      `${student.name} की जानकारी`,
      `रोल नंबर: ${student.rollNumber}\nUDISE कोड: ${student.udiseCode}\nपेड़ स्थिति: ${getStatusText(student.pedStatus)}\nप्रमाणपत्र स्थिति: ${getStatusText(student.certificateStatus)}${student.uploadDate ? `\nअपलोड दिनांक: ${student.uploadDate}` : ''}`,
      [
        { text: 'बंद करें', style: 'cancel' },
        student.pedStatus === 'not-uploaded' && {
          text: 'फोटो अपलोड करें',
          onPress: () => Alert.alert('सुविधा', 'फोटो अपलोड सुविधा जल्दी आएगी!'),
        },
        student.pedStatus === 'uploaded' && student.certificateStatus === 'not-generated' && {
          text: 'प्रमाणपत्र बनाएं',
          onPress: () => Alert.alert('सुविधा', 'प्रमाणपत्र बनाने की सुविधा जल्दी आएगी!'),
        },
      ].filter(Boolean) as any[]
    );
  };

  const renderStudentCard = (student: any) => {
    return (
      <TouchableOpacity 
        key={student.id} 
        style={styles.studentCard}
        onPress={() => handleStudentAction(student)}
      >
        <View style={styles.cardHeader}>
          <View style={styles.studentInfo}>
            <Text style={styles.studentName}>{student.name}</Text>
            <Text style={styles.rollNumber}>रोल नंबर: {student.rollNumber}</Text>
          </View>
          <View style={styles.idContainer}>
            <Text style={styles.studentId}>#{student.id}</Text>
          </View>
        </View>
        
        <View style={styles.cardBody}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>UDISE कोड:</Text>
            <Text style={styles.infoValue}>{student.udiseCode}</Text>
          </View>
          
          <View style={styles.statusRow}>
            <View style={styles.statusItem}>
              <Text style={styles.statusLabel}>पेड़ स्थिति:</Text>
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(student.pedStatus) }]}>
                <Text style={styles.statusText}>
                  {student.pedStatus === 'uploaded' ? '✅ अपलोड किया गया' : '❌ अपलोड नहीं किया'}
                </Text>
              </View>
            </View>
          </View>
          
          <View style={styles.statusRow}>
            <View style={styles.statusItem}>
              <Text style={styles.statusLabel}>प्रमाणपत्र स्थिति:</Text>
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(student.certificateStatus) }]}>
                <Text style={styles.statusText}>
                  {student.certificateStatus === 'generated' ? '🏆 जेनरेट किया गया' : '⏳ जेनरेट नहीं किया'}
                </Text>
              </View>
            </View>
          </View>
          
          {student.uploadDate && (
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>अपलोड दिनांक:</Text>
              <Text style={styles.infoValue}>{student.uploadDate}</Text>
            </View>
          )}
        </View>
        
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>📋 विवरण देखें</Text>
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
            <Text style={styles.title}>👥 छात्र डेटा</Text>
            <Text style={styles.subtitle}>एक पेड़ माँ के नाम 2.0</Text>
          </View>
          
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{totalStudents}</Text>
              <Text style={styles.statLabel}>कुल छात्र</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{uploadedCount}</Text>
              <Text style={styles.statLabel}>अपलोड किया</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{certificateCount}</Text>
              <Text style={styles.statLabel}>प्रमाणपत्र</Text>
            </View>
          </View>
        </View>

        {/* Search and Filter */}
        <View style={styles.searchSection}>
          <View style={styles.searchContainer}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="छात्र का नाम या रोल नंबर खोजें..."
              placeholderTextColor="#999"
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>
          
          <View style={styles.filterContainer}>
            <Text style={styles.filterTitle}>फ़िल्टर:</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <TouchableOpacity 
                style={[styles.filterButton, filterStatus === 'all' && styles.activeFilter]}
                onPress={() => setFilterStatus('all')}
              >
                <Text style={[styles.filterText, filterStatus === 'all' && styles.activeFilterText]}>
                  सभी
                </Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.filterButton, filterStatus === 'uploaded' && styles.activeFilter]}
                onPress={() => setFilterStatus('uploaded')}
              >
                <Text style={[styles.filterText, filterStatus === 'uploaded' && styles.activeFilterText]}>
                  अपलोड किया गया
                </Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.filterButton, filterStatus === 'not-uploaded' && styles.activeFilter]}
                onPress={() => setFilterStatus('not-uploaded')}
              >
                <Text style={[styles.filterText, filterStatus === 'not-uploaded' && styles.activeFilterText]}>
                  अपलोड नहीं किया
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>

        {/* Students List */}
        <View style={styles.studentsContainer}>
          <Text style={styles.resultsCount}>
            {filteredStudents.length} छात्र मिले
          </Text>
          
          {filteredStudents.map(renderStudentCard)}
        </View>

        <View style={styles.bottomSpace} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F5E8',
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
  titleSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
    opacity: 0.9,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 15,
    minWidth: 80,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  statLabel: {
    fontSize: 11,
    color: 'white',
    opacity: 0.9,
  },
  searchSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 15,
    elevation: 2,
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginRight: 10,
  },
  filterButton: {
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#C8E6C9',
  },
  activeFilter: {
    backgroundColor: '#2196F3',
    borderColor: '#2196F3',
  },
  filterText: {
    color: '#2196F3',
    fontSize: 12,
    fontWeight: 'bold',
  },
  activeFilterText: {
    color: 'white',
  },
  studentsContainer: {
    paddingHorizontal: 20,
  },
  resultsCount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 15,
  },
  studentCard: {
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
    backgroundColor: '#F1F8E9',
    padding: 15,
  },
  studentInfo: {
    flex: 1,
  },
  studentName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 3,
  },
  rollNumber: {
    fontSize: 14,
    color: '#666',
  },
  idContainer: {
    backgroundColor: '#E8F5E8',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  studentId: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  cardBody: {
    padding: 15,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  statusRow: {
    marginBottom: 10,
  },
  statusItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusLabel: {
    fontSize: 14,
    color: '#666',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  actionButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  actionButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  bottomSpace: {
    height: 20,
  },
});

export default StudentsDataScreen;
