import React, { useState } from "react";
import {
    SafeAreaView,
    ScrollView,
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
} from "react-native";
import Header from "../../components/header";
import SearchBar from "../../scanner/_searchbar";
import SectionHeader from "./_sectionheader";
import Categories from "./_categories";
import BannerSlider from "./_bannerslide";
import ProductGrid from "./_productgrid";
import NotificationPopup from "../../homealert";
import { useRouter } from "expo-router";
const HomeScreen = () => {
    const [showNotificationPopup, setShowNotificationPopup] = useState(true);

    const handleNotificationResponse = (allowed: boolean) => {
        console.log("Notification allowed?", allowed);
        setShowNotificationPopup(false);
    };
    const router = useRouter();
    return (
        <SafeAreaView style={styles.container}>
            <View
                style={{
                    flex: 1,
                    backgroundColor: "white",
                    opacity: showNotificationPopup ? 0.3 : 1,
                }}
            >
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Header title="NEPWEARS" showBackButton={false} />
                    <SearchBar />
                    <BannerSlider />

                    <View style={styles.section}>

                        <View style={styles.header}>
                            <Text style={styles.headerTitle}>CATEGORIES</Text>
                            <TouchableOpacity onPress={() => console.log("View All pressed")}>
                                <Text style={styles.viewAllText}>VIEW ALL</Text>
                            </TouchableOpacity>
                        </View>
                        <Categories />

                    </View>


                    <View style={styles.section}>

                        <View style={styles.header}>
                            <Text style={styles.headerTitle}>POPULAR</Text>
                            <TouchableOpacity onPress={() => router.push("/viewall/main")}>
                                <Text style={styles.viewAllText}>VIEW ALL</Text>
                            </TouchableOpacity>
                        </View>

                        <ProductGrid />
                    </View>
                </ScrollView>
            </View>

            <NotificationPopup
                visible={showNotificationPopup}
                onResponse={handleNotificationResponse}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    section: {
        paddingHorizontal: 16,
        marginBottom: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#333333',
        fontFamily: "Poppins-Bold"
    },
    viewAllText: {
        fontSize: 14,
        color: '#666666',
        fontFamily: 'System'
    },

});

export default HomeScreen;
