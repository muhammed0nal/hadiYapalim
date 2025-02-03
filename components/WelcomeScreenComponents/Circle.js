import { View, Text, StyleSheet } from "react-native";

// size-matter
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import { Colors } from "../../constants/Colors";
export default function Circle({
  backgroundColor,
  left,
  right,
  top,
  width,
  height,
  borderRadius,
}) {
  return (
    <View
      style={[
        styles.circle,
        {
          top: verticalScale(top),
          width: scale(width),
          height: scale(height),
          backgroundColor,
          borderRadius,
        },
        left && { left: scale(left) },
        right && { right: scale(right) },
      ]}
    ></View>
  );
}

const styles = StyleSheet.create({
  circle: {
    position: "absolute",
  },
});
