import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Dimensions,
  Image,
} from 'react-native';

const { width } = Dimensions.get('window');

const PhotoUploadScreen = () => {
  const [selectedPhotos, setSelectedPhotos] = useState({
    student: null,
    tree: null,
    teacher: null,
  });

  const [uploadStats, setUploadStats] = useState({
    total: 145,
    uploaded: 89,
    pending: 56,
  });

  const photoTypes = [
    {
      key: 'student',
      title: 'छात्र की फोटो',
      emoji: '👨‍🎓',
      description: 'पेड़ के साथ छात्र की स्पष्ट फोटो',
      color: '#2E7D32',
      required: true,
    },
    {
      key: 'tree',
      title: 'पेड़ की फोटो',
      emoji: '🌳',
      description: 'लगाए गए पेड़ की स्पष्ट फोटो',
      color: '#4CAF50',
      required: true,
    },
    {
      key: 'teacher',
      title: 'शिक्षक की फोटो',
      emoji: '👨‍🏫',
      description: 'पेड़ के साथ शिक्षक की फोटो',
      color: '#66BB6A',
      required: true,
    },
  ];

  const handlePhotoSelect = (type: string) => {
    Alert.alert(
      'फोटो चुनें',
      'आप कैमरा या गैलरी से फोटो चुन सकते हैं',
      [
        {
          text: 'कैमरा से लें',
          onPress: () => openCamera(type),
        },
        {
          text: 'गैलरी से चुनें',
          onPress: () => openGallery(type),
        },
        { text: 'रद्द करें', style: 'cancel' },
      ]
    );
  };

  const openCamera = (type: string) => {
    // Placeholder for camera functionality
    Alert.alert('कैमरा', `${type} के लिए कैमरा खुल रहा है...`);
    // Here you would use expo-image-picker to open camera
    setSelectedPhotos(prev => ({
      ...prev,
      [type]: `camera_photo_${type}.jpg`,
    }));
  };

  const openGallery = (type: string) => {
    // Placeholder for gallery functionality
    Alert.alert('गैलरी', `${type} के लिए गैलरी खुल रहा है...`);
    // Here you would use expo-image-picker to open gallery
    setSelectedPhotos(prev => ({
      ...prev,
      [type]: `gallery_photo_${type}.jpg`,
    }));
  };

  const handleUpload = () => {
    const { student, tree, teacher } = selectedPhotos;
    
    if (!student || !tree || !teacher) {
      Alert.alert('त्रुटि', 'कृपया सभी तीन फोटो चुनें (छात्र, पेड़, शिक्षक)');
      return;
    }

    Alert.alert(
      'अपलोड पुष्टि',
      'क्या आप सभी फोटो अपलोड करना चाहते हैं?',
      [
        {
          text: 'हाँ, अपलोड करें',
          onPress: () => {
            Alert.alert('सफल!', 'सभी फोटो सफलतापूर्वक अपलोड हो गई हैं');
            setUploadStats(prev => ({
              ...prev,
              uploaded: prev.uploaded + 1,
              pending: prev.pending - 1,
            }));
          },
        },
        { text: 'रद्द करें', style: 'cancel' },
      ]
    );
  };

  const clearPhoto = (type: string) => {
    setSelectedPhotos(prev => ({
      ...prev,
      [type]: null,
    }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>📸 फोटो अपलोड</Text>
        <Text style={styles.headerSubtitle}>छात्र-पेड़-शिक्षक फोटो अपलोड करें</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Upload Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{uploadStats.total}</Text>
            <Text style={styles.statLabel}>कुल छात्र</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{uploadStats.uploaded}</Text>
            <Text style={styles.statLabel}>अपलोड हो गए</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{uploadStats.pending}</Text>
            <Text style={styles.statLabel}>बाकी हैं</Text>
          </View>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${(uploadStats.uploaded / uploadStats.total) * 100}%` }
              ]} 
            />
          </View>
          <Text style={styles.progressText}>
            प्रगति: {Math.round((uploadStats.uploaded / uploadStats.total) * 100)}%
          </Text>
        </View>

        {/* Instructions */}
        <View style={styles.instructionCard}>
          <Text style={styles.instructionTitle}>📋 निर्देश</Text>
          <Text style={styles.instructionText}>
            • तीनों फोटो अच्छी गुणवत्ता में होनी चाहिए{'\n'}
            • छात्र और शिक्षक पेड़ के साथ दिखने चाहिए{'\n'}
            • फोटो में चेहरा स्पष्ट दिखना चाहिए{'\n'}
            • पेड़ की फोटो अलग से भी लें
          </Text>
        </View>

        {/* Photo Upload Cards */}
        {photoTypes.map((photo) => (
          <View key={photo.key} style={styles.photoCard}>
            <View style={styles.photoHeader}>
              <Text style={styles.photoEmoji}>{photo.emoji}</Text>
              <View style={styles.photoTitleContainer}>
                <Text style={styles.photoTitle}>{photo.title}</Text>
                <Text style={styles.photoDescription}>{photo.description}</Text>
                {photo.required && <Text style={styles.requiredText}>* आवश्यक</Text>}
              </View>
            </View>

            {selectedPhotos[photo.key as keyof typeof selectedPhotos] ? (
              <View style={styles.selectedPhotoContainer}>
                <View style={styles.photoPreview}>
                  <Text style={styles.photoPreviewText}>📷</Text>
                  <Text style={styles.selectedText}>फोटो चुनी गई</Text>
                </View>
                <View style={styles.photoActions}>
                  <TouchableOpacity 
                    style={styles.changeButton}
                    onPress={() => handlePhotoSelect(photo.key)}
                  >
                    <Text style={styles.changeButtonText}>बदलें</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.removeButton}
                    onPress={() => clearPhoto(photo.key)}
                  >
                    <Text style={styles.removeButtonText}>हटाएं</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <TouchableOpacity 
                style={[styles.uploadButton, { backgroundColor: photo.color }]}
                onPress={() => handlePhotoSelect(photo.key)}
              >
                <Text style={styles.uploadButtonText}>📷 फोटो चुनें</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}

        {/* Upload Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleUpload}>
          <Text style={styles.submitButtonText}>🚀 सभी फोटो अपलोड करें</Text>
        </TouchableOpacity>

        {/* Help Section */}
        <View style={styles.helpSection}>
          <Text style={styles.helpTitle}>समस्या?</Text>
          <TouchableOpacity 
            style={styles.helpButton}
            onPress={() => Alert.alert('वीडियो गाइड', 'फोटो अपलोड करने की वीडियो गाइड देखें')}
          >
            <Text style={styles.helpEmoji}>🎥</Text>
            <Text style={styles.helpText}>फोटो अपलोड गाइड देखें</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.helpButton}
            onPress={() => Alert.alert('तकनीकी सहायता', 'मदद के लिए संपर्क करें: 9876543210')}
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
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
    elevation: 2,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#4CAF50',
    textAlign: 'center',
  },
  progressContainer: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    elevation: 2,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    marginBottom: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: '#2E7D32',
    fontWeight: '600',
    textAlign: 'center',
  },
  instructionCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    elevation: 2,
  },
  instructionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 8,
  },
  instructionText: {
    fontSize: 14,
    color: '#4CAF50',
    lineHeight: 20,
  },
  photoCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
  },
  photoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  photoEmoji: {
    fontSize: 32,
    marginRight: 12,
  },
  photoTitleContainer: {
    flex: 1,
  },
  photoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 4,
  },
  photoDescription: {
    fontSize: 12,
    color: '#4CAF50',
    marginBottom: 2,
  },
  requiredText: {
    fontSize: 11,
    color: '#FF5722',
    fontWeight: '600',
  },
  selectedPhotoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  photoPreview: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  photoPreviewText: {
    fontSize: 24,
    marginRight: 8,
  },
  selectedText: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '600',
  },
  photoActions: {
    flexDirection: 'row',
  },
  changeButton: {
    backgroundColor: '#2E7D32',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: 8,
  },
  changeButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  removeButton: {
    backgroundColor: '#F44336',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  removeButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  uploadButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  uploadButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  submitButton: {
    backgroundColor: '#2E7D32',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginVertical: 20,
    elevation: 4,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
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

export default PhotoUploadScreen;
