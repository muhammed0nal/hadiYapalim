import {
  Pressable,
  FlatList,
  StyleSheet,
  View,
  Text,
  Image,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { Colors } from "../../constants/Colors";
import { useAuth } from "../../contexts/AuthContext";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { ip } from "../../ip/ip";
import ExpandableText from "../../components/UI/ExpandableText/ExpandableText.js";
import SCREENS from "../index.js";
import { Ionicons } from "@expo/vector-icons";
import OtherUserProfileImage from "../../components/OtherUserProfile/OtherUserProfileImage.js";
export default function HomeScreen({ navigation }) {
  const [exploreData, setExploreData] = useState(null);
  const [followingData, setFollowingData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("explore");
  const [refreshing, setRefreshing] = useState(false);
  const [responseError, setResponseError] = useState({
    message: "",
    msgId: "",
  });
  const [imageCache, setImageCache] = useState({});
  const { authState } = useAuth();
  //  userid'si !== olan postları getir.
  const fetchAllActivity = async () => {
    setResponseError({
      message: "",
      msgId: "",
    });
    setLoading(true);
    try {
      if (activeTab === "explore") {
        // const response = await axios.get(`${ip}/post/explore/${userId}`);
      }
      if (activeTab === "following") {
        try {
          const response = await axios.get(
            `${ip}/home-posts/followed-posts/${authState.userId}`
          );
          if (response.data.msgId === "takipyok") {
            setResponseError({
              message: response.data.message,
              msgId: response.data.msgId,
            });
          }
          setFollowingData(response.data);
        } catch (error) {
          console.log(error.response.detail);
        }
      }
    } catch (error) {
      console.error("Veri çekme hatası:", error);
    } finally {
      setLoading(false);
    }
  };

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
    [authState.token]
  );

  useFocusEffect(
    useCallback(() => {
      if (activeTab === "explore" && exploreData === null) {
        fetchAllActivity();
      }
      if (activeTab === "following" && followingData === null) {
        fetchAllActivity();
      }
    }, [activeTab, exploreData, followingData])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchAllActivity();
    setRefreshing(false);
  };

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

  const goToActivityDetailScreen = (activity) => {
    navigation.navigate(SCREENS.ActivityDetailsScreen, {
      activity: { ...activity, images: activity.images.split(",") },
      date: formatDate(activity.created_at),
    });
  };

  const ExploreOrFollowPost = () => {
    return (
      <View style={styles.exploreOrFollowPostContainer}>
        <Pressable
          style={[
            styles.tabButton,
            {
              borderBottomColor:
                activeTab === "explore" ? Colors.blue : "transparent",
            },
          ]}
          onPress={() => setActiveTab("explore")}
        >
          <Text
            style={[
              styles.tabButtonText,
              { color: activeTab === "explore" ? Colors.black : "#888" },
            ]}
          >
            Keşfet
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.tabButton,
            {
              borderBottomColor:
                activeTab === "following" ? Colors.blue : "transparent",
            },
          ]}
          onPress={() => setActiveTab("following")}
        >
          <Text
            style={[
              styles.tabButtonText,
              { color: activeTab === "following" ? Colors.black : "#888" },
            ]}
          >
            Takip Edilenler
          </Text>
        </Pressable>
      </View>
    );
  };

  const renderItem = ({ item }) => {
    const imagesArray = item.images.split(",");

    return (
      <Pressable
        style={styles.card}
        onPress={() => goToActivityDetailScreen(item)}
      >
        <View style={styles.header}>
          <OtherUserProfileImage
            style={styles.userImage}
            user_id={item.user_id}
          />
          <View style={styles.headerText}>
            <Text style={styles.username}>{item.username}</Text>
            <Text style={styles.date}>{formatDate(item.created_at)}</Text>
          </View>
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.descriptionHeader}>
            <Text style={styles.title}>{item.title}</Text>
          </View>

          <ExpandableText style={styles.description} text={item.description} />

          <View style={styles.imageContainer}>
            {Array.isArray(imagesArray) && imagesArray.length > 0 && (
              <View style={styles.imagesWrapper}>
                {imagesArray.length === 1 && (
                  <Image
                    source={{
                      uri:
                        imageCache[`${item.user_id}${imagesArray[0]}`] || null,
                    }}
                    style={styles.singleImage}
                    onLayout={() => {
                      if (!imageCache[`${item.user_id}${imagesArray[0]}`]) {
                        fetchImage(item.user_id, imagesArray[0]);
                      }
                    }}
                  />
                )}
                {imagesArray.length === 2 && (
                  <View style={styles.twoImages}>
                    {imagesArray.map((image, idx) => (
                      <Image
                        key={idx}
                        source={{
                          uri: imageCache[`${item.user_id}${image}`] || null,
                        }}
                        style={styles.twoImage}
                        onLayout={() => {
                          if (!imageCache[`${item.user_id}${image}`]) {
                            fetchImage(item.user_id, image);
                          }
                        }}
                      />
                    ))}
                  </View>
                )}
                {imagesArray.length === 3 && (
                  <View style={styles.threeImages}>
                    <Image
                      source={{
                        uri:
                          imageCache[`${item.user_id}${imagesArray[0]}`] ||
                          null,
                      }}
                      style={styles.threeImageLeft}
                      onLayout={() => {
                        if (!imageCache[`${item.user_id}${imagesArray[0]}`]) {
                          fetchImage(item.user_id, imagesArray[0]);
                        }
                      }}
                    />
                    <View style={styles.threeImageRight}>
                      {imagesArray.slice(1).map((image, idx) => (
                        <Image
                          key={idx}
                          source={{
                            uri: imageCache[`${item.user_id}${image}`] || null,
                          }}
                          style={styles.threeImage}
                          onLayout={() => {
                            if (!imageCache[`${item.user_id}${image}`]) {
                              fetchImage(item.user_id, image);
                            }
                          }}
                        />
                      ))}
                    </View>
                  </View>
                )}
                {imagesArray.length >= 4 && (
                  <View style={styles.fourImages}>
                    {imagesArray.slice(0, 4).map((image, idx) => (
                      <Image
                        key={idx}
                        source={{
                          uri: imageCache[`${item.user_id}${image}`] || null,
                        }}
                        style={styles.fourImage}
                        onLayout={() => {
                          if (!imageCache[`${item.user_id}${image}`]) {
                            fetchImage(item.user_id, image);
                          }
                        }}
                      />
                    ))}
                  </View>
                )}
              </View>
            )}
          </View>
        </View>

        <View style={styles.footer}>
          <Pressable
            style={styles.footerButton}
            onPress={() => console.log("beğen")}
          >
            <Ionicons name="heart-outline" size={20} color={Colors.blue} />
            <Text style={styles.footerButtonText}>Beğen</Text>
          </Pressable>
          <Pressable
            onPress={() => console.log("yorum")}
            style={styles.footerButton}
          >
            <Ionicons name="chatbubble-outline" size={20} color={Colors.blue} />
            <Text style={styles.footerButtonText}>Yorum</Text>
          </Pressable>
          <Pressable
            onPress={() => console.log("paylaş")}
            style={styles.footerButton}
          >
            <Ionicons name="share-outline" size={20} color={Colors.blue} />
            <Text style={styles.footerButtonText}>Paylaş</Text>
          </Pressable>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <ExploreOrFollowPost />
      {responseError.msgId === "takipyok" && (
        <View style={styles.responseError}>
          <Pressable
            onPress={() => navigation.navigate("SearchScreen")}
            style={styles.responseErrorPressable}
          >
            <Text style={styles.responseErrorText}>
              Birilerini {responseError.message}
            </Text>
          </Pressable>
        </View>
      )}
      {loading ? (
        <ActivityIndicator size="large" color={Colors.blue} />
      ) : (
        <View>
          <FlatList
            bounces={true}
            overScrollMode="always"
            contentContainerStyle={styles.listContainer}
            refreshControl={
              <RefreshControl
                colors={[Colors.blue]} // Android için farklı renkler
                tintColor={Colors.blue}
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            }
            data={activeTab === "explore" ? [] : followingData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightGray,
  },
  exploreOrFollowPostContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: Colors.white,
    paddingTop: verticalScale(10),
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  tabButton: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    paddingVertical: verticalScale(4),
    borderBottomWidth: 2,
    borderBottomColor: "transparent", // Aktif sekme için renk değişimi
  },
  tabButtonText: {
    fontSize: verticalScale(12),
    fontWeight: "600",
  },
  card: {
    backgroundColor: Colors.white,
    marginHorizontal: moderateScale(12),
    marginVertical: moderateScale(8),
    borderRadius: moderateScale(12),
    padding: moderateScale(16),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: verticalScale(12),
  },
  userImage: {
    width: verticalScale(50),
    height: verticalScale(50),
    borderRadius: verticalScale(25),
  },
  headerText: {
    marginLeft: verticalScale(12),
    flex: 1,
  },
  username: {
    fontSize: verticalScale(14),
  },
  title: {
    fontSize: verticalScale(16),
    fontWeight: "700",
    color: "#222",
  },
  date: {
    fontSize: verticalScale(11),
    color: "#888",
    marginTop: verticalScale(3),
  },
  description: {
    fontSize: verticalScale(12),
    color: "#555",
    marginBottom: verticalScale(5),
    lineHeight: verticalScale(22),
  },
  imageContainer: {
    marginTop: 12,
  },
  singleImage: {
    width: "100%",
    height: verticalScale(220),
    borderRadius: verticalScale(10),
  },
  twoImages: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  twoImage: {
    width: "48%",
    height: verticalScale(220),
    gap: 5,
    borderRadius: verticalScale(10),
  },
  threeImages: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  threeImageLeft: {
    width: "48%",
    height: verticalScale(220),
    borderRadius: verticalScale(10),
  },
  threeImageRight: {
    width: "48%",
  },
  threeImage: {
    width: "100%",
    gap: 5,
    height: verticalScale(108),
    borderRadius: verticalScale(10),
  },
  fourImages: { gap: 5, flexDirection: "row", flexWrap: "wrap" },
  fourImage: {
    width: "48%",
    height: verticalScale(108),
    borderRadius: verticalScale(10),
    marginBottom: verticalScale(4),
  },
  descriptionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: verticalScale(8),
  },
  responseError: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  responseErrorPressable: {
    backgroundColor: Colors.blue,
    paddingVertical: verticalScale(10),
    paddingHorizontal: verticalScale(5),
    borderRadius: 5,
  },
  responseErrorText: {
    color: Colors.white,
  },
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  listContainer: {
    paddingBottom: verticalScale(150),
    flexGrow: 1,
  },
  card: {
    backgroundColor: Colors.white,
    marginHorizontal: scale(12),
    marginTop: verticalScale(12),
    borderRadius: scale(12),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: scale(12),
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5",
  },
  userImage: {
    width: verticalScale(40),
    height: verticalScale(40),
    borderRadius: verticalScale(20),
    borderWidth: 1,
    borderColor: "#eee",
  },
  headerText: {
    marginLeft: scale(12),
    flex: 1,
  },
  username: {
    fontSize: scale(14),
    fontWeight: "600",
    color: "#333",
  },
  contentContainer: {
    padding: scale(12),
  },
  descriptionHeader: {
    marginBottom: verticalScale(15),
  },
  title: {
    fontSize: scale(16),
    fontWeight: "700",
    color: "#222",
  },
  date: {
    fontSize: scale(11),
    color: "#888",
  },
  description: {
    fontSize: scale(13),
    color: "#555",
    marginBottom: verticalScale(10),
    lineHeight: verticalScale(20),
  },
  imageContainer: {
    marginTop: verticalScale(8),
  },
  singleImage: {
    width: "100%",
    height: verticalScale(200),
    borderRadius: scale(8),
  },
  twoImages: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: scale(8),
  },
  twoImage: {
    width: "48.5%",
    height: verticalScale(180),
    borderRadius: scale(8),
  },
  threeImages: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: scale(8),
  },
  threeImageLeft: {
    width: "48.5%",
    height: verticalScale(180),
    borderRadius: scale(8),
  },
  threeImageRight: {
    width: "48.5%",
    gap: scale(8),
  },
  threeImage: {
    width: "100%",
    height: verticalScale(86),
    borderRadius: scale(8),
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
    borderRadius: scale(8),
    marginBottom: verticalScale(8),
  },
  footer: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#f5f5f5",
    paddingVertical: verticalScale(8),
  },
  footerButton: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: verticalScale(8),
  },
  footerButtonText: {
    marginLeft: scale(6),
    fontSize: scale(12),
    color: Colors.blue,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: verticalScale(100),
  },
  emptyText: {
    fontSize: scale(16),
    color: "#888",
    marginTop: verticalScale(10),
    marginBottom: verticalScale(20),
  },
  addButton: {
    backgroundColor: Colors.blue,
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(10),
    borderRadius: scale(20),
  },
  addButtonText: {
    color: Colors.white,
    fontWeight: "600",
  },
});
