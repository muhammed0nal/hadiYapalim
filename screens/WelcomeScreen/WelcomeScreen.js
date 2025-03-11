import { Image, StyleSheet, Text, View } from "react-native";
import Button from "../../components/UI/Buttons/Button.js";

// Constants
import { Colors } from "../../constants/Colors.js";
import { ImageConst } from "../../constants/ImageConst.js";

import { scale, verticalScale, moderateScale } from "react-native-size-matters";

// components
import Circle from "../../components/WelcomeScreenComponents/Circle.js";
import WelcomeText from "../../components/WelcomeScreenComponents/WelcomeText.js";

export default function WelcomeScreen({ navigation }) {
  function goToLoginPageHandler() {
    navigation.navigate("LoginScreen");
  }
  function goToRegisterPageHandler() {
    navigation.navigate("RegisterScreen");
  }

  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <Circle
          height={verticalScale(342)}
          left={verticalScale(-150)}
          top={verticalScale(-73)}
          width={verticalScale(342)}
          backgroundColor={Colors.blue}
          borderRadius={800}
        ></Circle>
        <Image style={styles.image} source={ImageConst.logo} />
        <Circle
          backgroundColor={Colors.blue}
          borderRadius={800}
          height={verticalScale(250)}
          right={verticalScale(-120)}
          top={verticalScale(-110)}
          width={verticalScale(250)}
        ></Circle>
      </View>
      <View style={styles.contentContainer}>
        <WelcomeText />
        <View style={styles.buttonContainer}>
          <Button
            marginBottom={verticalScale(16)}
            borderRadius={moderateScale(8)}
            width={scale(220)}
            height={verticalScale(45)}
            onPress={goToLoginPageHandler}
            size={moderateScale(50)}
            fontSize={moderateScale(18)}
            title="Giriş Yap"
            backgroundColor={Colors.blue}
            textColor={Colors.white}
          />
          <Button
            borderRadius={moderateScale(8)}
            width={scale(220)}
            height={verticalScale(45)}
            onPress={goToRegisterPageHandler}
            fontSize={moderateScale(16)}
            title="Üye Ol"
            backgroundColor="transparent"
            textColor={Colors.blue}
            borderWidth={1}
            borderColor={Colors.blue}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.white,
  },
  container: {
    position: "relative",
    marginBottom: verticalScale(80),
  },
  contentContainer: {
    alignItems: "center",
    width: "100%",
    paddingHorizontal: scale(20),
  },
  image: {
    zIndex: 330,
    width: verticalScale(230),
    height: verticalScale(230),
    marginTop: verticalScale(50),
    resizeMode: "contain",
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: verticalScale(30),
  },
});
