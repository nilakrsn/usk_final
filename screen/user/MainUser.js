import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeUser from "./HomeUser";
import CartPage from "./CartPage";
import ProfilePage from "./ProfilePage";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
function MainUser() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      activeColor="#365486"
      barStyle={{ backgroundColor: "white" }}
      style={{ borderTopWidth: 1, borderTopColor: "#E2E8F0" }}
    >
      <Tab.Screen
        name="HomeUser"
        component={HomeUser}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color}) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="CartPage"
        component={CartPage}
        options={{
          tabBarLabel: "Cart",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="cart" color={color} size={26} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="ProfilePage"
        component={ProfilePage}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color}) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};


export default MainUser;
