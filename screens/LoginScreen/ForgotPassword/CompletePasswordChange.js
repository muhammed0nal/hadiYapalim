import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../../../constants/Colors";

export default function CompletePasswordChange({ setStep, navigation }) {
  setTimeout(() => {
    navigation.reset({
      index: 1,
      routes: [{ name: "WelcomeScreen" }, { name: "LoginScreen" }],
    });
  }, 3000);
  return (
    <View style={styles.container}>
      <Text>Şifreniz sıfırlanıyor.</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 50,
  },
  input: {
    width: 357,
    height: 64,
    borderRadius: 10,
    paddingBottom: 20,
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 50,
    backgroundColor: Colors.inputBackgroundWhite,
    borderColor: Colors.blue,
    borderWidth: 2,
    color: Colors.black,
    marginBottom: 40,
    marginTop: 50,
  },
  formView: {
    alignItems: "center",
  },
  forgotPassword: {
    marginTop: 10,
    marginBottom: 10,
    textAlign: "center",
  },
});
