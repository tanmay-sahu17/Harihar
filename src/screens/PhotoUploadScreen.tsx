import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  TextInput,
  SafeAreaView,
} from 'react-native';

interface PhotoUploadScreenProps {
  onBack?: () => void;
}

const PhotoUploadScreen: React.FC<PhotoUploadScreenProps> = ({ onBack }) => {
  const [selectedStudent, setSelectedStudent] = useState('');
  const [treeName, setTreeName] = useState('');
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Sample student data - इसे आप backend से fetch कर सकते हैं
  const students = [
    { id: '1', name: 'अमन शर्मा' },
    { id: '2', name: 'प्रिया गुप्ता' },
    { id: '3', name: 'राहुल वर्मा' },
    { id: '4', name: 'अनीता देवी' },
    { id: '5', name: 'विकास कुमार' },
    { id: '6', name: 'सुनीता राय' },
    { id: '7', name: 'अजय सिंह' },
    { id: '8', name: 'पूजा मिश्रा' },
    { id: '9', name: 'रोहित पटेल' },
    { id: '10', name: 'माया शुक्ला' },
  ];

  const getCurrentDateTime = () => {
    const now = new Date();
    return now.toLocaleString('hi-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleCameraPress = () => {
    Alert.alert(
      'फोटो चुनें',
      'आप फोटो कैसे लेना चाहते हैं?',
      [
        { text: 'कैमरा', onPress: () => openCamera() },
        { text: 'गैलरी', onPress: () => openGallery() },
        { text: 'रद्द करें', style: 'cancel' },
      ]
    );
  };

  const openCamera = () => {
    // यहां Camera API integration होगा - expo-camera या react-native-image-picker
    Alert.alert('कैमरा', 'कैमरा खोला जा रहा है...', [
      {
        text: 'OK',
        onPress: () => {
          // Demo के लिए placeholder image set कर रहे हैं
          setCapturedPhoto('camera_demo');
        },
      },
    ]);
  };

  const openGallery = () => {
    // यहां Gallery API integration होगा - expo-image-picker
    Alert.alert('गैलरी', 'गैलरी खोली जा रही है...', [
      {
        text: 'OK',
        onPress: () => {
          // Demo के लिए placeholder image set कर रहे हैं
          setCapturedPhoto('gallery_demo');
        },
      },
    ]);
  };

  const handleUpload = () => {
    if (!selectedStudent) {
      Alert.alert('त्रुटि', 'कृपया छात्र का चयन करें');
      return;
    }

    if (!capturedPhoto) {
      Alert.alert('त्रुटि', 'कृपया फोटो लें या चुनें');
      return;
    }

    setIsUploading(true);

    // Demo के लिए setTimeout - यहां आप actual API call करेंगे
    setTimeout(() => {
      setIsUploading(false);
      Alert.alert(
        'सफलता!',
        'फोटो सफलतापूर्वक अपलोड हो गई है',
        [
          {
            text: 'OK',
            onPress: () => {
              // Reset form
              setSelectedStudent('');
              setTreeName('');
              setCapturedPhoto(null);
            },
          },
        ]
      );
    }, 2000);
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
            <Text style={styles.title}>📸 फोटो अपलोड</Text>
            <Text style={styles.subtitle}>एक पेड़ माँ के नाम 2.0</Text>
          </View>
        </View>

        <View style={styles.formContainer}>
          {/* छात्र का नाम / ID */}
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>✅ छात्र का नाम / ID *</Text>
            <View style={styles.pickerContainer}>
              <TouchableOpacity 
                style={styles.studentSelector}
                onPress={() => {
                  Alert.alert(
                    'छात्र चुनें',
                    '',
                    [
                      ...students.map(student => ({
                        text: `${student.name} (ID: ${student.id})`,
                        onPress: () => setSelectedStudent(student.id)
                      })),
                      { text: 'रद्द करें', style: 'cancel' }
                    ]
                  );
                }}
              >
                <Text style={styles.selectorText}>
                  {selectedStudent 
                    ? students.find(s => s.id === selectedStudent)?.name + ` (ID: ${selectedStudent})` 
                    : 'छात्र चुनें...'
                  }
                </Text>
                <Text style={styles.dropdownArrow}>▼</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* फोटो Section */}
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>✅ फोटो (Camera/Gallery) *</Text>
            <Text style={styles.photoSubtitle}>छात्र + पेड़ + माँ या महिला शिक्षिका</Text>
            
            <TouchableOpacity style={styles.photoButton} onPress={handleCameraPress}>
              {capturedPhoto ? (
                <View style={styles.photoPreview}>
                  <View style={styles.photoPlaceholder}>
                    <Text style={styles.photoIcon}>📷</Text>
                    <Text style={styles.photoText}>फोटो चुनी गई</Text>
                  </View>
                  <TouchableOpacity 
                    style={styles.changePhotoButton}
                    onPress={handleCameraPress}
                  >
                    <Text style={styles.changePhotoText}>बदलें</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.photoPlaceholder}>
                  <Text style={styles.photoIcon}>📸</Text>
                  <Text style={styles.photoText}>फोटो लें या चुनें</Text>
                  <Text style={styles.photoHint}>कैमरा या गैलरी से</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          {/* पेड़ का नाम */}
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>✅ पेड़ का नाम (वैकल्पिक)</Text>
            <TextInput
              style={styles.textInput}
              value={treeName}
              onChangeText={setTreeName}
              placeholder="जैसे: नीम, आम, पीपल, बरगद..."
              placeholderTextColor="#999"
            />
          </View>

          {/* Upload Date & Time */}
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>✅ अपलोड दिनांक और समय</Text>
            <View style={styles.dateTimeContainer}>
              <Text style={styles.dateTimeText}>{getCurrentDateTime()}</Text>
              <Text style={styles.autoSetText}>स्वचालित सेट</Text>
            </View>
          </View>

          {/* Upload Button */}
          <TouchableOpacity 
            style={[
              styles.uploadButton,
              (!selectedStudent || !capturedPhoto || isUploading) && styles.uploadButtonDisabled
            ]}
            onPress={handleUpload}
            disabled={!selectedStudent || !capturedPhoto || isUploading}
          >
            <Text style={styles.uploadButtonText}>
              {isUploading ? '⏳ अपलोड हो रहा है...' : '📤 अपलोड करें'}
            </Text>
          </TouchableOpacity>

          {/* Info Box */}
          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>📝 महत्वपूर्ण निर्देश:</Text>
            <Text style={styles.infoText}>• फोटो में छात्र, पेड़ और माँ/महिला शिक्षिका दिखनी चाहिए</Text>
            <Text style={styles.infoText}>• फोटो साफ और स्पष्ट होनी चाहिए</Text>
            <Text style={styles.infoText}>• छात्र का चयन करना अनिवार्य है</Text>
            <Text style={styles.infoText}>• पेड़ का नाम वैकल्पिक है लेकिन बेहतर होगा</Text>
            <Text style={styles.infoText}>• अपलोड का समय स्वचालित रूप से रिकॉर्ड हो जाएगा</Text>
          </View>
        </View>
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
    backgroundColor: '#4CAF50',
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
  formContainer: {
    paddingHorizontal: 20,
    paddingTop: 25,
  },
  fieldContainer: {
    marginBottom: 25,
  },
  fieldLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 8,
  },
  pickerContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#C8E6C9',
    elevation: 2,
  },
  studentSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  selectorText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  dropdownArrow: {
    fontSize: 12,
    color: '#666',
  },
  photoButton: {
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#C8E6C9',
    borderStyle: 'dashed',
    padding: 20,
    alignItems: 'center',
    elevation: 2,
    minHeight: 120,
    justifyContent: 'center',
  },
  photoSubtitle: {
    fontSize: 12,
    color: '#666',
    marginBottom: 10,
    fontStyle: 'italic',
  },
  photoPreview: {
    alignItems: 'center',
    width: '100%',
  },
  photoPlaceholder: {
    alignItems: 'center',
  },
  photoIcon: {
    fontSize: 40,
    marginBottom: 10,
  },
  photoText: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  photoHint: {
    fontSize: 12,
    color: '#666',
  },
  changePhotoButton: {
    marginTop: 10,
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: '#4CAF50',
    borderRadius: 20,
  },
  changePhotoText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  textInput: {
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#C8E6C9',
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
    elevation: 2,
  },
  dateTimeContainer: {
    backgroundColor: '#F1F8E9',
    borderRadius: 12,
    padding: 15,
    borderWidth: 1,
    borderColor: '#C8E6C9',
  },
  dateTimeText: {
    fontSize: 16,
    color: '#2E7D32',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  autoSetText: {
    fontSize: 12,
    color: '#4CAF50',
    fontStyle: 'italic',
  },
  uploadButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 15,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 10,
    elevation: 3,
  },
  uploadButtonDisabled: {
    backgroundColor: '#A5D6A7',
    elevation: 1,
  },
  uploadButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  infoBox: {
    backgroundColor: '#FFF3E0',
    borderRadius: 12,
    padding: 15,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#FFE0B2',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E65100',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#BF360C',
    marginBottom: 5,
    lineHeight: 20,
  },
});

export default PhotoUploadScreen;
