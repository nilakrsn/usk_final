import axios from "axios";
import React, { useState } from "react";
import { Text, TextInput, View, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { API_URL } from "../constantAPI";

const SignUpPage = ({ navigation }) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const SignUp = async () => {
    if (password === confirmPassword) {
      await axios.post(`${API_URL}register`, {
        name: name,
        password: password,
      });
      Alert.alert("Success Register");
      navigation.navigate("Login");
    }else{
      Alert.alert("Failed Register");
      navigation.navigate("SignUp");
    }
  };

  const textInputStyle =
    "tracking-widest border p-3 py-3 text-base border-slate-900 rounded-lg w-full";

  return (
    <SafeAreaView className="bg-white">
      <View className="p-3">
        <View>
          <Text className="text-2xl text-slate-900 font-bold py-3">SignUp</Text>
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
        <View>
          <Text className="text-md py-2">Confirm Password</Text>
          <TextInput
            className={`${textInputStyle}`}
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
            placeholder="Confirm Password"
            secureTextEntry
          />
        </View>
        <View className="flex flex-row py-3 gap-2 ">
          <View>
            <Text className="text-base">Have an account?</Text>
          </View>
          <View>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text className="font-bold text-cyan-500 text-base">Login</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className="py-2">
          <TouchableOpacity
            className="bg-cyan-500 p-4 rounded-lg"
            onPress={SignUp}
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

export default SignUpPage;
