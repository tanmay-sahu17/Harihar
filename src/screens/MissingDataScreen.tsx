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

interface MissingDataScreenProps {
  onBack?: () => void;
}

const MissingDataScreen: React.FC<MissingDataScreenProps> = ({ onBack }) => {
  const [autoFlaggingEnabled, setAutoFlaggingEnabled] = useState(true);
  const [selectedSeverity, setSelectedSeverity] = useState('all');

  // Sample missing data with auto flagging
  const missingDataFlags = [
    {
      id: 1,
      type: 'school',
      severity: 'critical',
      title: 'स्कूल से कोई फोटो अपलोड नहीं',
      description: 'राजकीय प्राथमिक शाला भंडारपुर से पिछले 7 दिनों में कोई फोटो अपलोड नहीं हुई',
      schoolName: 'राजकीय प्राथमिक शाला भंडारपुर',
      udiseCode: '20140304510',
      block: 'कोरबा',
      cluster: 'भंडारपुर',
      headTeacher: 'श्री रामकृष्ण वर्मा',
      contact: '9876543220',
      lastActivity: '2024-12-09 10:30',
      daysInactive: 7,
      expectedUploads: 85,
      actualUploads: 0,
      flaggedOn: '2024-12-16 09:00',
      actionRequired: 'तत्काल संपर्क करें',
    },
    {
      id: 2,
      type: 'teacher',
      severity: 'high',
      title: 'शिक्षक लगातार अनुपस्थित',
      description: 'श्रीमती सुनीता देवी पिछले 4 दिनों से अपलोड नहीं कर रही',
      schoolName: 'राजकीय मध्य शाला सिमगा',
      udiseCode: '20140304508',
      block: 'रायपुर',
      cluster: 'सिमगा',
      headTeacher: 'श्रीमती सुनीता देवी',
      contact: '9876543218',
      lastActivity: '2024-12-12 14:20',
      daysInactive: 4,
      expectedUploads: 65,
      actualUploads: 42,
      flaggedOn: '2024-12-16 10:30',
      actionRequired: 'अनुस्मारक भेजें',
    },
    {
      id: 3,
      type: 'data',
      severity: 'medium',
      title: 'अधूरी छात्र जानकारी',
      description: '25 छात्रों की फोटो में पेड़ का नाम गायब है',
      schoolName: 'राजकीय उच्च प्राथमिक शाला देवरी',
      udiseCode: '20140304506',
      block: 'भिलाई',
      cluster: 'देवरी',
      headTeacher: 'श्री अजय कुमार',
      contact: '9876543216',
      lastActivity: '2024-12-16 13:45',
      daysInactive: 0,
      expectedUploads: 95,
      actualUploads: 70,
      flaggedOn: '2024-12-16 14:00',
      actionRequired: 'डेटा पूरा करने का निर्देश',
    },
    {
      id: 4,
      type: 'target',
      severity: 'low',
      title: 'मासिक लक्ष्य से पिछड़ाव',
      description: 'स्कूल अपने मासिक लक्ष्य से 15% पीछे है',
      schoolName: 'राजकीय प्राथमिक शाला खुर्सीपार',
      udiseCode: '20140304501',
      block: 'रायपुर',
      cluster: 'खुर्सीपार',
      headTeacher: 'श्री राम प्रकाश',
      contact: '9876543215',
      lastActivity: '2024-12-16 11:20',
      daysInactive: 0,
      expectedUploads: 80,
      actualUploads: 68,
      flaggedOn: '2024-12-16 12:00',
      actionRequired: 'प्रेरणा और सहायता',
    },
    {
      id: 5,
      type: 'quality',
      severity: 'high',
      title: 'फोटो गुणवत्ता की समस्या',
      description: '40% फोटो में स्पष्टता की कमी, पुनः अपलोड आवश्यक',
      schoolName: 'राजकीय मध्य शाला नांदगांव',
      udiseCode: '20140304507',
      block: 'दुर्ग',
      cluster: 'नांदगांव',
      headTeacher: 'श्रीमती प्रिया मिश्रा',
      contact: '9876543217',
      lastActivity: '2024-12-16 09:30',
      daysInactive: 0,
      expectedUploads: 72,
      actualUploads: 72,
      flaggedOn: '2024-12-16 15:00',
      actionRequired: 'तकनीकी सहायता प्रदान करें',
    },
  ];

  const severityOptions = [
    { id: 'all', label: 'सभी समस्याएं', color: '#333' },
    { id: 'critical', label: 'गंभीर', color: '#D32F2F' },
    { id: 'high', label: 'उच्च', color: '#F44336' },
    { id: 'medium', label: 'मध्यम', color: '#FF9800' },
    { id: 'low', label: 'निम्न', color: '#4CAF50' },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return '#D32F2F';
      case 'high': return '#F44336';
      case 'medium': return '#FF9800';
      case 'low': return '#4CAF50';
      default: return '#666';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return '🚨';
      case 'high': return '⚠️';
      case 'medium': return '📢';
      case 'low': return '💡';
      default: return '❓';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'school': return '🏫';
      case 'teacher': return '👨‍🏫';
      case 'data': return '📊';
      case 'target': return '🎯';
      case 'quality': return '📸';
      default: return '❓';
    }
  };

  const filteredFlags = missingDataFlags.filter((flag) => {
    if (selectedSeverity === 'all') return true;
    return flag.severity === selectedSeverity;
  });

  const handleTakeAction = (flag: any) => {
    const actions = [];
    
    if (flag.contact) {
      actions.push({ text: 'कॉल करें', onPress: () => Alert.alert('कॉल', `कॉल किया जा रहा है: ${flag.contact}`) });
      actions.push({ text: 'SMS भेजें', onPress: () => Alert.alert('SMS', 'अनुस्मारक SMS भेजा गया') });
    }
    
    actions.push({ text: 'नोट जोड़ें', onPress: () => Alert.alert('नोट', 'नोट जोड़ने की सुविधा जल्द आएगी') });
    actions.push({ text: 'फ्लैग हटाएं', onPress: () => Alert.alert('सफलता!', 'फ्लैग हटा दिया गया') });
    actions.push({ text: 'रद्द करें', style: 'cancel' as const });

    Alert.alert(
      'कार्रवाई चुनें',
      `${flag.title}\n\n${flag.actionRequired}`,
      actions
    );
  };

  const handleBulkAction = () => {
    Alert.alert(
      'सामूहिक कार्रवाई',
      'सभी फ्लैग्ड स्कूलों को कार्रवाई के लिए चुनें:',
      [
        { text: 'सभी को SMS भेजें', onPress: () => Alert.alert('सफलता!', 'सभी को अनुस्मारक SMS भेजे गए') },
        { text: 'गंभीर मामलों को कॉल करें', onPress: () => Alert.alert('सफलता!', 'गंभीर मामलों में कॉल किए गए') },
        { text: 'रिपोर्ट जेनरेट करें', onPress: () => Alert.alert('रिपोर्ट', 'रिपोर्ट तैयार की जा रही है...') },
        { text: 'रद्द करें', style: 'cancel' },
      ]
    );
  };

  const renderFlagCard = (flag: any) => {
    return (
      <View key={flag.id} style={[styles.flagCard, { borderLeftColor: getSeverityColor(flag.severity) }]}>
        <View style={styles.flagHeader}>
          <View style={styles.flagTitleSection}>
            <View style={styles.iconRow}>
              <Text style={styles.typeIcon}>{getTypeIcon(flag.type)}</Text>
              <Text style={styles.severityIcon}>{getSeverityIcon(flag.severity)}</Text>
            </View>
            <Text style={styles.flagTitle}>{flag.title}</Text>
          </View>
          <View style={[styles.severityBadge, { backgroundColor: getSeverityColor(flag.severity) }]}>
            <Text style={styles.severityText}>{flag.severity.toUpperCase()}</Text>
          </View>
        </View>

        <Text style={styles.flagDescription}>{flag.description}</Text>

        <View style={styles.schoolInfoSection}>
          <View style={styles.schoolInfo}>
            <Text style={styles.schoolName}>{flag.schoolName}</Text>
            <Text style={styles.schoolDetails}>
              📍 {flag.block} ब्लॉक, {flag.cluster} क्लस्टर
            </Text>
            <Text style={styles.schoolDetails}>
              UDISE: {flag.udiseCode}
            </Text>
          </View>
        </View>

        <View style={styles.statsSection}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>अंतिम गतिविधि:</Text>
            <Text style={styles.statValue}>{flag.lastActivity}</Text>
          </View>
          
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>निष्क्रिय दिन:</Text>
            <Text style={[styles.statValue, { 
              color: flag.daysInactive > 5 ? '#F44336' : flag.daysInactive > 2 ? '#FF9800' : '#4CAF50'
            }]}>
              {flag.daysInactive} दिन
            </Text>
          </View>
          
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>प्रगति:</Text>
            <Text style={styles.statValue}>
              {flag.actualUploads}/{flag.expectedUploads}
            </Text>
          </View>
        </View>

        <View style={styles.contactInfo}>
          <Text style={styles.contactLabel}>संपर्क: {flag.headTeacher}</Text>
          <Text style={styles.contactNumber}>📞 {flag.contact}</Text>
        </View>

        <View style={styles.actionSection}>
          <Text style={styles.actionRequired}>🎯 {flag.actionRequired}</Text>
          
          <TouchableOpacity 
            style={[styles.actionButton, { backgroundColor: getSeverityColor(flag.severity) }]}
            onPress={() => handleTakeAction(flag)}
          >
            <Text style={styles.actionButtonText}>कार्रवाई करें</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.flagFooter}>
          <Text style={styles.flaggedTime}>⏰ फ्लैग किया गया: {flag.flaggedOn}</Text>
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
            <Text style={styles.title}>🚩 Auto Flagging Missing Data</Text>
            <Text style={styles.subtitle}>स्वचालित डेटा निगरानी और चेतावनी सिस्टम</Text>
          </View>
        </View>

        {/* Auto Flagging Controls */}
        <View style={styles.controlsContainer}>
          <View style={styles.autoFlaggingControl}>
            <View style={styles.controlInfo}>
              <Text style={styles.controlTitle}>🤖 स्वचालित फ्लैगिंग</Text>
              <Text style={styles.controlSubtitle}>रियल-टाइम डेटा मॉनिटरिंग चालू/बंद करें</Text>
            </View>
            <Switch
              value={autoFlaggingEnabled}
              onValueChange={setAutoFlaggingEnabled}
              trackColor={{ false: '#E0E0E0', true: '#4CAF50' }}
              thumbColor={autoFlaggingEnabled ? '#FFFFFF' : '#FFFFFF'}
            />
          </View>
          
          {autoFlaggingEnabled && (
            <View style={styles.statusIndicator}>
              <Text style={styles.statusText}>🟢 स्वचालित निगरानी चालू - हर 15 मिनट में अपडेट</Text>
            </View>
          )}
        </View>

        {/* Summary Stats */}
        <View style={styles.summaryContainer}>
          <Text style={styles.summaryTitle}>📊 फ्लैग्ड समस्याओं का सारांश</Text>
          <View style={styles.summaryStats}>
            <View style={styles.summaryItem}>
              <Text style={[styles.summaryNumber, { color: '#D32F2F' }]}>
                {missingDataFlags.filter(f => f.severity === 'critical').length}
              </Text>
              <Text style={styles.summaryLabel}>गंभीर</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={[styles.summaryNumber, { color: '#F44336' }]}>
                {missingDataFlags.filter(f => f.severity === 'high').length}
              </Text>
              <Text style={styles.summaryLabel}>उच्च</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={[styles.summaryNumber, { color: '#FF9800' }]}>
                {missingDataFlags.filter(f => f.severity === 'medium').length}
              </Text>
              <Text style={styles.summaryLabel}>मध्यम</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={[styles.summaryNumber, { color: '#4CAF50' }]}>
                {missingDataFlags.filter(f => f.severity === 'low').length}
              </Text>
              <Text style={styles.summaryLabel}>निम्न</Text>
            </View>
          </View>
        </View>

        {/* Severity Filter */}
        <View style={styles.filterContainer}>
          <Text style={styles.filterTitle}>🔍 गंभीरता के आधार पर फिल्टर करें:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
            {severityOptions.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.filterButton,
                  selectedSeverity === option.id && styles.activeFilterButton,
                  { borderColor: option.color }
                ]}
                onPress={() => setSelectedSeverity(option.id)}
              >
                <Text style={[
                  styles.filterButtonText,
                  selectedSeverity === option.id && { color: 'white' }
                ]}>
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Bulk Actions */}
        <View style={styles.bulkActionsContainer}>
          <TouchableOpacity style={styles.bulkActionButton} onPress={handleBulkAction}>
            <Text style={styles.bulkActionText}>⚡ सामूहिक कार्रवाई</Text>
          </TouchableOpacity>
        </View>

        {/* Flagged Issues */}
        <View style={styles.flagsContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              🚨 फ्लैग्ड समस्याएं ({filteredFlags.length})
            </Text>
          </View>
          
          {filteredFlags.length > 0 ? (
            filteredFlags.map(renderFlagCard)
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>✅</Text>
              <Text style={styles.emptyTitle}>कोई समस्या नहीं मिली</Text>
              <Text style={styles.emptyText}>
                इस श्रेणी में कोई फ्लैग्ड समस्या नहीं है
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
    textAlign: 'center',
  },
  controlsContainer: {
    backgroundColor: 'white',
    margin: 20,
    padding: 15,
    borderRadius: 15,
    elevation: 3,
  },
  autoFlaggingControl: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  controlInfo: {
    flex: 1,
  },
  controlTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 3,
  },
  controlSubtitle: {
    fontSize: 12,
    color: '#666',
  },
  statusIndicator: {
    backgroundColor: '#E8F5E8',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    marginTop: 10,
  },
  statusText: {
    fontSize: 12,
    color: '#2E7D32',
    fontWeight: 'bold',
  },
  summaryContainer: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 15,
    borderRadius: 15,
    elevation: 3,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  summaryStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  summaryLabel: {
    fontSize: 12,
    color: '#666',
  },
  filterContainer: {
    paddingHorizontal: 20,
    marginBottom: 15,
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
  bulkActionsContainer: {
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  bulkActionButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    borderRadius: 15,
    alignItems: 'center',
    elevation: 3,
  },
  bulkActionText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  flagsContainer: {
    paddingHorizontal: 20,
  },
  sectionHeader: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  flagCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    marginBottom: 15,
    elevation: 3,
    borderLeftWidth: 4,
    overflow: 'hidden',
  },
  flagHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: '#FAFAFA',
    padding: 15,
  },
  flagTitleSection: {
    flex: 1,
  },
  iconRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  typeIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  severityIcon: {
    fontSize: 18,
  },
  flagTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  severityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  severityText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  flagDescription: {
    fontSize: 14,
    color: '#666',
    paddingHorizontal: 15,
    paddingBottom: 10,
    lineHeight: 20,
  },
  schoolInfoSection: {
    paddingHorizontal: 15,
    paddingBottom: 10,
  },
  schoolInfo: {
    backgroundColor: '#F8F9FA',
    padding: 10,
    borderRadius: 8,
  },
  schoolName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 3,
  },
  schoolDetails: {
    fontSize: 12,
    color: '#666',
    marginBottom: 1,
  },
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#F8F9FA',
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 10,
    color: '#666',
    marginBottom: 2,
  },
  statValue: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
  },
  contactInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  contactLabel: {
    fontSize: 12,
    color: '#666',
  },
  contactNumber: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  actionSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#FAFAFA',
  },
  actionRequired: {
    fontSize: 12,
    color: '#666',
    flex: 1,
    marginRight: 10,
  },
  actionButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 15,
  },
  actionButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  flagFooter: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  flaggedTime: {
    fontSize: 10,
    color: '#999',
    textAlign: 'center',
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

export default MissingDataScreen;
