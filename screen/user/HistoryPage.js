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

const HistoryPage = ({ navigation, route }) => {
  const [walletSelesai, setWalletSelesai] = useState([]);
  const [walletProcess, setWalletProcess] = useState([]);
  const [historyBeli, setHistoryBeli] = useState([]);
  const [dataSiswa, setDataSiswa] = useState([]);
  const { successTopUp } = route.params || {};
  const [refresh, setRefresh] = useState(false);

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
      setHistoryBeli(response.data.laporanPembayaran);
      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const getDataSiwa = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get(`${API_URL}getsiswa`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDataSiswa(response.data);
      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  };
  const onRefresh = () => {
    setRefresh(true);
    getDataHistory();
    getDataSiwa();
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

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    getDataHistory();
    getDataSiwa();
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
              <Text className="font-bold text-lg">History transaction</Text>
            </View>
          </View>
          <View className="py-0 flex justify-between">
            {historyBeli &&
              Object.entries(historyBeli).map(
                ([orderCode], groupIndex) => (
                  <View key={groupIndex} className="p-2 border-b border-slate-300 flex flex-row justify-between items-center rounded-md mb-2">
                    <Text  className=" ml-2">{orderCode}</Text>
                    <View>
                      <TouchableOpacity
                        className="border border-stone-700 p-2 rounded-md"
                        onPress={() =>
                          navigation.navigate("DownloadPage", {
                            order_code: orderCode,
                          })
                        }
                      >
                        <Text>Download</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )
              )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default HistoryPage;
