import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_URL } from "../constantAPI";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import {
  GestureHandlerRootView,
  RefreshControl,
  ScrollView,
} from "react-native-gesture-handler";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const HomeAdmin = ({ navigation, route }) => {
 

  return (
    <GestureHandlerRootView>
      <SafeAreaView className="bg-white w-full h-full">
        <ScrollView refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
          <View className=" w-full p-3 py-4 border-b border-slate-300 flex flex-row justify-between items-center bg-white ">
            <View>
              <Text className="font-bold text-lg">Admin</Text>
              <Text className="text-sm">
                Welcome Back, {dataAdmin?.user?.name}
              </Text>
            </View>
            <View className="flex flex-row gap-3">
              <TouchableOpacity
                onPress={() => {
                  Alert.alert(
                    "Logout",
                    "Are you sure you want to logout?",
                    [
                      {
                        text: "Cancel",
                        style: "cancel",
                      },
                      {
                        text: "Yes",
                        onPress: logout,
                      },
                    ],
                    { cancelable: false }
                  );
                }}
              >
                <MaterialCommunityIcons
                  name="logout"
                  color="#0F1035"
                  size={24}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View className="py-0 flex p-3 justify-between">
            <View className="flex flex-row gap-3 py-2 justify-between mb-3">
              <View className="bg-white flex-1 flex-row items-center p-4 py-3 border border-slate-300 rounded-lg">
                <View className="gap-0">
                  <Text className="font-bold text-lg">Total Wallet</Text>
                  <Text className="text-lg">{dataAdmin.wallet_count}</Text>
                </View>
              </View>
              <View className="bg-white flex-1 p-4 py-3 border border-slate-300 rounded-lg">
                <View className="gap-0">
                  <Text className="font-bold text-black text-lg">User</Text>
                  <Text className="text-lg">{dataAdmin?.users?.length}</Text>
                </View>
              </View>
            </View>
            <View className="flex flex-row gap-3 py-2 justify-between mb-3">
              <View className="bg-white flex-1 flex-row items-center p-4 py-3 border border-slate-300 rounded-lg">
                <View className="gap-0">
                  <Text className="font-bold text-lg">Product</Text>
                  <Text className="text-lg">{dataAdmin?.products?.length}</Text>
                </View>
              </View>
            </View>
            <View className="flex flex-row justify-between items-center">
              <Text className="font-bold text-lg mb-2">Users</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("CreateUser")}
              >
                <Text className="font-bold text-lg mb-2 text-blue-800">
                  Add New
                </Text>
              </TouchableOpacity>
            </View>
            {dataAdmin.users?.map((item, index) => (
              <View
                key={index}
                className="flex p-3 border border-slate-300 bg-white mb-2 rounded-lg"
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
                        <Text className="font-base text-base text-slate-800 -mt-1">
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
                          name="trash-can-outline"
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
                          name="pencil-outline"
                          size={24}
                        />
                      </TouchableOpacity>
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

export default HomeAdmin;
