import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { scale, verticalScale } from "react-native-size-matters";
import { Colors } from "../../constants/Colors";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import { ip } from "../../ip/ip";

export default function EditProfileScreen() {
  const { userId } = useAuth().authState;
  const [userData, setUserData] = useState({});
  const [isChanged, setIsChanged] = useState(false);
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    surname: "",
    username: "",
    email: "",
    bio: "",
    phone: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${ip}/profile/getProfile`);
        setUserData({
          id: response.data.id,
          name: response.data.name,
          surname: response.data.surname,
          username: response.data.username,
          email: response.data.email,
          phone: response.data.telNo,
          bio: response.data.bio,
        });
        setFormData({
          id: response.data.id,
          name: response.data.name,
          surname: response.data.surname,
          username: response.data.username,
          email: response.data.email,
          phone: response.data.telNo,
          bio: response.data.bio,
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, [userId]);

  useEffect(() => {
    if (JSON.stringify(formData) !== JSON.stringify(userData)) {
      setIsChanged(true);
    } else {
      setIsChanged(false);
    }
  }, [formData, userData]);

  const handleSave = async () => {
    // Handle save logic here
    try {
      const response = await axios.post(
        `${ip}/profile/updateProfile/${formData.id}`,
        formData
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    navigation.goBack();
  };

  const handleChange = (text, key) => {
    setFormData({ ...formData, [key]: text });
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
        <Text style={styles.headerText}>Profili Düzenle</Text>
        <Pressable
          onPress={handleSave}
          disabled={!isChanged}
          style={{ opacity: !isChanged ? 0.4 : 1 }}
        >
          <Text style={styles.saveButton}>Kaydet</Text>
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Photo Section */}
        {/* <View style={styles.sectionContainer}>
          <View style={styles.photoContainer}>
            <Image
              source={{ uri: "https://randomuser.me/api/portraits/men/32.jpg" }}
              style={styles.profilePhoto}
            />
            <Pressable style={styles.changePhotoButton}>
              <FontAwesome name="camera" size={scale(16)} color={Colors.blue} />
              <Text style={styles.changePhotoText}>Fotoğrafı Değiştir</Text>
            </Pressable>
          </View>
        </View> */}

        {/* Basic Info Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Bilgiler</Text>
          <View style={styles.formGroup}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Ad</Text>
              <TextInput
                style={styles.input}
                value={formData.name}
                onChangeText={(text) => handleChange(text, "name")}
                placeholder="Ad"
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Soyad</Text>
              <TextInput
                style={styles.input}
                value={formData.surname}
                onChangeText={(text) => handleChange(text, "surname")}
                placeholder="Soyad"
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Kullanıcı Adı</Text>
              <TextInput
                style={styles.input}
                value={formData.username}
                onChangeText={(text) => handleChange(text, "username")}
                placeholder="Kullanıcı Adı"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>E-posta</Text>
              <TextInput
                style={styles.input}
                value={formData.email}
                onChangeText={(text) => handleChange(text, "email")}
                placeholder="E-posta"
                keyboardType="email-address"
              />
            </View>
          </View>
        </View>

        {/* Additional Info Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Ek Bilgiler</Text>
          <View style={styles.formGroup}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Hakkımda</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={formData.bio}
                onChangeText={(text) => handleChange(text, "bio")}
                placeholder="Kendinizden bahsedin"
                multiline
                numberOfLines={4}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Telefon</Text>
              <TextInput
                style={styles.input}
                value={formData.phone}
                onChangeText={(text) => handleChange(text, "phone")}
                placeholder="Telefon Numarası"
                keyboardType="phone-pad"
              />
            </View>
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
  },
  saveButton: {
    color: Colors.blue,
    fontSize: scale(16),
    fontWeight: "600",
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
  // photoContainer: {
  //   alignItems: "center",
  //   padding: scale(20),
  // },
  // profilePhoto: {
  //   width: scale(100),
  //   height: scale(100),
  //   borderRadius: scale(50),
  //   marginBottom: verticalScale(12),
  // },
  // changePhotoButton: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   gap: scale(8),
  //   padding: scale(8),
  // },
  // changePhotoText: {
  //   color: Colors.blue,
  //   fontSize: scale(14),
  //   fontWeight: "500",
  // },
  sectionTitle: {
    fontSize: scale(14),
    fontWeight: "600",
    color: "#333",
    padding: scale(12),
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  formGroup: {
    padding: scale(12),
  },
  inputContainer: {
    marginBottom: verticalScale(16),
  },
  label: {
    fontSize: scale(12),
    color: "#666",
    marginBottom: verticalScale(4),
  },
  input: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: scale(8),
    padding: scale(10),
    fontSize: scale(14),
    color: "#333",
    backgroundColor: "#fff",
  },
  textArea: {
    height: verticalScale(100),
    textAlignVertical: "top",
  },
});
