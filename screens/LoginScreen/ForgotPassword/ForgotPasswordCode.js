import { Formik } from "formik";
import { StyleSheet, Text, View } from "react-native";
import TextInputLogin from "../../../components/UI/Inputs/TextInputLogin";
import Button from "../../../components/UI/Buttons/Button";
import { Colors } from "../../../constants/Colors";
import { useEffect, useRef } from "react";

export default function ForgotPasswordCode({ setStep }) {
  const code1 = useRef(null);
  const code2 = useRef(null);
  const code3 = useRef(null);
  const code4 = useRef(null);
  useEffect(() => {
    code1.current.focus();
  }, []);
  return (
    <View style={styles.container}>
      <View>
        <Text
          style={[styles.forgotPassword, { fontSize: 24, fontWeight: "bold" }]}
        >
          4 Haneli Kodu Girin
        </Text>
        <Text style={[styles.forgotPassword, { fontSize: 16 }]}>
          Mail adresinize gelen 4 haneli kodu girin.
        </Text>
        <Formik
          onSubmit={(values) => {
            let code =
              values.code1 + values.code2 + values.code3 + values.code4;
            if (code !== "") {
              setStep("changepassword");
              console.log(code);
            }
          }}
          initialValues={{
            code1: "",
            code2: "",
            code3: "",
            code4: "",
          }}
        >
          {({ handleSubmit, handleChange, values }) => (
            <View style={styles.formView}>
              <View style={styles.textInputContainer}>
                <TextInputLogin
                  ref={code1}
                  selectionColor={Colors.blue}
                  inputMode="numeric"
                  style={styles.input}
                  maxLength={1}
                  value={values.code1}
                  onChangeText={(value) => {
                    handleChange("code1")(value);
                    if (value.length === 1) {
                      code2.current.focus();
                    }
                  }}
                  returnKeyType="next"
                  onSubmitEditing={() => code2.current.focus()}
                />
                <TextInputLogin
                  ref={code2}
                  selectionColor={Colors.blue}
                  inputMode="numeric"
                  style={styles.input}
                  maxLength={1}
                  value={values.code2}
                  onChangeText={(value) => {
                    handleChange("code2")(value);
                    if (value.length === 1) {
                      code3.current.focus();
                    }
                    if (value.length === 0) {
                      code1.current.focus();
                    }
                  }}
                  returnKeyType="next"
                  onSubmitEditing={() => code3.current.focus()}
                />
                <TextInputLogin
                  ref={code3}
                  selectionColor={Colors.blue}
                  inputMode="numeric"
                  maxLength={1}
                  style={styles.input}
                  value={values.code3}
                  onChangeText={(value) => {
                    handleChange("code3")(value);
                    if (value.length === 1) {
                      code4.current.focus();
                    }
                    if (value.length === 0) {
                      code2.current.focus();
                    }
                  }}
                  returnKeyType="next"
                  onSubmitEditing={() => code4.current.focus()}
                />
                <TextInputLogin
                  ref={code4}
                  maxLength={1}
                  selectionColor={Colors.blue}
                  inputMode="numeric"
                  style={styles.input}
                  value={values.code4}
                  onChangeText={(value) => {
                    handleChange("code4")(value);
                    if (value.length === 0) {
                      code3.current.focus();
                    }
                  }}
                  returnKeyType="done"
                  onSubmitEditing={handleSubmit}
                />
              </View>

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
  textInputContainer: {
    flexDirection: "row",
    gap: 10,
  },
  input: {
    width: 50,
    height: 70,
    borderRadius: 10,
    fontSize: 25,
    fontWeight: "bold",
    backgroundColor: Colors.inputBackgroundWhite,
    borderColor: Colors.blue,
    borderWidth: 2,
    color: Colors.black,
    marginBottom: 40,
    marginTop: 50,
    textAlign: "center",
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
