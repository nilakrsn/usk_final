import React, { useEffect, useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { API_URL } from "../../constantAPI";

const EditCategory = ({ navigation, route }) => {
  const [name, setName] = useState("");
  const [id, setId] = useState(0);
  const { pid } = route.params;
  const { pname } = route.params;

  const editCategory = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      await axios.put(
        `${API_URL}category-admin-update/${id}`,
        {
          name: name,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      Alert.alert("Success edit category");
      navigation.navigate("CategoryAdmin", {
        editCategoryCallback: name,
      });
    } catch (e) {
      console.log;
    }
  };

  useEffect(() => {
    setId(pid);
    setName(pname);
  },[]);

  const textInputStyle =
    "tracking-widest border p-3 py-3 text-base border-slate-900 rounded-lg w-full";

  return (
    <GestureHandlerRootView>
      <SafeAreaView className="bg-white w-full h-full">
        <View className=" w-full p-3 py-4 border-b border-slate-300 flex flex-row  items-center bg-white gap-3 ">
          <View className="flex flex-row items-center">
            <TouchableOpacity onPress={() => navigation.navigate("MainAdmin")}>
              <MaterialCommunityIcons
                name="arrow-left"
                color="black"
                size={26}
              />
            </TouchableOpacity>
          </View>
          <View>
            <Text className="font-bold text-lg">Edit Category</Text>
          </View>
        </View>
        <View className="p-3">
          <View className="mb-2">
            <Text className="text-md py-2">Name</Text>
            <TextInput
              className={`${textInputStyle}`}
              placeholder="Name"
              value={name}
              onChangeText={(text) => setName(text)}
            />
          </View>
          <View>
            <TouchableOpacity
              className="bg-slate-900 p-4 rounded-lg"
              onPress={editCategory}
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

export default EditCategory;
