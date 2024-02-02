import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
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

import { API_URL } from "../constantAPI";

const HistoryPage = ({ navigation }) => {
  const [historyBeli, setHistoryBeli] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const getDataHistory = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get(`${API_URL}history`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setHistoryBeli(response.data.laporanPembayaran);
      console.log(response.data.laporanPembayaran);
    } catch (e) {
      console.log(e);
    }
  };

  const onRefresh = () => {
    setRefresh(true);
    getDataHistory();
    setTimeout(() => {
      setRefresh(false);
    }, 2000);
  };

  useEffect(()=>{
    getDataHistory();
  },[]);
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
              <Text className="font-bold text-lg">Download History</Text>
            </View>
          </View>
          <View className="py-0 flex justify-between">
            {historyBeli &&
              Object.entries(historyBeli).map(([orderCode], groupIndex) => (
                <View
                  key={groupIndex}
                  className="p-2 border-b border-slate-300 flex flex-row justify-between items-center rounded-md mb-2"
                >
                  <Text className=" ml-2 font-bold">{orderCode}</Text>
                  <View>
                    <TouchableOpacity
                      className=" bg-cyan-500 p-3 rounded-md"
                      onPress={() =>
                        navigation.navigate("DownloadPage", {
                          order_code: orderCode,
                        })
                      }
                    >
                      <Text className="text-white">Download</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default HistoryPage;
