import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  Pressable,
  Modal,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Colors } from "../../constants/Colors";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "../../components/UI/Icons/Icon";
import { Formik } from "formik";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import * as ImagePicker from "expo-image-picker";
import MapView, { Marker } from "react-native-maps";
import Button from "../../components/UI/Buttons/Button";
import { validationSchemaAddPost } from "../../constants/ValidationSchema";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import { ip } from "../../ip/ip";
import ImageViewer from "../../components/UI/ImageViewing/İmageViewing";
import { Ionicons } from "@expo/vector-icons";

export default function AddPostScreen({ navigation }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [mapVisible, setMapVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const { authState } = useAuth();
  const [modalMarkerLocation, setModalMarkerLocation] = useState({
    latitude: 38.238473144181064,
    longitude: 34.47703789919615,
  });

  const handleMapMove = (region) => {
    setModalMarkerLocation({
      latitude: region.latitude,
      longitude: region.longitude,
    });
  };

  const handleMapPress = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setModalMarkerLocation({
      latitude: latitude,
      longitude: longitude,
    });
  };

  const handleLocationSelect = () => {
    setMapVisible(false);
    setSelectedLocation(modalMarkerLocation);
  };

  const handleSubmit = async () => {
    try {
      if (title.length >= 50) {
        return alert("Başlık 50 karakterden fazla içeremez."); // sonra bir modal gibi bir şey yap.
      }

      const formData = new FormData();

      formData.append("title", title);
      formData.append("description", description);
      formData.append("user_id", authState.userId);

      if (selectedLocation) {
        formData.append("location", JSON.stringify(selectedLocation));
      }

      // Resimleri formData'ya ekle
      selectedImages.forEach((uri, index) => {
        const uriParts = uri.split(".");
        const fileType = uriParts[uriParts.length - 1];

        formData.append("images", {
          uri: uri,
          name: `photo${index}.${fileType}`,
          type: `image/${fileType}`,
        });
      });

      const response = await axios.post(`${ip}/post`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 201) {
        navigation.goBack();
      }
    } catch (error) {
      console.error("Post gönderme hatası:", error.response?.data);
    }
  };

  const imagePickerHandler = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      alert("Erişim İzni Verilmedi");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: true,
      aspect: [16, 9],
      selectionLimit: 4,
    });

    if (!result.canceled) {
      const imageUris = result.assets.map((asset) => asset.uri);
      setSelectedImages(imageUris);
    }
  };

  const openImageViewerHandler = (index) => {
    setSelectedImageIndex(index);
    setVisible(true);
  };

  const openMapHandler = () => {
    setMapVisible(true);
  };

  const closeModal = () => {
    setMapVisible(false);
  };

  const removeImage = (index) => {
    const newImages = [...selectedImages];
    newImages.splice(index, 1);
    setSelectedImages(newImages);
  };

  return (
    <SafeAreaView style={styles.root}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.header}>
          <Pressable
            onPress={() => navigation.goBack()}
            style={({ pressed }) => [
              styles.backButton,
              pressed && { opacity: 0.7 },
            ]}
          >
            <Ionicons name="arrow-back" size={24} color={Colors.blue} />
          </Pressable>
          <Text style={styles.headerTitle}>Yeni Aktivite</Text>
          <View style={styles.headerRight} />
        </View>

        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          <Formik
            initialValues={{
              title: "",
              description: "",
            }}
            validationSchema={validationSchemaAddPost}
            onSubmit={handleSubmit}
          >
            {({ handleChange, values, touched, errors }) => (
              <View style={styles.formContainer}>
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Başlık</Text>
                  <TextInput
                    style={styles.titleInput}
                    placeholder="Aktivite başlığını girin"
                    multiline
                    textAlignVertical="top"
                    onChangeText={(text) => {
                      setTitle(text);
                      handleChange("title")(text);
                    }}
                    value={values.title}
                  />
                  {touched.title && errors.title && (
                    <Text style={styles.errorText}>{errors.title}</Text>
                  )}
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Açıklama</Text>
                  <TextInput
                    style={styles.descriptionInput}
                    placeholder="Aktivite detaylarını girin"
                    multiline
                    textAlignVertical="top"
                    value={values.description}
                    onChangeText={(text) => {
                      setDescription(text);
                      handleChange("description")(text);
                    }}
                  />
                  {touched.description && errors.description && (
                    <Text style={styles.errorText}>{errors.description}</Text>
                  )}
                </View>

                <View style={styles.actionsContainer}>
                  <Pressable
                    style={styles.actionButton}
                    onPress={imagePickerHandler}
                  >
                    <Ionicons
                      name="images-outline"
                      size={24}
                      color={Colors.blue}
                    />
                    <Text style={styles.actionText}>Fotoğraf Ekle</Text>
                  </Pressable>

                  <Pressable
                    style={styles.actionButton}
                    onPress={openMapHandler}
                  >
                    <Ionicons
                      name="location-outline"
                      size={24}
                      color={Colors.blue}
                    />
                    <Text style={styles.actionText}>Konum Ekle</Text>
                  </Pressable>
                </View>
              </View>
            )}
          </Formik>

          {/* Selected Images Preview */}
          {selectedImages.length > 0 && (
            <View style={styles.selectedImagesContainer}>
              <Text style={styles.sectionTitle}>Seçilen Fotoğraflar</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.imageContainer}
              >
                {selectedImages.map((image, index) => (
                  <View key={index} style={styles.imageWrapper}>
                    <Pressable onPress={() => openImageViewerHandler(index)}>
                      <Image
                        source={{ uri: image }}
                        style={styles.imagePreview}
                      />
                    </Pressable>
                    <Pressable
                      style={styles.removeImageButton}
                      onPress={() => removeImage(index)}
                    >
                      <Ionicons
                        name="close-circle"
                        size={24}
                        color={Colors.blue}
                      />
                    </Pressable>
                  </View>
                ))}
              </ScrollView>
            </View>
          )}

          {/* Selected Location Preview */}
          {selectedLocation && (
            <View style={styles.selectedLocationContainer}>
              <Text style={styles.sectionTitle}>Seçilen Konum</Text>
              <MapView
                style={styles.locationPreview}
                initialRegion={{
                  ...selectedLocation,
                  longitudeDelta: 0.1,
                  latitudeDelta: 0.1,
                }}
                region={{
                  ...selectedLocation,
                  longitudeDelta: 0.1,
                  latitudeDelta: 0.1,
                }}
              >
                <Marker
                  coordinate={{
                    latitude: selectedLocation.latitude,
                    longitude: selectedLocation.longitude,
                  }}
                />
              </MapView>
              <Pressable
                style={styles.removeLocationButton}
                onPress={() => setSelectedLocation(null)}
              >
                <Text style={styles.removeLocationText}>Konumu Kaldır</Text>
              </Pressable>
            </View>
          )}

          {/* Image Viewer Modal */}
          <ImageViewer
            images={selectedImages.map((image) => ({ uri: image }))}
            visible={visible}
            onClose={() => setVisible(false)}
            initialIndex={selectedImageIndex}
          />

          {/* Map Selection Modal */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={mapVisible}
            onRequestClose={closeModal}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>Konum Seç</Text>
                  <View style={styles.headerButtons}>
                    <Pressable
                      onPress={handleLocationSelect}
                      style={styles.selectButton}
                    >
                      <Text style={styles.selectButtonText}>Konumu Seç</Text>
                    </Pressable>
                    <Pressable onPress={closeModal} style={styles.closeButton}>
                      <Ionicons name="close" size={24} color={Colors.blue} />
                    </Pressable>
                  </View>
                </View>
                <MapView
                  style={styles.map}
                  initialRegion={{
                    latitude: 38.238473144181064,
                    latitudeDelta: 20.41136028636858,
                    longitude: 34.47703789919615,
                    longitudeDelta: 15.13559214770794,
                  }}
                  mapType="standard"
                  showsUserLocation={true}
                  onPress={handleMapPress}
                  onRegionChangeComplete={handleMapMove}
                >
                  <Marker coordinate={modalMarkerLocation} />
                </MapView>
              </View>
            </View>
          </Modal>
        </ScrollView>

        <View style={styles.buttonContainer}>
          <Button
            title="Aktivite Paylaş"
            onPress={handleSubmit}
            backgroundColor={Colors.blue}
            textColor={Colors.white}
            fontSize={scale(16)}
            height={verticalScale(50)}
            borderRadius={scale(10)}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(12),
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: {
    fontSize: scale(18),
    fontWeight: "600",
    color: Colors.blue,
  },
  backButton: {
    padding: scale(8),
  },
  headerRight: {
    width: scale(40),
  },
  scrollView: {
    flex: 1,
  },
  formContainer: {
    padding: scale(16),
  },
  inputContainer: {
    marginBottom: verticalScale(16),
  },
  inputLabel: {
    fontSize: scale(14),
    fontWeight: "500",
    color: "#555",
    marginBottom: verticalScale(6),
  },
  titleInput: {
    backgroundColor: Colors.white,
    borderRadius: scale(8),
    borderWidth: 1,
    borderColor: "#ddd",
    padding: scale(12),
    fontSize: scale(16),
    minHeight: verticalScale(50),
  },
  descriptionInput: {
    backgroundColor: Colors.white,
    borderRadius: scale(8),
    borderWidth: 1,
    borderColor: "#ddd",
    padding: scale(12),
    fontSize: scale(16),
    minHeight: verticalScale(120),
    textAlignVertical: "top",
  },
  errorText: {
    color: "red",
    fontSize: scale(12),
    marginTop: verticalScale(4),
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: verticalScale(16),
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(16),
    borderRadius: scale(8),
    borderWidth: 1,
    borderColor: Colors.blue,
  },
  actionText: {
    marginLeft: scale(8),
    color: Colors.blue,
    fontWeight: "500",
  },
  selectedImagesContainer: {
    marginHorizontal: scale(16),
    marginBottom: verticalScale(16),
  },
  selectedLocationContainer: {
    marginHorizontal: scale(16),
    marginBottom: verticalScale(16),
  },
  sectionTitle: {
    fontSize: scale(16),
    fontWeight: "600",
    marginBottom: verticalScale(8),
    color: "#444",
  },
  imageContainer: {
    flexDirection: "row",
    paddingVertical: verticalScale(8),
  },
  imageWrapper: {
    marginRight: scale(12),
    position: "relative",
  },
  imagePreview: {
    width: scale(120),
    height: scale(120),
    borderRadius: scale(8),
    borderWidth: 1,
    borderColor: "#ddd",
  },
  removeImageButton: {
    position: "absolute",
    top: -8,
    right: -8,
    backgroundColor: Colors.white,
    borderRadius: 20,
  },
  locationPreview: {
    height: verticalScale(200),
    borderRadius: scale(8),
    marginBottom: verticalScale(8),
    borderWidth: 1,
    borderColor: "#ddd",
  },
  removeLocationButton: {
    alignSelf: "flex-end",
    paddingVertical: verticalScale(6),
    paddingHorizontal: scale(12),
  },
  removeLocationText: {
    color: Colors.blue,
    fontWeight: "500",
  },
  buttonContainer: {
    padding: scale(16),
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    height: "80%",
    backgroundColor: Colors.white,
    borderRadius: scale(12),
    overflow: "hidden",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: scale(16),
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  modalTitle: {
    fontSize: scale(18),
    fontWeight: "600",
    color: Colors.blue,
  },
  headerButtons: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(12),
  },
  selectButton: {
    backgroundColor: Colors.blue,
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(8),
    borderRadius: scale(8),
  },
  selectButtonText: {
    color: Colors.white,
    fontWeight: "600",
  },
  closeButton: {
    padding: scale(4),
  },
  map: {
    flex: 1,
    width: "100%",
  },
});
