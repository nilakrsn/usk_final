import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  Text,
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

const ProfilePage = ({ navigation }) => {
  const [walletProcess, setWalletProcess] = useState([]);
  const [walletSelesai, setWalletSelesai] = useState([]);
  const [historyBeli, setHistoryBeli] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [dataSiswa, setDataSiswa] = useState([]);

  const getDataSiswa = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get(`${API_URL}getsiswa`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDataSiswa(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const getDataHistory = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get(`${API_URL}history`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setWalletProcess(response.data.walletProcess);
      setWalletSelesai(response.data.walletSelesai);
      setHistoryBeli(response.data.transactionsBayar);
    } catch (e) {
      console.log(e);
    }
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
    getDataHistory();
    getDataSiswa();
    setTimeout(() => {
      setRefresh(false);
    }, 2000);
  };

  useEffect(() => {
    getDataHistory();
    getDataSiswa();
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
          <View className="p-3">
            <View className="bg-cyan-500 p-4 rounded-lg flex flex-row justify-between items-center">
              <View>
                <Text className="text-white font-bold text-lg">Balance</Text>
                <Text className="text-white text-md">
                  Rp{dataSiswa.balance}
                </Text>
              </View>
              <View className="gap-2">
                <TouchableOpacity
                  className="bg-white py-1 rounded-md px-3"
                  onPress={() => navigation.navigate("TopUp")}
                >
                  <Text className="text-black font-bold text-center text-md">
                    Top Up
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className={`${
                    dataSiswa.balance > 0
                      ? "bg-white py-1 rounded-md px-3"
                      : "hidden"
                  }`}
                  onPress={() => navigation.navigate("WithDraw")}
                >
                  <Text className="text-black font-bold text-center text-md">
                    WithDraw
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View className="py-0 p-3 flex justify-between">
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
                      <Text className="text-md font-bold">Rp{item.credit}</Text>
                      <Text className="text-sm  text-gray-400">
                        {formatDate(item.created_at)} |{" "}
                        {formatHour(item.created_at)}
                      </Text>
                    </View>
                    <Text className="text-md text-yellow-500 font-bold">
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
                      <Text className="text-md font-bold ">
                        Rp{item.credit}
                      </Text>
                      <Text className="text-sm text-gray-400">
                        {formatDate(item.created_at)} |{" "}
                        {formatHour(item.created_at)}
                      </Text>
                    </View>
                    <Text className="text-md text-green-700 font-bold">
                      {item.status}
                    </Text>
                  </View>
                ))}
              </View>
            )}
            {historyBeli && historyBeli.length > 0 && (
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
                        : `flex border border-slate-300 rounded-lg p-3 mb-3 flex-row items-center justify-between`
                    }
                  >
                    <View>
                      <Text className="text-md font-bold">
                        {item.order_code}
                      </Text>
                      <Text className="text-md">
                        {item.products.name} | {item.quantity}x
                      </Text>
                      <Text className="text-sm text-gray-400">
                        {formatDate(item.created_at)} |{" "}
                        {formatHour(item.created_at)}
                      </Text>
                    </View>
                    <Text
                      className={
                        item.status === "diambil"
                          ? `font-bold text-gray-400 text-md`
                          : `text-black font-bold text-md`
                      }
                    >
                      {item.status}
                    </Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default ProfilePage;
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
