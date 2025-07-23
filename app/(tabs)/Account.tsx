import { MaterialIcons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';

import {
    Alert,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useRouter } from 'expo-router';


type MaterialIconName = keyof typeof MaterialIcons.glyphMap;

type MenuItemType = {
    id: string;
    title: string;
    icon: MaterialIconName;
    onPress: () => void;
};


type RootStackParamList = {
    ProfileMenu: undefined;
    ProfileEdit: undefined;

};

// Define props type for this screen
type Props = NativeStackScreenProps<RootStackParamList, 'ProfileMenu'>;

const ProfileMenuScreen: React.FC<Props> = ({ navigation }) => {
    const router = useRouter();

    const menuItems: MenuItemType[] = [
        {
            id: 'profile',
            title: 'Your Profile',
            icon: 'person-outline',
            onPress: () => router.push('/myprofile'),
        },
        {
            id: 'orders',
            title: 'My Order',
            icon: 'shopping-bag',
          onPress: () => router.push('/myorder'),
        },
        {
            id: 'payment',
            title: 'Payment Methods',
            icon: 'payment',
           onPress: () => router.push('/paymentmethod'),
        },
        {
            id: 'notifications',
            title: 'Notifications',
            icon: 'notifications-none',
           onPress: () => router.push('/notificationdetail'),
        },
        {
            id: 'privacy',
            title: 'Privacy Policy',
            icon: 'privacy-tip',
            onPress: () => console.log('Navigate to Privacy Policy'),
        },
        {
            id: 'help',
            title: 'Help Center',
            icon: 'help-outline',
           onPress: () => router.push('/helpcenter'),
        },
        {
            id: 'invite',
            title: 'Invite Friends',
            icon: 'person-add',
            onPress: () => console.log('Navigate to Invite Friends'),
        },
    ];

    const handleLogout = () => {
        Alert.alert(
            'Log Out',
            'Are you sure you want to log out?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Log Out',
                    style: 'destructive',
                    onPress: () => {
                        console.log('User logged out');
                        // Add your logout logic here
                    },
                },
            ]
        );
    };

    const MenuItem = ({ item }: { item: typeof menuItems[0] }) => (
        <TouchableOpacity
            style={styles.menuItem}
            onPress={item.onPress}
            activeOpacity={0.7}
        >
            <View style={styles.menuItemLeft}>
                <MaterialIcons
                    name={item.icon}
                    size={24}
                    color="black"
                    style={styles.menuIcon}
                />
                <Text style={styles.menuText}>{item.title}</Text>
            </View>
            <MaterialIcons
                name="chevron-right"
                size={24}
                color="black"
            />
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
            <View style={styles.content}>
                {menuItems.map((item) => (
                    <MenuItem key={item.id} item={item} />
                ))}
                <TouchableOpacity
                    style={styles.logoutItem}
                    onPress={handleLogout}
                    activeOpacity={0.7}
                >
                    <View style={styles.menuItemLeft}>
                        <MaterialIcons
                            name="logout"
                            size={24}
                            color="#ff4444"
                            style={styles.menuIcon}
                        />
                        <Text style={styles.logoutText}>Log Out</Text>
                    </View>
                </TouchableOpacity>
            </View>
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
        
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f5f5f5',
    },
    menuItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    menuIcon: {
        marginRight: 16,
    },
    menuText: {
        fontSize: 16,
        color: 'black',
        fontWeight: '400',
    },
    logoutItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        marginTop: 20,
    },
    logoutText: {
        fontSize: 16,
        color: '#ff4444',
        fontWeight: '400',
    },
});

export default ProfileMenuScreen;
