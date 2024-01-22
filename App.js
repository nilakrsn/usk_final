import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginPage from "./screen/auth/LoginPage";
import SignInPage from "./screen/auth/SignInPage";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PaperProvider } from "react-native-paper";
import MainUser from "./screen/user/MainUser";
import MainAdmin from "./screen/admin/MainAdmin";
import MainCanteen from "./screen/kantin/MainCanteen";
import MainBank from "./screen/bank/MainBank";
import EditProduct from "./screen/kantin/EditProduct";
import CreateProduct from "./screen/kantin/CreateProduct";

import TopUp from "./screen/user/TopUp";
import CreateUser from "./screen/admin/user-proses/CreateUser";
import EditUser from "./screen/admin/user-proses/EditUser";
import EditCategory from "./screen/admin/category-proses/EditCategory";
import CreateCategory from "./screen/admin/category-proses/CreateCategory";
import WithDrawBank from "./screen/bank/WithDrawBank";

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
            name="MainAdmin"
            component={MainAdmin}
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
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
