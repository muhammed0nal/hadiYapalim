import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  RefreshControl,
} from "react-native";
import { useEffect, useState, useCallback } from "react";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import { ip } from "../../ip/ip";
import axios from "axios";
import { Colors } from "../../constants/Colors";
import { useAuth } from "../../contexts/AuthContext";
import ActiveUserImage from "../../components/ActiveUserComponents/ActiveUserImage";
import { Ionicons } from "@expo/vector-icons";
import SCREENS from "../index";
export default function ProfileScreen({ navigation }) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [followCounts, setFollowCounts] = useState({
    followersCount: 0,
    followingCount: 0,
    postsCount: 0,
  });
  const { authState, onLogout } = useAuth();

  // Fake data for demonstration
  const fakeInterests = ["Running", "Cycling", "Swimming", "Hiking", "Yoga"];
  const fakeConnections = [
    {
      id: 1,
      name: "Ahmet K.",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      id: 2,
      name: "Ayşe Y.",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      id: 3,
      name: "Mehmet S.",
      avatar: "https://randomuser.me/api/portraits/men/62.jpg",
    },
    {
      id: 4,
      name: "Zeynep A.",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    },
    {
      id: 5,
      name: "Can B.",
      avatar: "https://randomuser.me/api/portraits/men/78.jpg",
    },
  ];
  const fakeBadges = [
    {
      id: 1,
      name: "Early Bird",
      icon: "https://cdn-icons-png.flaticon.com/128/3112/3112946.png",
    },
    {
      id: 2,
      name: "Marathon",
      icon: "https://cdn-icons-png.flaticon.com/128/2151/2151349.png",
    },
    {
      id: 3,
      name: "Social",
      icon: "https://cdn-icons-png.flaticon.com/128/3437/3437315.png",
    },
  ];
  const fakeRecentActivities = [
    { id: 1, title: "Morning Run - 5km", date: new Date(2023, 6, 15) },
    { id: 2, title: "Evening Yoga Session", date: new Date(2023, 6, 14) },
    { id: 3, title: "Weekend Hike - Uludağ", date: new Date(2023, 6, 12) },
  ];

  const fetchFollowCounts = useCallback(async () => {
    try {
      if (!authState.userId) return;

      const response = await axios.get(
        `${ip}/follow/counts/${authState.userId}`,
        {
          headers: {
            Authorization: `Bearer ${authState.token}`,
          },
        }
      );

      if (response.data.success) {
        setFollowCounts((prev) => ({
          ...prev,
          followersCount: response.data.followersCount,
          followingCount: response.data.followingCount,
        }));
      }
    } catch (error) {
      console.error("Error fetching follow counts:", error);
    }
  }, [authState.userId, authState.token]);

  const fetchPostsCount = useCallback(async () => {
    try {
      if (!authState.userId) return;

      const response = await axios.get(`${ip}/post/user/${authState.userId}`, {
        headers: {
          Authorization: `Bearer ${authState.token}`,
        },
      });

      if (response.data.success) {
        setFollowCounts((prev) => ({
          ...prev,
          postsCount: response.data.data.length || 0,
        }));
      }
    } catch (error) {
      console.error("Error fetching posts count:", error);
    }
  }, [authState.userId, authState.token]);

  const fetchUserProfile = async () => {
    setLoading(true);

    try {
      const response = await axios.get(`${ip}/profile/getProfile`, {
        headers: {
          Authorization: `Bearer ${authState.token}`,
        },
      });
      setUserData(response.data);

      // Fetch follow counts and posts count
      await Promise.all([fetchFollowCounts(), fetchPostsCount()]);
    } catch (err) {
      console.log(err + " ---- " + (err.response?.data?.msg || err.message));
      if (err.response?.data?.msg === "token") {
        await onLogout();
        navigation.reset({
          index: 0,
          routes: [{ name: "HomeScreen" }],
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await fetchUserProfile();
    } finally {
      setRefreshing(false);
    }
  }, [fetchFollowCounts, fetchPostsCount]);

  useEffect(() => {
    fetchUserProfile();
  }, [fetchFollowCounts, fetchPostsCount]);

  const formatDate = (date) => {
    if (!date) return "";
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(date).toLocaleDateString("tr-TR", options);
  };

  const formatRelativeTime = (date) => {
    if (!date) return "Recently";
    const now = new Date();
    const diff = now - new Date(date);
    const minutes = Math.floor(diff / 60000);

    if (minutes < 60) return `${minutes} minutes ago`;
    if (minutes < 1440) return `${Math.floor(minutes / 60)} hours ago`;
    return `${Math.floor(minutes / 1440)} days ago`;
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.blue} />
      </View>
    );
  }
  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={[Colors.blue]}
          tintColor={Colors.blue}
        />
      }
    >
      {userData ? (
        <>
          <View style={styles.profileInfo}>
            <View style={styles.imgContainer}>
              <Pressable
                onPress={() => navigation.navigate("ChangeProfilePhotoScreen")}
              >
                <ActiveUserImage style={styles.image} />
              </Pressable>
              <Text style={styles.username}>
                {userData?.username || "User"}
              </Text>
            </View>
            <View style={styles.profileNumbers}>
              <Pressable
                onPress={() => navigation.navigate("UserActivities")}
                style={({ pressed }) =>
                  pressed
                    ? [styles.statsButton, styles.pressed]
                    : styles.statsButton
                }
              >
                <Text style={styles.statsNumber}>
                  {followCounts.postsCount}
                </Text>
                <Text style={styles.statsLabel}>Aktiviteler</Text>
              </Pressable>
              <Pressable
                onPress={() =>
                  navigation.navigate("FollowerScreen", {
                    user_id: userData.id,
                  })
                }
                style={({ pressed }) =>
                  pressed
                    ? [styles.statsButton, styles.pressed]
                    : styles.statsButton
                }
              >
                <Text style={styles.statsNumber}>
                  {followCounts.followersCount}
                </Text>
                <Text style={styles.statsLabel}>Takipçi</Text>
              </Pressable>
              <Pressable
                onPress={() =>
                  navigation.navigate("FollowedScreen", {
                    user_id: userData.id,
                  })
                }
                style={({ pressed }) =>
                  pressed
                    ? [styles.statsButton, styles.pressed]
                    : styles.statsButton
                }
              >
                <Text style={styles.statsNumber}>
                  {followCounts.followingCount}
                </Text>
                <Text style={styles.statsLabel}>Takipler</Text>
              </Pressable>
            </View>
          </View>

          {/* Bio Section */}
          {userData?.bio && (
            <View style={styles.bioContainer}>
              <Text style={styles.bioText}>{userData?.bio}</Text>
            </View>
          )}

          {/* Quick Actions */}
          <View style={styles.quickActionsContainer}>
            <Pressable
              style={styles.actionButton}
              onPress={() => {
                navigation.getParent()?.navigate(SCREENS.AddPostScreen);
              }}
            >
              <Ionicons
                name="add-circle-outline"
                size={24}
                color={Colors.blue}
              />
              <Text style={styles.actionText}>Yeni Aktivite</Text>
            </Pressable>
            <Pressable
              style={styles.actionButton}
              onPress={() => navigation.navigate("SettingsScreen")}
            >
              <Ionicons name="settings-outline" size={24} color={Colors.blue} />
              <Text style={styles.actionText}>Ayarlar</Text>
            </Pressable>
            <Pressable style={styles.actionButton}>
              <Ionicons
                name="share-social-outline"
                size={24}
                color={Colors.blue}
              />
              <Text style={styles.actionText}>Paylaş</Text>
            </Pressable>
          </View>

          {/* Profile Completion */}
          <View style={styles.completionContainer}>
            <View style={styles.completionHeader}>
              <Text style={styles.completionTitle}>Profile Completion</Text>
              <Text style={styles.completionPercentage}>75%</Text>
            </View>
            <View style={styles.progressBarContainer}>
              <View style={[styles.progressBar, { width: "75%" }]} />
            </View>
            <Text style={styles.completionTip}>
              Tip: Add your interests to improve your profile
            </Text>
          </View>

          {/* Recent Activities */}
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Recent Activities</Text>
              <Pressable onPress={() => navigation.navigate("UserActivities")}>
                <Text style={styles.seeAllText}>See All</Text>
              </Pressable>
            </View>
            {fakeRecentActivities.map((activity) => (
              <Pressable
                key={activity.id}
                style={styles.activityCard}
                onPress={() =>
                  navigation.navigate("ActivityDetails", {
                    activityId: activity.id,
                  })
                }
              >
                <View style={styles.activityInfo}>
                  <Text style={styles.activityTitle}>{activity.title}</Text>
                  <Text style={styles.activityDate}>
                    {formatDate(activity.date)}
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#999" />
              </Pressable>
            ))}
          </View>

          {/* Interests/Tags */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Interests</Text>
            <View style={styles.tagsContainer}>
              {fakeInterests.map((interest) => (
                <View key={interest} style={styles.tag}>
                  <Text style={styles.tagText}>{interest}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Badges/Achievements */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Badges</Text>
            <View style={styles.badgesContainer}>
              {fakeBadges.map((badge) => (
                <View key={badge.id} style={styles.badgeItem}>
                  <Image
                    source={{ uri: badge.icon }}
                    style={styles.badgeIcon}
                  />
                  <Text style={styles.badgeName}>{badge.name}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Connections */}
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Connections</Text>
              <Pressable onPress={() => navigation.navigate("Connections")}>
                <Text style={styles.seeAllText}>See All</Text>
              </Pressable>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.connectionsScroll}
            >
              {fakeConnections.map((connection) => (
                <Pressable
                  key={connection.id}
                  style={styles.connectionItem}
                  onPress={() =>
                    navigation.navigate("OtherUsersProfileScreen", {
                      user_id: connection.id,
                    })
                  }
                >
                  <Image
                    source={{ uri: connection.avatar }}
                    style={styles.connectionAvatar}
                  />
                  <Text style={styles.connectionName}>{connection.name}</Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>

          {/* Account Info */}
          <View style={styles.accountInfoContainer}>
            <Text style={styles.accountInfoText}>Member since: June 2023</Text>
            <Text style={styles.accountInfoText}>Last active: 2 hours ago</Text>
          </View>
        </>
      ) : (
        <View style={styles.emptyStateContainer}>
          <Text style={styles.emptyStateText}>User Data Not Found</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  image: {
    width: verticalScale(65),
    height: verticalScale(65),
    borderRadius: verticalScale(35),
    resizeMode: "cover",
    borderWidth: 2,
    borderColor: Colors.blue,
  },
  profileInfo: {
    flexDirection: "row",
    backgroundColor: Colors.white,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: verticalScale(2),
    },
    shadowOpacity: 0.1,
    shadowRadius: scale(3),
    elevation: 4,
    marginHorizontal: scale(12),
    marginTop: verticalScale(10),
    marginBottom: verticalScale(10),
    borderRadius: verticalScale(12),
    padding: scale(12),
    alignItems: "center",
  },
  imgContainer: {
    alignItems: "center",
    marginRight: scale(15),
  },
  username: {
    fontSize: scale(14),
    fontWeight: "600",
    marginTop: verticalScale(4),
    color: Colors.blue,
    textAlign: "center",
  },
  profileNumbers: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  statsButton: {
    alignItems: "center",
    paddingHorizontal: scale(8),
    paddingVertical: verticalScale(5),
  },
  statsNumber: {
    fontSize: scale(16),
    fontWeight: "700",
    color: Colors.blue,
  },
  statsLabel: {
    fontSize: scale(11),
    color: "#666",
    marginTop: verticalScale(2),
  },
  pressed: {
    opacity: 0.8,
    backgroundColor: "#f5f5f5",
    borderRadius: verticalScale(8),
  },

  // Bio Section
  bioContainer: {
    backgroundColor: Colors.white,
    marginHorizontal: scale(12),
    marginBottom: verticalScale(10),
    borderRadius: verticalScale(12),
    padding: scale(12),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: verticalScale(1),
    },
    shadowOpacity: 0.08,
    shadowRadius: scale(2),
    elevation: 2,
  },
  bioText: {
    fontSize: scale(13),
    color: "#444",
    lineHeight: scale(18),
  },

  // Quick Actions
  quickActionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: scale(12),
    marginBottom: verticalScale(10),
  },
  actionButton: {
    backgroundColor: Colors.white,
    borderRadius: verticalScale(10),
    padding: scale(10),
    alignItems: "center",
    flex: 1,
    marginHorizontal: scale(4),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: verticalScale(1),
    },
    shadowOpacity: 0.08,
    shadowRadius: scale(2),
    elevation: 2,
  },
  actionText: {
    fontSize: scale(11),
    color: Colors.blue,
    marginTop: verticalScale(4),
  },

  // Profile Completion
  completionContainer: {
    backgroundColor: Colors.white,
    marginHorizontal: scale(12),
    marginBottom: verticalScale(10),
    borderRadius: verticalScale(12),
    padding: scale(12),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: verticalScale(1),
    },
    shadowOpacity: 0.08,
    shadowRadius: scale(2),
    elevation: 2,
  },
  completionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: verticalScale(8),
  },
  completionTitle: {
    fontSize: scale(14),
    fontWeight: "600",
    color: "#333",
  },
  completionPercentage: {
    fontSize: scale(14),
    fontWeight: "700",
    color: Colors.blue,
  },
  progressBarContainer: {
    height: verticalScale(8),
    backgroundColor: "#eee",
    borderRadius: verticalScale(4),
    marginBottom: verticalScale(8),
  },
  progressBar: {
    height: "100%",
    backgroundColor: Colors.blue,
    borderRadius: verticalScale(4),
  },
  completionTip: {
    fontSize: scale(11),
    color: "#888",
    fontStyle: "italic",
  },

  // Section Container (used for multiple sections)
  sectionContainer: {
    backgroundColor: Colors.white,
    marginHorizontal: scale(12),
    marginBottom: verticalScale(10),
    borderRadius: verticalScale(12),
    padding: scale(12),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: verticalScale(1),
    },
    shadowOpacity: 0.08,
    shadowRadius: scale(2),
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: verticalScale(10),
  },
  sectionTitle: {
    fontSize: scale(14),
    fontWeight: "600",
    color: "#333",
    marginBottom: verticalScale(8),
  },
  seeAllText: {
    fontSize: scale(12),
    color: Colors.blue,
  },

  // Recent Activities
  activityCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: verticalScale(8),
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  activityInfo: {
    flex: 1,
  },
  activityTitle: {
    fontSize: scale(13),
    fontWeight: "500",
    color: "#333",
  },
  activityDate: {
    fontSize: scale(11),
    color: "#888",
    marginTop: verticalScale(2),
  },

  // Interests/Tags
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  tag: {
    backgroundColor: "#f0f5ff",
    borderRadius: verticalScale(15),
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(5),
    marginRight: scale(8),
    marginBottom: verticalScale(8),
  },
  tagText: {
    fontSize: scale(12),
    color: Colors.blue,
  },

  // Badges
  badgesContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: verticalScale(5),
  },
  badgeItem: {
    alignItems: "center",
    width: scale(70),
  },
  badgeIcon: {
    width: scale(40),
    height: scale(40),
    marginBottom: verticalScale(5),
  },
  badgeName: {
    fontSize: scale(11),
    color: "#444",
    textAlign: "center",
  },

  // Connections
  connectionsScroll: {
    marginTop: verticalScale(5),
  },
  connectionItem: {
    alignItems: "center",
    marginRight: scale(15),
    width: scale(60),
  },
  connectionAvatar: {
    width: scale(50),
    height: scale(50),
    borderRadius: scale(25),
    marginBottom: verticalScale(5),
  },
  connectionName: {
    fontSize: scale(11),
    color: "#444",
    textAlign: "center",
  },

  // Account Info
  accountInfoContainer: {
    marginHorizontal: scale(12),
    marginBottom: verticalScale(20),
    alignItems: "center",
    paddingVertical: verticalScale(10),
  },
  accountInfoText: {
    fontSize: scale(11),
    color: "#888",
    marginBottom: verticalScale(3),
  },

  // Loading and Empty States
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: verticalScale(100),
  },
  emptyStateText: {
    fontSize: scale(16),
    color: "#666",
  },
});
