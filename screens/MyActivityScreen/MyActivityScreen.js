import {
  Pressable,
  FlatList,
  StyleSheet,
  View,
  Text,
  Image,
  ActivityIndicator,
} from "react-native";
import { Colors } from "../../constants/Colors";
import { useAuth } from "../../contexts/AuthContext";
import ActiveUserImage from "../../components/ActiveUserComponents/ActiveUserImage.js";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { useFocusEffect } from "@react-navigation/native";
import React, { useState, useCallback } from "react";
import axios from "axios";
import { ip } from "../../ip/ip";
import ExpandableText from "../../components/UI/ExpandableText/ExpandableText.js";
import SCREENS from "../index.js";
import { Ionicons } from "@expo/vector-icons";

export default function MyActivityScreen({ navigation }) {
  const { authState } = useAuth();

  const [myActivity, setMyActivity] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imageCache, setImageCache] = useState({});

  useFocusEffect(
    React.useCallback(() => {
      fetchMyActivity();
    }, [authState.userId])
  );

  const fetchMyActivity = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${ip}/post/user/${authState.userId}`);
      setMyActivity(response.data.data);
    } catch (error) {
      console.error("Veri çekme hatası:", error);
    }
    setLoading(false);
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
      activity: activity,
      date: formatDate(activity.created_at),
    });
  };

  const renderItem = ({ item }) => {
    console.log("item.images");
    console.log(item.images);
    return (
      <Pressable
        style={styles.card}
        onPress={() => goToActivityDetailScreen(item)}
      >
        <View style={styles.header}>
          <ActiveUserImage style={styles.userImage} />
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
            {Array.isArray(item.images) && item.images.length > 0 && (
              <View style={styles.imagesWrapper}>
                {item.images.length === 1 && (
                  <Image
                    source={{
                      uri:
                        imageCache[`${item.user_id}${item.images[0]}`] || null,
                    }}
                    style={styles.singleImage}
                    onLayout={() => {
                      if (!imageCache[`${item.user_id}${item.images[0]}`]) {
                        fetchImage(item.user_id, item.images[0]);
                      }
                    }}
                  />
                )}
                {item.images.length === 2 && (
                  <View style={styles.twoImages}>
                    {item.images.map((image, idx) => (
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
                {item.images.length === 3 && (
                  <View style={styles.threeImages}>
                    <Image
                      source={{
                        uri:
                          imageCache[`${item.user_id}${item.images[0]}`] ||
                          null,
                      }}
                      style={styles.threeImageLeft}
                      onLayout={() => {
                        if (!imageCache[`${item.user_id}${item.images[0]}`]) {
                          fetchImage(item.user_id, item.images[0]);
                        }
                      }}
                    />
                    <View style={styles.threeImageRight}>
                      {item.images.slice(1).map((image, idx) => (
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
                {item.images.length >= 4 && (
                  <View style={styles.fourImages}>
                    {item.images.slice(0, 4).map((image, idx) => (
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

  const ListEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="document-text-outline" size={50} color="#ccc" />
      <Text style={styles.emptyText}>Henüz bir aktivite yok</Text>
      <Pressable
        style={styles.addButton}
        onPress={() => navigation.getParent()?.navigate(SCREENS.AddPostScreen)}
      >
        <Text style={styles.addButtonText}>Aktivite Ekle</Text>
      </Pressable>
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.blue} />
        </View>
      ) : (
        <FlatList
          data={myActivity}
          keyExtractor={(item) => item.post_id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={ListEmptyComponent}
          bounces={true}
          overScrollMode="always"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  listContainer: {
    paddingBottom: verticalScale(100),
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
