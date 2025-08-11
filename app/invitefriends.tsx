import React, { useState, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    Dimensions,
    Share,
    Alert,
    Clipboard,
    Platform
} from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Header from './components/header';
import Button from './components/button';
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Responsive scaling
const scale = screenWidth / 375;
const moderateScale = (size: number, factor = 0.5) =>
    size + (scale - 1) * factor;

const InviteFriendsScreen = () => {
    const [referralLink] = useState('https://yourapp.com/invite/MARTHA035');
    const [copied, setCopied] = useState(false);

    // Copy link to clipboard
    const copyToClipboard = useCallback(async () => {
        try {
            await Clipboard.setString(referralLink);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            Alert.alert('Error', 'Failed to copy link');
        }
    }, [referralLink]);

    // Share link using native share
    const shareLink = useCallback(async () => {
        try {
            const result = await Share.share({
                message: `Hey! Join me on this amazing app and get ahead in the queue! Use my referral link: ${referralLink}`,
                url: referralLink,
                title: 'Join me on this app!'
            });
        } catch (error) {
            Alert.alert('Error', 'Failed to share link');
        }
    }, [referralLink]);

    // Share via specific platforms
    const shareViaWhatsApp = useCallback(() => {
        const message = encodeURIComponent(`Hey! Join me on this amazing app and get ahead in the queue! ${referralLink}`);
        Share.share({
            message: `Hey! Join me on this amazing app and get ahead in the queue! ${referralLink}`,
        });
    }, [referralLink]);

    const renderIllustration = () => (
        <View style={styles.illustrationContainer}>
            <LinearGradient
                colors={['#E8F4FD', '#F0F9FF']}
                style={styles.illustrationBackground}
            >
                {/* Background shapes */}
                <View style={[styles.buildingShape, styles.building1]} />
                <View style={[styles.buildingShape, styles.building2]} />
                <View style={[styles.buildingShape, styles.building3]} />

                {/* People illustrations */}
                <View style={styles.peopleContainer}>
                    {/* Person 1 - Red */}
                    <View style={[styles.person, styles.person1]}>
                        <View style={[styles.personHead, { backgroundColor: '#FF6B6B' }]} />
                        <View style={[styles.personBody, { backgroundColor: '#FF8E8E' }]} />
                    </View>

                    {/* Person 2 - Blue (center) */}
                    <View style={[styles.person, styles.person2]}>
                        <View style={[styles.personHead, { backgroundColor: '#4ECDC4' }]} />
                        <View style={[styles.personBody, { backgroundColor: '#6ED7D3' }]} />
                    </View>

                    {/* Person 3 - Orange */}
                    <View style={[styles.person, styles.person3]}>
                        <View style={[styles.personHead, { backgroundColor: '#FFB347' }]} />
                        <View style={[styles.personBody, { backgroundColor: '#FFC970' }]} />
                    </View>
                </View>

                {/* Floating elements */}
                <View style={[styles.floatingElement, styles.element1]}>
                    <MaterialIcons name="group" size={moderateScale(16)} color="#4ECDC4" />
                </View>
                <View style={[styles.floatingElement, styles.element2]}>
                    <MaterialIcons name="share" size={moderateScale(14)} color="#FF6B6B" />
                </View>
            </LinearGradient>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <Header title="" />
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Header Section */}
                <View style={styles.headerSection}>
                    <Text style={styles.title}>Invite your friends</Text>
                    <Text style={styles.subtitle}>
                        Refer friends to get ahead in the{'\n'}queue (5 friends)
                    </Text>
                </View>

                {/* Illustration */}
                {renderIllustration()}

                {/* Description */}
                <View style={styles.descriptionSection}>
                    <Text style={styles.description}>
                        Just share this link with your friends and ask them to signup and use this link.
                        Both of you will get ahead of the waitlist
                    </Text>
                </View>

                {/* Referral Link Section */}
                <View style={styles.linkSection}>
                    <View style={styles.linkContainer}>
                        <View style={styles.linkContent}>
                            <MaterialIcons
                                name="link"
                                size={moderateScale(20)}
                                color="#6B7280"
                                style={styles.linkIcon}
                            />
                            <Text style={styles.linkText} numberOfLines={1}>
                                {referralLink}
                            </Text>
                        </View>
                        <TouchableOpacity
                            style={styles.copyButton}
                            onPress={copyToClipboard}
                            activeOpacity={0.7}
                        >
                            <MaterialIcons
                                name={copied ? "check" : "content-copy"}
                                size={moderateScale(16)}
                                color={copied ? "#10B981" : "#6B7280"}
                            />
                        </TouchableOpacity>
                    </View>

                    {copied && (
                        <Text style={styles.copiedText}>Link copied to clipboard!</Text>
                    )}
                </View>

                {/* Action Buttons */}
                <View style={styles.buttonsSection}>
                    <Button text="Share Link" onPress={shareLink} style={{ paddingVertical: moderateScale(16), }} />
                </View>


            </ScrollView >
        </SafeAreaView >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: moderateScale(30),
    },
    headerSection: {
        alignItems: 'center',
        paddingHorizontal: moderateScale(20),
        paddingBottom: moderateScale(10),
    },
    title: {
        fontSize: moderateScale(24),
        fontWeight: '700',
        color: '#1F2937',
        marginBottom: moderateScale(8),
    },
    subtitle: {
        fontSize: moderateScale(14),
        color: '#6B7280',
        textAlign: 'center',
        lineHeight: moderateScale(20),
    },
    illustrationContainer: {
        alignItems: 'center',
        marginVertical: moderateScale(30),
    },
    illustrationBackground: {
        width: moderateScale(200),
        height: moderateScale(200),
        borderRadius: moderateScale(100),
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
    },
    buildingShape: {
        position: 'absolute',
        backgroundColor: '#B6D7F5',
        opacity: 0.6,
    },
    building1: {
        width: moderateScale(30),
        height: moderateScale(50),
        top: moderateScale(60),
        left: moderateScale(30),
        borderRadius: moderateScale(4),
    },
    building2: {
        width: moderateScale(25),
        height: moderateScale(40),
        top: moderateScale(70),
        right: moderateScale(40),
        borderRadius: moderateScale(4),
    },
    building3: {
        width: moderateScale(35),
        height: moderateScale(45),
        top: moderateScale(50),
        right: moderateScale(60),
        borderRadius: moderateScale(4),
    },
    peopleContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
        zIndex: 2,
    },
    person: {
        alignItems: 'center',
        marginHorizontal: moderateScale(8),
    },
    person1: {
        marginTop: moderateScale(10),
    },
    person2: {
        marginTop: moderateScale(-5),
    },
    person3: {
        marginTop: moderateScale(8),
    },
    personHead: {
        width: moderateScale(20),
        height: moderateScale(20),
        borderRadius: moderateScale(10),
        marginBottom: moderateScale(2),
    },
    personBody: {
        width: moderateScale(16),
        height: moderateScale(25),
        borderTopLeftRadius: moderateScale(8),
        borderTopRightRadius: moderateScale(8),
    },
    floatingElement: {
        position: 'absolute',
        width: moderateScale(28),
        height: moderateScale(28),
        borderRadius: moderateScale(14),
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    element1: {
        top: moderateScale(40),
        left: moderateScale(160),
    },
    element2: {
        bottom: moderateScale(40),
        left: moderateScale(20),
    },
    descriptionSection: {
        paddingHorizontal: moderateScale(20),
        marginBottom: moderateScale(30),
    },
    description: {
        fontSize: moderateScale(14),
        color: '#6B7280',
        textAlign: 'center',
        lineHeight: moderateScale(20),
    },
    linkSection: {
        paddingHorizontal: moderateScale(20),
    },
    linkContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F9FAFB',
        borderRadius: moderateScale(12),
        borderWidth: 1,
        borderColor: '#E5E7EB',
        paddingHorizontal: moderateScale(16),
        paddingVertical: moderateScale(14),
    },
    linkContent: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    linkIcon: {
        marginRight: moderateScale(12),
    },
    linkText: {
        fontSize: moderateScale(14),
        color: '#374151',
        flex: 1,
    },
    copyButton: {
        padding: moderateScale(8),
        borderRadius: moderateScale(6),
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    copiedText: {
        fontSize: moderateScale(12),
        color: '#10B981',
        textAlign: 'center',
        marginTop: moderateScale(8),
    },
    buttonsSection: {
        paddingHorizontal: moderateScale(20),
        marginBottom: moderateScale(30),
    },



});

export default InviteFriendsScreen;