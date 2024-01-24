import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import {
  GestureHandlerRootView,
  RefreshControl,
} from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { API_URL } from "../constantAPI";
const OrderPage = () => {
  const [transaction, setTransaction] = useState([]);
  const [refresh, setRefresh] = useState(false);

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
    getTransaction();
    setTimeout(() => {
      setRefresh(false);
    }, 2000);
  };

  useEffect(() => {
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
              <Text className="font-bold text-lg">Order Page</Text>
            </View>
          </View>
          <View className="py-0 flex p-3 justify-between">
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

export default OrderPage;
