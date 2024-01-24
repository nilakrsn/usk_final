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
  const [data, setData] = useState([]);
  const [transaction, setTransaction] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const getDataKantin = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get(`${API_URL}kantin`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response.data.user);
      setData(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const getTransaction = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get(`${API_URL}transaction-kantin`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data.transactions);
      setTransaction(response.data.transactions);
    } catch (e) {
      console.log(e);
    }
  };

  const verifPengambilan = async (id) => {
    try {
      const token = await AsyncStorage.getItem("token");
      await axios.put(
        `${API_URL}transaction-kantin/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Alert.alert("Verification success");
      getTransaction();
    } catch (e) {
      console.log(e);
    }
  };
  
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  const onRefresh = () => {
    setRefresh(true);
    getDataKantin();
    getTransaction();
    setTimeout(() => {
      setRefresh(false);
    }, 2000);
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

  useEffect(() => {
    getDataKantin();
    getTransaction();
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
            <View className="flex flex-row gap-3 py-2 justify-between mb-3">
              <View className="bg-white flex-1 p-3 py-3 border border-slate-300 rounded-lg">
                <View className="gap-0">
                  <Text className="font-bold text-black text-lg">
                    Total Order
                  </Text>
                  <Text className="text-lg">{transaction?.length}</Text>
                </View>
              </View>
              <View className="bg-white flex-1 p-3 py-3 border border-slate-300 rounded-lg">
                <View className="gap-0">
                  <Text className="font-bold text-black text-lg">
                    Total Product
                  </Text>
                  <Text className="text-lg">{data?.products?.length}</Text>
                </View>
              </View>
            </View>
            <View>
              <Text className="font-bold text-lg mb-2">History</Text>
            </View>
            {transaction?.map((item, index) => (
              <View
                className="bg-white flex flex-row justify-between w-full border border-slate-300 items-center align-middle rounded-lg p-3 mb-2"
                key={index}
              >
                <View className="">
                  <Text className="text-base font-bold">
                    {formatDate(item.created_at)}
                  </Text>
                  <Text className="text-sm "> {item.order_code}</Text>
                  <View className="flex flex-row ">
                    {item.user_transactions?.map((value, index) => (
                      <Text className="text-sm" key={index}>
                        {value.name} |
                      </Text>
                    ))}
                    <Text className="text-sm"> Rp{item.price}</Text>
                  </View>
                </View>
                <Text className="text-base">{item.quantity}x</Text>
                {item.status === "dibayar" ? (
                  <Text className="text-base text-slate-900">
                    {item.status}
                  </Text>
                ) : item.status === "diambil" ? (
                  <Text className="text-base text-slate-400">
                    {item.status}
                  </Text>
                ) : null}
                {item.status === "dibayar" ? (
                  <TouchableOpacity
                    className="p-1 rounded-full bg-stone-700"
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
