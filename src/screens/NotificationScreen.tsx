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

const NotificationScreen = () => {
  const [selectedTab, setSelectedTab] = useState('view');
  const [notificationForm, setNotificationForm] = useState({
    title: '',
    message: '',
    type: 'info',
  });

  const notifications = [
    {
      id: 1,
      title: 'तुरंत फोटो अपलोड करें',
      message: 'रायपुर जिले की प्रगति धीमी है। कृपया छात्र-पेड़-शिक्षक की फोटो तुरंत अपलोड करें। अंतिम तारीख 31 मार्च 2024 है।',
      type: 'urgent',
      date: '5 फरवरी 2024',
      time: '10:30 AM',
      isRead: false,
      sender: 'रायपुर जिला शिक्षा कार्यालय',
    },
    {
      id: 2,
      title: 'नई सुविधा जोड़ी गई',
      message: 'अब आप प्रमाणपत्र डायरेक्ट डाउनलोड कर सकते हैं। नई फीचर्स के लिए ऐप अपडेट करें।',
      type: 'info',
      date: '3 फरवरी 2024',
      time: '2:15 PM',
      isRead: true,
      sender: 'तकनीकी टीम',
    },
    {
      id: 3,
      title: 'सफलता की बधाई',
      message: 'बिलासपुर जिला ने अपना 75% लक्ष्य पूरा कर लिया है। उन्हें बधाई देते हैं।',
      type: 'success',
      date: '1 फरवरी 2024',
      time: '4:45 PM',
      isRead: true,
      sender: 'राज्य शिक्षा विभाग',
    },
    {
      id: 4,
      title: 'सहायता वीडियो उपलब्ध',
      message: 'फोटो अपलोड करने की पूरी प्रक्रिया का वीडियो अब उपलब्ध है। लिंक: https://youtu.be/8Z7vLcJl7g8',
      type: 'info',
      date: '28 जनवरी 2024',
      time: '11:20 AM',
      isRead: true,
      sender: 'सहायता टीम',
    },
  ];

  const notificationStats = {
    total: notifications.length,
    unread: notifications.filter(n => !n.isRead).length,
    urgent: notifications.filter(n => n.type === 'urgent').length,
  };

  const notificationTypes = [
    { id: 'urgent', label: 'तुरंत', color: '#F44336', emoji: '🚨' },
    { id: 'info', label: 'जानकारी', color: '#2196F3', emoji: 'ℹ️' },
    { id: 'success', label: 'सफलता', color: '#4CAF50', emoji: '✅' },
    { id: 'warning', label: 'चेतावनी', color: '#FF9800', emoji: '⚠️' },
  ];

  const getNotificationIcon = (type: string) => {
    const notificationType = notificationTypes.find(t => t.id === type);
    return notificationType ? notificationType.emoji : '📢';
  };

  const getNotificationColor = (type: string) => {
    const notificationType = notificationTypes.find(t => t.id === type);
    return notificationType ? notificationType.color : '#666';
  };

  const handleSendNotification = () => {
    if (!notificationForm.title || !notificationForm.message) {
      Alert.alert('त्रुटि', 'कृपया शीर्षक और संदेश दोनों भरें');
      return;
    }

    Alert.alert(
      'नोटिफिकेशन भेजें',
      `क्या आप यह नोटिफिकेशन सभी स्कूलों को भेजना चाहते हैं?\n\nशीर्षक: ${notificationForm.title}`,
      [
        {
          text: 'हाँ, भेजें',
          onPress: () => {
            Alert.alert('सफल!', 'नोटिफिकेशन सभी स्कूलों को भेज दिया गया है');
            setNotificationForm({ title: '', message: '', type: 'info' });
          },
        },
        { text: 'रद्द करें', style: 'cancel' },
      ]
    );
  };

  const markAsRead = (notificationId: number) => {
    // In a real app, this would update the notification status
    Alert.alert('पढ़ लिया', 'नोटिफिकेशन को पढ़ा गया के रूप में मार्क कर दिया गया');
  };

  const renderViewNotifications = () => (
    <View>
      {/* Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{notificationStats.total}</Text>
          <Text style={styles.statLabel}>कुल</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{notificationStats.unread}</Text>
          <Text style={styles.statLabel}>नए</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{notificationStats.urgent}</Text>
          <Text style={styles.statLabel}>तुरंत</Text>
        </View>
      </View>

      {/* Notifications List */}
      {notifications.map((notification) => (
        <View key={notification.id} style={[
          styles.notificationCard,
          !notification.isRead && styles.unreadCard
        ]}>
          <View style={styles.notificationHeader}>
            <View style={styles.notificationTitleRow}>
              <Text style={styles.notificationIcon}>
                {getNotificationIcon(notification.type)}
              </Text>
              <Text style={styles.notificationTitle}>{notification.title}</Text>
              {!notification.isRead && <View style={styles.unreadDot} />}
            </View>
            <Text style={styles.notificationDate}>{notification.date}</Text>
          </View>

          <Text style={styles.notificationMessage}>{notification.message}</Text>
          
          <View style={styles.notificationFooter}>
            <Text style={styles.notificationSender}>- {notification.sender}</Text>
            <Text style={styles.notificationTime}>{notification.time}</Text>
          </View>

          {!notification.isRead && (
            <TouchableOpacity 
              style={styles.readButton}
              onPress={() => markAsRead(notification.id)}
            >
              <Text style={styles.readButtonText}>✓ पढ़ लिया</Text>
            </TouchableOpacity>
          )}
        </View>
      ))}
    </View>
  );

  const renderSendNotification = () => (
    <View>
      <View style={styles.formCard}>
        <Text style={styles.formTitle}>📢 नया नोटिफिकेशन भेजें</Text>
        
        {/* Notification Type */}
        <Text style={styles.formLabel}>नोटिफिकेशन का प्रकार</Text>
        <View style={styles.typeSelector}>
          {notificationTypes.map((type) => (
            <TouchableOpacity
              key={type.id}
              style={[
                styles.typeButton,
                notificationForm.type === type.id && styles.selectedTypeButton,
                { borderColor: type.color }
              ]}
              onPress={() => setNotificationForm({...notificationForm, type: type.id})}
            >
              <Text style={styles.typeEmoji}>{type.emoji}</Text>
              <Text style={[styles.typeLabel, { color: type.color }]}>{type.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Title */}
        <Text style={styles.formLabel}>शीर्षक *</Text>
        <TextInput
          style={styles.input}
          placeholder="नोटिफिकेशन का शीर्षक लिखें"
          value={notificationForm.title}
          onChangeText={(text) => setNotificationForm({...notificationForm, title: text})}
          maxLength={100}
        />

        {/* Message */}
        <Text style={styles.formLabel}>संदेश *</Text>
        <TextInput
          style={[styles.input, styles.messageInput]}
          placeholder="विस्तृत संदेश लिखें..."
          value={notificationForm.message}
          onChangeText={(text) => setNotificationForm({...notificationForm, message: text})}
          multiline
          numberOfLines={6}
          textAlignVertical="top"
          maxLength={500}
        />

        {/* Character Count */}
        <Text style={styles.characterCount}>
          {notificationForm.message.length}/500 characters
        </Text>

        {/* Send Button */}
        <TouchableOpacity style={styles.sendButton} onPress={handleSendNotification}>
          <Text style={styles.sendButtonText}>🚀 सभी स्कूलों को भेजें</Text>
        </TouchableOpacity>
      </View>

      {/* Preview */}
      {(notificationForm.title || notificationForm.message) && (
        <View style={styles.previewCard}>
          <Text style={styles.previewTitle}>👁️ पूर्वावलोकन</Text>
          <View style={styles.previewNotification}>
            <View style={styles.previewHeader}>
              <Text style={styles.previewIcon}>
                {getNotificationIcon(notificationForm.type)}
              </Text>
              <Text style={styles.previewNotificationTitle}>
                {notificationForm.title || 'शीर्षक...'}
              </Text>
            </View>
            <Text style={styles.previewMessage}>
              {notificationForm.message || 'संदेश...'}
            </Text>
          </View>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🔔 नोटिफिकेशन</Text>
        <Text style={styles.headerSubtitle}>
          {selectedTab === 'view' ? 'सभी नोटिफिकेशन देखें' : 'नया नोटिफिकेशन भेजें'}
        </Text>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'view' && styles.activeTab]}
          onPress={() => setSelectedTab('view')}
        >
          <Text style={[styles.tabText, selectedTab === 'view' && styles.activeTabText]}>
            📥 देखें
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'send' && styles.activeTab]}
          onPress={() => setSelectedTab('send')}
        >
          <Text style={[styles.tabText, selectedTab === 'send' && styles.activeTabText]}>
            📤 भेजें
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {selectedTab === 'view' ? renderViewNotifications() : renderSendNotification()}
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
    paddingBottom: 20,
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
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    elevation: 2,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  activeTab: {
    backgroundColor: '#2E7D32',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  activeTabText: {
    color: 'white',
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
  },
  notificationCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
  },
  unreadCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  notificationTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  notificationIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E7D32',
    flex: 1,
  },
  unreadDot: {
    width: 8,
    height: 8,
    backgroundColor: '#4CAF50',
    borderRadius: 4,
    marginLeft: 4,
  },
  notificationDate: {
    fontSize: 12,
    color: '#666',
  },
  notificationMessage: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
    marginBottom: 12,
  },
  notificationFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  notificationSender: {
    fontSize: 12,
    color: '#4CAF50',
    fontStyle: 'italic',
  },
  notificationTime: {
    fontSize: 12,
    color: '#999',
  },
  readButton: {
    backgroundColor: '#E8F5E8',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  readButtonText: {
    color: '#2E7D32',
    fontSize: 12,
    fontWeight: '600',
  },
  formCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    elevation: 3,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 16,
    textAlign: 'center',
  },
  formLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2E7D32',
    marginBottom: 8,
    marginTop: 12,
  },
  typeSelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  typeButton: {
    borderWidth: 2,
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    width: '23%',
    marginBottom: 8,
  },
  selectedTypeButton: {
    backgroundColor: '#E8F5E8',
  },
  typeEmoji: {
    fontSize: 20,
    marginBottom: 4,
  },
  typeLabel: {
    fontSize: 11,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333',
  },
  messageInput: {
    minHeight: 120,
  },
  characterCount: {
    fontSize: 12,
    color: '#666',
    textAlign: 'right',
    marginTop: 4,
    marginBottom: 16,
  },
  sendButton: {
    backgroundColor: '#2E7D32',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 3,
  },
  sendButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  previewCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
  },
  previewTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 12,
    textAlign: 'center',
  },
  previewNotification: {
    backgroundColor: '#F8F8F8',
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  previewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  previewIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  previewNotificationTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2E7D32',
    flex: 1,
  },
  previewMessage: {
    fontSize: 13,
    color: '#333',
    lineHeight: 18,
  },
});

export default NotificationScreen;
