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

const HistoryTrasanction = ({ route }) => {
  const [report, setReport] = useState([]);
  const { successTopUp } = route.params || {};
  const [refreshing, setRefreshing] = useState(false);

  const getDataHistory = async () => {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.get(`${API_URL}report/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setReport(response.data);
  };
  useEffect(() => {
    getDataHistory();
  }, [successTopUp]);

  const onRefresh = () => {
    setRefreshing(true);
    getDataHistory();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
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
        font-weight: bold;
      }

      .title{
        font-weight: bold;
        font-size: 25px;
      }
      
    </style>
  </head>
  <body> 
 
    ${
      report.transactions
        ? report.transactions
            .map(
              (value, index) => `
              <div class="order-item" key=${index}>
              <div>
                <span class="title">${value.order_code}</span>
              </div>
              ${value.user_transactions?.map(
                (val, ind) =>
                  `<span  key=${ind}>
                  ${val.name}
                </span>`
              )}
              <div class="product-info">
                <span>${value.products.name}</span>
                <span>${value.quantity}x</span>
                <span>Rp${value.products.price}</span>
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
</html>`;

  return (
    <GestureHandlerRootView>
      <SafeAreaView className="bg-white w-full h-full">
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View className=" w-full p-3 py-4 border-b border-slate-300   bg-white ">
            <View className="pt-6 flex flex-row justify-between items-center">
              <Text className="font-bold text-lg">History Transaction</Text>
              <TouchableOpacity onPress={printHistory}>
                <Text className="font-bold text-md text-cyan-500">
                  Download All
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View className="py-0 flex p-3 justify-between">
            <View>
              {report.transactions?.map((item, index) => (
                <View
                  key={index}
                  className="flex flex-row justify-between items-center border border-slate-300 rounded-lg p-3 mb-3"
                >
                  <View>
                    <Text className="text-base font-bold">
                      {item.order_code}
                    </Text>
                    {item.user_transactions?.map((value, index) => (
                      <Text className="text-md" key={index}>
                        {value.name}
                      </Text>
                    ))}
                    <Text className="text-sm text-gray-400">
                      {formatDate(item.created_at)} | {formatHour(item.created_at)}
                    </Text>
                  </View>
                  <View>
                    {item.status === "dibayar" ? (
                      <Text className="text-md font-bold">
                        {item.status}
                      </Text>
                    ) : item.status === "diambil" ? (
                      <Text className="text-md text-slate-400 font-bold">
                        {item.status}
                      </Text>
                    ) : null}
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

export default HistoryTrasanction;
