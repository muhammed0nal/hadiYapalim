// navigation
import { createDrawerNavigator } from "@react-navigation/drawer";
import { BottomTabNavigator } from "../BottomTabNavigator/BottomTabNavigator";

// screen
import SCREENS from "../../screens/index";
import ProfileScreen from "../../screens/ProfileScreen/ProfileScreen";

//react
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

// const
import { Colors } from "../../constants/Colors";

import { CustomHeader } from "./CustomHeader.js";
import { CustomDrawer } from "./CustomDrawer.js";
const Drawer = createDrawerNavigator();

export const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => {
        const routeName =
          getFocusedRouteNameFromRoute(
            props.state?.routes[props.state.index]
          ) ?? "HomeScreen";
        return <CustomDrawer {...props} activeScreen={routeName} />;
      }}
      screenOptions={({ route }) => ({
        header: () => {
          if (getFocusedRouteNameFromRoute(route) === "ProfileScreen") {
            return <CustomHeader isProfileScreen={true} />;
          } else {
            return <CustomHeader isProfileScreen={false} />;
          }
        },
        headerShown:
          getFocusedRouteNameFromRoute(route) === "SearchScreen" ? false : true,
        sceneContainerStyle: { backgroundColor: Colors.white },
      })}
    >
      <Drawer.Screen
        name={SCREENS.BottomTabNavigator}
        component={BottomTabNavigator}
      />
    </Drawer.Navigator>
  );
};
