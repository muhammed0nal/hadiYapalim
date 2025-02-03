// react native
import { Ionicons } from "@expo/vector-icons";
import { Pressable } from "react-native";

export default function BackIcon({ name, size, color, style, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        opacity: pressed ? 0.5 : 1,
      })}
    >
      <Ionicons style={style} name={name} size={size} color={color} />
    </Pressable>
  );
}
