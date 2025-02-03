import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//screens
import SCREENS from "../../screens/index.js";
import HomeScreen from "../../screens/HomeScreen/HomeScreen";
import ProfileScreen from "../../screens/ProfileScreen/ProfileScreen";
import SearchScreen from "../../screens/SearchScreen/SearchScreen";
import AddPostScreen from "../../screens/AddPostScreen/AddPostScreen.js";
import MyActivityScreen from "../../screens/MyActivityScreen/MyActivityScreen.js";

//react
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";

// component
import Button from "../../components/UI/Buttons/Button";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

const Tab = createBottomTabNavigator();
export const BottomTabNavigator = ({ route }) => {
  const navigation = useNavigation();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 25,
          left: 20,
          right: 20,
          elevation: 0,
          backgroundColor: "#ffffff",
          borderRadius: 15,
          height: 60,
          shadowColor: Colors.blue,
          shadowOffset: {
            height: 10,
            width: 0,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.5,
          elevation: 5,
        },
      }}
    >
      <Tab.Screen
        name={SCREENS.HomeScreen}
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <View style={{ alignItems: "center" }}>
              <Ionicons
                name="home"
                size={size}
                color={focused ? Colors.blue : Colors.black}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name={SCREENS.SearchScreen}
        component={SearchScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <View style={{ alignItems: "center" }}>
              <Ionicons
                name="search"
                size={size}
                color={focused ? Colors.blue : Colors.black}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name={SCREENS.AddPostScreen}
        component={AddPostScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Button
              onPress={() => navigation.navigate("AddPostScreen")}
              backgroundColor={Colors.blue}
              width={verticalScale(50)}
              height={verticalScale(50)}
              borderRadius={moderateScale(100)}
              textColor={Colors.white}
              style={{
                borderWidth: moderateScale(2),
                borderColor: "#000",
                position: "absolute",
                top: verticalScale(-30),
                marginBottom: verticalScale(40),
                flex: 1,
                alignItems: "center",
              }}
              title={<Ionicons name="add" size={verticalScale(24)} />}
            />
          ),
          presentation: "modal",
          tabBarButton: (props) => (
            <View {...props} style={{ alignItems: "center" }}>
              {props.children}
            </View>
          ),
          animationEnabled: true,
          cardStyleInterpolator: ({ current: { progress } }) => ({
            cardStyle: {
              opacity: progress,
            },
          }),
        }}
      />
      <Tab.Screen
        name={SCREENS.MyActivityScreen}
        component={MyActivityScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <View style={{ alignItems: "center" }}>
              <Ionicons
                name="list"
                size={size}
                color={focused ? Colors.blue : Colors.black}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name={SCREENS.ProfileScreen}
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <View style={{ alignItems: "center" }}>
              <Ionicons
                name="person"
                size={size}
                color={focused ? Colors.blue : Colors.black}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};
