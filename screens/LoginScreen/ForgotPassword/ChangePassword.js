import { Formik } from "formik";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import TextInputLogin from "../../../components/UI/Inputs/TextInputLogin";
import Button from "../../../components/UI/Buttons/Button";
import { Colors } from "../../../constants/Colors";
import { useRef, useState } from "react";
import Icon from "../../../components/UI/Icons/Icon";

export default function ChangePassword({ setStep }) {
  const [showPassword, setShowPassword] = useState(false);
  const passwordRef = useRef(null);
  const passwordRef_2 = useRef(null);
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
            setStep("completepasswordchange");
          }}
          initialValues={{
            email: "",
          }}
        >
          {({ handleSubmit, handleChange, values, touched, errors }) => (
            <View style={styles.formView}>
              <View style={{ position: "relative" }}>
                <TextInputLogin
                  ref={passwordRef}
                  selectionColor={Colors.blue}
                  value={values.password}
                  onChangeText={handleChange("password")}
                  secureTextEntry={!showPassword}
                  placeholder="Şifre"
                  style={[
                    styles.input,
                    touched.password && errors.password && styles.inputError,
                  ]}
                  returnKeyType="next"
                  onSubmitEditing={() => passwordRef_2.current.focus()}
                />

                <TouchableOpacity
                  style={{
                    position: "absolute",
                    right: 5,
                    top: 0,
                    width: 50,
                    height: 63,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onPress={() => setShowPassword((prev) => !prev)}
                >
                  <Icon
                    onPress={() => setShowPassword((prev) => !prev)}
                    size={24}
                    color={Colors.blue}
                    name={showPassword ? "eye-outline" : "eye-off-outline"}
                    style={{}}
                  />
                </TouchableOpacity>
              </View>
              {touched.password && errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}
              <View style={{ position: "relative" }}>
                <TextInputLogin
                  ref={passwordRef_2}
                  selectionColor={Colors.blue}
                  value={values.password_2}
                  onChangeText={handleChange("password_2")}
                  secureTextEntry={!showPassword}
                  placeholder="Tekrar Şifre"
                  style={[
                    styles.input,
                    touched.password_2 &&
                      errors.password_2 &&
                      styles.inputError,
                  ]}
                  returnKeyType="done"
                  onSubmitEditing={handleSubmit}
                />
                <TouchableOpacity
                  style={{
                    position: "absolute",
                    right: 5,
                    top: 0,
                    width: 50,
                    height: 63,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onPress={() => setShowPassword((prev) => !prev)}
                >
                  <Icon
                    onPress={() => setShowPassword((prev) => !prev)}
                    size={24}
                    color={Colors.blue}
                    name={showPassword ? "eye-outline" : "eye-off-outline"}
                    style={{}}
                  />
                </TouchableOpacity>
              </View>
              {touched.password_2 && errors.password_2 && (
                <Text style={styles.errorText}>{errors.password_2}</Text>
              )}
              <Button
                onPress={handleSubmit}
                size={50}
                fontSize={20}
                title="Şifreyi sıfırla"
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
  formView: {
    alignItems: "center",
  },
  forgotPassword: {
    marginTop: 10,
    marginBottom: 10,
    textAlign: "center",
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
    marginBottom: 10,
  },
  forgotPassword: {
    marginTop: 10,
    marginBottom: 10,
  },
  pressed: {
    opacity: 0.5,
  },
  forgotPassword: {
    marginTop: 10,
    marginBottom: 10,
    textAlign: "center",
  },
});
