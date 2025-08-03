import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Pressable,
} from 'react-native';

interface GenderPickerModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectGender: (gender: string) => void;
  selectedGender: string;
  options: string[];
}

const GenderPickerModal: React.FC<GenderPickerModalProps> = ({
  visible,
  onClose,
  onSelectGender,
  selectedGender,
  options,
}) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <Pressable style={styles.modalBackground} onPress={onClose}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Select Gender</Text>
          <FlatList
            data={options}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.optionContainer}
                onPress={() => {
                  onSelectGender(item);
                  onClose();
                }}
              >
                <Text
                  style={[styles.optionText, item === selectedGender && styles.selectedText]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    maxHeight: '60%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#000',
  },
  optionContainer: {
    paddingVertical: 12,
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  selectedText: {
    color: '#FC0079',
    fontWeight: '600',
  },
});

export default GenderPickerModal;
