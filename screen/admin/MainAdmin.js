import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import HomeAdmin from "./HomeAdmin";
import CategoryAdmin from "./CategoryAdmin";
import HistoryAdmin from "./HistoryAdmin";

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
          tabBarIcon: ({ color}) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="CategoryAdmin"
        component={CategoryAdmin}
        options={{
          tabBarLabel: "Category",
          tabBarIcon: ({ color}) => (
            <MaterialCommunityIcons name="grid" color={color} size={26} />
          ),
          headerShown: false,
        }}
      />
       <Tab.Screen
        name="HistoryAdmin"
        component={HistoryAdmin}
        options={{
          tabBarLabel: "History",
          tabBarIcon: ({ color}) => (
            <MaterialCommunityIcons name="history" color={color} size={26} />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

export default MainAdmin;
