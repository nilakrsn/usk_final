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

const HomeBank = ({ navigation }) => {
  const [dataBank, setDataBank] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const getDataBank = async () => {
    const token = await AsyncStorage.getItem("token");
    try {
      const response = await axios.get(`${API_URL}bank`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDataBank(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const acceptTopUp = async (id) => {
    const token = await AsyncStorage.getItem("token");
    await axios.put(
      `${API_URL}topup-success/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    Alert.alert("Confirm success");
    getDataBank();
  };

  const logout = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      await axios.post(
        `${API_URL}logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await AsyncStorage.multiRemove(["token", "role"]);
      navigation.navigate("Login");
    } catch (e) {
      console.log(e);
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };
  const formatHour = (timestamp) => {
    const date = new Date(timestamp);
    const options = {
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    };
    return date.toLocaleTimeString(undefined, options);
  };

  const onRefresh = () => {
    setRefresh(true);
    getDataBank();
    setTimeout(() => {
      setRefresh(false);
    }, 2000);
  };

  useEffect(() => {
    getDataBank();
  }, []);

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
              <Text className="font-bold text-lg">Bank</Text>
              <Text className="text-sm">
                Welcome Back, {dataBank?.user?.name}
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
          <View className="p-3  justify-between">
            <View className="bg-cyan-500 p-2 rounded-lg flex flex-col items-center">
              <View className=" flex flex-row gap-3 mb-3">
                <View className=" flex-1  flex-row items-center  justify-center">
                  <View>
                    <Text className="font-bold text-lg text-white">
                      Balance Total
                    </Text>
                    <Text className="text-base text-white text-center">
                      Rp{dataBank.balanceBank}
                    </Text>
                  </View>
                </View>
                <View className="flex-1 flex-row items-center justify-center ">
                  <View>
                    <Text className="font-bold text-lg text-white">
                      Nasabah
                    </Text>
                    <Text className="text-base text-white text-center">
                      {dataBank.nasabah}
                    </Text>
                  </View>
                </View>
              </View>
              <View className=" flex flex-row gap-3">
                <View className="flex-1">
                  <TouchableOpacity
                    className="bg-white rounded-md p-3"
                    onPress={() => navigation.navigate("TopUpBank")}
                  >
                    <Text className="text-black font-bold text-center text-md">
                      Top Up
                    </Text>
                  </TouchableOpacity>
                </View>
                <View className="flex-1">
                  <TouchableOpacity
                    className=" bg-white rounded-md p-3"
                    onPress={() => navigation.navigate("WithDrawBank")}
                  >
                    <Text className="text-black font-bold text-center text-md">
                      WithDraw
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View>
              <Text className="font-bold text-lg mb-2 py-1">History</Text>
            </View>
            {dataBank.wallets?.map((item, index) => (
              <View
                key={index}
                className="border mb-2 border-slate-300 px-3 py-2 rounded-lg flex flex-row justify-between items-center"
              >
                <View className="flex flex-row items-center">
                  <View className="gap-0">
                    <Text className="text-base font-bold">
                      {item.user.name}
                    </Text>

                    <View className="flex flex-row">
                      {item.credit || (0 && item.debit) || 0 ? (
                        <Text className="text-md">
                          Credit: Rp{item.credit || 0}
                        </Text>
                      ) : (
                        <Text className="text-md">
                          Debit: Rp{item.debit || 0}
                        </Text>
                      )}
                    </View>
                    <Text className="text-sm text-gray-400">
                      {formatDate(item.created_at)} |{" "}
                      {formatHour(item.created_at)}
                    </Text>
                  </View>
                </View>
                <View className="flex flex-row justify-between items-center">
                  <Text
                    className={`font-bold text-md ${
                      item.status === "selesai"
                        ? "text-green-600"
                        : "text-yellow-500"
                    }`}
                  >
                    {item.status}
                  </Text>
                  {item.status === "process" && (
                    <TouchableOpacity
                      className="p-1 rounded-full bg-cyan-500 ml-3"
                      onPress={() => acceptTopUp(item.id)}
                    >
                      <MaterialCommunityIcons
                        name="check"
                        color="white"
                        size={20}
                      />
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default HomeBank;
