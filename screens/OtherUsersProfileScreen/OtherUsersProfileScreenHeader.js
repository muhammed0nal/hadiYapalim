import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../constants/Colors";
import { scale, verticalScale } from "react-native-size-matters";

export default function OtherUsersProfileScreenHeader({
  title,
  isFollowThisProfile,
  onFollowToggle,
  followLoading,
}) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={({ pressed }) => [
            styles.backButton,
            pressed && styles.pressed,
          ]}
        >
          <Ionicons name="arrow-back" size={24} color={Colors.blue} />
        </Pressable>

        <Text style={styles.title}>{title}</Text>
      </View>

      {isFollowThisProfile !== "user-is-same-user" ? (
        <Pressable
          onPress={onFollowToggle}
          disabled={followLoading}
          style={({ pressed }) => [
            styles.followButton,
            isFollowThisProfile
              ? styles.followingButton
              : styles.notFollowingButton,
            pressed && styles.pressed,
          ]}
        >
          {followLoading ? (
            <ActivityIndicator
              size="small"
              color={isFollowThisProfile ? Colors.blue : Colors.white}
            />
          ) : (
            <Text
              style={[
                styles.followButtonText,
                isFollowThisProfile
                  ? styles.followingButtonText
                  : styles.notFollowingButtonText,
              ]}
            >
              {isFollowThisProfile ? "Takip Ediliyor" : "Takip Et"}
            </Text>
          )}
        </Pressable>
      ) : (
        // Empty View to maintain layout when no follow button
        <View style={styles.emptySpace} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(12),
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  backButton: {
    padding: scale(8),
    marginRight: scale(8),
  },
  title: {
    fontSize: scale(18),
    fontWeight: "bold",
    color: Colors.blue,
  },
  followButton: {
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(8),
    borderRadius: scale(20),
    minWidth: scale(100),
    alignItems: "center",
  },
  emptySpace: {
    width: scale(100),
  },
  notFollowingButton: {
    backgroundColor: Colors.blue,
  },
  followingButton: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.blue,
  },
  followButtonText: {
    fontWeight: "600",
  },
  notFollowingButtonText: {
    color: Colors.white,
  },
  followingButtonText: {
    color: Colors.blue,
  },
  pressed: {
    opacity: 0.7,
  },
});
