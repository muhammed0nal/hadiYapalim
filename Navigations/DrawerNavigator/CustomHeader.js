import { useNavigation } from "@react-navigation/native";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "../../components/UI/Icons/Icon";
import { ImageConst } from "../../constants/ImageConst";
import { StatusBar } from "expo-status-bar";
import { useAuth } from "../../contexts/AuthContext";
import { Colors } from "../../constants/Colors";
import { scale, verticalScale } from "react-native-size-matters";

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
          paddingTop: verticalScale(20),
          padding: verticalScale(10),
          height: verticalScale(80),
          backgroundColor: "#fff",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 4,
          },
          position: "relative",
        }}
      >
        <Icon
          stylePressable={{
            flex: 1,
            alignSelf: "flex-start",
            marginTop: verticalScale(20),
          }}
          color="#0000FF"
          name="menu"
          style={{ marginLeft: 10 }}
          size={verticalScale(24)}
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
                fontSize: verticalScale(16),
                borderBottomColor: Colors.blue,
                borderBottomWidth: 3,
              }}
            >
              {authState.username}
            </Text>
          ) : (
            <Image
              style={{ width: verticalScale(80), height: verticalScale(80) }} // Logo boyutlarını ihtiyaca göre ayarlayın
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
