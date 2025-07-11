import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
type FontAwesomeIconName = keyof typeof FontAwesome.glyphMap;

const CustomerService = () => {
    const openLink = (url: string) => {
        Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
    };

    const services: {
        name: string;
        icon: FontAwesomeIconName;
        color: string;
        url: string;
    }[] = [
            { name: 'Customer Service', icon: 'headphones', color: 'black', url: 'https://wa.me/' },
            { name: 'Whatsapp', icon: 'whatsapp', color: '#25D366', url: 'https://wa.me/' },
            { name: 'Website', icon: 'globe', color: '#4285F4', url: 'https://yourwebsite.com' },
            { name: 'Facebook', icon: 'facebook-square', color: '#4267B2', url: 'https://facebook.com/yourpage' },
            { name: 'Twitter', icon: 'twitter', color: '#1DA1F2', url: 'https://twitter.com/yourhandle' },
            { name: 'Instagram', icon: 'instagram', color: '#E1306C', url: 'https://instagram.com/yourhandle' },
        ];


    return (
        <View style={styles.container}>


            {services.map((service, index) => (
                <TouchableOpacity
                    key={index}
                    style={styles.serviceBox}
                    onPress={() => openLink(service.url)}
                >
                    <FontAwesome name={service.icon} size={24} color={service.color} />
                    <Text style={styles.serviceText}>{service.name}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "white",

    },

    serviceBox: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E8E8EB',
        borderRadius: 8,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.04,
        shadowRadius: 1,
        elevation: 2,
    },
    serviceText: {
        fontSize: 16,
        marginLeft: 15,
    },
});

export default CustomerService;