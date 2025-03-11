import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
  Linking,
  Modal,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ActivityDetailHeader from "./ActivityDetailHeader";
import ActiveUserImage from "../../components/ActiveUserComponents/ActiveUserImage";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { ip } from "../../ip/ip";
import { useState, useCallback } from "react";
import ImageViewer from "../../components/UI/ImageViewing/İmageViewing";
import { Colors } from "../../constants/Colors";
import MapView, { Marker } from "react-native-maps";
import { StatusBar } from "expo-status-bar";
import OtherUserProfileImage from "../../components/OtherUserProfile/OtherUserProfileImage";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import { Ionicons } from "@expo/vector-icons";

export default function ActivityDetailsScreen({ route, navigation }) {
  const { activity, date } = route.params;
  const [visible, setVisible] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [imageCache, setImageCache] = useState({});
  const { authState } = useAuth();
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

  const openImageViewerHandler = (index) => {
    setSelectedImageIndex(index);
    setVisible(true);
  };

  const openMapsHandler = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${activity.latitude},${activity.longitude}`;
    Linking.openURL(url).catch((err) =>
      console.error("Harita açılamadı!", err)
    );
  };

  const handleDeletePost = async () => {
    try {
      const postId = activity.post_id;
      const user_id = activity.user_id;
      const response = await axios.delete(
        `${ip}/post/deletePost/${user_id}/${postId}`
      );

      if (response.data.msgId === "success") {
        setDeleteModalVisible(false);
        navigation.goBack();
      }
    } catch (error) {
      console.log(error);
      setDeleteModalVisible(false);
    }
  };

  const goToProfileScreen = (user_id) => {
    navigation.navigate(SCREENS.OtherUsersProfileScreen, { user_id });
  };
  console.log(activity.user_id);
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" backgroundColor={Colors.white} />
      <ActivityDetailHeader
        postTitle={activity.title}
        color={Colors.black}
        backgroundColor={Colors.white}
      />

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <View style={styles.header}>
            <View style={styles.userInfo}>
              <Pressable
                onPress={() => goToProfileScreen(activity.user_id)}
                style={styles.userInfo}
              >
                <View>
                  {activity.user_id === authState.userId && (
                    <ActiveUserImage style={styles.userImage} />
                  )}
                  {activity.user_id !== authState.userId && (
                    <OtherUserProfileImage
                      style={styles.userImage}
                      user_id={activity.user_id}
                    />
                  )}
                </View>
                <View style={styles.userTextContainer}>
                  <Text style={styles.username}>{activity.username}</Text>
                  <Text style={styles.date}>{date}</Text>
                </View>
              </Pressable>
            </View>

            <TouchableOpacity style={styles.moreButton}>
              <Ionicons name="ellipsis-vertical" size={20} color="#666" />
            </TouchableOpacity>
          </View>

          <View style={styles.contentContainer}>
            <Text style={styles.description}>{activity.description}</Text>

            {activity.images && activity.images.length > 0 && (
              <View style={styles.imagesContainer}>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.imageScrollContainer}
                >
                  {activity.images.map((image, idx) => (
                    <Pressable
                      key={idx}
                      onPress={() => openImageViewerHandler(idx)}
                      style={styles.imageWrapper}
                    >
                      <Image
                        source={{
                          uri:
                            imageCache[`${activity.user_id}${image}`] || null,
                        }}
                        style={styles.activityImage}
                        onLayout={() => {
                          if (!imageCache[`${activity.user_id}${image}`]) {
                            fetchImage(activity.user_id, image);
                          }
                        }}
                      />
                    </Pressable>
                  ))}
                </ScrollView>
              </View>
            )}

            {activity.latitude && activity.longitude && (
              <View style={styles.locationContainer}>
                <View style={styles.locationHeader}>
                  <Text style={styles.locationTitle}>Konum</Text>
                  <TouchableOpacity
                    onPress={openMapsHandler}
                    style={styles.openMapButton}
                  >
                    <Text style={styles.openMapText}>Haritada Aç</Text>
                    <Ionicons
                      name="open-outline"
                      size={16}
                      color={Colors.blue}
                    />
                  </TouchableOpacity>
                </View>

                <Pressable onPress={openMapsHandler}>
                  <MapView
                    style={styles.map}
                    initialRegion={{
                      latitude: parseFloat(activity.latitude),
                      longitude: parseFloat(activity.longitude),
                      latitudeDelta: 0.05,
                      longitudeDelta: 0.05,
                    }}
                    scrollEnabled={false}
                    zoomEnabled={false}
                  >
                    <Marker
                      coordinate={{
                        latitude: parseFloat(activity.latitude),
                        longitude: parseFloat(activity.longitude),
                      }}
                      pinColor={Colors.blue}
                      title={activity.title}
                    />
                  </MapView>
                </Pressable>
              </View>
            )}
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton}>
          <Ionicons name="chatbubble-outline" size={22} color={Colors.blue} />
          <Text style={styles.footerButtonText}>Yorumlar</Text>
        </TouchableOpacity>

        <View style={styles.footerDivider} />

        {activity.user_id === authState.userId && (
          <TouchableOpacity
            style={styles.footerButton}
            onPress={() => setDeleteModalVisible(true)}
          >
            <Ionicons name="trash-outline" size={22} color={Colors.red} />
            <Text style={[styles.footerButtonText, { color: Colors.red }]}>
              Sil
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Delete Confirmation Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={deleteModalVisible}
        onRequestClose={() => setDeleteModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Ionicons
                name="alert-circle-outline"
                size={40}
                color={Colors.red}
              />
              <Text style={styles.modalTitle}>Aktiviteyi Sil</Text>
            </View>

            <Text style={styles.modalText}>
              Bu aktiviteyi silmek istediğinize emin misiniz? Bu işlem geri
              alınamaz.
            </Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setDeleteModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>İptal</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, styles.deleteButton]}
                onPress={handleDeletePost}
              >
                <Text style={styles.deleteButtonText}>Sil</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Image Viewer */}
      <ImageViewer
        images={
          activity.images?.map((image) => ({
            uri: imageCache[`${activity.user_id}${image}`] || null,
          })) || []
        }
        visible={visible}
        onClose={() => setVisible(false)}
        imageIndex={selectedImageIndex}
        initialIndex={selectedImageIndex}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  container: {
    flex: 1,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: scale(12),
    margin: scale(12),
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
    justifyContent: "space-between",
    padding: scale(12),
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  userImage: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    borderWidth: 1,
    borderColor: "#eee",
  },
  userTextContainer: {
    marginLeft: scale(10),
    flex: 1,
  },
  username: {
    fontSize: scale(14),
    fontWeight: "600",
    color: "#333",
  },
  date: {
    fontSize: scale(12),
    color: "#888",
    marginTop: verticalScale(2),
  },
  moreButton: {
    padding: scale(8),
  },
  contentContainer: {
    padding: scale(12),
  },
  description: {
    fontSize: scale(14),
    lineHeight: scale(20),
    color: "#444",
    marginBottom: verticalScale(16),
  },
  imagesContainer: {
    marginBottom: verticalScale(16),
  },
  imageScrollContainer: {
    paddingVertical: verticalScale(4),
  },
  imageWrapper: {
    marginRight: scale(10),
    borderRadius: scale(8),
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  activityImage: {
    width: scale(120),
    height: scale(120),
    borderRadius: scale(8),
  },
  locationContainer: {
    marginTop: verticalScale(8),
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    paddingTop: verticalScale(12),
  },
  locationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: verticalScale(8),
  },
  locationTitle: {
    fontSize: scale(16),
    fontWeight: "600",
    color: "#333",
  },
  openMapButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  openMapText: {
    fontSize: scale(12),
    color: Colors.blue,
    marginRight: scale(4),
  },
  map: {
    height: verticalScale(200),
    borderRadius: scale(8),
    marginBottom: verticalScale(8),
  },
  footer: {
    flexDirection: "row",
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: "#eee",
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
    marginLeft: scale(8),
    fontSize: scale(14),
    fontWeight: "500",
    color: Colors.blue,
  },
  footerDivider: {
    width: 1,
    height: "80%",
    backgroundColor: "#eee",
    alignSelf: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "85%",
    backgroundColor: Colors.white,
    borderRadius: scale(12),
    padding: scale(20),
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    alignItems: "center",
    marginBottom: verticalScale(16),
  },
  modalTitle: {
    fontSize: scale(18),
    fontWeight: "600",
    color: "#333",
    marginTop: verticalScale(8),
  },
  modalText: {
    fontSize: scale(14),
    color: "#666",
    textAlign: "center",
    marginBottom: verticalScale(20),
    lineHeight: scale(20),
  },
  modalButtons: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  modalButton: {
    flex: 1,
    paddingVertical: verticalScale(12),
    borderRadius: scale(8),
    alignItems: "center",
    justifyContent: "center",
  },
  cancelButton: {
    backgroundColor: "#f0f0f0",
    marginRight: scale(8),
  },
  cancelButtonText: {
    color: "#666",
    fontWeight: "600",
  },
  deleteButton: {
    backgroundColor: Colors.red,
    marginLeft: scale(8),
  },
  deleteButtonText: {
    color: Colors.white,
    fontWeight: "600",
  },
});
