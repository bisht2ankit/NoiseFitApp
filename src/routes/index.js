import React from "react";
import { Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { constants } from "../constants/strings";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { colors } from "../constants/colors";
const Tab = createBottomTabNavigator();
import homeIcon from "../assets/home.png";
import profileIcon from "../assets/profile.png";
import inactiveHomeIcon from "../assets/inactiveHome.png";
import  inactiveProfileIcon from "../assets/inactiveProfile.png";
import { styles } from "./styles";

export default Routes = () => {
  const tabBarOptions = {
    activeBackgroundColor: colors.APP_BLACK_THEME,
    inactiveBackgroundColor: colors.APP_BLACK_THEME,
    activeTintColor: "white",
    inactiveTintColor: "white"
  };
  return (
    <NavigationContainer>
      <Tab.Navigator tabBarOptions={tabBarOptions}>
        <Tab.Screen
          name={constants.routes.home}
          component={HomeScreen}
          options={{
            tabBarIcon: ({focused}) => <Image source={focused ? homeIcon : inactiveHomeIcon} style={styles.icon} />,
          }}
        />
        <Tab.Screen
          name={constants.routes.profile}
          component={ProfileScreen}
          options={{
            tabBarIcon: ({focused}) => <Image source={focused ? profileIcon : inactiveProfileIcon} style={styles.icon} />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
