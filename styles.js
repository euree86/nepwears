import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  main: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "white",
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#333333",
    marginBottom: 20,
  },

  paragraph: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333333",
    textAlign: "left",
    marginBottom: 8,
  },

  // container: {
  //   backgroundColor: "#FC0079",
  //   marginHorizontal: 20,
  //   justifyContent: "center",
  //   alignItems: "center",
  //   borderRadius: 7,
  // },

  btncontainer: {
    backgroundColor: "#FC0079",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },

  buttontext: {
    width: "100%",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },

  input: {
    borderWidth: 1.5,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
    color: "#333333",
  },
});
