import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../constants/Colors";

export default function ActivityDetailHeader({
  postTitle,
  color,
  backgroundColor,
}) {
  const navigation = useNavigation();

  return (
    <View style={[styles.header, { backgroundColor: backgroundColor }]}>
      <Pressable
        onPress={() => navigation.goBack()}
        style={({ pressed }) => [
          styles.backButton,
          pressed && { opacity: 0.7 },
        ]}
      >
        <Ionicons name="arrow-back" size={24} color={Colors.blue} />
      </Pressable>

      <Text
        style={[styles.title, { color: color }]}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {postTitle}
      </Text>

      <View style={styles.rightPlaceholder} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(16),
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  backButton: {
    padding: scale(8),
    borderRadius: scale(20),
  },
  title: {
    fontSize: scale(16),
    fontWeight: "600",
    flex: 1,
    textAlign: "center",
    marginHorizontal: scale(8),
  },
  rightPlaceholder: {
    width: scale(40),
  },
});
