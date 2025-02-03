import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

// Constants
import { Colors } from "../../constants/Colors.js";
import { ImageConst } from "../../constants/ImageConst.js";

// components
import Icon from "../../components/UI/Icons/Icon.js";

// navigation function
import { goToLoginPageHandler } from "../../navigation/navigationFunction.js";
import { backToWelcomeScreenHandler } from "../../navigation/navigationFunction.js";

import { scale, verticalScale, moderateScale } from "react-native-size-matters"; // Import size-matters
import RegisterForm from "../../components/RegisterScreenComponents/RegisterForm.js";

export default function LoginScreen({ navigation }) {
  return (
    <>
      <StatusBar style="dark" />
      <KeyboardAwareScrollView style={styles.keyboardAwareScrollView}>
        <SafeAreaView style={styles.root}>
          <View style={styles.outContainer}>
            <View style={styles.container}>
              <Icon
                onPress={() => backToWelcomeScreenHandler(navigation)}
                size={scale(24)}
                color={Colors.blue}
                name="arrow-back-outline"
                style={styles.icon}
              />
              <Image style={styles.image} source={ImageConst.logo} />
            </View>
            <View style={styles.textContainer}>
              <Text
                style={{
                  fontSize: moderateScale(20),
                  color: Colors.blue,
                  textAlign: "center",
                }}
              >
                Aramıza Hoşgeldin.
              </Text>
            </View>
            <RegisterForm navigation={navigation} />
            <View style={styles.registrationButtonContainer}>
              <Pressable
                onPress={() => goToLoginPageHandler(navigation)}
                style={({ pressed }) => [
                  styles.registrationButtonContainer,
                  pressed && styles.pressed,
                ]}
              >
                <Text style={styles.registrationText_1}>Hesabınız var mı?</Text>
                <Text style={styles.registrationText_2}>Giriş için</Text>
              </Pressable>
            </View>
          </View>
        </SafeAreaView>
      </KeyboardAwareScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  keyboardAwareScrollView: {
    flex: 1,
  },
  root: {
    flex: 1,
  },
  outContainer: { alignItems: "center" },
  container: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
  },
  icon: {
    marginTop: verticalScale(25),
    marginLeft: scale(25),
  },
  image: {
    marginTop: verticalScale(-70),
    width: scale(242),
    height: verticalScale(242),
    alignSelf: "center",
    resizeMode: "contain",
  },
  name_surname: {
    flexDirection: "row",
    gap: scale(10),
  },
  name: {
    width: scale(105),
  },
  surname: {
    width: scale(105),
  },
  textContainer: {
    alignItems: "center",
    marginBottom: verticalScale(30),
    marginTop: verticalScale(-70),
  },
  formView: { alignItems: "center" },
  input: {
    width: scale(220),
    height: verticalScale(40),
    borderRadius: moderateScale(5),
    paddingBottom: verticalScale(10),
    paddingTop: verticalScale(10),
    paddingLeft: scale(10),
    paddingRight: scale(70),
    backgroundColor: Colors.inputBackgroundWhite,
    borderColor: Colors.blue,
    borderWidth: 2,
    color: Colors.black,
    marginBottom: verticalScale(10),
  },
  registrationButtonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: scale(2),
  },
  registrationText_1: {
    fontSize: scale(10),
  },
  registrationText_2: {
    fontSize: scale(10),
    fontWeight: "bold",
  },
  pressed: {
    opacity: 0.5,
  },
  pickerContainerError: {
    borderColor: "red",
  },
  pickerContainer: {
    width: scale(220),
    height: verticalScale(40),
    borderRadius: moderateScale(5),
    borderColor: Colors.blue,
    borderWidth: 2,
    marginBottom: verticalScale(10),
    justifyContent: "center",
    backgroundColor: Colors.inputBackgroundWhite,
  },
  picker: {
    width: "99%",
    height: "55%",
    color: Colors.gray,
    opacity: 0.5,
  },
  errorText: {
    color: "red",
    marginBottom: verticalScale(10),
    marginTop: verticalScale(-10),
    alignSelf: "flex-start",
    marginLeft: scale(30),
  },
  inputError: {
    borderColor: "red",
  },
  button: {
    width: scale(100),
  },
});
