import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Dimensions,
  Image,
} from 'react-native';

const { width } = Dimensions.get('window');

interface PreviousPhotosScreenProps {
  onBack?: () => void;
}

const PreviousPhotosScreen: React.FC<PreviousPhotosScreenProps> = ({ onBack }) => {
  // Sample previous photos data
  const previousPhotos = [
    {
      id: '1',
      studentName: 'अमन शर्मा',
      treeName: 'नीम',
      uploadDate: '2024-12-15 10:30 AM',
      imageUri: 'https://via.placeholder.com/200x150/4CAF50/white?text=Tree+Photo+1',
    },
    {
      id: '2',
      studentName: 'प्रिया गुप्ता',
      treeName: 'आम',
      uploadDate: '2024-12-14 02:45 PM',
      imageUri: 'https://via.placeholder.com/200x150/4CAF50/white?text=Tree+Photo+2',
    },
    {
      id: '3',
      studentName: 'राहुल वर्मा',
      treeName: 'पीपल',
      uploadDate: '2024-12-13 11:20 AM',
      imageUri: 'https://via.placeholder.com/200x150/4CAF50/white?text=Tree+Photo+3',
    },
    {
      id: '4',
      studentName: 'अनीता देवी',
      treeName: 'बरगद',
      uploadDate: '2024-12-12 09:15 AM',
      imageUri: 'https://via.placeholder.com/200x150/4CAF50/white?text=Tree+Photo+4',
    },
    {
      id: '5',
      studentName: 'विकास कुमार',
      treeName: 'जामुन',
      uploadDate: '2024-12-11 03:30 PM',
      imageUri: 'https://via.placeholder.com/200x150/4CAF50/white?text=Tree+Photo+5',
    },
    {
      id: '6',
      studentName: 'सुनीता राय',
      treeName: 'गुलमोहर',
      uploadDate: '2024-12-10 01:20 PM',
      imageUri: 'https://via.placeholder.com/200x150/4CAF50/white?text=Tree+Photo+6',
    },
  ];

  const renderPhotoCard = (photo: any) => {
    return (
      <View key={photo.id} style={styles.photoCard}>
        {/* Photo Thumbnail */}
        <View style={styles.imageContainer}>
          <View style={styles.imagePlaceholder}>
            <Text style={styles.imageIcon}></Text>
            <Text style={styles.imageText}>फोटो {photo.id}</Text>
          </View>
        </View>
        
        {/* Photo Details */}
        <View style={styles.photoDetails}>
          <View style={styles.studentInfo}>
            <Text style={styles.studentLabel}> छात्र का नाम:</Text>
            <Text style={styles.studentName}>{photo.studentName}</Text>
          </View>
          
          {photo.treeName && (
            <View style={styles.treeInfo}>
              <Text style={styles.treeLabel}> पेड़ का नाम:</Text>
              <Text style={styles.treeName}>{photo.treeName}</Text>
            </View>
          )}
          
          <View style={styles.dateInfo}>
            <Text style={styles.dateLabel}>अपलोड दिनांक:</Text>
            <Text style={styles.uploadDate}>{photo.uploadDate}</Text>
          </View>
          
          <TouchableOpacity style={styles.viewButton}>
            <Text style={styles.viewButtonText}>विवरण देखें</Text>
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
            <Text style={styles.title}> पुराने फोटो</Text>
            <Text style={styles.subtitle}>एक पेड़ माँ के नाम 2.0</Text>
          </View>
          
          <View style={styles.statsContainer}>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>{previousPhotos.length}</Text>
              <Text style={styles.statLabel}>कुल फोटो</Text>
            </View>
          </View>
        </View>

        {/* Filter Section */}
        <View style={styles.filterSection}>
          <Text style={styles.filterTitle}> फ़िल्टर करें:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
            <TouchableOpacity style={[styles.filterButton, styles.activeFilter]}>
              <Text style={[styles.filterText, styles.activeFilterText]}>सभी</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterButton}>
              <Text style={styles.filterText}>आज</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterButton}>
              <Text style={styles.filterText}>इस सप्ताह</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterButton}>
              <Text style={styles.filterText}>इस महीने</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Photos List */}
        <View style={styles.photosContainer}>
          {previousPhotos.map(renderPhotoCard)}
        </View>

        {/* Empty State (if no photos) */}
        {previousPhotos.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}></Text>
            <Text style={styles.emptyTitle}>कोई फोटो नहीं मिली</Text>
            <Text style={styles.emptyText}>अभी तक कोई फोटो अपलोड नहीं की गई है</Text>
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
    backgroundColor: '#FF5722',
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
    alignItems: 'center',
  },
  statBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 15,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  statLabel: {
    fontSize: 12,
    color: 'white',
    opacity: 0.9,
  },
  filterSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 10,
  },
  filterScroll: {
    flexDirection: 'row',
  },
  filterButton: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#C8E6C9',
  },
  activeFilter: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  filterText: {
    color: '#4CAF50',
    fontSize: 14,
    fontWeight: 'bold',
  },
  activeFilterText: {
    color: 'white',
  },
  photosContainer: {
    paddingHorizontal: 20,
  },
  photoCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    marginBottom: 15,
    elevation: 3,
    overflow: 'hidden',
  },
  imageContainer: {
    height: 150,
    backgroundColor: '#F1F8E9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholder: {
    alignItems: 'center',
  },
  imageIcon: {
    fontSize: 40,
    marginBottom: 5,
  },
  imageText: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  photoDetails: {
    padding: 15,
  },
  studentInfo: {
    marginBottom: 8,
  },
  studentLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  studentName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  treeInfo: {
    marginBottom: 8,
  },
  treeLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  treeName: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '600',
  },
  dateInfo: {
    marginBottom: 12,
  },
  dateLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  uploadDate: {
    fontSize: 14,
    color: '#333',
  },
  viewButton: {
    backgroundColor: '#E8F5E8',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 25,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#4CAF50',
  },
  viewButtonText: {
    color: '#4CAF50',
    fontSize: 14,
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

export default PreviousPhotosScreen;
