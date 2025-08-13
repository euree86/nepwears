import React, { useCallback } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { EvilIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SPACING, TYPOGRAPHY, getResponsiveSize, ScanMode } from '../../../utils/constant';


interface SearchInputProps {
    placeholder?: string;
    value: string;
    onChangeText: (text: string) => void;
    onSubmit: () => void;
    onCameraPress: () => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
    placeholder = "Find your favorite items",
    value,
    onChangeText,
    onSubmit,
    onCameraPress,
}) => {
    const handleSubmit = useCallback(() => {
        if (value.trim()) {
            onSubmit();
        }
    }, [value, onSubmit]);

    return (
        <View style={styles.container}>
            <EvilIcons
                name="search"
                size={getResponsiveSize(22)}
                color={COLORS.text}
                style={styles.searchIcon}
            />
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                placeholderTextColor={COLORS.placeholder}
                selectionColor={COLORS.primary}
                value={value}
                onChangeText={onChangeText}
                onSubmitEditing={handleSubmit}
                returnKeyType="search"
            />
            <TouchableOpacity
                onPress={onCameraPress}
                style={styles.cameraButton}
                activeOpacity={0.7}
                accessibilityLabel="Open camera to scan"
            >
                <MaterialCommunityIcons
                    name="image-filter-center-focus"
                    size={getResponsiveSize(22)}
                    color={COLORS.text}
                />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: getResponsiveSize(SPACING.xl),
        marginVertical: getResponsiveSize(SPACING.md),
        borderRadius: getResponsiveSize(8),
        paddingHorizontal: getResponsiveSize(SPACING.md),
        paddingVertical: Platform.OS === 'ios' ? getResponsiveSize(SPACING.md) : getResponsiveSize(SPACING.xs),
        // shadowColor: COLORS.shadow,
        // shadowOffset: { width: 0, height: 5 },
        // shadowOpacity: 0.2,
        // shadowRadius: 12,
        // elevation: 10,
        // backgroundColor: COLORS.white,
        // borderWidth: 1,
        // borderColor: 'rgba(0,0,0,0.06)',
        minHeight: getResponsiveSize(50),
        backgroundColor: '#f3f4f6',
    },
    searchIcon: {
        marginRight: getResponsiveSize(SPACING.sm),
    },
    input: {
        flex: 1,
        fontSize: getResponsiveSize(TYPOGRAPHY.sizes.sm),
        color: COLORS.text,
        fontWeight: TYPOGRAPHY.weights.regular,
        ...(Platform.OS === 'web' && { outlineWidth: 0 }),
    },
    cameraButton: {
        padding: getResponsiveSize(SPACING.xs),
        borderRadius: getResponsiveSize(4),
    },
});

export default SearchInput;