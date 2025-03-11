import { Colors } from "../../constants/Colors";
import { Pressable, Text, View } from "react-native";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import DrawerItemPressable from "./components/DrawerItemPressable";
import SCREENS from "../../screens/index";
import { useAuth } from "../../contexts/AuthContext";
import { verticalScale } from "react-native-size-matters";
import ActiveUserImage from "../../components/ActiveUserComponents/ActiveUserImage";

export const CustomDrawer = (props) => {
  const { navigation, activeScreen } = props;
  const { onLogout } = useAuth();
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        style={{
          backgroundColor: Colors.inputBackgroundWhite,
        }}
      >
        <Pressable
          style={({ pressed }) =>
            pressed
              ? { opacity: 0.5, alignItems: "center", paddingTop: 20 }
              : { alignItems: "center", paddingTop: 20 }
          }
          onPress={() => navigation.navigate("ProfileScreen")}
        >
          <ActiveUserImage
            style={{
              width: verticalScale(105),
              height: verticalScale(105),
              borderRadius: verticalScale(55),
              resizeMode: "cover",
              borderWidth: 1,
              borderColor: Colors.blue,
            }}
          />
          <Text style={{ marginTop: 20, fontSize: 18, fontWeight: "bold" }}>
            Muhammed Onal
          </Text>
        </Pressable>
        <DrawerItemPressable
          iconName="home"
          iconColor={
            activeScreen === SCREENS.HomeScreen ? Colors.white : Colors.blue
          }
          onPress={() => navigation.navigate(SCREENS.HomeScreen)}
          iconSize={24}
          text="Ana Sayfa"
          textColor={
            activeScreen === SCREENS.HomeScreen ? Colors.white : Colors.blue
          }
          backgroundColor={
            activeScreen === SCREENS.HomeScreen
              ? Colors.blue
              : Colors.inputBackgroundWhite
          }
        />
        <DrawerItemPressable
          iconName="person"
          iconColor={
            activeScreen === SCREENS.ProfileScreen ? Colors.white : Colors.blue
          }
          onPress={() => navigation.navigate(SCREENS.ProfileScreen)}
          iconSize={24}
          text="Profil"
          textColor={
            activeScreen === SCREENS.ProfileScreen ? Colors.white : Colors.blue
          }
          backgroundColor={
            activeScreen === SCREENS.ProfileScreen
              ? Colors.blue
              : Colors.inputBackgroundWhite
          }
        />
        <DrawerItemPressable
          iconName="settings"
          iconColor={Colors.blue}
          onPress={() => {
            navigation.navigate(SCREENS.SettingsScreen);
            navigation.closeDrawer();
          }}
          iconSize={24}
          text="Ayarlar"
          textColor={Colors.blue}
          backgroundColor={Colors.inputBackgroundWhite}
        />
      </DrawerContentScrollView>
      <Pressable
        onPress={onLogout}
        pressColor="red"
        style={({ pressed }) =>
          pressed
            ? {
                flexDirection: "row",
                alignItems: "center",
                marginTop: 15,
                borderRadius: 5,
                marginLeft: 20,
                marginRight: 20,
                marginBottom: 10,
                width: 120,
                position: "absolute",
                bottom: verticalScale(10),
                alignSelf: "center",
                backgroundColor: Colors.red,
              }
            : {
                flexDirection: "row",
                alignItems: "center",
                marginTop: 15,
                borderRadius: 5,
                marginLeft: 20,
                marginRight: 20,
                marginBottom: 10,
                width: 120,
                position: "absolute",
                bottom: verticalScale(10),
                alignSelf: "center",
                backgroundColor: Colors.red,
              }
        }
      >
        <Ionicons
          name="exit"
          color={Colors.inputBackgroundWhite}
          size={24}
          style={{ padding: 10 }}
        />
        <Text style={{ color: Colors.inputBackgroundWhite, fontSize: 14 }}>
          Çıkış Yap
        </Text>
      </Pressable>
    </View>
  );
};
