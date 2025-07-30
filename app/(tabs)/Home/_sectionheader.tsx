import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

type SectionHeaderProps = {
  title: string;
  onPress?: () => void;
};

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, onPress }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {onPress && (
        <TouchableOpacity onPress={onPress}>
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333333",
  },
  viewAll: {
    fontSize: 14,
    color: "black",
    fontWeight: "500",
  },
});

export default SectionHeader;
