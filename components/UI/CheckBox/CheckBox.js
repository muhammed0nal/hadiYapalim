import { Checkbox } from "expo-checkbox";
import { Pressable, StyleSheet, View } from "react-native";
export default function Checbox({ ...props }) {
  return <Checkbox {...props} />;
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
    marginVertical: 32,
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
  },
  paragraph: {
    fontSize: 15,
  },
  checkbox: {
    margin: 8,
  },
});
