import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const ActionButtons = () => (
  <View style={styles.container}>
    <TouchableOpacity style={styles.trackButton}>
      <Text style={styles.trackText}>Track Package</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.supportButton}>
      <Text style={styles.supportText}>Contact Support</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: { backgroundColor: '#FFFFFF', padding: 16, flexDirection: 'row', gap: 12 },
  trackButton: { flex: 1, backgroundColor: '#FC0079', paddingVertical: 12, borderRadius: 8, alignItems: 'center' },
  trackText: { color: '#FFFFFF', fontSize: 14, fontWeight: '600' },
  supportButton: { flex: 1, backgroundColor: '#F3F4F6', paddingVertical: 12, borderRadius: 8, alignItems: 'center' },
  supportText: { color: '#374151', fontSize: 14, fontWeight: '600' }
});

export default ActionButtons;
