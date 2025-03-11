import { Ionicons } from "@expo/vector-icons";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { Colors } from "../../constants/Colors";
import { scale, verticalScale } from "react-native-size-matters";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useEffect, useState } from "react";
import { ip } from "../../ip/ip";
import OtherUserProfileImage from "../../components/OtherUserProfile/OtherUserProfileImage";

export default function FollowerScreen({ route }) {
  const { user_id } = route.params;
  const navigation = useNavigation();
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    const fetchFollowers = async () => {
      const response = await axios.get(`${ip}/follow/following/${user_id}`);
      if (response.data.success) {
        setFollowing(response.data.following);
      }
    };
    fetchFollowers();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Ionicons
          name="arrow-back"
          size={scale(24)}
          onPress={() => navigation.goBack()}
          color={Colors.blue}
        />
        <Text style={styles.headerText}>Takip Edilenler</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.sectionContainer}>
          <View style={styles.settingsGroup}>
            {following.map((following) => (
              <Pressable
                key={following.id}
                style={styles.settingItem}
                onPress={() =>
                  navigation.navigate("OtherUsersProfileScreen", {
                    user_id: following.id,
                  })
                }
              >
                <View style={styles.settingContent}>
                  <OtherUserProfileImage
                    style={styles.image}
                    user_id={following.id}
                  />
                  <View>
                    <Text
                      style={styles.nameText}
                    >{`${following.name} ${following.surname}`}</Text>
                    <Text style={styles.usernameText}>
                      @{following.username}
                    </Text>
                  </View>
                </View>
                <Ionicons
                  name="chevron-forward"
                  size={scale(20)}
                  color="#999"
                />
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(12),
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: verticalScale(1),
    },
    shadowOpacity: 0.08,
    shadowRadius: scale(2),
    elevation: 2,
  },
  headerText: {
    flex: 1,
    fontSize: scale(18),
    fontWeight: "700",
    color: "#333",
    textAlign: "center",
    marginRight: scale(24),
  },
  sectionContainer: {
    backgroundColor: Colors.white,
    marginHorizontal: scale(12),
    marginTop: verticalScale(16),
    borderRadius: verticalScale(12),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: verticalScale(1),
    },
    shadowOpacity: 0.08,
    shadowRadius: scale(2),
    elevation: 2,
  },
  settingsGroup: {
    paddingVertical: verticalScale(4),
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(12),
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  settingContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(12),
  },
  nameText: {
    fontSize: scale(14),
    color: "#333",
    fontWeight: "500",
  },
  usernameText: {
    fontSize: scale(12),
    color: "#666",
  },
  image: {
    width: verticalScale(55),
    height: verticalScale(55),
    borderRadius: verticalScale(35),
    resizeMode: "cover",
    borderWidth: 2,
    borderColor: Colors.blue,
  },
});
