import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';

interface DataVerificationScreenProps {
  onBack: () => void;
}

const DataVerificationScreen: React.FC<DataVerificationScreenProps> = ({ onBack }) => {
  const [selectedTab, setSelectedTab] = useState<'pending' | 'verified' | 'rejected'>('pending');

  const pendingData = [
    {
      id: 1,
      teacher: 'राधा शर्मा जी',
      school: 'राजकीय प्राथमिक शाला',
      treesCount: 5,
      submittedDate: '2024-01-15',
      type: 'फोटो अपलोड'
    },
    {
      id: 2,
      teacher: 'अजय कुमार जी',
      school: 'गांधी प्राथमिक शाला',
      treesCount: 8,
      submittedDate: '2024-01-14',
      type: 'छात्र डेटा'
    },
    {
      id: 3,
      teacher: 'सुनीता वर्मा जी',
      school: 'सरस्वती विद्या मंदिर',
      treesCount: 3,
      submittedDate: '2024-01-13',
      type: 'फोटो अपलोड'
    }
  ];

  const verifiedData = [
    {
      id: 4,
      teacher: 'विकास गुप्ता जी',
      school: 'आदर्श प्राथमिक शाला',
      treesCount: 12,
      verifiedDate: '2024-01-12',
      type: 'फोटो अपलोड'
    }
  ];

  const rejectedData = [
    {
      id: 5,
      teacher: 'प्रीति पटेल जी',
      school: 'नेहरू बाल शिक्षालय',
      treesCount: 2,
      rejectedDate: '2024-01-11',
      type: 'छात्र डेटा',
      reason: 'अधूरी जानकारी'
    }
  ];

  const handleVerify = (id: number) => {
    console.log('Verified item:', id);
  };

  const handleReject = (id: number) => {
    console.log('Rejected item:', id);
  };

  const renderPendingItems = () => (
    <>
      {pendingData.map((item) => (
        <View key={item.id} style={styles.dataCard}>
          <View style={styles.cardHeader}>
            <View style={styles.teacherInfo}>
              <Text style={styles.teacherName}>{item.teacher}</Text>
              <Text style={styles.schoolName}>{item.school}</Text>
            </View>
            <View style={styles.pendingBadge}>
              <Text style={styles.badgeText}>सत्यापन बाकी</Text>
            </View>
          </View>
          
          <View style={styles.dataDetails}>
            <Text style={styles.dataType}>{item.type}</Text>
            <Text style={styles.treesCount}>पेड़: {item.treesCount}</Text>
            <Text style={styles.dateText}>जमा किया: {item.submittedDate}</Text>
          </View>

          <View style={styles.actionButtons}>
            <TouchableOpacity 
              style={styles.approveButton}
              onPress={() => handleVerify(item.id)}
            >
              <Text style={styles.approveText}>✓ स्वीकार करें</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.rejectButton}
              onPress={() => handleReject(item.id)}
            >
              <Text style={styles.rejectText}>✗ अस्वीकार करें</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </>
  );

  const renderVerifiedItems = () => (
    <>
      {verifiedData.map((item) => (
        <View key={item.id} style={styles.dataCard}>
          <View style={styles.cardHeader}>
            <View style={styles.teacherInfo}>
              <Text style={styles.teacherName}>{item.teacher}</Text>
              <Text style={styles.schoolName}>{item.school}</Text>
            </View>
            <View style={styles.verifiedBadge}>
              <Text style={styles.badgeText}>सत्यापित</Text>
            </View>
          </View>
          
          <View style={styles.dataDetails}>
            <Text style={styles.dataType}>{item.type}</Text>
            <Text style={styles.treesCount}>पेड़: {item.treesCount}</Text>
            <Text style={styles.dateText}>सत्यापित: {item.verifiedDate}</Text>
          </View>
        </View>
      ))}
    </>
  );

  const renderRejectedItems = () => (
    <>
      {rejectedData.map((item) => (
        <View key={item.id} style={styles.dataCard}>
          <View style={styles.cardHeader}>
            <View style={styles.teacherInfo}>
              <Text style={styles.teacherName}>{item.teacher}</Text>
              <Text style={styles.schoolName}>{item.school}</Text>
            </View>
            <View style={styles.rejectedBadge}>
              <Text style={styles.badgeText}>अस्वीकृत</Text>
            </View>
          </View>
          
          <View style={styles.dataDetails}>
            <Text style={styles.dataType}>{item.type}</Text>
            <Text style={styles.treesCount}>पेड़: {item.treesCount}</Text>
            <Text style={styles.dateText}>अस्वीकृत: {item.rejectedDate}</Text>
            <Text style={styles.reasonText}>कारण: {item.reason}</Text>
          </View>
        </View>
      ))}
    </>
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
            <Text style={styles.title}>डेटा सत्यापन</Text>
            <Text style={styles.subtitle}>Data Verification Panel</Text>
          </View>
        </View>

        {/* Summary Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>25</Text>
            <Text style={styles.statLabel}>सत्यापन बाकी</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>156</Text>
            <Text style={styles.statLabel}>सत्यापित</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>8</Text>
            <Text style={styles.statLabel}>अस्वीकृत</Text>
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity 
            style={[styles.tab, selectedTab === 'pending' && styles.activeTab]}
            onPress={() => setSelectedTab('pending')}
          >
            <Text style={[styles.tabText, selectedTab === 'pending' && styles.activeTabText]}>
              सत्यापन बाकी
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, selectedTab === 'verified' && styles.activeTab]}
            onPress={() => setSelectedTab('verified')}
          >
            <Text style={[styles.tabText, selectedTab === 'verified' && styles.activeTabText]}>
              सत्यापित
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, selectedTab === 'rejected' && styles.activeTab]}
            onPress={() => setSelectedTab('rejected')}
          >
            <Text style={[styles.tabText, selectedTab === 'rejected' && styles.activeTabText]}>
              अस्वीकृत
            </Text>
          </TouchableOpacity>
        </View>

        {/* Data List */}
        <View style={styles.section}>
          {selectedTab === 'pending' && renderPendingItems()}
          {selectedTab === 'verified' && renderVerifiedItems()}
          {selectedTab === 'rejected' && renderRejectedItems()}
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
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: '#E3F2FD',
    marginHorizontal: 2,
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: '#2196F3',
  },
  tabText: {
    fontSize: 12,
    color: '#1565C0',
    fontWeight: 'bold',
  },
  activeTabText: {
    color: 'white',
  },
  section: {
    paddingHorizontal: 20,
  },
  dataCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#E3F2FD',
  },
  cardHeader: {
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
  pendingBadge: {
    backgroundColor: '#FF9800',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  verifiedBadge: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  rejectedBadge: {
    backgroundColor: '#F44336',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  dataDetails: {
    marginBottom: 10,
  },
  dataType: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1565C0',
    marginBottom: 5,
  },
  treesCount: {
    fontSize: 14,
    color: '#333',
    marginBottom: 3,
  },
  dateText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 3,
  },
  reasonText: {
    fontSize: 12,
    color: '#F44336',
    fontStyle: 'italic',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  approveButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    flex: 1,
    marginRight: 5,
    alignItems: 'center',
  },
  rejectButton: {
    backgroundColor: '#F44336',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    flex: 1,
    marginLeft: 5,
    alignItems: 'center',
  },
  approveText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  rejectText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  bottomSpace: {
    height: 20,
  },
});

export default DataVerificationScreen;
