import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native";
import {
  GestureHandlerRootView,
  RefreshControl,
} from "react-native-gesture-handler";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { API_URL } from "../constantAPI";

const ProfilePage = ({ navigation, route }) => {
 
  
  return (
    <GestureHandlerRootView>
      <SafeAreaView className="bg-white w-full h-full">
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View className=" w-full p-3 py-4 border-b border-slate-300 flex flex-row justify-between items-center bg-white ">
            <View className="pt-6">
              <Text className="font-bold text-lg">Fintech</Text>
            </View>
            <View className="flex flex-row gap-3 pt-6">
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
          <View className="py-0 p-3">
            <View className="bg-slate-900 p-4 rounded-lg flex flex-row justify-between items-center">
              <View>
                <Text className="text-white font-bold text-lg">Balance</Text>
                <Text className="text-white text-base">
                  Rp{dataSiswa.balance}
                </Text>
              </View>
              <View>
                <TouchableOpacity
                  className="bg-white py-2 rounded-full px-6"
                  onPress={() => navigation.navigate("TopUp")}
                >
                  <Text className="text-black font-bold text-center">
                    Top Up
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View className="py-0 flex p-3 justify-between">
            {walletProcess && walletProcess.length > 0 && (
              <View>
                <Text className="font-bold text-lg mb-2">Top up process</Text>
                {walletProcess?.map((item, index) => (
                  <View
                    key={index}
                    className={
                      item.credit === 0 || item.credit === null
                        ? `hidden`
                        : `flex flex-row justify-between items-center border border-slate-300 rounded-lg p-3 mb-3`
                    }
                  >
                    <View>
                      <Text className="text-base font-bold">
                        Rp{item.credit}
                      </Text>
                      <Text className="text-base">
                        {formatDate(item.created_at)}
                      </Text>
                    </View>
                    <Text className="text-base text-yellow-600 font-bold">
                      {item.status}
                    </Text>
                  </View>
                ))}
              </View>
            )}
            {walletSelesai && walletSelesai.length > 0 && (
              <View>
                <Text className="font-bold text-lg mb-2">Top up success </Text>
                {walletSelesai?.map((item, index) => (
                  <View
                    key={index}
                    className={
                      item.credit === 0 || item.credit === null
                        ? `hidden`
                        : `flex flex-row justify-between items-center border border-slate-300 rounded-lg p-3 mb-3`
                    }
                  >
                    <View>
                      <Text className="text-base font-bold">
                        Rp{item.credit}
                      </Text>
                      <Text className="text-base">
                        {formatDate(item.created_at)}
                      </Text>
                    </View>
                    <Text className="text-base text-green-700 font-bold">
                      {item.status}
                    </Text>
                  </View>
                ))}
              </View>
            )}
            <View>
              <Text className="font-bold text-lg mb-2">
                History Transaction
              </Text>
              {historyBeli?.map((item, index) => (
                <View
                  key={index}
                  className={
                    item.credit === 0 || item.credit === null
                      ? `hidden`
                      : `flex border border-slate-300 rounded-lg p-3 mb-3`
                  }
                >
                  <Text className="text-base font-bold">{item.order_code}</Text>
                  <Text className="text-base">{item.products.name}</Text>
                  <Text className="text-base">
                    {formatDate(item.created_at)}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};
// const formatDate = (timestamp) => {
//   const date = new Date(timestamp);
//   const options = { year: "numeric", month: "long", day: "numeric" };
//   return date.toLocaleDateString(undefined, options);
// };
export default ProfilePage;
