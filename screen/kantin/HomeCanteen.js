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
const HomeCanteen = ({ navigation }) => {
 

  return (
    <GestureHandlerRootView>
      <SafeAreaView className="bg-white w-full h-full">
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
          }
        >
          <View className=" w-full p-3 py-4 border-b border-slate-300 flex flex-row justify-between items-center bg-white ">
            <View>
              <Text className="font-bold text-lg">Canteen</Text>
              <Text className="text-sm">Welcome Back, {data?.user?.name}</Text>
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
            <View className="bg-cyan-500 p-2 rounded-lg flex flex-col items-center">
              <View className=" flex flex-row gap-3 mb-3">
                <View className=" flex-1  flex-row items-center  justify-center">
                  <View>
                    <Text className="font-bold text-lg text-white">
                      Total Order
                    </Text>
                    <Text className="text-base text-white text-center">
                    {transaction?.length}
                    </Text>
                  </View>
                </View>
                <View className="flex-1 flex-row items-center justify-center ">
                  <View>
                    <Text className="font-bold text-lg text-white">
                      Total Product
                    </Text>
                    <Text className="text-base text-white text-center">
                    {data?.products?.length}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View>
              <Text className="font-bold text-lg mb-2 py-3">History</Text>
            </View>
            {transaction?.map((item, index) => (
              <View
                className="bg-white flex flex-row justify-between w-full border border-slate-300 items-center align-middle rounded-lg px-3 py-2 mb-2"
                key={index}
              >
                <View className="">
                  <Text className="text-base font-bold ">
                    {item.order_code}
                  </Text>

                  <View className="flex flex-col ">
                    {item.user_transactions?.map((value, index) => (
                      <Text className="text-md" key={index}>
                        {value.name}
                      </Text>
                    ))}
                    <Text className="text-md">
                      Rp{item.price} | {item.quantity}x
                    </Text>
                  </View>
                  <Text className="text-sm text-gray-400">
                    {formatDate(item.created_at)} |{" "}
                    {formatHour(item.created_at)}
                  </Text>
                </View>
                {item.status === "dibayar" ? (
                  <Text className="text-md text-black font-bold">
                    {item.status}
                  </Text>
                ) : item.status === "diambil" ? (
                  <Text className="text-md text-gray-400 font-bold">
                    {item.status}
                  </Text>
                ) : null}
                {item.status === "dibayar" ? (
                  <TouchableOpacity
                    className="p-1 rounded-full bg-cyan-500"
                    onPress={() => verifPengambilan(item.id)}
                  >
                    <MaterialCommunityIcons
                      name="check"
                      color="white"
                      size={20}
                    />
                  </TouchableOpacity>
                ) : item.status === "diambil" ? (
                  <TouchableOpacity>
                    <MaterialCommunityIcons
                      name="check"
                      color="black"
                      size={28}
                    />
                  </TouchableOpacity>
                ) : null}
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default HomeCanteen;
