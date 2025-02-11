import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useEffect, useState } from "react";

import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import { ip } from "../../ip/ip";
import axios from "axios";
import { Colors } from "../../constants/Colors";
import { etkinlik } from "../../data/user";
import { useAuth } from "../../contexts/AuthContext";
import ActiveUserImage from "../../components/ActiveUserComponents/ActiveUserImage";

export default function ProfileScreen({ navigation }) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { onLogout } = useAuth();

  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true);

      try {
        const response = await axios.get(`${ip}/profile/getProfile`);
        setUserData(response.data);
        // profile photo
      } catch (err) {
        console.log(err + " ---- " + err.response.data.msg);
        if (err.response.data.msg === "token") {
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

    fetchUserProfile();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.blue} />
      </View>
    );
  }

  return (
    <View>
      {userData ? (
        <>
          <View style={styles.profileInfo}>
            <View style={styles.imgContainer}>
              <ActiveUserImage style={styles.image} />
            </View>
            <View style={styles.profileNumbers}>
              <Pressable
                onPress={() => {}}
                style={({ pressed }) =>
                  pressed
                    ? [styles.pressableButton, styles.pressed]
                    : [styles.pressableButton]
                }
              >
                <Text style={styles.textNumbers}>Aktiviteler</Text>
                <Text style={styles.textNumbers}>{30}</Text>
              </Pressable>
              <Pressable
                onPress={() => {}}
                style={({ pressed }) =>
                  pressed
                    ? [styles.pressableButton, styles.pressed]
                    : [styles.pressableButton]
                }
              >
                <Text style={styles.textNumbers}>Takipçi</Text>
                <Text style={styles.textNumbers}>{30}</Text>
              </Pressable>
              <Pressable
                onPress={() => {}}
                style={({ pressed }) =>
                  pressed
                    ? [styles.pressableButton, styles.pressed]
                    : [styles.pressableButton]
                }
              >
                <Text style={styles.textNumbers}>Takipler</Text>
                <Text style={styles.textNumbers}>{30}</Text>
              </Pressable>
            </View>
          </View>
          <FlatList
            style={{ marginTop: verticalScale(20) }}
            data={etkinlik}
            keyExtractor={(item) => item.id} // her bir öğenin benzersiz bir anahtarı
            renderItem={({ item }) => (
              <View>
                <Text>{item.title}</Text>
                <Text>{item.content}</Text>
              </View>
            )}
          />
        </>
      ) : (
        <Text>User Data Not Found</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: moderateScale(70), // Yatay ölçeklendirme
    height: moderateScale(70), // Dikey ölçeklendirme
    borderRadius: moderateScale(40), // Yuvarlak yapmak için yarısı kadar olmalı
    resizeMode: "contain",
  },
  profileInfo: {
    display: "flex",
    gap: scale(25),
    height: moderateScale(100),
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: verticalScale(4),
    },
    shadowOpacity: 0.32,
    shadowRadius: scale(5.46),
    elevation: 9,
    marginHorizontal: scale(5),
    marginTop: verticalScale(10),
    borderRadius: scale(5),
    paddingTop: verticalScale(20),
    paddingBottom: verticalScale(20),
    paddingLeft: scale(15),
    paddingRight: scale(10),
    marginHorizontal: scale(8),
  },
  imgContainer: {
    gap: scale(25),
    alignItems: "flex-start",
    flex: 0,
  },
  profileNumbers: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    gap: scale(30),
    flex: 1,
    marginRight: scale(10),
  },
  pressableButton: {
    display: "flex",
    alignItems: "center",
    gap: verticalScale(5),
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(10),
  },
  pressed: {
    opacity: 0.9,
    borderRadius: scale(5),
    backgroundColor: Colors.inputBackgroundWhite,
  },
  textNumbers: {
    color: Colors.blue,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
