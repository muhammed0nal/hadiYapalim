import React, { useEffect } from "react";
import { StyleSheet, SafeAreaView, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import * as SplashScreen from "expo-splash-screen";
import axios from "axios";
// Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DrawerNavigator } from "./Navigations/DrawerNavigator/DrawerNavigator";

// Contexts
import { AuthProvider, useAuth } from "./contexts/AuthContext";

// Screens
import SCREENS from "./screens";
import WelcomeScreen from "./screens/WelcomeScreen/WelcomeScreen";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
import ForgotPassword from "./screens/LoginScreen/ForgotPassword/ForgotPassword";
import ForgotPasswordCode from "./screens/LoginScreen/ForgotPassword/ForgotPasswordCode";
import AddPostScreen from "./screens/AddPostScreen/AddPostScreen";
import ActivityDetailsScreen from "./screens/ActivityDetailsScreen/ActivityDetailsScreen";
import { ProfilePhotoProvider } from "./contexts/profilePhotoUrl";
import OtherUsersProfileScreen from "./screens/OtherUsersProfileScreen/OtherUsersProfileScreen";
import SettingsScreen from "./screens/SettingsScreen/SettingsScreen";
import EditProfileScreen from "./screens/SettingsScreen/EditProfileScreen";
import ChangeProfilePhotoScreen from "./screens/SettingsScreen/ChangeProfilePhotoScreen";
import FollowerScreen from "./screens/FollowerScreen/FollowerScreen";
import FollowedScreen from "./screens/FollowedScreen/FollowedScreen";
// Constants
const Stack = createNativeStackNavigator();
const stackScreenOptions = {
  headerShown: false,
  animation: "slide_from_right",
};
const SPLASH_SCREEN_DELAY = 1000;

const App = () => {
  axios.interceptors.request.use((config) => {
    // console.log("🔍 Gönderilen İstek Header'ları:", config.headers);
    return config;
  });

  useEffect(() => {
    const prepareApp = async () => {
      try {
        await Ionicons.loadFont();
        await SplashScreen.preventAutoHideAsync();
        setTimeout(SplashScreen.hideAsync, SPLASH_SCREEN_DELAY);
      } catch (error) {
        console.error("Error loading resources:", error);
      }
    };
    prepareApp();
  }, []);

  return (
    <AuthProvider>
      <ProfilePhotoProvider>
        <StatusBar style="light" />
        <SafeAreaView style={styles.root}>
          <AppLayout />
        </SafeAreaView>
      </ProfilePhotoProvider>
    </AuthProvider>
  );
};

const AppLayout = () => {
  const { authState } = useAuth();
  console.log(authState?.authenticated);
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator screenOptions={stackScreenOptions}>
          {!authState?.authenticated && authState?.authenticated !== null ? (
            <Stack.Screen
              name="UnauthenticatedStack"
              component={UnauthenticatedStack}
            />
          ) : (
            <Stack.Screen
              name="AuthenticatedStack"
              component={AuthenticatedStack}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

const UnauthenticatedStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={SCREENS.WelcomeScreen} component={WelcomeScreen} />
      <Stack.Screen name={SCREENS.LoginScreen} component={LoginScreen} />
      <Stack.Screen name={SCREENS.RegisterScreen} component={RegisterScreen} />
      <Stack.Screen
        name={SCREENS.ForgotPassword}
        component={ForgotPassword}
        options={{ animation: "fade_from_bottom" }}
      />
      <Stack.Screen
        name={SCREENS.ForgotPasswordCode}
        component={ForgotPasswordCode}
      />
    </Stack.Navigator>
  );
};

const AuthenticatedStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={SCREENS.DrawerNavigator}
        component={DrawerNavigator}
      />
      <Stack.Screen
        name={SCREENS.AddPostScreen}
        component={AddPostScreen}
        options={{
          presentation: "modal",
          gestureEnabled: true,
          animation: "slide_from_bottom",
        }}
      />
      <Stack.Screen
        name={SCREENS.ActivityDetailsScreen}
        component={ActivityDetailsScreen}
      />
      <Stack.Screen
        options={{
          gestureEnabled: true,
          animation: "slide_from_right",
        }}
        name={SCREENS.OtherUsersProfileScreen}
        component={OtherUsersProfileScreen}
      />
      <Stack.Screen
        options={{
          gestureEnabled: true,
          animation: "fade_from_bottom",
        }}
        name={SCREENS.SettingsScreen}
        component={SettingsScreen}
      />
      <Stack.Screen
        options={{
          gestureEnabled: true,
          animation: "slide_from_bottom",
        }}
        name={SCREENS.EditProfileScreen}
        component={EditProfileScreen}
      />
      <Stack.Screen
        options={{
          gestureEnabled: true,
          animation: "slide_from_bottom",
        }}
        name={SCREENS.ChangeProfilePhotoScreen}
        component={ChangeProfilePhotoScreen}
      />
      <Stack.Screen
        options={{
          gestureEnabled: true,
          animation: "slide_from_bottom",
        }}
        name={SCREENS.FollowerScreen}
        component={FollowerScreen}
      />
      <Stack.Screen
        options={{
          gestureEnabled: true,
          animation: "slide_from_bottom",
        }}
        name={SCREENS.FollowedScreen}
        component={FollowedScreen}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

export default App;
