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
          height={342}
          left={-51}
          top={-73}
          width={342}
          backgroundColor={Colors.blue}
          borderRadius={800}
        ></Circle>
        <Image style={styles.image} source={ImageConst.logo} />
        <Circle
          backgroundColor={Colors.blue}
          borderRadius={800}
          height={250}
          right={-42}
          top={-150}
          width={250}
        ></Circle>
      </View>
      <WelcomeText />
      <View>
        <Button
          borderRadius={moderateScale(4)} // Dinamik ölçeklendirme
          width={scale(200)} // Yatay ölçeklendirme
          height={verticalScale(32)} // Dikey ölçeklendirme
          onPress={goToLoginPageHandler}
          size={moderateScale(50)}
          fontSize={moderateScale(20)}
          title="Giriş Yap"
          backgroundColor={Colors.blue}
          textColor={Colors.white}
        />
        <Button
          borderRadius={moderateScale(4)}
          width={scale(200)}
          height={verticalScale(26)}
          onPress={goToRegisterPageHandler}
          fontSize={moderateScale(14)}
          title="Üye Ol"
          backgroundColor={Colors.gray}
          textColor={Colors.white}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
  },
  container: {
    position: "relative",
  },
  image: {
    width: scale(476),
    height: scale(476),
    marginTop: -verticalScale(50),
    resizeMode: "contain",
  },
});
