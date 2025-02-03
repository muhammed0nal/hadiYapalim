export function backToWelcomeScreenHandler(navigation) {
  navigation.navigate("WelcomeScreen");
}

export function goToRegisterPageHandler(navigation) {
  navigation.replace("RegisterScreen");
}

export function goToForgotPageHandler(navigation) {
  navigation.navigate("ForgotPassword");
}

export function goToLoginPageHandler(navigation) {
  navigation.replace("LoginScreen");
}

export function goToHomePageHandler(navigation) {
  navigation.replace("LoginScreen");
}
