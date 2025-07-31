import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface SavedNotificationProps {
  visible: boolean;
  onClose: () => void;
}

const SavedNotification: React.FC<SavedNotificationProps> = ({ visible, onClose }) => {
  if (!visible) return null;

  return (
    <View style={styles.container}>
      <View style={styles.savedContent}>
        <MaterialCommunityIcons name="check-circle" size={20} color="white" />
        <Text style={styles.savedText}>Item Added to Saved</Text>
      </View>
      <TouchableOpacity onPress={onClose}>
        <Text style={styles.closeText}>✕</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#333",
    borderRadius: 6,
    paddingVertical: 14,
    paddingHorizontal: 15,
    marginTop: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginBottom: 20,
  },
  savedContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  savedText: {
    color: "white",
    marginLeft: 8,
    fontSize: 16,
  },
  closeText: {
    color: "white",
    fontSize: 16,
    marginLeft: 10,
    paddingHorizontal: 8,
  },
});

export default SavedNotification;
