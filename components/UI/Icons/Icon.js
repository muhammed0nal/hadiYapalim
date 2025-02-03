// react native
import { Ionicons } from "@expo/vector-icons";
import { Pressable } from "react-native";

export default function Icon({
  name,
  size,
  color,
  style,
  onPress,
  stylePressable,
}) {
  return (
    <Pressable
      hitSlop={{ left: 5, right: 5, top: 5, bottom: 5 }}
      onPress={onPress}
      style={({ pressed }) => [
        {
          opacity: pressed ? 0.5 : 1,
          zIndex: 1,
        },
        stylePressable,
      ]}
    >
      <Ionicons style={style} name={name} size={size} color={color} />
    </Pressable>
  );
}
