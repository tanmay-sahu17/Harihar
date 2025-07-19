import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Simple navigator for initial testing
const MainNavigator = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🌱 एक पेड़ माँ के नाम 2.0</Text>
        <Text style={styles.subtitle}>Raipur District Portal</Text>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.welcomeText}>
          स्वागत है! ऐप सफलतापूर्वक लोड हो गया
        </Text>
        <Text style={styles.instructionText}>
          Expo Go में QR कोड स्कैन करके चलाएं
        </Text>
        <View style={styles.statusContainer}>
          <Text style={styles.statusText}>
            ✅ ऐप तैयार है
          </Text>
        </View>
      </View>
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
    opacity: 0.9,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E7D32',
    textAlign: 'center',
    marginBottom: 16,
  },
  instructionText: {
    fontSize: 16,
    color: '#4CAF50',
    textAlign: 'center',
    marginBottom: 32,
  },
  statusContainer: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default MainNavigator;
