import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { scale, verticalScale } from "react-native-size-matters";
import { Colors } from "../../constants/Colors";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import ActiveUserImage from "../../components/ActiveUserComponents/ActiveUserImage";
import * as ImagePicker from "expo-image-picker";
import { useUserImage } from "../../contexts/profilePhotoUrl";
import axios from "axios";
import { ip } from "../../ip/ip";
import { useAuth } from "../../contexts/AuthContext";
export default function ChangeProfilePhotoScreen() {
  const navigation = useNavigation();
  const [selectedImages, setSelectedImages] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);
  const [temporaryPhotoUrl, setTemporaryPhotoUrl] = useState(true);
  const { profilePhotoUrl, setProfilePhotoUrl } = useUserImage();
  const { authState } = useAuth();

  const handleTakePhoto = () => {
    // Handle taking photo logic
  };

  const handleChooseFromGallery = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      alert("Erişim İzni Verilmedi");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: true,
      aspect: [16, 9],
      selectionLimit: 1,
    });
    if (result.canceled) {
      setIsDisabled(true);
    }

    if (!result.canceled) {
      const imageUris = result.assets.map((asset) => asset.uri);
      setSelectedImages(imageUris);
      setIsDisabled(false);
    }
  };

  const handleRemovePhoto = () => {
    setTemporaryPhotoUrl(null);
    setSelectedImages([]);
    setIsDisabled(true);
  };

  const submitPhotoChange = async () => {
    const formData = new FormData();
    formData.append("profileImage", {
      uri: selectedImages[0],
      type: "image/jpeg",
      name: "profile.jpg",
    });
    try {
      if (selectedImages.length > 0) {
        const response = await axios.post(
          `${ip}/profile/change-profile-photo`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${authState.token}`,
              "Content-Type": "multipart/form-data", // Form-data ile dosya gönderiyoruz
            },
          }
        );
        setProfilePhotoUrl(response.data.profilePhotoUrl);
        navigation.navigate("ProfileScreen");
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(selectedImages);
  const ChangedImage = () => {
    if (selectedImages.length > 0) {
      return (
        <Image
          source={{ uri: selectedImages[0] }}
          style={styles.profilePhoto}
        />
      );
    }
    if (temporaryPhotoUrl === null) {
      return <Text>Fotoğraf Yok</Text>;
    }
    return <ActiveUserImage style={styles.profilePhoto} />;
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
        <Text style={styles.headerText}>Profil Fotoğrafı</Text>
        <Pressable disabled={isDisabled} onPress={submitPhotoChange}>
          <Text
            style={[styles.headerText, { color: isDisabled ? "#999" : "#000" }]}
          >
            Kaydet
          </Text>
        </Pressable>
      </View>

      {/* Current Photo Section */}
      <View style={styles.sectionContainer}>
        <View style={styles.photoContainer}>
          <ChangedImage />
        </View>
      </View>

      {/* Photo Options Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Fotoğraf Seçenekleri</Text>
        <View style={styles.optionsGroup}>
          <Pressable style={styles.optionItem} onPress={handleTakePhoto}>
            <View style={styles.optionContent}>
              <Ionicons
                name="camera-outline"
                size={scale(24)}
                color={Colors.blue}
              />
              <Text style={styles.optionText}>Fotoğraf Çek</Text>
            </View>
            <Ionicons name="chevron-forward" size={scale(20)} color="#999" />
          </Pressable>

          <Pressable
            style={styles.optionItem}
            onPress={handleChooseFromGallery}
          >
            <View style={styles.optionContent}>
              <MaterialIcons
                name="photo-library"
                size={scale(24)}
                color={Colors.blue}
              />
              <Text style={styles.optionText}>Galeriden Seç</Text>
            </View>
            <Ionicons name="chevron-forward" size={scale(20)} color="#999" />
          </Pressable>

          <Pressable
            style={[styles.optionItem, styles.removeOption]}
            onPress={handleRemovePhoto}
          >
            <View style={styles.optionContent}>
              <Ionicons
                name="trash-outline"
                size={scale(24)}
                color={Colors.red}
              />
              <Text style={[styles.optionText, styles.removeText]}>
                Fotoğrafı Kaldır
              </Text>
            </View>
          </Pressable>
        </View>
      </View>

      {/* Info Section */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          Önerilen fotoğraf boyutu: 400x400 piksel
        </Text>
        <Text style={styles.infoText}>Maksimum dosya boyutu: 5MB</Text>
      </View>
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
  photoContainer: {
    alignItems: "center",
    padding: scale(20),
  },
  profilePhoto: {
    width: scale(150),
    height: scale(150),
    borderRadius: scale(75),
    marginBottom: verticalScale(12),
  },
  photoText: {
    fontSize: scale(14),
    color: "#666",
    marginTop: verticalScale(8),
  },
  sectionTitle: {
    fontSize: scale(14),
    fontWeight: "600",
    color: "#333",
    padding: scale(12),
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  optionsGroup: {
    paddingVertical: verticalScale(4),
  },
  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(12),
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  optionContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(12),
  },
  optionText: {
    fontSize: scale(14),
    color: "#333",
    fontWeight: "500",
  },
  removeOption: {
    borderBottomWidth: 0,
  },
  removeText: {
    color: Colors.red,
  },
  infoContainer: {
    padding: scale(16),
    alignItems: "center",
  },
  infoText: {
    fontSize: scale(12),
    color: "#666",
    marginBottom: verticalScale(4),
  },
});
