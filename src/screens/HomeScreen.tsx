import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  Alert,
} from 'react-native';

const { width } = Dimensions.get('window');

const HomeScreen = () => {
  const menuItems = [
    {
      id: 1,
      title: 'इको क्लब नोटिफिकेशन',
      subtitle: 'नोटिफिकेशन अपलोड करें',
      emoji: '📋',
      color: '#2E7D32',
      action: () => Alert.alert('जल्दी आएगा', 'इको क्लब नोटिफिकेशन फीचर')
    },
    {
      id: 2,
      title: 'फोटो अपलोड',
      subtitle: 'छात्र-पेड़-शिक्षक की फोटो',
      emoji: '📸',
      color: '#4CAF50',
      action: () => Alert.alert('जल्दी आएगा', 'फोटो अपलोड फीचर')
    },
    {
      id: 3,
      title: 'डैशबोर्ड',
      subtitle: 'प्रगति रिपोर्ट देखें',
      emoji: '📊',
      color: '#66BB6A',
      action: () => Alert.alert('जल्दी आएगा', 'डैशबोर्ड फीचर')
    },
    {
      id: 4,
      title: 'प्रमाणपत्र',
      subtitle: 'सर्टिफिकेट डाउनलोड करें',
      emoji: '🏆',
      color: '#8BC34A',
      action: () => Alert.alert('जल्दी आएगा', 'सर्टिफिकेट फीचर')
    },
  ];

  const stats = [
    { label: 'कुल छात्र', value: '145', emoji: '👥' },
    { label: 'अपलोड फोटो', value: '89', emoji: '📷' },
    { label: 'प्रमाणपत्र', value: '72', emoji: '🏅' },
    { label: 'प्रगति', value: '61%', emoji: '📈' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>स्वागत है! 🌱</Text>
        <Text style={styles.schoolText}>राजकीय प्राथमिक शाला रायपुर</Text>
        <Text style={styles.districtText}>रायपुर जिला - इको क्लब पोर्टल</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          {stats.map((stat, index) => (
            <View key={index} style={styles.statCard}>
              <Text style={styles.statEmoji}>{stat.emoji}</Text>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Urgent Notice */}
        <View style={styles.urgentNotice}>
          <Text style={styles.urgentIcon}>⚠️</Text>
          <Text style={styles.urgentText}>
            तुरंत छात्र-पेड़-शिक्षक की फोटो अपलोड करें। रायपुर जिले की प्रगति धीमी है।
          </Text>
        </View>

        {/* Menu Items */}
        <Text style={styles.menuTitle}>मुख्य सुविधाएं</Text>
        <View style={styles.menuGrid}>
          {menuItems.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={styles.menuItem}
              onPress={item.action}
            >
              <View style={[styles.menuIcon, { backgroundColor: item.color }]}>
                <Text style={styles.menuEmoji}>{item.emoji}</Text>
              </View>
              <Text style={styles.menuItemTitle}>{item.title}</Text>
              <Text style={styles.menuItemSubtitle}>{item.subtitle}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Help Section */}
        <View style={styles.helpSection}>
          <Text style={styles.helpTitle}>सहायता</Text>
          <TouchableOpacity 
            style={styles.helpButton}
            onPress={() => Alert.alert('वीडियो लिंक', 'https://youtu.be/8Z7vLcJl7g8')}
          >
            <Text style={styles.helpEmoji}>🎥</Text>
            <Text style={styles.helpText}>सहायता वीडियो देखें</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.helpButton}
            onPress={() => Alert.alert('पोर्टल लिंक', 'https://ecoclubs.education.gov.in/main')}
          >
            <Text style={styles.helpEmoji}>🌐</Text>
            <Text style={styles.helpText}>पोर्टल खोलें</Text>
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
    padding: 24,
    paddingTop: 60,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  schoolText: {
    fontSize: 16,
    color: 'white',
    marginBottom: 4,
  },
  districtText: {
    fontSize: 14,
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
    marginBottom: 24,
  },
  statCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  statEmoji: {
    fontSize: 24,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#4CAF50',
    textAlign: 'center',
  },
  urgentNotice: {
    backgroundColor: '#FF9800',
    margin: 16,
    marginHorizontal: 0,
    padding: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  urgentIcon: {
    fontSize: 24,
    marginRight: 8,
  },
  urgentText: {
    flex: 1,
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  menuTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 16,
    marginTop: 8,
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  menuItem: {
    backgroundColor: 'white',
    width: (width - 48) / 2,
    margin: 4,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  menuIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  menuEmoji: {
    fontSize: 30,
  },
  menuItemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E7D32',
    textAlign: 'center',
    marginBottom: 8,
  },
  menuItemSubtitle: {
    fontSize: 12,
    color: '#4CAF50',
    textAlign: 'center',
  },
  helpSection: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
    elevation: 2,
  },
  helpTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 16,
  },
  helpButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#E8F5E8',
    borderRadius: 8,
    marginBottom: 8,
  },
  helpEmoji: {
    fontSize: 20,
    marginRight: 12,
  },
  helpText: {
    fontSize: 16,
    color: '#2E7D32',
    fontWeight: '500',
  },
});

export default HomeScreen;
