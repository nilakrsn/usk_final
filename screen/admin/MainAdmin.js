import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import HomeAdmin from "./HomeAdmin";
import HistoryTrasanction from "./HistoryTransaction";
import UserAdmin from "./UserAdmin";
import HistoryTopUp from "./HistoryTopUp";

const MainAdmin = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      activeColor="#365486"
      barStyle={{ backgroundColor: "white" }}
      style={{ borderTopWidth: 1, borderTopColor: "#E2E8F0" }}
    >
      <Tab.Screen
        name="HomeAdmin"
        component={HomeAdmin}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="UserAdmin"
        component={UserAdmin}
        options={{
          tabBarLabel: "User",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="HistoryTransaction"
        component={HistoryTrasanction}
        options={{
          tabBarLabel: "Transaction",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="history" color={color} size={26} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="HistoryTopUp"
        component={HistoryTopUp}
        options={{
          tabBarLabel: "TopUp",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="wallet" color={color} size={26} />
          ),
          headerShown: false,
        }}
      />
      
    </Tab.Navigator>
  );
};

export default MainAdmin;
