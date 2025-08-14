import React from "react";
import { TouchableOpacity, Text, StyleSheet, Dimensions, ViewStyle, TextStyle } from "react-native";

const { width, height } = Dimensions.get("window");

type Props = {
    text: string;
    onPress: () => void;
    style?: ViewStyle;
    textStyle?: TextStyle;
  

};

const Button: React.FC<Props> = ({ text, onPress, style, textStyle }) => {
    return (
        <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
            <Text style={[styles.text, textStyle]}>{text}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#D81B60",
        paddingVertical: height * 0.016,
        borderRadius: 8,
        alignItems: "center",
        marginTop: height * 0.01,
        color:"white",
        // elevation: 3,
        // shadowColor: "#D81B60",
        // shadowOffset: { width: 0, height: 2 },
        // shadowOpacity: 0.3,
        // shadowRadius: 3,
    },
    text: {
        color: "#fff",
        fontSize: width * 0.045,
        fontWeight: "600",
    },
});

export default Button;
