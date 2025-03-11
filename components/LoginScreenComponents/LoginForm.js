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

          <View style={styles.passwordContainer}>
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
            <Icon
              stylePressable={styles.eyeIcon}
              onPress={() => setShowPassword((prev) => !prev)}
              size={24}
              color={Colors.blue}
              name={showPassword ? "eye-outline" : "eye-off-outline"}
            />
          </View>

          {touched.password && errors.password && (
            <ErrorText>{errors.password}</ErrorText>
          )}
          {wrongPassword && <ErrorText>Şifreniz yanlış</ErrorText>}
          {emptyFields && <ErrorText>Lütfen bilgilerinizi giriniz</ErrorText>}

          <Button
            width={scale(220)}
            backgroundColor={Colors.blue}
            height={verticalScale(48)}
            borderRadius={moderateScale(8)}
            loading={loginLoader}
            onPress={handleSubmit}
            textColor={Colors.white}
            fontSize={moderateScale(16)}
            title={
              loginLoader ? (
                <ActivityIndicator size={24} color={Colors.white} />
              ) : (
                "Giriş Yap"
              )
            }
            marginTop={verticalScale(20)}
          />
        </View>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  formView: {
    alignItems: "center",
    width: "100%",
  },
  input: {
    width: scale(280),
    height: verticalScale(50),
    borderRadius: moderateScale(8),
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(16),
    backgroundColor: Colors.inputBackgroundWhite,
    borderColor: Colors.blue,
    borderWidth: 1.5,
    color: Colors.black,
    marginBottom: verticalScale(16),
    fontSize: moderateScale(16),
  },
  passwordContainer: {
    position: "relative",
    width: "100%",
    alignItems: "center",
  },
  eyeIcon: {
    position: "absolute",
    top: "50%",
    right: scale(45),
    transform: [{ translateY: -verticalScale(25) }],
    zIndex: 10,
    padding: moderateScale(8),
  },
});
