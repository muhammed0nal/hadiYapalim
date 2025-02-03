import axios from "axios";
import { Formik } from "formik";
import { useRef, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import TextInputLogin from "../UI/Inputs/TextInputLogin";
import ErrorText from "../UI/ErrorText/ErrorText";
import Icon from "../UI/Icons/Icon";
import { Colors } from "../../constants/Colors";
import Button from "../UI/Buttons/Button";
import { validationSchemaRegister } from "../../constants/ValidationSchema";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import Checkbox from "../../components/UI/CheckBox/CheckBox.js";
import IlluminationText from "../UI/IlluminationText/IlluminationText.js";
import { ip } from "../../ip/ip.js";
import { goToLoginPageHandler } from "../../navigation/navigationFunction.js";
export default function RegisterForm({ navigation }) {
  const [showPassword, setShowPassword] = useState(false);
  const [registerLoader, setRegisterLoader] = useState(false);

  const surnameRef = useRef(null);
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const telNoRef = useRef(null);
  const pickerRef = useRef(null);
  const passwordRef = useRef(null);
  const passwordRef_2 = useRef(null);

  const handleRegister = async (values) => {
    setRegisterLoader(true);
    try {
      const response = await axios.post(
        `${ip}/register/registercomplete`,
        values,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setRegisterLoader(false);
      return goToLoginPageHandler(navigation);
    } catch (error) {
      setRegisterLoader(false);
    }
  };
  return (
    <Formik
      validationSchema={validationSchemaRegister}
      onSubmit={handleRegister}
      initialValues={{
        name: "",
        surname: "",
        username: "",
        email: "",
        telNo: "",
        picker: "",
        password: "",
        password_2: "",
        isChecked: false,
      }}
    >
      {({
        handleSubmit,
        handleChange,
        values,
        setFieldValue,
        errors,
        touched,
      }) => (
        <View style={styles.formView}>
          <View style={styles.name_surname}>
            <View style={styles.nameView}>
              <TextInputLogin
                selectionColor={Colors.blue}
                inputMode="text"
                placeholder="Ad"
                style={[
                  [styles.input, styles.name],
                  touched.name && errors.name && styles.inputError,
                ]}
                value={values.name}
                onChangeText={handleChange("name")}
                returnKeyType="next"
                onSubmitEditing={() => surnameRef.current.focus()}
              />
              {touched.name && errors.name && (
                <ErrorText>{errors.name}</ErrorText>
              )}
            </View>
            <View>
              <TextInputLogin
                ref={surnameRef}
                selectionColor={Colors.blue}
                inputMode="text"
                placeholder="Soyad"
                style={[
                  [styles.input, styles.surname],
                  touched.name && errors.name && styles.inputError,
                ]}
                value={values.surname}
                onChangeText={handleChange("surname")}
                returnKeyType="next"
                onSubmitEditing={() => usernameRef.current.focus()}
              />
              {touched.surname && errors.surname && (
                <ErrorText>{errors.surname}</ErrorText>
              )}
            </View>
          </View>
          <TextInputLogin
            ref={usernameRef}
            selectionColor={Colors.blue}
            inputMode="text"
            placeholder="Kullanıcı adı"
            style={[
              styles.input,
              touched.username && errors.username && styles.inputError,
            ]}
            value={values.username}
            onChangeText={handleChange("username")}
            returnKeyType="next"
            onSubmitEditing={() => emailRef.current.focus()}
          />
          {touched.username && errors.username && (
            <ErrorText>{errors.username}</ErrorText>
          )}
          <TextInputLogin
            ref={emailRef}
            selectionColor={Colors.blue}
            inputMode="email"
            placeholder="Email"
            style={[
              styles.input,
              touched.email && errors.email && styles.inputError,
            ]}
            value={values.email}
            onChangeText={handleChange("email")}
            returnKeyType="next"
            onSubmitEditing={() => telNoRef.current.focus()}
          />
          {touched.email && errors.email && (
            <ErrorText>{errors.email}</ErrorText>
          )}
          <TextInputLogin
            ref={telNoRef}
            selectionColor={Colors.blue}
            inputMode="tel"
            placeholder="Telefon Numarası"
            style={[
              styles.input,
              touched.telNo && errors.telNo && styles.inputError,
            ]}
            value={values.telNo}
            onChangeText={handleChange("telNo")}
            returnKeyType="next"
            onSubmitEditing={() => pickerRef.current.focus()}
          />
          {touched.telNo && errors.telNo && (
            <ErrorText>{errors.telNo}</ErrorText>
          )}
          <View
            style={[
              styles.pickerContainer,
              touched.picker && errors.picker && styles.pickerContainerError,
            ]}
          >
            <Picker
              ref={pickerRef}
              selectedValue={values.picker}
              style={styles.picker}
              onValueChange={(itemValue, itemIndex) => {
                passwordRef.current.focus();
                setFieldValue("picker", itemValue);
              }}
            >
              <Picker.Item label="Cinsiyet" value="" />
              <Picker.Item label="Kadın" value="kadin" />
              <Picker.Item label="Erkek" value="erkek" />
            </Picker>
          </View>
          {touched.picker && errors.picker && (
            <ErrorText>{errors.picker}</ErrorText>
          )}
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
          {touched.password && errors.password && (
            <ErrorText>{errors.password}</ErrorText>
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
                touched.password_2 && errors.password_2 && styles.inputError,
              ]}
              returnKeyType="done"
              onSubmitEditing={handleSubmit}
            />
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
          {touched.password_2 && errors.password_2 && (
            <ErrorText>{errors.password_2}</ErrorText>
          )}
          <View
            style={{
              flexDirection: "row",
              marginBottom: verticalScale(10),
              gap: scale(2),
              alignItems: "center",
            }}
          >
            <Checkbox
              style={styles.checkbox}
              value={values.isChecked}
              onValueChange={(value) => setFieldValue("isChecked", value)}
              color={values.isChecked ? Colors.blue : undefined}
            />
            <IlluminationText
              touched={touched.isChecked}
              errors={errors.isChecked}
            />
            <Text> onaylıyorum.</Text>
          </View>
          <Button
            width={scale(100)}
            backgroundColor={Colors.blue}
            height={scale(26)}
            borderRadius={moderateScale(4)}
            loading={registerLoader}
            onPress={handleSubmit}
            textColor={Colors.white}
            fontSize={moderateScale(14)}
            title={
              registerLoader ? (
                <ActivityIndicator
                  size={30}
                  color={Colors.inputBackgroundWhite}
                />
              ) : (
                "Üye Ol"
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
  inputError: {
    borderColor: "red",
  },
});
