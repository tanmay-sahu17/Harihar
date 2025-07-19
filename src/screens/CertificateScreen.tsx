import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

const CertificateScreen = () => {
  const [selectedCertificate, setSelectedCertificate] = useState<number | null>(null);

  const certificates = [
    {
      id: 1,
      studentName: 'राहुल शर्मा',
      class: '5वीं',
      rollNo: '101',
      treeName: 'आम का पेड़',
      plantDate: '15 जनवरी 2024',
      status: 'तैयार',
      certificateNo: 'EPC/RAI/2024/001',
    },
    {
      id: 2,
      studentName: 'प्रिया वर्मा',
      class: '4थी',
      rollNo: '205',
      treeName: 'नींबू का पेड़',
      plantDate: '20 जनवरी 2024',
      status: 'तैयार',
      certificateNo: 'EPC/RAI/2024/002',
    },
    {
      id: 3,
      studentName: 'अमित कुमार',
      class: '3री',
      rollNo: '156',
      treeName: 'पीपल का पेड़',
      plantDate: '25 जनवरी 2024',
      status: 'प्रक्रिया में',
      certificateNo: 'EPC/RAI/2024/003',
    },
    {
      id: 4,
      studentName: 'सुनीता देवी',
      class: '5वीं',
      rollNo: '089',
      treeName: 'बरगद का पेड़',
      plantDate: '30 जनवरी 2024',
      status: 'तैयार',
      certificateNo: 'EPC/RAI/2024/004',
    },
  ];

  const certificateStats = {
    total: certificates.length,
    ready: certificates.filter(cert => cert.status === 'तैयार').length,
    processing: certificates.filter(cert => cert.status === 'प्रक्रिया में').length,
    downloaded: 2,
  };

  const handleDownload = (certificate: any) => {
    if (certificate.status !== 'तैयार') {
      Alert.alert('त्रुटि', 'यह प्रमाणपत्र अभी तैयार नहीं है');
      return;
    }

    Alert.alert(
      'प्रमाणपत्र डाउनलोड',
      `${certificate.studentName} का प्रमाणपत्र डाउनलोड करें?`,
      [
        {
          text: 'PDF डाउनलोड',
          onPress: () => {
            Alert.alert('डाउनलोड शुरू', 'प्रमाणपत्र डाउनलोड हो रहा है...');
          },
        },
        {
          text: 'शेयर करें',
          onPress: () => {
            Alert.alert('शेयर', 'प्रमाणपत्र शेयर करने के विकल्प खुल रहे हैं...');
          },
        },
        { text: 'रद्द करें', style: 'cancel' },
      ]
    );
  };

  const handleBulkDownload = () => {
    const readyCertificates = certificates.filter(cert => cert.status === 'तैयार');
    
    if (readyCertificates.length === 0) {
      Alert.alert('त्रुटि', 'कोई प्रमाणपत्र तैयार नहीं है');
      return;
    }

    Alert.alert(
      'सभी प्रमाणपत्र डाउनलोड',
      `${readyCertificates.length} प्रमाणपत्र एक साथ डाउनलोड करें?`,
      [
        {
          text: 'हाँ, डाउनलोड करें',
          onPress: () => {
            Alert.alert('डाउनलोड शुरू', 'सभी प्रमाणपत्र डाउनलोड हो रहे हैं...');
          },
        },
        { text: 'रद्द करें', style: 'cancel' },
      ]
    );
  };

  const renderCertificatePreview = (certificate: any) => (
    <View style={styles.previewContainer}>
      <View style={styles.certificatePreview}>
        <Text style={styles.previewTitle}>🏆 प्रमाणपत्र पूर्वावलोकन</Text>
        
        <View style={styles.certificateFrame}>
          <View style={styles.certificateHeader}>
            <Text style={styles.certificateTitle}>🌱 एक पेड़ माँ के नाम</Text>
            <Text style={styles.certificateSubtitle}>प्रमाणपत्र</Text>
          </View>
          
          <View style={styles.certificateBody}>
            <Text style={styles.certificateText}>यह प्रमाणित करता है कि</Text>
            <Text style={styles.studentNameText}>{certificate.studentName}</Text>
            <Text style={styles.certificateText}>कक्षा: {certificate.class} | अनुक्रमांक: {certificate.rollNo}</Text>
            
            <Text style={styles.certificateText}>ने पर्यावरण संरक्षण के लिए</Text>
            <Text style={styles.treeNameText}>{certificate.treeName}</Text>
            <Text style={styles.certificateText}>लगाया है</Text>
            
            <Text style={styles.dateText}>दिनांक: {certificate.plantDate}</Text>
            <Text style={styles.certificateNoText}>प्रमाणपत्र क्रमांक: {certificate.certificateNo}</Text>
          </View>
          
          <View style={styles.certificateFooter}>
            <Text style={styles.signatureText}>प्राचार्य हस्ताक्षर</Text>
            <Text style={styles.schoolStamp}>स्कूल मुहर</Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🏆 प्रमाणपत्र</Text>
        <Text style={styles.headerSubtitle}>छात्रों के प्रमाणपत्र देखें और डाउनलोड करें</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{certificateStats.total}</Text>
            <Text style={styles.statLabel}>कुल</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{certificateStats.ready}</Text>
            <Text style={styles.statLabel}>तैयार</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{certificateStats.processing}</Text>
            <Text style={styles.statLabel}>प्रक्रिया में</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{certificateStats.downloaded}</Text>
            <Text style={styles.statLabel}>डाउनलोड</Text>
          </View>
        </View>

        {/* Bulk Download Button */}
        <TouchableOpacity style={styles.bulkDownloadButton} onPress={handleBulkDownload}>
          <Text style={styles.bulkDownloadText}>📥 सभी तैयार प्रमाणपत्र डाउनलोड करें</Text>
        </TouchableOpacity>

        {/* Certificates List */}
        <Text style={styles.sectionTitle}>छात्रों के प्रमाणपत्र</Text>
        
        {certificates.map((certificate) => (
          <View key={certificate.id} style={styles.certificateCard}>
            <View style={styles.certificateInfo}>
              <View style={styles.certificateMainInfo}>
                <Text style={styles.studentName}>{certificate.studentName}</Text>
                <Text style={styles.classInfo}>कक्षा {certificate.class} | रोल नं. {certificate.rollNo}</Text>
                <Text style={styles.treeInfo}>🌳 {certificate.treeName}</Text>
                <Text style={styles.dateInfo}>रोपण दिनांक: {certificate.plantDate}</Text>
              </View>
              
              <View style={styles.certificateStatus}>
                <View style={[
                  styles.statusBadge, 
                  { backgroundColor: certificate.status === 'तैयार' ? '#4CAF50' : '#FF9800' }
                ]}>
                  <Text style={styles.statusText}>{certificate.status}</Text>
                </View>
              </View>
            </View>

            <View style={styles.certificateActions}>
              <TouchableOpacity 
                style={styles.previewButton}
                onPress={() => setSelectedCertificate(selectedCertificate === certificate.id ? null : certificate.id)}
              >
                <Text style={styles.previewButtonText}>
                  {selectedCertificate === certificate.id ? '⬆️ छुपाएं' : '👁️ देखें'}
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[
                  styles.downloadButton,
                  { opacity: certificate.status === 'तैयार' ? 1 : 0.5 }
                ]}
                onPress={() => handleDownload(certificate)}
                disabled={certificate.status !== 'तैयार'}
              >
                <Text style={styles.downloadButtonText}>📥 डाउनलोड</Text>
              </TouchableOpacity>
            </View>

            {selectedCertificate === certificate.id && renderCertificatePreview(certificate)}
          </View>
        ))}

        {/* Instructions */}
        <View style={styles.instructionsCard}>
          <Text style={styles.instructionsTitle}>📋 निर्देश</Text>
          <Text style={styles.instructionsText}>
            • प्रमाणपत्र PDF फॉर्मेट में डाउनलोड होंगे{'\n'}
            • डाउनलोड किए गए प्रमाणपत्र को प्रिंट कर सकते हैं{'\n'}
            • प्रमाणपत्र में QR कोड से वेरिफिकेशन हो सकता है{'\n'}
            • समस्या होने पर तकनीकी सहायता से संपर्क करें
          </Text>
        </View>

        {/* Help Section */}
        <View style={styles.helpSection}>
          <Text style={styles.helpTitle}>सहायता</Text>
          
          <TouchableOpacity 
            style={styles.helpButton}
            onPress={() => Alert.alert('वीडियो गाइड', 'प्रमाणपत्र डाउनलोड करने की वीडियो गाइड देखें')}
          >
            <Text style={styles.helpEmoji}>🎥</Text>
            <Text style={styles.helpText}>डाउनलोड गाइड देखें</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.helpButton}
            onPress={() => Alert.alert('तकनीकी सहायता', 'प्रमाणपत्र संबंधी समस्या के लिए संपर्क करें')}
          >
            <Text style={styles.helpEmoji}>📞</Text>
            <Text style={styles.helpText}>तकनीकी सहायता</Text>
          </TouchableOpacity>
        </View>
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
    paddingBottom: 24,
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
    textAlign: 'center',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 2,
    elevation: 2,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    color: '#4CAF50',
    textAlign: 'center',
  },
  bulkDownloadButton: {
    backgroundColor: '#2E7D32',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 3,
  },
  bulkDownloadText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 16,
  },
  certificateCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  certificateInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  certificateMainInfo: {
    flex: 1,
  },
  studentName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 4,
  },
  classInfo: {
    fontSize: 14,
    color: '#4CAF50',
    marginBottom: 4,
  },
  treeInfo: {
    fontSize: 14,
    color: '#4CAF50',
    marginBottom: 4,
  },
  dateInfo: {
    fontSize: 12,
    color: '#666',
  },
  certificateStatus: {
    justifyContent: 'center',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  certificateActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  previewButton: {
    backgroundColor: '#E8F5E8',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
    alignItems: 'center',
  },
  previewButtonText: {
    color: '#2E7D32',
    fontSize: 14,
    fontWeight: '600',
  },
  downloadButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
  },
  downloadButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  previewContainer: {
    marginTop: 16,
  },
  certificatePreview: {
    backgroundColor: '#F5F5F5',
    padding: 16,
    borderRadius: 8,
  },
  previewTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 12,
    textAlign: 'center',
  },
  certificateFrame: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#2E7D32',
  },
  certificateHeader: {
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingBottom: 16,
  },
  certificateTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 4,
  },
  certificateSubtitle: {
    fontSize: 16,
    color: '#4CAF50',
  },
  certificateBody: {
    alignItems: 'center',
    marginBottom: 20,
  },
  certificateText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  studentNameText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginVertical: 8,
    textAlign: 'center',
  },
  treeNameText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginVertical: 8,
    textAlign: 'center',
  },
  dateText: {
    fontSize: 12,
    color: '#666',
    marginTop: 12,
  },
  certificateNoText: {
    fontSize: 10,
    color: '#999',
    marginTop: 4,
  },
  certificateFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  signatureText: {
    fontSize: 12,
    color: '#666',
  },
  schoolStamp: {
    fontSize: 12,
    color: '#666',
  },
  instructionsCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
  },
  instructionsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 8,
  },
  instructionsText: {
    fontSize: 14,
    color: '#4CAF50',
    lineHeight: 20,
  },
  helpSection: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    elevation: 2,
  },
  helpTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 12,
  },
  helpButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: '#E8F5E8',
    borderRadius: 8,
    marginBottom: 8,
  },
  helpEmoji: {
    fontSize: 20,
    marginRight: 12,
  },
  helpText: {
    fontSize: 14,
    color: '#2E7D32',
  },
});

export default CertificateScreen;
