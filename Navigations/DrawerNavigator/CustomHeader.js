import { useNavigation } from "@react-navigation/native";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "../../components/UI/Icons/Icon";
import { ImageConst } from "../../constants/ImageConst";
import { StatusBar } from "expo-status-bar";
import { useAuth } from "../../contexts/AuthContext";
import { Colors } from "../../constants/Colors";

export const CustomHeader = ({ isProfileScreen }) => {
  const navigation = useNavigation();
  const { authState } = useAuth();

  return (
    <SafeAreaView>
      <StatusBar style="dark" />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 10,
          height: 100,
          backgroundColor: "#fff",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.2,
          shadowRadius: 1.41,
          elevation: 0.4,
          position: "relative",
        }}
      >
        <Icon
          stylePressable={{ flex: 1, alignSelf: "flex-start", marginTop: 20 }}
          color="#0000FF"
          name="menu"
          style={{ marginLeft: 10 }}
          size={28}
          onPress={navigation.openDrawer}
        />

        <View
          style={{
            flex: 2,
            alignItems: "center",
          }}
        >
          {isProfileScreen ? (
            <Text
              style={{
                fontSize: 20,
                borderBottomColor: Colors.blue,
                borderBottomWidth: 3,
              }}
            >
              {authState.username}
            </Text>
          ) : (
            <Image
              style={{ width: 160, height: 160 }} // Logo boyutlarını ihtiyaca göre ayarlayın
              source={ImageConst.logo}
            />
          )}
        </View>
        <View style={{ flex: 1 }}>
          <Text>mdsdanfjnfjasnf</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};
