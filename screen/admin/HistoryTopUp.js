import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native";
import {
  GestureHandlerRootView,
  RefreshControl,
} from "react-native-gesture-handler";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { API_URL } from "../constantAPI";
import { printToFileAsync } from "expo-print";
import { shareAsync } from "expo-sharing";

const HistoryTopUp = ({ route }) => {
  const [dataBank, setDataBank] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const getDataBank = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get(`${API_URL}admin`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDataBank(response.data);
      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getDataBank();
  }, []);

  const onRefresh = () => {
    setRefresh(true);
    getDataBank();
    setTimeout(() => {
      setRefresh(false);
    }, 2000);
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
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };
  const printHistory = async () => {
    try {
      const file = await printToFileAsync({
        html: htmlToPrint,
        base64: false,
      });
      await shareAsync(file.uri);
    } catch (e) {
      console.log(e);
    }
  };

  let htmlToPrint = `
  <html>
  <head>
    <style>
      body {
        text-align: center;
      }

      h1 {
        margin-top: 20px;
      }

      .order-item {
        margin-top: 10px;
        border-bottom: 1px solid #ccc;
        padding: 10px;
        text-align: left;
      }

      .product-info {
        display: flex;
        justify-content: space-between;
      }

      .status-info {
        display: flex;
        justify-content: space-between;
        margin-top: 5px;
      }

      
    </style>
  </head>
  <body> 
  <h1>History ${dataBank.user ? dataBank.user.created_at : null}</h1>
    ${
      dataBank.wallets
        ? dataBank.wallets
            .map(
              (value, index) => `
            <div class="order-item" key=${index}>
            <span>${value.user.name}</span>
              <div class="product-info">
              ${
                value.credit || (0 && value.debit) || 0
                  ? ` <span>Credit: Rp${value.credit || 0}</span>`
                  : `<span>
                  Debit: Rp${value.debit || 0}
                </span>`
              }
                
                <span>${value.created_at}</span>
              </div>
              <div class="status-info">
                <span class="font-bold">Status:</span>
                <span class="font-bold">${value.status}</span>
              </div>
            </div>
          `
            )
            .join("")
        : ""
    }
    
  </body>
</html>
`;

  return (
    <GestureHandlerRootView>
      <SafeAreaView className="bg-white w-full h-full">
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
          }
        >
          <View className=" w-full p-3 py-4 border-b border-slate-300 bg-white ">
            <View className="pt-6 flex flex-row justify-between items-center">
              <Text className="font-bold text-lg">History Top Up</Text>
              <TouchableOpacity onPress={printHistory}>
                <Text className="font-bold text-md text-cyan-500">
                  Download All
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View className="py-0 flex p-3 justify-between">
            <View>
              {dataBank.wallets?.map((item, index) => (
                <View
                  key={index}
                  className="border mb-2 border-slate-300 px-3 py-1 rounded-lg flex flex-row justify-between items-center"
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
                  <View className="flex flex-row justify-between">
                    <Text
                      className={`font-bold text-md ${
                        item.status === "selesai"
                          ? "text-green-600"
                          : "text-yellow-500"
                      }`}
                    >
                      {item.status}
                    </Text>
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

export default HistoryTopUp;
