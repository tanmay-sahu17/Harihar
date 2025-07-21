import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';

const TeacherLoginScreen = ({ navigation }: any) => {
  const [udiseId, setUdiseId] = useState('');
  const [teacherName, setTeacherName] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (udiseId === 'demo123' && password === '1234') {
      navigation.navigate('PhotoUploadScreen');
    } else {
      Alert.alert('गलत ID या पासवर्ड');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>शिक्षक लॉगिन</Text>
      <Text style={styles.subtitle}>एक पेड़ माँ के नाम 2.0</Text>

      <Text style={styles.label}>UDISE ID</Text>
      <TextInput
        style={styles.input}
        placeholder="स्कूल का UDISE ID दर्ज करें"
        value={udiseId}
        onChangeText={setUdiseId}
      />

      <Text style={styles.label}>शिक्षक का नाम</Text>
      <TextInput
        style={styles.input}
        placeholder="अपना पूरा नाम दर्ज करें"
        value={teacherName}
        onChangeText={setTeacherName}
      />

      <Text style={styles.label}>पासवर्ड</Text>
      <TextInput
        style={styles.input}
        placeholder="पासवर्ड दर्ज करें"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>लॉगिन</Text>
      </TouchableOpacity>

      {/* Demo Info */}
      <View style={styles.demoInfo}>
        <Text style={styles.demoText}>डेमो जानकारी:</Text>
        <Text style={styles.demoText}>UDISE ID: कोई भी</Text>
        <Text style={styles.demoText}>नाम कोई भी</Text>
      
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E8F5E9', padding: 20, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 5, color: '#2E7D32' },
  subtitle: { textAlign: 'center', color: '#555', marginBottom: 20 },
  label: { fontSize: 16, color: '#388E3C', marginBottom: 6 },
  input: {
    backgroundColor: 'white',
    borderColor: '#C8E6C9',
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 2,
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  demoInfo: {
    marginTop: 20,
    padding: 12,
    backgroundColor: '#F1F8E9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#C8E6C9',
  },
  demoText: { fontSize: 14, color: '#388E3C', marginBottom: 3 },
});

export default TeacherLoginScreen;
