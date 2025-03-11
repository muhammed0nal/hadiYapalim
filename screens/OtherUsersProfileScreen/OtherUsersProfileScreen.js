import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Alert,
} from "react-native";
import { useEffect, useState, useCallback } from "react";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import { ip } from "../../ip/ip";
import axios from "axios";
import { Colors } from "../../constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute } from "@react-navigation/native";
import OtherUsersProfileScreenHeader from "../OtherUsersProfileScreen/OtherUsersProfileScreenHeader";
import OtherUserProfileImage from "../../components/OtherUserProfile/OtherUserProfileImage";
import ExpandableText from "../../components/UI/ExpandableText/ExpandableText";
import { useAuth } from "../../contexts/AuthContext";

export default function OtherUsersProfileScreen() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { authState } = useAuth();
  const route = useRoute();
  const { user_id } = route.params;
  const [isFollow, setIsFollow] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);
  const [imageCache, setImageCache] = useState({});
  const [followCounts, setFollowCounts] = useState({
    followersCount: 0,
    followingCount: 0,
  });

  const fetchImage = useCallback(
    async (userId, imagePath) => {
      const imageKey = `${userId}${imagePath}`;

      if (imageCache[imageKey]) {
        return imageCache[imageKey];
      }

      try {
        const response = await fetch(`${ip}/images/${userId}${imagePath}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authState.token}`,
          },
        });

        if (response.ok) {
          const blob = await response.blob();
          return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = () => {
              const base64data = reader.result;
              setImageCache((prev) => ({ ...prev, [imageKey]: base64data }));
              resolve(base64data);
            };
            reader.readAsDataURL(blob);
          });
        }
      } catch (error) {
        console.error("Resim yüklenirken hata:", error);
        return null;
      }
    },
    [authState?.token]
  );

  const handleFollowToggle = async () => {
    if (isFollow === "user-is-same-user") return;

    setFollowLoading(true);
    try {
      if (isFollow) {
        const response = await axios.delete(`${ip}/follow/${user_id}`, {
          headers: {
            Authorization: `Bearer ${authState.token}`,
          },
        });

        if (response.data.success) {
          setIsFollow(false);
          setFollowCounts((prev) => ({
            ...prev,
            followersCount: Math.max(0, prev.followersCount - 1),
          }));
        }
      } else {
        const response = await axios.post(
          `${ip}/follow`,
          { following_id: user_id },
          {
            headers: {
              Authorization: `Bearer ${authState.token}`,
            },
          }
        );

        if (response.data.success) {
          setIsFollow(true);
          setFollowCounts((prev) => ({
            ...prev,
            followersCount: prev.followersCount + 1,
          }));
        }
      }
    } catch (error) {
      console.error("Follow toggle error:", error);
      Alert.alert("Error", "Failed to update follow status");
    } finally {
      setFollowLoading(false);
    }
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true);

      try {
        const response = await axios.get(
          `${ip}/profile/getOtherUserProfile/${user_id}`,
          {
            headers: {
              Authorization: `Bearer ${authState.token}`,
            },
          }
        );
        setUserData(response.data);

        if (response.data.user.id === authState.userId) {
          setIsFollow("user-is-same-user");
        } else {
          const followStatusResponse = await axios.get(
            `${ip}/follow/status/${user_id}`,
            {
              headers: {
                Authorization: `Bearer ${authState.token}`,
              },
            }
          );
          setIsFollow(followStatusResponse.data.isFollowing);
        }

        const followCountsResponse = await axios.get(
          `${ip}/follow/counts/${user_id}`,
          {
            headers: {
              Authorization: `Bearer ${authState.token}`,
            },
          }
        );

        if (followCountsResponse.data.success) {
          setFollowCounts({
            followersCount: followCountsResponse.data.followersCount,
            followingCount: followCountsResponse.data.followingCount,
          });
        }
      } catch (err) {
        console.log(err + " ---- " + (err.response?.data?.msg || err.message));
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.blue} />
      </View>
    );
  }
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString("tr-TR")} ${date.toLocaleTimeString(
      "tr-TR",
      {
        hour: "2-digit",
        minute: "2-digit",
      }
    )}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <OtherUsersProfileScreenHeader
        title={userData?.user.username}
        isFollowThisProfile={isFollow}
        onFollowToggle={handleFollowToggle}
        followLoading={followLoading}
      />
      {userData ? (
        <>
          <View style={styles.profileInfo}>
            <View style={styles.imgContainer}>
              <OtherUserProfileImage style={styles.image} user_id={user_id} />
              <Text style={styles.username}>{userData?.user.username}</Text>
            </View>
            <View style={styles.profileNumbers}>
              <Pressable
                onPress={() => {}}
                style={({ pressed }) =>
                  pressed
                    ? [styles.statsButton, styles.pressed]
                    : styles.statsButton
                }
              >
                <Text style={styles.statsNumber}>
                  {userData.user_post.length || 0}
                </Text>
                <Text style={styles.statsLabel}>Aktiviteler</Text>
              </Pressable>
              <Pressable
                onPress={() => {}}
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
                onPress={() => {}}
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

          {/* <Text style={styles.sectionTitle}>Aktiviteler</Text> */}

          <ScrollView showsVerticalScrollIndicator={false}>
            {userData.user_post.map((p) => (
              <Pressable key={p.post_id} style={styles.card}>
                <View style={styles.header}>
                  <OtherUserProfileImage
                    style={styles.userImage}
                    user_id={user_id}
                  />
                  <View style={styles.headerText}>
                    <Text style={styles.cardUsername}>{p.username}</Text>
                    <Text style={styles.date}>{formatDate(p.created_at)}</Text>
                  </View>
                </View>

                <View style={styles.descriptionHeader}>
                  <Text style={styles.title}>{p.title}</Text>
                </View>

                <ExpandableText
                  style={styles.description}
                  text={p.description}
                />

                <View style={styles.imageContainer}>
                  {p.images && p.images.length > 0 && (
                    <View style={styles.imagesWrapper}>
                      {p.images.length === 1 && (
                        <Image
                          source={{
                            uri:
                              imageCache[`${p.user_id}${p.images[0]}`] || null,
                          }}
                          style={styles.singleImage}
                          onLayout={() => {
                            if (!imageCache[`${p.user_id}${p.images[0]}`]) {
                              fetchImage(p.user_id, p.images[0]);
                            }
                          }}
                        />
                      )}
                      {p.images.length === 2 && (
                        <View style={styles.twoImages}>
                          {p.images.map((image, idx) => (
                            <Image
                              key={idx}
                              source={{
                                uri: imageCache[`${p.user_id}${image}`] || null,
                              }}
                              style={styles.twoImage}
                              onLayout={() => {
                                if (!imageCache[`${p.user_id}${image}`]) {
                                  fetchImage(p.user_id, image);
                                }
                              }}
                            />
                          ))}
                        </View>
                      )}
                      {p.images.length === 3 && (
                        <View style={styles.threeImages}>
                          <Image
                            source={{
                              uri:
                                imageCache[`${p.user_id}${p.images[0]}`] ||
                                null,
                            }}
                            style={styles.threeImageLeft}
                            onLayout={() => {
                              if (!imageCache[`${p.user_id}${p.images[0]}`]) {
                                fetchImage(p.user_id, p.images[0]);
                              }
                            }}
                          />
                          <View style={styles.threeImageRight}>
                            {p.images.slice(1).map((image, idx) => (
                              <Image
                                key={idx}
                                source={{
                                  uri:
                                    imageCache[`${p.user_id}${image}`] || null,
                                }}
                                style={styles.threeImage}
                                onLayout={() => {
                                  if (!imageCache[`${p.user_id}${image}`]) {
                                    fetchImage(p.user_id, image);
                                  }
                                }}
                              />
                            ))}
                          </View>
                        </View>
                      )}
                      {p.images.length >= 4 && (
                        <View style={styles.fourImages}>
                          {p.images.slice(0, 4).map((image, idx) => (
                            <Image
                              key={idx}
                              source={{
                                uri: imageCache[`${p.user_id}${image}`] || null,
                              }}
                              style={styles.fourImage}
                              onLayout={() => {
                                if (!imageCache[`${p.user_id}${image}`]) {
                                  fetchImage(p.user_id, image);
                                }
                              }}
                            />
                          ))}
                        </View>
                      )}
                    </View>
                  )}
                </View>
              </Pressable>
            ))}
            <View style={styles.bottomPadding} />
          </ScrollView>
        </>
      ) : (
        <View style={styles.emptyStateContainer}>
          <Text style={styles.emptyStateText}>User Data Not Found</Text>
        </View>
      )}
    </SafeAreaView>
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
  sectionTitle: {
    fontSize: scale(18),
    fontWeight: "600",
    marginHorizontal: scale(16),
    marginTop: verticalScale(20),
    marginBottom: verticalScale(8),
    color: "#333",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  userImage: {
    width: verticalScale(40),
    height: verticalScale(40),
    borderRadius: verticalScale(20),
  },
  headerText: {
    marginLeft: verticalScale(12),
    flex: 1,
  },
  cardUsername: {
    fontSize: scale(14),
    fontWeight: "600",
    color: "#333",
  },
  title: {
    fontSize: scale(16),
    fontWeight: "700",
    color: "#222",
  },
  date: {
    fontSize: scale(11),
    color: "#888",
    marginTop: verticalScale(2),
  },
  description: {
    fontSize: scale(13),
    color: "#555",
    marginVertical: verticalScale(8),
    lineHeight: verticalScale(20),
  },
  imageContainer: {
    marginTop: verticalScale(8),
  },
  singleImage: {
    width: "100%",
    height: verticalScale(200),
    borderRadius: verticalScale(10),
  },
  twoImages: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: scale(8),
  },
  twoImage: {
    width: "48.5%",
    height: verticalScale(180),
    borderRadius: verticalScale(10),
  },
  threeImages: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: scale(8),
  },
  threeImageLeft: {
    width: "48.5%",
    height: verticalScale(180),
    borderRadius: verticalScale(10),
  },
  threeImageRight: {
    width: "48.5%",
    gap: scale(8),
  },
  threeImage: {
    width: "100%",
    height: verticalScale(86),
    borderRadius: verticalScale(10),
    marginBottom: verticalScale(8),
  },
  fourImages: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: scale(8),
  },
  fourImage: {
    width: "48.5%",
    height: verticalScale(90),
    borderRadius: verticalScale(10),
    marginBottom: verticalScale(8),
  },
  descriptionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: verticalScale(4),
  },
  card: {
    backgroundColor: Colors.white,
    marginHorizontal: scale(12),
    marginVertical: verticalScale(8),
    borderRadius: scale(12),
    padding: scale(16),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: verticalScale(12),
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyStateText: {
    fontSize: scale(16),
    color: "#666",
  },
  bottomPadding: {
    height: verticalScale(20),
  },
});
