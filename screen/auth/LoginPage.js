import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { API_URL } from "../constantAPI";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput } from "react-native";
import axios from "axios";

const LoginPage = ({ navigation }) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const saveTokens = async (token, role) => {
    try {
      await AsyncStorage.setItem("token", token);
      await AsyncStorage.setItem("role", role);
      await AsyncStorage.setItem("name", name);
    } catch (e) {
      console.log(e);
    }
  };
  const loginUser = async () => {
    try {
      const response = await axios.post(`${API_URL}login`, {
        name: name,
        password: password,
      });
      console.log(response.data);
      const token = response.data.token;
      const role = response.data.message;
      await saveTokens(token, role, name);
      setName("");
      setPassword("");
      navigateToHome(role);
    } catch (e) {
      console.log(e);
    }
  };

  const navigateToHome = async (role) => {
    switch (role) {
      case "bank":
        navigation.navigate("MainBank");
        break;
      case "kantin":
        navigation.navigate("MainCanteen");
        break;
      case "admin":
        navigation.navigate("MainAdmin");
        break;
      default:
        navigation.navigate("MainUser");
        break;
    }
  };

  const textInputStyle =
    "tracking-widest border p-3 py-3 text-base border-slate-900 rounded-lg w-full";
  return (
    <SafeAreaView>
      <View className="p-3 bg-white w-full h-full">
        <View>
          <Text className="text-2xl text-slate-900 font-bold py-3">Login</Text>
        </View>
        <View>
          <Text className="text-md py-2">Name</Text>
          <TextInput
            className={`${textInputStyle}`}
            value={name}
            onChangeText={(text) => setName(text)}
            placeholder="Username"
          />
        </View>
        <View>
          <Text className="text-md py-2">Password</Text>
          <TextInput
            className={`${textInputStyle}`}
            value={password}
            onChangeText={(text) => setPassword(text)}
            placeholder="Password"
            secureTextEntry
          />
        </View>
        <View className="flex flex-row py-3 gap-2 ">
          <View>
            <Text className="text-base">Don't have an account?</Text>
          </View>
          <View>
            <TouchableOpacity onPress={() => navigation.navigate("SignUpPage")}>
              <Text className="font-bold text-cyan-500 text-base">SignUp</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className="py-2">
          <TouchableOpacity
            className="bg-cyan-500 p-4 rounded-lg"
            onPress={loginUser}
          >
            <Text className="text-base text-white font-bold text-center">
              Continue
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginPage;
