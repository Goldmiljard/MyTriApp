import React, { useCallback } from "react";
import { Button, useColorScheme } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "./context/AuthContext";
import Login from "./screens/Login";
import Home from "./screens/Home";
import Activities from "./screens/Activities";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useFonts } from "expo-font";
import { FontAwesome } from "@expo/vector-icons";
import LogOutBtn from "../components/Generic/LogOutBtn";
import { COLORS, SIZES } from "../constants";
import * as SplashScreen from "expo-splash-screen";

const Stack = createNativeStackNavigator();

SplashScreen.preventAutoHideAsync();

const Layout = () => {
  const { authState, onLogout } = useAuth();
  const isDarkMode = useColorScheme() === "dark";

  const [fontsLoaded, fontError] = useFonts({
    MontserratRegular: require("../assets/fonts/Montserrat-Regular.ttf"),
    MontserratSemi: require("../assets/fonts/Montserrat-SemiBold.ttf"),
    MontserratBold: require("../assets/fonts/Montserrat-Bold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  const BottomNavigation = () => {
    const Tab = createBottomTabNavigator();

    return (
      <Tab.Navigator
        screenOptions={{
          headerShown: true,
          headerStyle: {
            backgroundColor: COLORS.darkGray,
          },
          headerTintColor: COLORS.white,
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitleAlign: "center",
          tabBarStyle: {
            backgroundColor: isDarkMode ? COLORS.darkGray : COLORS.white,
            borderColor: isDarkMode ? COLORS.darkGray : COLORS.white,
            borderTopColor: isDarkMode ? COLORS.darkGray : COLORS.white, //in web borderTopColor would somehow default to white regardless of borderColor being set to black
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: "Home",
            title: "Home",
            headerLeft: () => <LogOutBtn handlePress={onLogout} />,
            tabBarIcon: ({ color }) => (
              <FontAwesome size={SIZES.xxLarge} name="home" color={color} />
            ),
            tabBarActiveTintColor: COLORS.green,
            tabBarInactiveTintColor: COLORS.gray,
          }}
        />
        <Tab.Screen
          name="Activities"
          component={Activities}
          options={{
            tabBarLabel: "Activities",
            title: "Activities",
            tabBarIcon: ({ color }) => (
              <FontAwesome size={SIZES.xLarge} name="refresh" color={color} />
            ),
            tabBarActiveTintColor: COLORS.green,
            tabBarInactiveTintColor: COLORS.gray,
          }}
        />
      </Tab.Navigator>
    );
  };

  return (
    <NavigationContainer onReady={onLayoutRootView}>
      <Stack.Navigator>
        {authState?.authenticated ? (
          <Stack.Screen
            name="Authenticated"
            component={BottomNavigation}
            options={{
              headerShown: false,
              headerRight: () => <Button onPress={onLogout} title="Sign Out" />,
            }}
          ></Stack.Screen>
        ) : (
          <Stack.Screen
            name="Login"
            options={{ headerShown: false }}
            component={Login}
          ></Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Layout;
