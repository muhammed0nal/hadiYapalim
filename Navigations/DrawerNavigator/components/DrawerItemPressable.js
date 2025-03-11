import { Pressable, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../../constants/Colors";

export default function DrawerItemPressable({
  textColor,
  iconColor,
  onPress,
  iconSize,
  iconName,
  text,
  backgroundColor,
}) {
  return (
    <Pressable
      style={({ pressed }) =>
        pressed
          ? {
              flexDirection: "row",
              alignItems: "center",
              marginTop: 15,
              borderRadius: 5,
              marginLeft: 20,
              marginRight: 20,
              opacity: 0.6,
              backgroundColor: backgroundColor,
            }
          : {
              backgroundColor: backgroundColor,
              flexDirection: "row",
              alignItems: "center",
              marginTop: 15,
              borderRadius: 5,
              marginLeft: 20,
              marginRight: 20,
            }
      }
      contentContainerStyle={{ alignItems: "flex-start", paddingLeft: 0 }} // İçeriği sola hizala ve padding'i sıfırla
      onPress={onPress}
    >
      <Ionicons
        name={iconName}
        color={iconColor}
        size={iconSize}
        style={{ padding: 10 }}
      />
      <Text style={{ color: textColor, fontSize: 20, fontWeight: "600" }}>
        {text}
      </Text>
    </Pressable>
  );
}
