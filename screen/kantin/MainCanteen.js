import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import HomeCanteen from "./HomeCanteen";
import ProductCanteen from "./ProductCanteen";
import OrderPage from "./OrderPage";
const MainCanteen = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      activeColor="#365486"
      barStyle={{ backgroundColor: "white" }}
      style={{ borderTopWidth: 1, borderTopColor: "#E2E8F0" }}
    >
      <Tab.Screen
        name="HomeCanteen"
        component={HomeCanteen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color}) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="ProductCanteen"
        component={ProductCanteen}
        options={{
          tabBarLabel: "Cart",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="dresser" color={color} size={26} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="OrderPage"
        component={OrderPage}
        options={{
          tabBarLabel: "Order",
          tabBarIcon: ({ color}) => (
            <MaterialCommunityIcons name="clipboard-text" color={color} size={26} />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default MainCanteen;
