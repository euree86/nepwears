import React, { useState } from "react";
import { SafeAreaView, ScrollView, View, StyleSheet } from "react-native";
import Header from "../../components/header";
import SearchBar from "../../scanner/_searchbar";
import SectionHeader from "./_sectionheader";
import Categories from "./_categories";
import BannerSlider from "./_bannerslide";
import ProductGrid from "./_productgrid";
import NotificationPopup from "../../homealert";

const HomeScreen = () => {
    const [showNotificationPopup, setShowNotificationPopup] = useState(true);

    const handleNotificationResponse = (allowed: boolean) => {
        console.log("Notification allowed?", allowed);
        setShowNotificationPopup(false);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flex: 1, backgroundColor: "white", opacity: showNotificationPopup ? 0.3 : 1 }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Header title="NEPWEARS" showBackButton={false} />
                    <SearchBar />

                    <BannerSlider />

                    <Categories />




                    <View style={styles.section}>
                        <SectionHeader title="Hot Deals" />
                        <ProductGrid />
                    </View>
                </ScrollView>
            </View>

            <NotificationPopup visible={showNotificationPopup} onResponse={handleNotificationResponse} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",

    },
    section: {
        paddingHorizontal: 20,
        marginBottom: 20,

    },
});

export default HomeScreen;
