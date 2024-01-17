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
import WithDraw from "./screen/bank/WithDraw";
import TopUp from "./screen/user/TopUp";
import CreateUser from "./screen/admin/user-proses/CreateUser";
import EditUser from "./screen/admin/user-proses/EditUser";
import EditCategory from "./screen/admin/category-proses/EditCategory";
import CreateCategory from "./screen/admin/category-proses/CreateCategory";

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

  React.useEffect(() => {
    checkAuth();
  }, []);

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
          <Stack.Screen name="WithDraw" component={WithDraw} />

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
