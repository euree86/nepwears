import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const Header = () => {
  const router = useRouter();

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => router.push("../location")}>
        <View>
          <Text style={styles.locationLabel}>Location</Text>
          <Text style={styles.locationText}>Baneshwor, Kathmandu</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("../notification")}>
        <EvilIcons name="bell" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: 20,

    paddingBottom: 4,
    backgroundColor: "#FFFFFF",
  },
  locationLabel: {
    fontSize: 12,
    color: "#666666",
    marginBottom: 2,
  },
  locationText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333333",
  },
});

export default Header;
