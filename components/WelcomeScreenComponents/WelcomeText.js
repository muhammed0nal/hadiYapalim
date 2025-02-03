import { Text, View, StyleSheet } from "react-native";
import { moderateScale, verticalScale } from "react-native-size-matters";
import { Colors } from "../../constants/Colors";

export default function WelcomeText() {
  return (
    <View style={styles.textContainer}>
      <Text
        style={[
          styles.text,
          { fontSize: moderateScale(35), color: Colors.blue },
        ]}
      >
        Sosyal Sorumlulukta
      </Text>
      <Text
        style={[
          styles.text,
          {
            fontSize: moderateScale(35),
            color: Colors.blue,
            marginBottom: verticalScale(15),
          },
        ]}
      >
        Yeni Bir Çağ
      </Text>
      <Text
        style={[
          styles.text,
          { fontSize: moderateScale(14), color: Colors.black },
        ]}
      >
        Sen de aramıza katıl
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
  },
  textContainer: {
    alignItems: "center",
    marginBottom: verticalScale(30),
    marginTop: -verticalScale(50),
  },
});
