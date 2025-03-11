import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Modal,
} from "react-native";
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
  const [followers, setFollowers] = useState([]);
  const [removeFollowerModal, setRemoveFollowerModal] = useState(false);
  const [followerToRemove, setFollowerToRemove] = useState(null);

  useEffect(() => {
    fetchFollowers();
  }, []);

  const fetchFollowers = async () => {
    try {
      const response = await axios.get(`${ip}/follow/followers/${user_id}`);
      setFollowers(response.data.followers);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveFollower = async (follower_id) => {
    try {
      const response = await axios.post(
        `${ip}/follow/remove-followers/${user_id}/${follower_id}`
      );
      console.log(response.data);
      fetchFollowers();
      setRemoveFollowerModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Ionicons
          name="arrow-back"
          size={scale(24)}
          onPress={() => navigation.goBack()}
          color={Colors.blue}
        />
        <Text style={styles.headerText}>Takipçiler</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.sectionContainer}>
          {followers.length > 0 && (
            <View style={styles.settingsGroup}>
              {followers.map((follower) => (
                <Pressable
                  key={follower.id}
                  style={styles.settingItem}
                  onPress={() =>
                    navigation.navigate("OtherUsersProfileScreen", {
                      user_id: follower.id,
                    })
                  }
                >
                  <View style={styles.settingContent}>
                    <OtherUserProfileImage
                      style={styles.image}
                      user_id={follower.id}
                    />
                    <View>
                      <Text
                        style={styles.nameText}
                      >{`${follower.name} ${follower.surname}`}</Text>
                      <Text style={styles.usernameText}>
                        @{follower.username}
                      </Text>
                    </View>
                  </View>
                  <Pressable
                    onPress={() => {
                      setRemoveFollowerModal(true);
                      setFollowerToRemove(follower.id);
                    }}
                    hitSlop={5}
                  >
                    <FontAwesome6
                      name="x"
                      size={scale(16)}
                      style={{ marginRight: scale(12) }}
                      color="#999"
                    />
                  </Pressable>
                </Pressable>
              ))}
            </View>
          )}
        </View>
        {followers.length === 0 && (
          <View style={styles.noFollowersContainer}>
            <Text style={styles.noFollowersText}>Takipçi yok</Text>
          </View>
        )}
      </ScrollView>
      <Modal
        visible={removeFollowerModal}
        transparent={true}
        animationType="fade"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              Bu takipçiyi silmek istediğinize emin misiniz?
            </Text>
            <View style={styles.modalButtons}>
              <Pressable onPress={() => handleRemoveFollower(followerToRemove)}>
                <Text style={styles.modalTextYes}>Evet</Text>
              </Pressable>
              <Pressable onPress={() => setRemoveFollowerModal(false)}>
                <Text style={styles.modalTextNo}>Hayır</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
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
    borderBottomColor: Colors.inputBackgroundWhite,
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
  noFollowersContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noFollowersText: {
    fontSize: scale(16),
    color: "#333",
    fontWeight: "500",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: Colors.white,
    padding: scale(24),
    borderRadius: scale(12),
    alignItems: "center",
  },
  modalText: {
    fontSize: scale(16),
    color: "#333",
    fontWeight: "500",
    marginBottom: verticalScale(12),
  },
  modalButtons: {
    flexDirection: "row",
    width: "100%",
    gap: scale(12),
  },
  modalTextYes: {
    fontSize: scale(16),
    color: Colors.white,
    padding: scale(5),
    borderRadius: scale(2),
    backgroundColor: Colors.blue,
    fontWeight: "500",
  },
  modalTextNo: {
    fontSize: scale(16),
    color: Colors.white,
    padding: scale(5),
    borderRadius: scale(2),
    backgroundColor: Colors.red,
    fontWeight: "500",
  },
});
