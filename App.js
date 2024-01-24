import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginPage from "./screen/auth/LoginPage";
import SignInPage from "./screen/auth/SignInPage";
import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PaperProvider } from "react-native-paper";
import MainUser from "./screen/user/MainUser";

import MainCanteen from "./screen/kantin/MainCanteen";
import MainBank from "./screen/bank/MainBank";
import EditProduct from "./screen/kantin/EditProduct";
import CreateProduct from "./screen/kantin/CreateProduct";

import TopUp from "./screen/user/TopUp";

import WithDrawBank from "./screen/bank/WithDrawBank";
import axios from "axios";
import { API_URL } from "./screen/constantAPI";

const App = () => {
  
  const Stack = createNativeStackNavigator();
  const navigationRef = React.useRef();

  const checkAuth = async () => {
    const token = await AsyncStorage.getItem("token");
    const role = await AsyncStorage.getItem("role");
    if (token && role !== null) {
      switch (role) {
        case "admin":
          navigationRef.current?.navigate("MainAdmin");
          break;
        case "bank":
          navigationRef.current?.navigate("MainBank");
          break;
        case "kantin":
          navigationRef.current?.navigate("MainCanteen");
          break;
        default:
          navigationRef.current?.navigate("MainUser");
          break;
      }
    }
  };

  React.useEffect(()=>{
    checkAuth();
  },[]);

  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
          {/*AUTH*/}
          <Stack.Screen
            name="Login"
            component={LoginPage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignIn"
            component={SignInPage}
            options={{ headerShown: false }}
          />

          {/*MAIN SCREEN */}
          <Stack.Screen
            name="MainUser"
            component={MainUser}
            options={{ headerLeft: null, headerShown: false }}
          />
          <Stack.Screen
            name="MainCanteen"
            component={MainCanteen}
            options={{ headerLeft: null, headerShown: false }}
          />
          <Stack.Screen
            name="MainBank"
            component={MainBank}
            options={{ headerLeft: null, headerShown: false }}
          />

          {/*CANTEEN*/}
          <Stack.Screen
            name="EditProduct"
            component={EditProduct}
            options={{ headerLeft: null, headerShown: false }}
          />
          <Stack.Screen
            name="CreateProduct"
            component={CreateProduct}
            options={{ headerLeft: null, headerShown: false }}
          />

          {/*BANK*/}
         
          <Stack.Screen name="WithDrawBank" component={WithDrawBank} />

          {/*USER*/}
          <Stack.Screen name="TopUp" component={TopUp} />
          
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
