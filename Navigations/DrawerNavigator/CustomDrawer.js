import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "../../constants/Colors";
import { Image, Pressable, Text } from "react-native";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { ImageConst } from "../../constants/ImageConst";
import DrawerItemPressable from "./components/DrawerItemPressable";
import SCREENS from "../../screens/index";
import { useAuth } from "../../contexts/AuthContext";

export const CustomDrawer = (props) => {
  const { navigation, activeScreen } = props;
  const { bottom } = useSafeAreaInsets();
  const { onLogout } = useAuth();
  return (
    <>
      <DrawerContentScrollView
        {...props}
        style={{ backgroundColor: Colors.inputBackgroundWhite }}
      >
        <Pressable
          style={({ pressed }) =>
            pressed
              ? { opacity: 0.5, alignItems: "center", paddingTop: 20 }
              : { alignItems: "center", paddingTop: 20 }
          }
          onPress={() => navigation.navigate("ProfileScreen")}
        >
          <Image source={ImageConst.user} style={{ width: 80, height: 80 }} />
          <Text style={{ marginTop: 20 }}>Muhammed Onal</Text>
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
          b
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
          b
          backgroundColor={
            activeScreen === SCREENS.ProfileScreen
              ? Colors.blue
              : Colors.inputBackgroundWhite
          }
        />
        <DrawerItemPressable
          iconName="settings"
          iconColor={
            activeScreen === SCREENS.ProfileScreen ? Colors.white : Colors.blue
          }
          onPress={() => navigation.navigate(SCREENS.ProfileScreen)}
          iconSize={24}
          text="Ayarlar"
          textColor={
            activeScreen === SCREENS.ProfileScreen ? Colors.white : Colors.blue
          }
          b
          backgroundColor={
            activeScreen === SCREENS.ProfileScreen
              ? Colors.blue
              : Colors.inputBackgroundWhite
          }
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
                marginBottom: bottom + 10,
                opacity: 0.6,
                width: 120,
              }
            : {
                flexDirection: "row",
                alignItems: "center",
                marginTop: 15,
                borderRadius: 5,
                marginLeft: 20,
                marginRight: 20,
                marginBottom: bottom + 10,
                width: 120,
              }
        }
        label={"Ana Ekran"}
        labelStyle={{ color: "red" }}
        contentContainerStyle={{ alignItems: "flex-start", paddingLeft: 0 }}
      >
        <Ionicons name="exit" color="red" size={24} style={{ padding: 10 }} />
        <Text style={{ color: "red", fontSize: 14 }}>Çıkış Yap</Text>
      </Pressable>
    </>
  );
};
