import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  Pressable,
  Modal,
} from "react-native";
import { Colors } from "../../constants/Colors";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "../../components/UI/Icons/Icon";
import { Formik } from "formik";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import * as ImagePicker from "expo-image-picker";
import ImageViewing from "react-native-image-viewing";
import MapView, { Marker } from "react-native-maps";
import Button from "../../components/UI/Buttons/Button";
import { validationSchemaAddPost } from "../../constants/ValidationSchema";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import { ip } from "../../ip/ip";

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

      console.log("formData");
      console.log(formData);

      const response = await axios.post(`${ip}/post`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 201) {
        alert("Post başarıyla eklendi!");
        navigation.goBack();
      }
    } catch (error) {
      console.error("Post gönderme hatası:", error.response.data);
      alert("Post eklenirken bir hata oluştu.");
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
      console.log("Seçilen resim yolları:", imageUris);
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
  return (
    <SafeAreaView style={styles.root}>
      <View>
        <Icon
          onPress={() => navigation.goBack()}
          name="arrow-back"
          size={moderateScale(32)}
          stylePressable={styles.backButton}
          color={Colors.blue}
        />
      </View>
      <ScrollView style={styles.ScrollView}>
        <Formik
          initialValues={{
            title: "",
            description: "",
          }}
          validationSchema={validationSchemaAddPost}
          onSubmit={handleSubmit}
        >
          {({ handleChange, values, touched, errors }) => (
            <View style={styles.container}>
              <TextInput
                style={[
                  styles.input,
                  {
                    width: scale(250),
                    minHeight: verticalScale(45),
                    maxHeight: verticalScale(67, 5),
                  },
                ]}
                placeholder="Başlık"
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

              <TextInput
                style={[
                  styles.input,
                  {
                    width: scale(250),
                    minHeight: verticalScale(45),
                    maxHeight: verticalScale(200),
                  },
                ]}
                placeholder="Açıklama"
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

              <View style={styles.img_loc}>
                <View style={styles.addImgButton}>
                  <Icon
                    style={styles.icon}
                    name="images-outline"
                    color={Colors.white}
                    size={moderateScale(32)}
                    onPress={imagePickerHandler}
                  />
                </View>
                <View style={styles.addImgButton}>
                  <Icon
                    style={styles.icon}
                    name="location"
                    color={Colors.white}
                    size={moderateScale(32)}
                    onPress={openMapHandler}
                  />
                </View>
              </View>
            </View>
          )}
        </Formik>

        {/* Resimleri önizleme */}
        <ScrollView horizontal contentContainerStyle={styles.imageContainer}>
          {selectedImages.map((image, index) => {
            return (
              <Pressable
                key={index}
                style={styles.imageWrapper}
                onPress={() => openImageViewerHandler(index)}
              >
                <Image
                  source={{ uri: selectedImages[index] }} // URI'yi doğru formatta geçiriyoruz
                  style={styles.imageIcon}
                />
              </Pressable>
            );
          })}
        </ScrollView>

        {/* Görseli tam ekran göster */}
        <ImageViewing
          images={selectedImages.map((uri) => ({ uri }))} // Doğru formatta images prop'u gönderiyoruz
          visible={visible}
          key={selectedImageIndex}
          imageIndex={selectedImageIndex}
          onRequestClose={() => setVisible(false)}
        />
        <Modal
          animationType="slide"
          transparent={true}
          visible={mapVisible}
          onRequestClose={() => setMapVisible(false)}
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
                  <Pressable
                    onPress={() => setMapVisible(false)}
                    style={styles.closeButton}
                  >
                    <Icon
                      name="close"
                      size={24}
                      color={Colors.blue}
                      onPress={closeModal}
                    />
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
        {selectedLocation && (
          <MapView
            style={{
              height: scale(200),
              width: "100%",
            }}
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
        )}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button
          title="Post Ekle"
          onPress={handleSubmit}
          backgroundColor={Colors.blue}
          textColor={Colors.white}
          fontSize={scale(16)}
          height={verticalScale(40)}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  backButton: {
    width: 50,
    height: 50,
    marginLeft: 20,
    marginTop: 40,
    borderColor: Colors.blue,
  },
  ScrollView: {
    flex: 1,
    width: "100%",
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    paddingVertical: verticalScale(20),
  },
  input: {
    borderBottomWidth: scale(2),
    backgroundColor: Colors.inputBackgroundWhite,
    borderColor: Colors.blue,
    borderRadius: scale(3),
    padding: verticalScale(10),
    fontSize: 20,
  },
  icon: {
    padding: 5,
  },
  img_loc: {
    display: "flex",
    flexDirection: "row",
    gap: 30,
    marginBottom: verticalScale(20),
  },
  addImgButton: {
    backgroundColor: Colors.blue,
    borderRadius: 10,
  },
  errorText: {
    color: "red",
    fontSize: 12,
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: scale(5),
    flexDirection: "row",
    paddingHorizontal: scale(10),
    minWidth: "100%",
  },
  imageWrapper: {
    shadowColor: Colors.blue,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    padding: 10,
    elevation: 6,
  },
  imageIcon: {
    width: 100, // Görselin boyutlarını ayarlıyoruz
    height: 100,
    borderRadius: 5,
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
    borderRadius: 20,
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
    borderBottomColor: Colors.blue,
  },
  modalTitle: {
    fontSize: scale(18),
    fontWeight: "bold",
    color: Colors.blue,
  },
  closeButton: {
    padding: scale(4),
  },
  map: {
    flex: 1,
    width: "100%",
  },
  buttonContainer: {
    width: "100%",
    padding: scale(16),
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.blue,
  },
  headerButtons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  selectButton: {
    backgroundColor: Colors.blue,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  selectButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
});
