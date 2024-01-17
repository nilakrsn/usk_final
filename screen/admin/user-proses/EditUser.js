import React, { useEffect, useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { API_URL } from "../../constantAPI";

const EditUser = ({ navigation, route }) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState(0);
  const [roleUser, setRoleUser] = useState([]);
  const currentTime = new Date();
  const seconds = currentTime.getSeconds();
  const {id} = route.params ;

  const getUserandRole = async () => {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.get(`${API_URL}user-admin-edit/${id}`,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    setRoleUser(response.data.roles);
    setName(response.data.user.name);
    setSelectedRole(response.data.user.roles_id);
  }

  const editUser = async () => {
    const token = await AsyncStorage.getItem("token");
    await axios.put(`${API_URL}user-admin-update/${id}`,{
      name: name,
      password: password,
      roles_id: selectedRole
    },{
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    Alert.alert("Success Edit");
    navigation.navigate("MainAdmin", {editUserCallback: seconds});
    
  }

  useEffect(()=>{
    getUserandRole();
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
            <Text className="font-bold text-lg">Edit User</Text>
          </View>
        </View>
        <View className="p-3">
          <View>
            <Text className="text-md py-2">Name</Text>
            <TextInput
              className={`${textInputStyle}`}
              placeholder="Name"
              value={name}
              onChangeText={(text) => setName(text)}
            />
          </View>
          <View className="mb-2">
            <Text className="text-md py-2">Password</Text>
            <TextInput
              className={`${textInputStyle}`}
              placeholder="Password"
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry
            />
          </View>
          <View className="mb-2">
            <Text className="text-md py-2">Select Role</Text>
            <Picker
              className={`${textInputStyle}`}
              selectedValue={selectedRole}
              onValueChange={(item) => setSelectedRole(item)}
            >
              {roleUser.map((item, index) => (
                <Picker.Item key={index} label={item.name} value={item.id} />
              ))}
            </Picker>
          </View>
          <View>
            <TouchableOpacity
              className="bg-slate-900 p-4 rounded-lg"
              onPress={editUser}
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

export default EditUser;
