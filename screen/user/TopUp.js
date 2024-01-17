import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { API_URL } from "../constantAPI";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput } from "react-native";
import axios from "axios";

const TopUp = ({ navigation }) => {
  const [creditTopUp, setCreditTopUp] = useState("");

  const handleTopUp = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      await axios.post(`${API_URL}topup`,{
        credit: creditTopUp
        
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCreditTopUp("");
      Alert.alert("Top Up successfully, please wait");
      navigation.navigate("MainUser");
    } catch (e) {
      console.log(e);
    }
  };

  const textInputStyle =
    "tracking-widest border p-3 py-3 text-base border-slate-900 rounded-lg w-full";
  return (
    <SafeAreaView className="p-0 px-3 bg-white w-full h-full">
      <View >
        <View>
          <Text className="text-md py-2">Balance</Text>
          <TextInput
            className={`${textInputStyle}`}
            value={creditTopUp}
            onChangeText={(text) => setCreditTopUp(text)}
            placeholder="Value"
          />
        </View>
        <View className="py-2">
          <TouchableOpacity
            className="bg-slate-900 p-4 rounded-lg"
            onPress={handleTopUp}
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

export default TopUp;
