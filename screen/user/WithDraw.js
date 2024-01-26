import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_URL } from "../constantAPI";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  Alert,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

const WithDraw = ({ navigation }) => {
  const [withDraw, setWithDraw] = useState("");

  const handleWithDraw = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      await axios.post(
        `${API_URL}withdraw`,
        {
          debit: withDraw,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Alert.alert("Withdraw Success");
      navigation.navigate("MainUser");
    } catch (e) {
      console.log(e);
    }
  };

  const textInputStyle =
    "tracking-widest border p-3 py-3 text-base border-slate-900 rounded-lg w-full";
  return (
    <GestureHandlerRootView>
      <SafeAreaView className="bg-white w-full h-full">
        <View className="p-3">
          <View>
            <Text className="text-md py-2">Balance</Text>
            <TextInput
              className={`${textInputStyle}`}
              placeholder="Value"
              value={withDraw}
              onChangeText={(text) => setWithDraw(text)}
            />
          </View>

          <View className="mt-3">
            <TouchableOpacity
              className="bg-stone-700 p-4 rounded-lg"
              onPress={handleWithDraw}
            >
              <Text className="text-base text-white font-bold text-center">
                Continue
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default WithDraw;
