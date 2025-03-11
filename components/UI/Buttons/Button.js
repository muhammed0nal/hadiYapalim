// react-native
import { Pressable, StyleSheet, Text } from "react-native";
import { Colors } from "../../../constants/Colors";

export default function Button({
  title,
  backgroundColor,
  fontSize,
  height,
  onPress,
  style,
  loading,
  textColor,
  width,
  borderRadius,
  marginBottom,
  fontWeight,
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={loading}
      style={({ pressed }) =>
        pressed
          ? [
              {
                width: width,
                borderRadius: borderRadius,
                alignItems: "center",
                justifyContent: "center",
                marginBottom: marginBottom,
                height: height,
                backgroundColor: backgroundColor,
              },
              styles.pressed,
              style,
            ]
          : [
              {
                width: width,
                borderRadius: borderRadius,
                alignItems: "center",
                justifyContent: "center",
                marginBottom: marginBottom,
                height: height,
                backgroundColor: backgroundColor,
              },
              style,
            ]
      }
    >
      <Text
        style={[
          {
            fontWeight: fontWeight,
            fontSize: fontSize,
            color: textColor,
          },
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.8,
  },
});
