import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginPage from "./screen/auth/LoginPage";
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
import TopUpBank from "./screen/bank/TopUpBank";
import WithDraw from "./screen/user/WithDraw";
import DownloadPage from "./screen/user/DownloadPage";
import MainAdmin from "./screen/admin/MainAdmin";
import CreateCategory from "./screen/kantin/category-proses/CreateCategory";
import EditCategory from "./screen/kantin/category-proses/EditCategory";
import CreateUser from "./screen/admin/user-proses/CreateUser";
import EditUser from "./screen/admin/user-proses/EditUser";
import SignUpPage from "./screen/auth/SignUpPage";

const App = () => {
  

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
            name="SignUpPage"
            component={SignUpPage}
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
          <Stack.Screen
            name="MainAdmin"
            component={MainAdmin}
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
          <Stack.Screen
            name="CreateCategory"
            component={CreateCategory}
            options={{ headerLeft: null, headerShown: false }}
          />
          <Stack.Screen
            name="EditCategory"
            component={EditCategory}
            options={{ headerLeft: null, headerShown: false }}
          />

          {/*BANK*/}
          <Stack.Screen name="TopUpBank" component={TopUpBank} />
          <Stack.Screen name="WithDrawBank" component={WithDrawBank} />
          {/*USER*/}
          <Stack.Screen name="TopUp" component={TopUp} />
          <Stack.Screen name="WithDraw" component={WithDraw} />
          <Stack.Screen name="DownloadPage" component={DownloadPage} />
          
          {/*ADMIN*/}
          <Stack.Screen
            name="CreateUser"
            component={CreateUser}
            options={{ headerLeft: null, headerShown: false }}
          />
          <Stack.Screen
            name="EditUser"
            component={EditUser}
            options={{ headerLeft: null, headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
