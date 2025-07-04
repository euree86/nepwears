import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "space-between",
    paddingVertical: 105,
    backgroundColor: "white",
  },

  main: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "white",
  },

  imgwrapper: {
    alignItems: "center",
    paddingHorizontal: 20,
  },

  image: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },

  heading: {
    fontSize: 30,
    color: "#323135",
    fontWeight: 700,
    textAlign: "center",
    paddingBottom: 8,
  },

  paragraph: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333333",
    textAlign: "left",
    marginBottom: 8,
  },

  container: {
    backgroundColor: "#FC0079",
    marginHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 7,
  },

  buttontext: {
    width: "100%",
    textAlign: "center",
    paddingVertical: 10,
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#333333",
    marginBottom: 30,
  },

  loginbtn: {
    color: "#333333",
    borderWidth: 2,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  linecontainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  ortext: {
    fontSize: 14,
    textAlign: "center",
    justifyContent: "center",
    color: "#68656E",
    paddingHorizontal: 8,
  },

  line: {
    height: 1,
    flex: 1,
    backgroundColor: "#68656E",
  },

  buttontext: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },

  btncontainer: {
    backgroundColor: "#FC0079",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
  },

  signup: {
    borderBottomWidth: 2,
    borderBottomColor: "#FC0079",
    color: "#FC0079",
    fontSize: 15,
  },

  signupcontainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
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
