import { StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";

// Constants
import { Colors } from "../../../constants/Colors.js";

// react
import { useState } from "react";

// forgotpassword step
import ForgotPasswordTelorGmail from "./ForgotPasswordTelorGmail.js";
import ForgotPasswordCode from "./ForgotPasswordCode.js";
import ChangePassword from "./ChangePassword.js";
import CompletePasswordChange from "./CompletePasswordChange.js";
export default function ForgotPassword({ navigation }) {
  const [step, setStep] = useState("mailOrTel");
  let content = <ForgotPasswordTelorGmail setStep={setStep} />;
  if (step === "forgotpasswordcode") {
    content = <ForgotPasswordCode setStep={setStep} />;
  }
  if (step === "changepassword") {
    content = <ChangePassword setStep={setStep} />;
  }
  if (step === "completepasswordchange") {
    content = (
      <CompletePasswordChange setStep={setStep} navigation={navigation} />
    );
  }

  return (
    <>
      <StatusBar style="dark" />
      <View style={styles.container}>{content}</View>
    </>
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
