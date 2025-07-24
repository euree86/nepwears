import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Alert,
    Modal,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

const ProfileEditScreen = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [gender, setGender] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [showGenderModal, setShowGenderModal] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [errors, setErrors] = useState<{
        fullName?: string;
        email?: string;
        phoneNumber?: string;
    }>({});


    const newErrors: typeof errors = {};


    const genderOptions = ['Male', 'Female', 'Other', 'Prefer not to say'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
    const days = Array.from({ length: 31 }, (_, i) => i + 1);

    const [selectedDay, setSelectedDay] = useState<number | null>(null);
    const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
    const [selectedYear, setSelectedYear] = useState<number | null>(null);


    // Email validation function
    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Phone number validation function
    const validatePhoneNumber = (phone: string): boolean => {
        const phoneRegex = /^[+]?[1-9][\d]{0,15}$/;
        return phoneRegex.test(phone.replace(/\s/g, ''));
    };


    const handleSave = () => {
        const newErrors: typeof errors = {};

        // Validate full name
        if (!fullName.trim()) {
            newErrors.fullName = 'Please enter your full name';
        }

        // Validate email
        if (!email.trim()) {
            newErrors.email = 'Please enter your email address';
        } else if (!validateEmail(email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        // Validate phone number
        if (!phoneNumber.trim()) {
            newErrors.phoneNumber = 'Please enter your phone number';
        } else if (!validatePhoneNumber(phoneNumber)) {
            newErrors.phoneNumber = 'Please enter a valid phone number ';
        }

        setErrors(newErrors);

        // If no errors, save the profile
        if (Object.keys(newErrors).length === 0) {
            Alert.alert('Success', 'Profile updated successfully!');
            console.log('Profile saved:', {
                fullName,
                email,
                dateOfBirth,
                gender,
                phoneNumber,
            });
        } else {
            // Show first error
            const firstError = Object.values(newErrors)[0];
            Alert.alert('Validation Error', firstError);
        }
    };

    const handleDateSelection = () => {
        if (selectedDay && selectedMonth && selectedYear) {
            const formattedDate = `${selectedDay} ${months[selectedMonth - 1]} ${selectedYear}`;
            setDateOfBirth(formattedDate);
            setShowDatePicker(false);
        } else {
            Alert.alert('Error', 'Please select day, month, and year');
        }
    };

    const selectGender = (selectedGender: string) => {
        setGender(selectedGender);
        setShowGenderModal(false);
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {/* Full Name */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Full Name</Text>
                    <TextInput
                        style={[styles.input, errors.fullName && styles.inputError]}
                        value={fullName}
                        onChangeText={setFullName}
                        placeholder="Enter your full name"
                        placeholderTextColor="#999999"
                    />
                    {errors.fullName && (
                        <Text style={styles.errorText}>{errors.fullName}</Text>
                    )}
                </View>

                {/* Email Address */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Email Address</Text>
                    <TextInput
                        style={[styles.input, errors.email && styles.inputError]}
                        value={email}
                        onChangeText={setEmail}
                        placeholder="Enter your email address"
                        placeholderTextColor="#999999"
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                    {errors.email && (
                        <Text style={styles.errorText}>{errors.email}</Text>
                    )}
                </View>

                {/* Date of Birth */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Date of Birth</Text>
                    <TouchableOpacity
                        style={styles.dateInput}
                        onPress={() => setShowDatePicker(true)}
                        activeOpacity={0.7}
                    >
                        <Text style={[styles.dateText, !dateOfBirth && styles.placeholderText]}>
                            {dateOfBirth || 'Select your date of birth'}
                        </Text>
                        <MaterialCommunityIcons
                            name="calendar-today"
                            size={20}
                            color="#666666"
                        />
                    </TouchableOpacity>
                </View>

                {/* Gender */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Gender</Text>
                    <TouchableOpacity
                        style={styles.dropdownInput}
                        onPress={() => setShowGenderModal(true)}
                        activeOpacity={0.7}
                    >
                        <Text style={[styles.dropdownText, !gender && styles.placeholderText]}>
                            {gender || 'Select your gender'}
                        </Text>
                        <MaterialCommunityIcons
                            name="chevron-down"
                            size={24}
                            color="#666666"
                        />
                    </TouchableOpacity>
                </View>

                {/* Phone Number */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Phone Number</Text>
                    <View style={styles.phoneInputContainer}>
                        <View style={styles.flagContainer}>
                            <Text style={styles.flagEmoji}>🇳🇵</Text>
                        </View>
                        <TextInput
                            style={[styles.phoneInput, errors.phoneNumber && styles.inputError]}
                            value={phoneNumber}
                            onChangeText={setPhoneNumber}
                            placeholder="Enter phone number "
                            placeholderTextColor="#999999"
                            keyboardType="phone-pad"
                        />
                    </View>
                    {errors.phoneNumber && (
                        <Text style={styles.errorText}>{errors.phoneNumber}</Text>
                    )}
                </View>

                {/* Save Button */}
                <TouchableOpacity
                    style={styles.saveButton}
                    onPress={handleSave}
                    activeOpacity={0.8}
                >
                    <Text style={styles.saveButtonText}>Save Profile</Text>
                </TouchableOpacity>
            </ScrollView>

            {/* Gender Selection Modal */}
            <Modal
                visible={showGenderModal}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setShowGenderModal(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Select Gender</Text>
                            <TouchableOpacity
                                onPress={() => setShowGenderModal(false)}
                                style={styles.closeButton}
                            >
                                <MaterialCommunityIcons name="close" size={24} color="#666666" />
                            </TouchableOpacity>
                        </View>
                        {genderOptions.map((option) => (
                            <TouchableOpacity
                                key={option}
                                style={[
                                    styles.genderOption,
                                    gender === option && styles.selectedGenderOption,
                                ]}
                                onPress={() => selectGender(option)}
                            >
                                <Text
                                    style={[
                                        styles.genderOptionText,
                                        gender === option && styles.selectedGenderOptionText,
                                    ]}
                                >
                                    {option}
                                </Text>
                                {gender === option && (
                                    <MaterialCommunityIcons name="check" size={20} color="black" />
                                )}
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </Modal>

            {/* Date Picker Modal */}
            <Modal
                visible={showDatePicker}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setShowDatePicker(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.datePickerModal}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Select Date of Birth</Text>
                            <TouchableOpacity
                                onPress={() => setShowDatePicker(false)}
                                style={styles.closeButton}
                            >
                                <MaterialCommunityIcons name="close" size={24} color="#666666" />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.datePickerContainer}>
                            {/* Day Picker */}
                            <View style={styles.pickerColumn}>
                                <Text style={styles.pickerLabel}>Day</Text>
                                <ScrollView style={styles.picker} showsVerticalScrollIndicator={false}>
                                    {days.map((day) => (
                                        <TouchableOpacity
                                            key={day}
                                            style={[
                                                styles.pickerItem,
                                                selectedDay === day && styles.selectedPickerItem
                                            ]}
                                            onPress={() => setSelectedDay(day)}
                                        >
                                            <Text style={[
                                                styles.pickerItemText,
                                                selectedDay === day && styles.selectedPickerItemText
                                            ]}>
                                                {day}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </ScrollView>
                            </View>

                            {/* Month Picker */}
                            <View style={styles.pickerColumn}>
                                <Text style={styles.pickerLabel}>Month</Text>
                                <ScrollView style={styles.picker} showsVerticalScrollIndicator={false}>
                                    {months.map((month, index) => (
                                        <TouchableOpacity
                                            key={month}
                                            style={[
                                                styles.pickerItem,
                                                selectedMonth === index + 1 && styles.selectedPickerItem
                                            ]}
                                            onPress={() => setSelectedMonth(index + 1)}
                                        >
                                            <Text style={[
                                                styles.pickerItemText,
                                                selectedMonth === index + 1 && styles.selectedPickerItemText
                                            ]}>
                                                {month}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </ScrollView>
                            </View>

                            {/* Year Picker */}
                            <View style={styles.pickerColumn}>
                                <Text style={styles.pickerLabel}>Year</Text>
                                <ScrollView style={styles.picker} showsVerticalScrollIndicator={false}>
                                    {years.map((year) => (
                                        <TouchableOpacity
                                            key={year}
                                            style={[
                                                styles.pickerItem,
                                                selectedYear === year && styles.selectedPickerItem
                                            ]}
                                            onPress={() => setSelectedYear(year)}
                                        >
                                            <Text style={[
                                                styles.pickerItemText,
                                                selectedYear === year && styles.selectedPickerItemText
                                            ]}>
                                                {year}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </ScrollView>
                            </View>
                        </View>

                        <TouchableOpacity
                            style={styles.dateConfirmButton}
                            onPress={handleDateSelection}
                        >
                            <Text style={styles.dateConfirmButtonText}>Confirm Date</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 15,
        fontWeight: '500',
        color: 'black',
        marginBottom: 4,
    },
    input: {
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 16,
        color: '#333333',
        backgroundColor: '#ffffff',
    },
    inputError: {
        borderColor: '#ef4444',
    },
    errorText: {
        color: '#ef4444',
        fontSize: 12,
        marginTop: 4,
        marginLeft: 4,
    },
    dateInput: {
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    dateText: {
        fontSize: 16,
        color: '#333333',
    },
    placeholderText: {
        color: '#999999',
    },
    dropdownInput: {
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    dropdownText: {
        fontSize: 16,
        color: '#333333',
    },
    phoneInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 8,
        backgroundColor: '#ffffff',
    },
    flagContainer: {
        paddingHorizontal: 12,
        paddingVertical: 12,
        borderRightWidth: 1,
        borderRightColor: '#e0e0e0',
    },
    flagEmoji: {
        fontSize: 20,
    },
    phoneInput: {
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 4,
        fontSize: 16,
        color: '#333333',
    },
    saveButton: {
        backgroundColor: '#FC0079',
        borderRadius: 8,
        paddingVertical: 16,
        alignItems: 'center',
        marginTop: 40,
        marginBottom: 40,
    },
    saveButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#ffffff',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingBottom: 40,
    },
    datePickerModal: {
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingBottom: 20,
        maxHeight: '80%',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333333',
    },
    closeButton: {
        padding: 4,
    },
    genderOption: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
    },
    selectedGenderOption: {
        backgroundColor: '#f3f4f6',
    },
    genderOptionText: {
        fontSize: 16,
        color: '#333333',
    },
    selectedGenderOptionText: {
        color: 'black',
        fontWeight: '500',
    },
    datePickerContainer: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    pickerColumn: {
        flex: 1,
        marginHorizontal: 5,
    },
    pickerLabel: {
        fontSize: 14,
        fontWeight: '500',
        color: '#333333',
        textAlign: 'center',
        marginBottom: 10,
    },
    picker: {
        height: 200,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 8,
    },
    pickerItem: {
        paddingVertical: 12,
        paddingHorizontal: 8,
        alignItems: 'center',
    },
    selectedPickerItem: {
        backgroundColor: '#A7A5AF',
    },
    pickerItemText: {
        fontSize: 16,
        color: '#333333',
    },
    selectedPickerItemText: {
        color: '#ffffff',
        fontWeight: '500',
    },
    dateConfirmButton: {
        backgroundColor: '#FC0079',
        marginHorizontal: 20,
        marginTop: 20,
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    dateConfirmButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default ProfileEditScreen;