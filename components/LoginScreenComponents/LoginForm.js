import { useState, useRef } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { Formik } from "formik";
// components
import Icon from "../../components/UI/Icons/Icon";
import TextInputLogin from "../../components/UI/Inputs/TextInputLogin";
import Button from "../../components/UI/Buttons/Button";
import ErrorText from "../../components/UI/ErrorText/ErrorText";

import { validationSchemaLogin } from "../../constants/ValidationSchema";
import { Colors } from "../../constants/Colors";
import { useAuth } from "../../contexts/AuthContext";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { ip } from "../../ip/ip";
import axios from "axios";
export default function LoginForm() {
  const [userFound, setUserFound] = useState(true);
  const [wrongPassword, setWrongPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [emptyFields, setEmptyFields] = useState(false);
  const [loginLoader, setLoginLoader] = useState(false);
  const { onLogin, authState } = useAuth();
  const emailorUsernameRef = useRef();
  const passwordRef = useRef();
  console.log(authState);

  const loginHandler = async (values) => {
    setLoginLoader(true);
    setUserFound(true);
    setWrongPassword(false);
    setEmptyFields(false);

    try {
      const response = await axios.post(`${ip}/login/logincomplete`, values, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data.msgId === "cp") {
        onLogin(response);
      }
      setLoginLoader(false);
      console.log("Veri başarıyla gönderildi:", response.data);
    } catch (error) {
      if (error.response.data.msgId === "unf") {
        setUserFound(false);
      }

      if (error.response.data.msgId === "ef") {
        setEmptyFields(true);
      }
      if (error.response.data.msgId === "wp") {
        setWrongPassword(true);
      }
      setLoginLoader(false);
      console.error("Veri gönderme hatası:", error);
    }
  };
  return (
    <Formik
      validationSchema={validationSchemaLogin}
      onSubmit={loginHandler}
      initialValues={{
        emailorUsername: "",
        password: "",
      }}
    >
      {({ handleSubmit, handleChange, values, touched, errors }) => (
        <View style={styles.formView}>
          <TextInputLogin
            ref={emailorUsernameRef}
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current.focus()}
            autoCapitalize="none"
            selectionColor={Colors.blue}
            inputMode="email"
            placeholder="Email veya kullanıcı adı"
            style={styles.input}
            value={values.emailorUsername}
            onChangeText={handleChange("emailorUsername")}
          />
          {touched.emailorUsername && errors.emailorUsername && (
            <ErrorText>{errors.emailorUsername}</ErrorText>
          )}
          {!userFound && <ErrorText>Kullanıcı bulunamadı</ErrorText>}
          <View style={{ position: "relative", width: "100%" }}>
            <TextInputLogin
              ref={passwordRef}
              autoCapitalize="none"
              selectionColor={Colors.blue}
              value={values.password}
              onChangeText={handleChange("password")}
              secureTextEntry={!showPassword}
              placeholder="Şifre"
              style={styles.input}
              onSubmitEditing={handleSubmit}
            />
            {touched.password && errors.password && (
              <ErrorText>{errors.password}</ErrorText>
            )}
            {wrongPassword && <ErrorText>Şifreniz yanlış</ErrorText>}
            {emptyFields && <ErrorText>Lütfen bilgilerinizi giriniz</ErrorText>}
            <Icon
              stylePressable={{
                position: "absolute",
                top: "50%",
                right: scale(15),
                transform: [{ translateY: -20 }],
              }}
              onPress={() => setShowPassword((prev) => !prev)}
              size={24}
              color={Colors.blue}
              name={showPassword ? "eye-outline" : "eye-off-outline"}
            />
          </View>
          <Button
            width={scale(100)}
            backgroundColor={Colors.blue}
            height={scale(28)}
            borderRadius={moderateScale(4)}
            loading={loginLoader}
            onPress={handleSubmit}
            textColor={Colors.white}
            fontSize={moderateScale(14)}
            title={
              loginLoader ? (
                <ActivityIndicator
                  size={30}
                  color={Colors.inputBackgroundWhite}
                />
              ) : (
                "Giriş Yap"
              )
            }
            color={Colors.blue}
          />
        </View>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  formView: { alignItems: "center" },
  input: {
    width: scale(250),
    height: verticalScale(40),
    borderRadius: moderateScale(5),
    paddingBottom: verticalScale(10),
    paddingTop: verticalScale(10),
    paddingLeft: scale(10),
    paddingRight: scale(10),
    backgroundColor: Colors.inputBackgroundWhite,
    borderColor: Colors.blue,
    borderWidth: 2,
    color: Colors.black,
    marginBottom: verticalScale(10),
  },
});
