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
      <KeyboardAwareScrollView
        style={styles.keyboardAwareScrollView}
        contentContainerStyle={styles.scrollViewContent}
      >
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
              <Text style={styles.welcomeText}>Tekrardan Hoşgeldin.</Text>
            </View>
            <LoginForm />
            <Pressable
              onPress={() => goToForgotPageHandler(navigation)}
              style={({ pressed }) => [
                styles.forgotPasswordContainer,
                pressed && styles.pressed,
              ]}
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
    backgroundColor: Colors.white,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  root: {
    flex: 1,
  },
  outContainer: {
    alignItems: "center",
    flex: 1,
    paddingBottom: verticalScale(20),
  },
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
    marginTop: verticalScale(20),
    width: verticalScale(130),
    height: verticalScale(130),
    alignSelf: "center",
    resizeMode: "contain",
  },
  textContainer: {
    alignItems: "center",
    marginBottom: verticalScale(30),
    marginTop: verticalScale(20),
  },
  welcomeText: {
    fontSize: moderateScale(22),
    color: Colors.blue,
    fontWeight: "600",
    textAlign: "center",
  },
  forgotPasswordContainer: {
    marginTop: verticalScale(16),
    marginBottom: verticalScale(16),
    padding: moderateScale(8),
  },
  forgotPassword: {
    fontSize: moderateScale(16),
    color: Colors.blue,
  },
  registrationButtonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
    marginTop: verticalScale(20),
    padding: moderateScale(8),
  },
  registrationText_1: {
    fontSize: moderateScale(15),
    color: Colors.black,
  },
  registrationText_2: {
    fontSize: moderateScale(16),
    fontWeight: "bold",
    color: Colors.blue,
  },
  pressed: {
    opacity: 0.5,
  },
});
