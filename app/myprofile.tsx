import React, { useState } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    StatusBar,
    TouchableOpacity,
    Alert,
    StyleSheet,
} from 'react-native';
import CustomInputWithValidation from './components/custominput';
import GenderPickerModal from './components/genderpicker';
import DatePickerModal from './components/datepicker';
import Header from './components/header';
import Button from './components/button';

const ProfileEditScreen = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [gender, setGender] = useState('');
    const [dob, setDob] = useState<Date | null>(null);

    const [isGenderPickerVisible, setGenderPickerVisible] = useState(false);
    const [isDatePickerVisible, setDatePickerVisible] = useState(false);

    const [errors, setErrors] = useState({
        fullName: '',
        email: '',
        address: '',
        phone: '',
        gender: '',
        dob: '',
    });

    const clearForm = () => {
        setFullName('');
        setEmail('');
        setAddress('');
        setPhone('');
        setGender('');
        setDob(null);
        setErrors({
            fullName: '',
            email: '',
            address: '',
            phone: '',
            gender: '',
            dob: '',
        });
    };

    const validateFields = () => {
        let valid = true;
        const newErrors = {
            fullName: '',
            email: '',
            address: '',
            phone: '',
            gender: '',
            dob: '',
        };

        if (!fullName.trim()) {
            newErrors.fullName = 'Full Name is required';
            valid = false;
        }
        if (!email.trim()) {
            newErrors.email = 'Email is required';
            valid = false;
        }
        if (!address.trim()) {
            newErrors.address = 'Address is required';
            valid = false;
        }
        if (!phone.trim()) {
            newErrors.phone = 'Phone Number is required';
            valid = false;
        }
        if (!gender.trim()) {
            newErrors.gender = 'Gender is required';
            valid = false;
        }
        if (!dob) {
            newErrors.dob = 'Date of Birth is required';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSave = () => {
        if (validateFields()) {
            Alert.alert('Success', 'Profile saved successfully');
            clearForm();
        } else {
            Alert.alert(
                'Validation Error',
                'Please correctly fill all the required fields and submit'
            );
        }
    };

    // Helper function to format date display
    const formatDateForDisplay = () => {
        if (!dob) return '';
        return dob.toDateString();
    };

    return (
        <SafeAreaView style={styles.container}>
            <Header title="Edit Profile" />
            <ScrollView contentContainerStyle={styles.content}>

                <CustomInputWithValidation
                    label="Full Name"
                    value={fullName}
                    onChangeText={setFullName}
                    error={errors.fullName}
                />

                <CustomInputWithValidation
                    label="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    error={errors.email}
                />

                <CustomInputWithValidation
                    label="Address"
                    value={address}
                    onChangeText={setAddress}
                    error={errors.address}
                />

                <CustomInputWithValidation
                    label="Phone Number"
                    value={phone}
                    onChangeText={setPhone}
                    keyboardType="number-pad"
                    prefix="+977"
                    error={errors.phone}
                />

                <CustomInputWithValidation
                    label="Gender"
                    value={gender}
                    onPress={() => setGenderPickerVisible(true)}
                    isPicker
                    error={errors.gender}
                />

                <CustomInputWithValidation
                    label="Date of Birth"
                    value={formatDateForDisplay()}
                    onPress={() => setDatePickerVisible(true)}
                    isPicker
                    error={errors.dob}
                />
                <Button text="Save" onPress={handleSave} />

            </ScrollView>

            <GenderPickerModal
                visible={isGenderPickerVisible}
                onClose={() => setGenderPickerVisible(false)}
                onSelectGender={setGender}
                selectedGender={gender}
                options={['Male', 'Female', 'Other']}
            />

            <DatePickerModal
                visible={isDatePickerVisible}
                onClose={() => setDatePickerVisible(false)}
                onChange={(_event, selectedDate) => {
                    if (selectedDate) setDob(selectedDate);
                }}
                date={dob || new Date()}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    content: {
        flexGrow: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    saveButton: {
        backgroundColor: '#FC0079',
        borderRadius: 8,
        paddingVertical: 16,
        alignItems: 'center',
        marginTop: 15,
        marginBottom: 40,
    },
    saveButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#ffffff',
    },
});

export default ProfileEditScreen;