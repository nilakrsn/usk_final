import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native";
import {
  GestureHandlerRootView,
  RefreshControl,
} from "react-native-gesture-handler";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { API_URL } from "../constantAPI";

const UserAdmin = ({ navigation, route }) => {
  const [dataUser, setDatauser] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const { createUserCallBack, editUserCallBack } = route.params || {};

  const getDataUser = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get(`${API_URL}getsiswa`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setDatauser(response.data);
    } catch (e) {
      console.log(e);
    }
  };
  const deleteUser = async (id) => {
    const token = await AsyncStorage.getItem("token");
    await axios.delete(`${API_URL}user-admin-delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    getDataUser();
    Alert.alert("Success delete");
  };

  const onRefresh = () => {
    setRefresh(true);
    getDataUser();
    setTimeout(() => {
      setRefresh(false);
    }, 2000);
  };
  useEffect(() => {
    getDataUser();
    if (createUserCallBack || editUserCallBack) {
      getDataUser();
    }
  }, [createUserCallBack, editUserCallBack]);
  return (
    <GestureHandlerRootView>
      <SafeAreaView className="bg-white w-full h-full">
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
          }
        >
          <View className="pt-6">
            <View className="p-3 border-b border-slate-300 flex flex-row justify-between items-center">
              <View>
                <Text className="font-bold text-lg">Users</Text>
              </View>
              <View className="flex flex-row gap-3">
                <TouchableOpacity
                  onPress={() => navigation.navigate("CreateUser")}
                >
                  <MaterialCommunityIcons
                    name="plus"
                    color="#0F1035"
                    size={24}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View className="py-0 ">
            {dataUser.users?.map((item, index) => (
            <View className="border-b border-slate-300">
              <View
                key={index}
                className="flex px-3 py-2 bg-white mb-2 rounded-lg"
              >
                <View className="flex justify-between flex-row">
                  <View className="flex-row flex">
                    <View className="flex basis-auto">
                      <View className="flex ">
                        <View className="flex w-auto flex-row justify-between">
                          <Text className="font-bold text-base">
                            {item.name}
                          </Text>
                        </View>
                        <Text className="font-base text-md -mt-1">
                          {item.roles.name}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View className="flex flex-row gap-3 justify-end items-center">
                    <View>
                      <TouchableOpacity
                        
                        onPress={() => {
                          Alert.alert(
                            "Delete",
                            "Are you sure you want to delete this user?",
                            [
                              {
                                text: "Cancel",
                                style: "cancel",
                              },
                              {
                                text: "Yes",
                                onPress: () => deleteUser(item.id),
                              },
                            ],
                            { cancelable: false }
                          );
                        }}
                      >
                        <MaterialCommunityIcons
                          name="trash-can"
                          size={24}
                         
                        />
                      </TouchableOpacity>
                    </View>
                    <View>
                      <TouchableOpacity
                        
                        onPress={() =>
                          navigation.navigate("EditUser", { id: item.id })
                        }
                      >
                        <MaterialCommunityIcons
                          name="pencil"
                          size={24}
                          
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default UserAdmin;
