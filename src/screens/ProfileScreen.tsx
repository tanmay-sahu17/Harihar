import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  TextInput,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

const ProfileScreen = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    teacherName: 'श्री राम कुमार शर्मा',
    phone: '9876543210',
    email: 'ram.sharma@education.cg.gov.in',
    schoolName: 'राजकीय प्राथमिक शाला रायपुर',
    schoolCode: '22010100101',
    designation: 'प्रधान पाठक',
    experience: '15 वर्ष',
    joiningDate: '5 जुलाई 2008',
    district: 'रायपुर',
    block: 'रायपुर ब्लॉक-1',
  });

  const [originalData, setOriginalData] = useState(profileData);

  const achievements = [
    {
      id: 1,
      title: 'इको क्लब लीडर',
      description: 'स्कूल में सफल इको क्लब संचालन',
      date: '2024',
      icon: '🌱',
    },
    {
      id: 2,
      title: '100% फोटो अपलोड',
      description: 'सभी छात्रों की फोटो समय पर अपलोड',
      date: '2023',
      icon: '📸',
    },
    {
      id: 3,
      title: 'पर्यावरण संरक्षक',
      description: 'पर्यावरण संरक्षण में योगदान',
      date: '2023',
      icon: '🏆',
    },
  ];

  const appStats = {
    loginDays: 45,
    photosUploaded: 89,
    certificatesGenerated: 72,
    notificationsRead: 15,
  };

  const handleSaveProfile = () => {
    if (!profileData.teacherName || !profileData.phone) {
      Alert.alert('त्रुटि', 'नाम और मोबाइल नंबर आवश्यक हैं');
      return;
    }

    if (profileData.phone.length !== 10) {
      Alert.alert('त्रुटि', 'कृपया सही मोबाइल नंबर डालें (10 अंक)');
      return;
    }

    Alert.alert(
      'प्रोफाइल सेव करें',
      'क्या आप अपनी प्रोफाइल में बदलाव सेव करना चाहते हैं?',
      [
        {
          text: 'हाँ, सेव करें',
          onPress: () => {
            setOriginalData(profileData);
            setIsEditing(false);
            Alert.alert('सफल!', 'प्रोफाइल सफलतापूर्वक अपडेट हो गई');
          },
        },
        { text: 'रद्द करें', style: 'cancel' },
      ]
    );
  };

  const handleCancelEdit = () => {
    setProfileData(originalData);
    setIsEditing(false);
  };

  const handleLogout = () => {
    Alert.alert(
      'लॉगआउट',
      'क्या आप वाकई लॉगआउट करना चाहते हैं?',
      [
        {
          text: 'हाँ, लॉगआउट करें',
          onPress: () => Alert.alert('लॉगआउट', 'आप सफलतापूर्वक लॉगआउट हो गए हैं'),
          style: 'destructive',
        },
        { text: 'रद्द करें', style: 'cancel' },
      ]
    );
  };

  const handleChangePassword = () => {
    Alert.alert(
      'पासवर्ड बदलें',
      'पासवर्ड बदलने के लिए आपको अपने मोबाइल नंबर पर OTP मिलेगा',
      [
        {
          text: 'OTP भेजें',
          onPress: () => Alert.alert('OTP भेजा गया', 'आपके मोबाइल नंबर पर OTP भेज दिया गया है'),
        },
        { text: 'रद्द करें', style: 'cancel' },
      ]
    );
  };

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>👨‍🏫 प्रोफाइल</Text>
        <Text style={styles.headerSubtitle}>आपकी व्यक्तिगत जानकारी</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <View style={styles.avatarContainer}>
              <Text style={styles.avatarText}>👨‍🏫</Text>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{profileData.teacherName}</Text>
              <Text style={styles.profileDesignation}>{profileData.designation}</Text>
              <Text style={styles.profileSchool}>{profileData.schoolName}</Text>
            </View>
            <TouchableOpacity 
              style={styles.editButton}
              onPress={() => setIsEditing(!isEditing)}
            >
              <Text style={styles.editButtonText}>
                {isEditing ? '❌' : '✏️'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* App Usage Stats */}
        <View style={styles.statsCard}>
          <Text style={styles.statsTitle}>📊 ऐप उपयोग आंकड़े</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{appStats.loginDays}</Text>
              <Text style={styles.statLabel}>लॉगिन दिन</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{appStats.photosUploaded}</Text>
              <Text style={styles.statLabel}>फोटो अपलोड</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{appStats.certificatesGenerated}</Text>
              <Text style={styles.statLabel}>प्रमाणपत्र</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{appStats.notificationsRead}</Text>
              <Text style={styles.statLabel}>नोटिफिकेशन</Text>
            </View>
          </View>
        </View>

        {/* Personal Information */}
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>📋 व्यक्तिगत जानकारी</Text>
          
          <View style={styles.infoGrid}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>नाम</Text>
              {isEditing ? (
                <TextInput
                  style={styles.infoInput}
                  value={profileData.teacherName}
                  onChangeText={(value) => handleInputChange('teacherName', value)}
                />
              ) : (
                <Text style={styles.infoValue}>{profileData.teacherName}</Text>
              )}
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>मोबाइल नंबर</Text>
              {isEditing ? (
                <TextInput
                  style={styles.infoInput}
                  value={profileData.phone}
                  onChangeText={(value) => handleInputChange('phone', value)}
                  keyboardType="phone-pad"
                  maxLength={10}
                />
              ) : (
                <Text style={styles.infoValue}>{profileData.phone}</Text>
              )}
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>ईमेल</Text>
              {isEditing ? (
                <TextInput
                  style={styles.infoInput}
                  value={profileData.email}
                  onChangeText={(value) => handleInputChange('email', value)}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              ) : (
                <Text style={styles.infoValue}>{profileData.email}</Text>
              )}
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>पदनाम</Text>
              <Text style={styles.infoValue}>{profileData.designation}</Text>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>अनुभव</Text>
              <Text style={styles.infoValue}>{profileData.experience}</Text>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>ज्वाइनिंग तारीख</Text>
              <Text style={styles.infoValue}>{profileData.joiningDate}</Text>
            </View>
          </View>

          {isEditing && (
            <View style={styles.editActions}>
              <TouchableOpacity style={styles.saveButton} onPress={handleSaveProfile}>
                <Text style={styles.saveButtonText}>✅ सेव करें</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={handleCancelEdit}>
                <Text style={styles.cancelButtonText}>❌ रद्द करें</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* School Information */}
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>🏫 स्कूल की जानकारी</Text>
          
          <View style={styles.infoGrid}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>स्कूल का नाम</Text>
              <Text style={styles.infoValue}>{profileData.schoolName}</Text>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>स्कूल कोड</Text>
              <Text style={styles.infoValue}>{profileData.schoolCode}</Text>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>जिला</Text>
              <Text style={styles.infoValue}>{profileData.district}</Text>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>ब्लॉक</Text>
              <Text style={styles.infoValue}>{profileData.block}</Text>
            </View>
          </View>
        </View>

        {/* Achievements */}
        <View style={styles.achievementsCard}>
          <Text style={styles.achievementsTitle}>🏆 उपलब्धियां</Text>
          
          {achievements.map((achievement) => (
            <View key={achievement.id} style={styles.achievementItem}>
              <Text style={styles.achievementIcon}>{achievement.icon}</Text>
              <View style={styles.achievementInfo}>
                <Text style={styles.achievementTitle}>{achievement.title}</Text>
                <Text style={styles.achievementDescription}>{achievement.description}</Text>
                <Text style={styles.achievementDate}>{achievement.date}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsCard}>
          <Text style={styles.actionsTitle}>⚙️ खाता सेटिंग्स</Text>
          
          <TouchableOpacity style={styles.actionButton} onPress={handleChangePassword}>
            <Text style={styles.actionEmoji}>🔐</Text>
            <Text style={styles.actionText}>पासवर्ड बदलें</Text>
            <Text style={styles.actionArrow}>→</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => Alert.alert('सहायता', 'तकनीकी सहायता के लिए 1800-xxx-xxxx पर कॉल करें')}
          >
            <Text style={styles.actionEmoji}>📞</Text>
            <Text style={styles.actionText}>सहायता केंद्र</Text>
            <Text style={styles.actionArrow}>→</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => Alert.alert('फीडबैक', 'कृपया अपनी प्रतिक्रिया helpdesk@education.cg.gov.in पर भेजें')}
          >
            <Text style={styles.actionEmoji}>💬</Text>
            <Text style={styles.actionText}>फीडबैक दें</Text>
            <Text style={styles.actionArrow}>→</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => Alert.alert('ऐप वर्जन', 'एक पेड़ माँ के नाम 2.0\nवर्जन: 2.1.0\nबिल्ड: 2024.02.15')}
          >
            <Text style={styles.actionEmoji}>ℹ️</Text>
            <Text style={styles.actionText}>ऐप के बारे में</Text>
            <Text style={styles.actionArrow}>→</Text>
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>🚪 लॉगआउट करें</Text>
        </TouchableOpacity>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            रायपुर जिला शिक्षा विभाग{'\n'}छत्तीसगढ़ सरकार
          </Text>
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
  profileCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    elevation: 3,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E8F5E8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontSize: 36,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 4,
  },
  profileDesignation: {
    fontSize: 16,
    color: '#4CAF50',
    marginBottom: 4,
  },
  profileSchool: {
    fontSize: 14,
    color: '#666',
  },
  editButton: {
    padding: 8,
  },
  editButtonText: {
    fontSize: 20,
  },
  statsCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    elevation: 3,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 16,
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
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
  infoCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    elevation: 3,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 16,
  },
  infoGrid: {
    gap: 16,
  },
  infoItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    paddingBottom: 12,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    color: '#2E7D32',
    fontWeight: '500',
  },
  infoInput: {
    fontSize: 16,
    color: '#2E7D32',
    fontWeight: '500',
    borderWidth: 1,
    borderColor: '#C8E6C9',
    borderRadius: 8,
    padding: 8,
    backgroundColor: '#F8F8F8',
  },
  editActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#F44336',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    flex: 1,
    marginLeft: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  achievementsCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    elevation: 3,
  },
  achievementsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 16,
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  achievementIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 4,
  },
  achievementDescription: {
    fontSize: 14,
    color: '#4CAF50',
    marginBottom: 4,
  },
  achievementDate: {
    fontSize: 12,
    color: '#666',
  },
  actionsCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    elevation: 3,
  },
  actionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  actionEmoji: {
    fontSize: 24,
    marginRight: 16,
  },
  actionText: {
    flex: 1,
    fontSize: 16,
    color: '#2E7D32',
  },
  actionArrow: {
    fontSize: 18,
    color: '#4CAF50',
  },
  logoutButton: {
    backgroundColor: '#F44336',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 3,
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  footerText: {
    fontSize: 12,
    color: '#4CAF50',
    textAlign: 'center',
    lineHeight: 18,
  },
});

export default ProfileScreen;
