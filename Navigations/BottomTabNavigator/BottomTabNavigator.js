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
import { View, StyleSheet } from "react-native";
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
        tabBarStyle: styles.tabBar,
      }}
    >
      <Tab.Screen
        name={SCREENS.HomeScreen}
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <View style={styles.iconContainer}>
              <Ionicons
                name="home"
                size={focused ? size + 2 : size}
                color={focused ? Colors.blue : Colors.gray}
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
            <View style={styles.iconContainer}>
              <Ionicons
                name="search"
                size={focused ? size + 2 : size}
                color={focused ? Colors.blue : Colors.gray}
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
              width={verticalScale(45)}
              height={verticalScale(45)}
              borderRadius={moderateScale(100)}
              textColor={Colors.white}
              style={styles.addButton}
              title={<Ionicons name="add" size={verticalScale(22)} />}
            />
          ),
          presentation: "modal",
          tabBarButton: (props) => (
            <View {...props} style={styles.addButtonContainer}>
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
            <View style={styles.iconContainer}>
              <Ionicons
                name="list"
                size={focused ? size + 2 : size}
                color={focused ? Colors.blue : Colors.gray}
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
            <View style={styles.iconContainer}>
              <Ionicons
                name="person"
                size={focused ? size + 2 : size}
                color={focused ? Colors.blue : Colors.gray}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    bottom: 20,
    left: 15,
    right: 15,
    elevation: 0,
    backgroundColor: "#ffffff",
    borderRadius: 20,
    height: scale(60),
    shadowColor: "#000",
    shadowOffset: {
      height: 5,
      width: 0,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    paddingHorizontal: scale(5),
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: moderateScale(5),
  },
  addButtonContainer: {
    alignItems: "center",
  },
  addButton: {
    borderWidth: 0,
    position: "absolute",
    top: verticalScale(-22),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
