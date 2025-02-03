import { StyleSheet, Text } from "react-native";

export default function ErrorText({ children }) {
  return <Text style={styles.errorText}>{children}</Text>;
}
const styles = StyleSheet.create({
  errorText: {
    color: "red",
    marginBottom: 10,
    marginTop: -10,
    alignSelf: "center",
    marginLeft: 30,
  },
});
