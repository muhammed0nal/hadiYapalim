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
import { goToRegisterPageHandler } from "../../navigation/navigationFunction.js";
import { backToWelcomeScreenHandler } from "../../navigation/navigationFunction.js";
import { goToForgotPageHandler } from "../../navigation/navigationFunction.js";

// size-matters
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import LoginForm from "../../components/LoginScreenComponents/LoginForm.js";

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
                style={[
                  styles.text,
                  { fontSize: moderateScale(20), color: Colors.blue },
                ]}
              >
                Tekrardan Hoşgeldin.
              </Text>
            </View>
            <LoginForm />
            <Pressable
              onPress={() => goToForgotPageHandler(navigation)}
              style={({ pressed }) => pressed && styles.pressed}
            >
              <Text style={styles.forgotPassword}>Şifremi unuttum</Text>
            </Pressable>
            <View style={styles.registrationButtonContainer}>
              <Pressable
                onPress={() => goToRegisterPageHandler(navigation)}
                style={({ pressed }) => [
                  styles.registrationButtonContainer,
                  pressed && styles.pressed,
                ]}
              >
                <Text style={styles.registrationText_1}>Hesabınız yok mu?</Text>
                <Text style={styles.registrationText_2}>Kayıt için</Text>
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
    marginTop: verticalScale(-80),
    width: scale(300),
    height: verticalScale(360),
    alignSelf: "center",
    resizeMode: "contain",
  },
  text: {
    textAlign: "center",
  },
  textContainer: {
    alignItems: "center",
    marginBottom: verticalScale(30),
    marginTop: verticalScale(-50),
  },
  forgotPassword: {
    marginTop: verticalScale(10),
    marginBottom: verticalScale(10),
    fontSize: moderateScale(16),
  },
  registrationButtonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 2,
  },
  registrationText_1: {
    fontSize: moderateScale(15),
  },
  registrationText_2: {
    fontSize: moderateScale(16),
    fontWeight: "bold",
  },
  pressed: {
    opacity: 0.5,
  },
});
