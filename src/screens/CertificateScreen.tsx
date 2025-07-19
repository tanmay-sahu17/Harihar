import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';

interface CertificateScreenProps {
  onBack?: () => void;
}

const CertificateScreen: React.FC<CertificateScreenProps> = ({ onBack }) => {
  const [isGenerating, setIsGenerating] = useState(false);

  // Sample students with certificate data
  const studentsWithCertificates = [
    {
      id: '1',
      name: 'अमन शर्मा',
      rollNumber: 'R001',
      photoUploaded: true,
      certificateGenerated: true,
      certificateUrl: 'https://example.com/certificate/1.pdf',
      uploadDate: '2024-12-15',
      certificateDate: '2024-12-16',
    },
    {
      id: '2',
      name: 'प्रिया गुप्ता',
      rollNumber: 'R002',
      photoUploaded: true,
      certificateGenerated: true,
      certificateUrl: 'https://example.com/certificate/2.pdf',
      uploadDate: '2024-12-14',
      certificateDate: '2024-12-15',
    },
    {
      id: '3',
      name: 'राहुल वर्मा',
      rollNumber: 'R003',
      photoUploaded: true,
      certificateGenerated: false,
      certificateUrl: null,
      uploadDate: '2024-12-13',
      certificateDate: null,
    },
    {
      id: '5',
      name: 'विकास कुमार',
      rollNumber: 'R005',
      photoUploaded: true,
      certificateGenerated: true,
      certificateUrl: 'https://example.com/certificate/5.pdf',
      uploadDate: '2024-12-11',
      certificateDate: '2024-12-12',
    },
    {
      id: '7',
      name: 'अजय सिंह',
      rollNumber: 'R007',
      photoUploaded: true,
      certificateGenerated: true,
      certificateUrl: 'https://example.com/certificate/7.pdf',
      uploadDate: '2024-12-10',
      certificateDate: '2024-12-11',
    },
    {
      id: '9',
      name: 'रोहित पटेल',
      rollNumber: 'R009',
      photoUploaded: true,
      certificateGenerated: false,
      certificateUrl: null,
      uploadDate: '2024-12-09',
      certificateDate: null,
    },
  ];

  // Calculate stats
  const totalEligible = studentsWithCertificates.length;
  const generatedCount = studentsWithCertificates.filter(s => s.certificateGenerated).length;
  const pendingCount = totalEligible - generatedCount;

  const handleDownloadCertificate = (student: any) => {
    if (student.certificateUrl) {
      Alert.alert(
        'प्रमाणपत्र डाउनलोड',
        `${student.name} का प्रमाणपत्र डाउनलोड किया जा रहा है...`,
        [
          { text: 'रद्द करें', style: 'cancel' },
          { 
            text: 'डाउनलोड करें', 
            onPress: () => {
              // Here you would integrate with actual download functionality
              Alert.alert('सफलता!', 'प्रमाणपत्र डाउनलोड हो गया है');
            }
          },
        ]
      );
    }
  };

  const handleViewCertificate = (student: any) => {
    if (student.certificateUrl) {
      Alert.alert(
        'प्रमाणपत्र देखें',
        `${student.name} का प्रमाणपत्र खोला जा रहा है...`,
        [
          { text: 'बंद करें', style: 'cancel' },
          { 
            text: 'देखें', 
            onPress: () => {
              // Here you would integrate with PDF viewer
              Alert.alert('प्रमाणपत्र', 'PDF व्यूअर में खोला जा रहा है...');
            }
          },
        ]
      );
    }
  };

  const handleGenerateCertificate = (student: any) => {
    if (!student.photoUploaded) {
      Alert.alert('त्रुटि', 'पहले फोटो अपलोड करें फिर प्रमाणपत्र बनवाएं');
      return;
    }

    Alert.alert(
      'प्रमाणपत्र बनाएं',
      `${student.name} के लिए प्रमाणपत्र बनाना चाहते हैं?`,
      [
        { text: 'रद्द करें', style: 'cancel' },
        { 
          text: 'हां, बनाएं', 
          onPress: () => {
            setIsGenerating(true);
            // Simulate certificate generation
            setTimeout(() => {
              setIsGenerating(false);
              Alert.alert(
                'सफलता!',
                `${student.name} का प्रमाणपत्र सफलतापूर्वक बन गया है`,
                [
                  {
                    text: 'ठीक है',
                    onPress: () => {
                      // Update the state to reflect generated certificate
                      // In real app, you would refresh the data from API
                    }
                  }
                ]
              );
            }, 3000);
          }
        },
      ]
    );
  };

  const renderCertificateCard = (student: any) => {
    return (
      <View key={student.id} style={styles.certificateCard}>
        <View style={styles.cardHeader}>
          <View style={styles.studentInfo}>
            <Text style={styles.studentName}>{student.name}</Text>
            <Text style={styles.rollNumber}>रोल नंबर: {student.rollNumber}</Text>
          </View>
          <View style={[
            styles.statusBadge,
            { backgroundColor: student.certificateGenerated ? '#4CAF50' : '#FF9800' }
          ]}>
            <Text style={styles.statusText}>
              {student.certificateGenerated ? '🏆 तैयार' : '⏳ बकाया'}
            </Text>
          </View>
        </View>
        
        <View style={styles.cardBody}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>फोटो अपलोड स्थिति:</Text>
            <Text style={[
              styles.infoValue,
              { color: student.photoUploaded ? '#4CAF50' : '#FF5722' }
            ]}>
              {student.photoUploaded ? '✅ अपलोड किया गया' : '❌ अपलोड नहीं किया'}
            </Text>
          </View>
          
          {student.uploadDate && (
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>फोटो अपलोड दिनांक:</Text>
              <Text style={styles.infoValue}>{student.uploadDate}</Text>
            </View>
          )}
          
          {student.certificateDate && (
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>प्रमाणपत्र बनाने की दिनांक:</Text>
              <Text style={styles.infoValue}>{student.certificateDate}</Text>
            </View>
          )}
        </View>
        
        <View style={styles.actionButtons}>
          {student.certificateGenerated ? (
            <>
              <TouchableOpacity 
                style={[styles.actionButton, styles.viewButton]}
                onPress={() => handleViewCertificate(student)}
              >
                <Text style={styles.actionButtonText}>👁️ देखें</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.actionButton, styles.downloadButton]}
                onPress={() => handleDownloadCertificate(student)}
              >
                <Text style={styles.actionButtonText}>📥 डाउनलोड</Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity 
              style={[
                styles.actionButton, 
                styles.generateButton,
                (!student.photoUploaded || isGenerating) && styles.disabledButton
              ]}
              onPress={() => handleGenerateCertificate(student)}
              disabled={!student.photoUploaded || isGenerating}
            >
              <Text style={styles.actionButtonText}>
                {isGenerating ? '⏳ बनाया जा रहा...' : '🏆 बनाएं'}
              </Text>
            </TouchableOpacity>
          )}
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
            <Text style={styles.title}>🏆 प्रमाणपत्र</Text>
            <Text style={styles.subtitle}>एक पेड़ माँ के नाम 2.0</Text>
          </View>
          
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{totalEligible}</Text>
              <Text style={styles.statLabel}>योग्य छात्र</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{generatedCount}</Text>
              <Text style={styles.statLabel}>बने हुए</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{pendingCount}</Text>
              <Text style={styles.statLabel}>बकाया</Text>
            </View>
          </View>
        </View>

        {/* Instructions */}
        <View style={styles.instructionsContainer}>
          <Text style={styles.instructionsTitle}>📋 महत्वपूर्ण निर्देश:</Text>
          <Text style={styles.instructionText}>• प्रमाणपत्र बनाने के लिए पहले फोटो अपलोड करना जरूरी है</Text>
          <Text style={styles.instructionText}>• प्रमाणपत्र PDF फॉर्मेट में डाउनलोड होगा</Text>
          <Text style={styles.instructionText}>• केवल फोटो अपलोड करने वाले छात्र ही यहां दिखेंगे</Text>
          <Text style={styles.instructionText}>• डाउनलोड किए गए प्रमाणपत्र आपके डिवाइस में save हो जाएंगे</Text>
        </View>

        {/* Certificates List */}
        <View style={styles.certificatesContainer}>
          <Text style={styles.sectionTitle}>
            📜 छात्रों के प्रमाणपत्र ({totalEligible})
          </Text>
          
          {studentsWithCertificates.length > 0 ? (
            studentsWithCertificates.map(renderCertificateCard)
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>📸</Text>
              <Text style={styles.emptyTitle}>कोई छात्र योग्य नहीं है</Text>
              <Text style={styles.emptyText}>
                प्रमाणपत्र बनाने के लिए पहले छात्रों की फोटो अपलोड करें
              </Text>
            </View>
          )}
        </View>

        {/* Bulk Actions */}
        {generatedCount < totalEligible && (
          <View style={styles.bulkActionsContainer}>
            <Text style={styles.bulkTitle}>🔄 सभी के लिए एक साथ:</Text>
            <TouchableOpacity 
              style={[styles.bulkButton, isGenerating && styles.disabledButton]}
              disabled={isGenerating}
            >
              <Text style={styles.bulkButtonText}>
                {isGenerating ? '⏳ सभी प्रमाणपत्र बनाए जा रहे...' : '🏆 सभी प्रमाणपत्र बनाएं'}
              </Text>
            </TouchableOpacity>
          </View>
        )}

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
  instructionsContainer: {
    backgroundColor: '#FFF3E0',
    margin: 20,
    padding: 15,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#FFE0B2',
  },
  instructionsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E65100',
    marginBottom: 10,
  },
  instructionText: {
    fontSize: 14,
    color: '#BF360C',
    marginBottom: 5,
    lineHeight: 20,
  },
  certificatesContainer: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 15,
  },
  certificateCard: {
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
    backgroundColor: '#F3E5F5',
    padding: 15,
  },
  studentInfo: {
    flex: 1,
  },
  studentName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A148C',
    marginBottom: 3,
  },
  rollNumber: {
    fontSize: 14,
    color: '#666',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
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
    flex: 1,
  },
  infoValue: {
    fontSize: 14,
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
  viewButton: {
    backgroundColor: '#2196F3',
  },
  downloadButton: {
    backgroundColor: '#4CAF50',
    borderLeftWidth: 1,
    borderLeftColor: '#F0F0F0',
  },
  generateButton: {
    backgroundColor: '#9C27B0',
  },
  disabledButton: {
    backgroundColor: '#BDBDBD',
    opacity: 0.6,
  },
  actionButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  bulkActionsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  bulkTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 10,
  },
  bulkButton: {
    backgroundColor: '#9C27B0',
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: 'center',
    elevation: 3,
  },
  bulkButtonText: {
    color: 'white',
    fontSize: 16,
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

export default CertificateScreen;
