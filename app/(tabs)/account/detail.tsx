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
    Dimensions,
    Image,
} from 'react-native';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

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

type Props = NativeStackScreenProps<RootStackParamList, 'ProfileMenu'>;

const ProfileMenuScreen: React.FC<Props> = ({ navigation }) => {
    const router = useRouter();

    const menuItems: MenuItemType[] = [
        {
            id: 'orders',
            title: 'My Order',
            icon: 'shopping-bag',
            onPress: () => router.push('/myorder'),
        },
        {
            id: 'getmembership',
            title: 'Get Membership',
            icon: 'person',
             onPress: () => router.push('/membership'),

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
        Alert.alert('Log Out', 'Are you sure you want to log out?', [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Log Out',
                style: 'destructive',
                onPress: () => {
                    console.log('User logged out');
                    router.replace('/login');
                },
            },
        ]);
    };


    const MenuItem = ({ item }: { item: typeof menuItems[0] }) => (
        <TouchableOpacity
            style={styles.menuItem}
            onPress={item.onPress}
            activeOpacity={0.7}
        >
            <View style={styles.menuItemLeft}>
                <MaterialIcons name={item.icon} size={24} color="black" style={styles.menuIcon} />
                <Text style={styles.menuText}>{item.title}</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="black" />
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />

            <View style={styles.profileSection}>
                <View style={styles.profileInfo}>
                    <View style={styles.avatarWrapper}>
                        <Image
                            source={require('../../../assets/images/logo.png')}
                            style={styles.avatar}
                        />
                    </View>
                    <View>
                        <View style={styles.profileText}>
                            <Text style={styles.profileName}>Charlotte King</Text>
                            <Text style={styles.profileUsername}>@johnkinggraphics</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.editProfileButton}
                            onPress={() => router.push('/myprofile')}
                        >
                            <Text style={styles.editProfileButtonText}>Edit Profile</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

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
                            color="#FC0079"
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
        backgroundColor: '#fff',
    },
    profileSection: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        justifyContent: 'space-between',
    },
    profileInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatarWrapper: {
        width: 60,
        height: 60,
        borderRadius: 30,
        overflow: 'hidden',
    },
    avatar: {
        width: '100%',
        height: '100%',
    },
    profileText: {
        marginLeft: 12,
        marginBottom: 10,
    },
    profileName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    profileUsername: {
        fontSize: 14,
        color: 'gray',
    },
    editProfileButton: {
        backgroundColor: '#FC0079',
        borderRadius: 8,
        paddingVertical: 6,
        marginLeft: 12,
    },
    editProfileButtonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 14,
        textAlign: 'center',
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
        borderBottomColor: '#f0f0f0',
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
        color: "#FC0079",
        fontWeight: '400',
    },
});

export default ProfileMenuScreen;
