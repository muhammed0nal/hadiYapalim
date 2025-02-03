import { Pressable, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Formik } from "formik";

// Constants
import { Colors } from "../../../constants/Colors.js";

// components
import Icon from "../../../components/UI/Icons/Icon.js";
import TextInputLogin from "../../../components/UI/Inputs/TextInputLogin.js";
import Button from "../../../components/UI/Buttons/Button.js";

// react
export default function ForgotPasswordTelorGmail({ setStep }) {
  return (
    <View style={styles.container}>
      <View>
        <Text
          style={[styles.forgotPassword, { fontSize: 24, fontWeight: "bold" }]}
        >
          Şifremi unuttum
        </Text>
        <Text style={[styles.forgotPassword, { fontSize: 16 }]}>
          Mail adresinize 4 haneli bir kod gelecek.
        </Text>
        <Formik
          onSubmit={(values) => {
            setStep("forgotpasswordcode");
          }}
          initialValues={{
            email: "",
          }}
        >
          {({ handleSubmit, handleChange, values }) => (
            <View style={styles.formView}>
              <TextInputLogin
                selectionColor={Colors.blue}
                inputMode="email"
                placeholder="Email"
                style={styles.input}
                value={values.email}
                onChangeText={handleChange("email")}
                returnKeyType="done"
                onSubmitEditing={handleSubmit}
              />

              <Button
                onPress={handleSubmit}
                size={50}
                fontSize={20}
                title="Devam Et"
                color={Colors.blue}
              />
            </View>
          )}
        </Formik>
      </View>
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
