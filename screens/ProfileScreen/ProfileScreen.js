import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useEffect, useState } from "react";

import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import { ip } from "../../ip/ip";
import axios from "axios";
import { ImageConst } from "../../constants/ImageConst";
import { Colors } from "../../constants/Colors";
import { etkinlik } from "../../data/user";

export default function ProfileScreen() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`${ip}/profile/getProfile`);
        setUserData(response.data); // Gelen veriyi kaydet
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserProfile();
  }, []);

  return (
    <View>
      {userData ? (
        <>
          <View style={styles.profileInfo}>
            <View style={styles.imgContainer}>
              <Image source={ImageConst.user} style={styles.image} />
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
    width: scale(40),
    height: verticalScale(50),
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
    paddingLeft: scale(30),
    paddingRight: scale(10),
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
});
