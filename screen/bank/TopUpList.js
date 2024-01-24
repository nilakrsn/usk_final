import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_URL } from "../constantAPI";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TouchableOpacity } from "react-native";
import {
  GestureHandlerRootView,
  RefreshControl,
  ScrollView,
} from "react-native-gesture-handler";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const TopUpList = () => {
  const [dataBank, setDataBank] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const getDataBank = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
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

  const onRefresh = () => {
    setRefresh(true);
    getDataBank();
    setTimeout(() => {
      setRefresh(false);
    }, 2000);
  };

  useEffect(() => {
    getDataBank();
  },[]);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };
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
              <Text className="font-bold text-lg">Top Up List</Text>
            </View>
          </View>
          <View className="py-0 flex p-3 justify-between">
            <View>
              <Text className="font-bold text-lg mb-2">History</Text>
            </View>
            <View>
              {dataBank.wallets?.map((item, index) => (
                <View
                  key={index}
                  className="border mb-2 border-slate-300 p-4 rounded-lg flex flex-row justify-between items-center"
                >
                  <View className="flex flex-row items-center">
                    <View className="gap-0">
                      <Text className="text-base font-bold">
                        {item.user.name}
                      </Text>
                      <Text className="text-md">
                        {formatDate(item.created_at)}
                      </Text>
                      <View className="flex flex-row">
                        {item.credit || 0 && item.debit || 0 ? (
                          <Text className="text-md">
                            Credit: Rp{item.credit || 0}
                          </Text>
                        ) : (
                          <Text className="text-md">
                            Debit: Rp{item.debit || 0}
                          </Text>
                        )}
                      </View>
                    </View>
                  </View>
                  <View className="flex flex-row justify-between">
                    <Text
                      className={`font-bold text-lg ${
                        item.status === "selesai"
                          ? "text-green-600"
                          : "text-yellow-500"
                      }`}
                    >
                      {item.status}
                    </Text>
                    {item.status === "process" && (
                      <TouchableOpacity
                        className="p-1 rounded-full bg-stone-700 ml-3"
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
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default TopUpList;
