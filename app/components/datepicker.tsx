import React from 'react';
import { Modal, View, StyleSheet, Pressable } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

interface DatePickerModalProps {
  visible: boolean;
  date: Date;
  onChange: (_event: any, selectedDate?: Date) => void;
  onClose: () => void;
}

const DatePickerModal: React.FC<DatePickerModalProps> = ({
  visible,
  date,
  onChange,
  onClose,
}) => {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <Pressable style={styles.background} onPress={onClose}>
        <View style={styles.modalContainer}>
          <DateTimePicker
            value={date}
            mode="date"
            display="default" // Changed to default to improve styling
            onChange={onChange}
          />
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    marginHorizontal: 40,
    borderRadius: 8,
    overflow: 'hidden',
  },
});

export default DatePickerModal;
