import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import HomeBank from "./HomeBank";
import TopUpList from "./TopUpList";
const MainBank = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      activeColor="#365486"
      barStyle={{ backgroundColor: "white" }}
      style={{ borderTopWidth: 1, borderTopColor: "#E2E8F0" }}
    >
      <Tab.Screen
        name="HomeBank"
        component={HomeBank}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color}) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="TopUpList"
        component={TopUpList}
        options={{
          tabBarLabel: "Top Up",
          tabBarIcon: ({ color}) => (
            <MaterialCommunityIcons name="card-plus" color={color} size={26} />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

export default MainBank;
