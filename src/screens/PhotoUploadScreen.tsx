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
import * as DocumentPicker from 'expo-document-picker';

interface PhotoUploadScreenProps {
  onBack?: () => void;
}

const PhotoUploadScreen: React.FC<PhotoUploadScreenProps> = ({ onBack }) => {
  const [selectedStudent, setSelectedStudent] = useState('');
  const [treeName, setTreeName] = useState('');
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [evoCertificate, setEvoCertificate] = useState<DocumentPicker.DocumentPickerResult | null>(null);
  const [isUploading, setIsUploading] = useState(false);

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
    Alert.alert('कैमरा', 'कैमरा खोला जा रहा है...', [
      {
        text: 'OK',
        onPress: () => {
          setCapturedPhoto('camera_demo');
        },
      },
    ]);
  };

  const openGallery = () => {
    Alert.alert('गैलरी', 'गैलरी खोली जा रही है...', [
      {
        text: 'OK',
        onPress: () => {
          setCapturedPhoto('gallery_demo');
        },
      },
    ]);
  };

  const handlePickEvoCertificate = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: ['application/pdf', 'image/*'],
    });

    if (result.type === 'success') {
      setEvoCertificate(result);
      Alert.alert("✅ EVO सर्टिफिकेट चुना गया", result.name || 'फाइल');
    } else {
      Alert.alert("❌ कोई सर्टिफिकेट नहीं चुना गया");
    }
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

    setTimeout(() => {
      setIsUploading(false);
      Alert.alert('✅ सफलता!', 'फोटो सफलतापूर्वक अपलोड हो गई है', [
        {
          text: 'OK',
          onPress: () => {
            setSelectedStudent('');
            setTreeName('');
            setCapturedPhoto(null);
            setEvoCertificate(null);
          },
        },
      ]);
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
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
          {/* Student Selector */}
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>✅ छात्र का नाम / ID *</Text>
            <TouchableOpacity
              style={styles.studentSelector}
              onPress={() => {
                Alert.alert(
                  'छात्र चुनें',
                  '',
                  [
                    ...students.map(student => ({
                      text: `${student.name} (ID: ${student.id})`,
                      onPress: () => setSelectedStudent(student.id),
                    })),
                    { text: 'रद्द करें', style: 'cancel' },
                  ]
                );
              }}
            >
              <Text style={styles.selectorText}>
                {selectedStudent
                  ? students.find(s => s.id === selectedStudent)?.name + ` (ID: ${selectedStudent})`
                  : 'छात्र चुनें...'}
              </Text>
              <Text style={styles.dropdownArrow}>▼</Text>
            </TouchableOpacity>
          </View>

          {/* Photo Upload */}
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>✅ फोटो (Camera/Gallery) *</Text>
            <TouchableOpacity style={styles.photoButton} onPress={handleCameraPress}>
              <Text style={styles.photoText}>
                {capturedPhoto ? '📷 फोटो चुनी गई' : '📸 फोटो लें या चुनें'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Tree Name */}
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

          {/* EVO Certificate Upload */}
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>📄 EVO प्रमाणपत्र अपलोड करें (वैकल्पिक)</Text>
            <TouchableOpacity style={styles.uploadButton} onPress={handlePickEvoCertificate}>
              <Text style={styles.uploadButtonText}>📄 सर्टिफिकेट चुनें</Text>
            </TouchableOpacity>
            {evoCertificate && (
              <Text style={{ marginTop: 8, color: '#4CAF50' }}>
                ✅ चुना गया: {evoCertificate.name}
              </Text>
            )}
          </View>

          {/* Upload DateTime */}
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
              (!selectedStudent || !capturedPhoto || isUploading) && styles.uploadButtonDisabled,
            ]}
            onPress={handleUpload}
            disabled={!selectedStudent || !capturedPhoto || isUploading}
          >
            <Text style={styles.uploadButtonText}>
              {isUploading ? '⏳ अपलोड हो रहा है...' : '📤 अपलोड करें'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E8F5E8' },
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
  backButtonText: { color: 'white', fontSize: 14, fontWeight: 'bold' },
  titleSection: { alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', color: 'white', marginBottom: 5 },
  subtitle: { fontSize: 16, color: 'white', opacity: 0.9 },
  formContainer: { paddingHorizontal: 20, paddingTop: 25 },
  fieldContainer: { marginBottom: 25 },
  fieldLabel: { fontSize: 16, fontWeight: 'bold', color: '#2E7D32', marginBottom: 8 },
  studentSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#C8E6C9',
    elevation: 2,
  },
  selectorText: { fontSize: 16, color: '#333', flex: 1 },
  dropdownArrow: { fontSize: 12, color: '#666' },
  photoButton: {
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#C8E6C9',
    padding: 20,
    alignItems: 'center',
    elevation: 2,
  },
  photoText: { fontSize: 16, fontWeight: 'bold', color: '#4CAF50' },
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
  dateTimeText: { fontSize: 16, color: '#2E7D32', fontWeight: 'bold', marginBottom: 5 },
  autoSetText: { fontSize: 12, color: '#4CAF50', fontStyle: 'italic' },
  uploadButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 15,
    paddingVertical: 12,
    paddingHorizontal: 25,
    alignItems: 'center',
    elevation: 3,
  },
  uploadButtonDisabled: {
    backgroundColor: '#A5D6A7',
    elevation: 1,
  },
  uploadButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PhotoUploadScreen;
