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
import { printToFileAsync } from "expo-print";
import { shareAsync } from "expo-sharing";
import DateTimePicker from "@react-native-community/datetimepicker";

const OrderPage = () => {
  const [transaction, setTransaction] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filteredData, setFilteredData] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const getDataTransaction = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get(`${API_URL}transaction-kantin`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTransaction(response.data);
      setFilteredData(response.data.transactions || []);
    } catch (e) {
      console.log(e);
    }
  };
  const verifPengambilan = async (id) => {
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
    Alert.alert("Verif Success");
    getDataTransaction();
  };

  const onRefresh = () => {
    setRefresh(true);
    getDataTransaction();
    setTimeout(() => {
      setRefresh(false);
    }, 2000);
  };

  useEffect(() => {
    getDataTransaction();
  }, []);

  const handleDateChange = (event, selectedDate) => {
    if (selectedDate === undefined || selectedDate === null) {
      setShowDatePicker(false);
      return;
    }
    if (!(selectedDate instanceof Date)) {
      selectedDate = new Date(selectedDate);
    }
    const currentDate = selectedDate || new Date();
    setSelectedDate(currentDate);

    const filtered = transaction.transactions.filter((item) => {
      const itemDate = new Date(item.created_at);
      const itemDateOnly = new Date(
        itemDate.getFullYear(),
        itemDate.getMonth(),
        itemDate.getDate()
      );
      const currentDateOnly = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate()
      );
      return itemDateOnly.getTime() === currentDateOnly.getTime();
    });
    setFilteredData(filtered);
    setShowDatePicker(false);
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
    const file = await printToFileAsync({
      html: htmlToPrint,
      base64: false,
    });
    await shareAsync(file.uri);
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

      table{
        text-align: center;
        border-collapse: collapse;
        width: 100%
      }

      th{
        background-color: #ddd;
        padding: 10px;
     
      }

      td{
        padding: 12px;
        border-bottom: 1px solid  #ddd
      }

    </style>
  </head>
  <body> 
  <h1>History Canteen</h1>
    <table>
      <thead>
        <tr>
          <th>Order Code</th>
          <th>User</th>
          <th>Product</th>
          <th>Quantity</th>
          <th>Status</th>
          <th>Date</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        ${
          filteredData
            ? filteredData
                .map(
                  (value, index) => `
                  <tr key=${index}>
                  <td><h3>${value.order_code}</h3></td>
                    <td> ${value.user_transactions?.map(
                      (val, ind) => `<span key=${ind}>${val.name}</span>`
                    )}</td>
                    <td>${value.products.name}</td>
                    <td>${value.quantity}x</td>
                    <td>Rp${value.price}</td>
                    <td>${value.status}</td>
                    <td>${formatDate(value.created_at)} | ${formatHour(
                    value.created_at
                  )}</td>
                  </tr>
              `
                )
                .join("")
            : ""
        }
      </tbody>
    </table>
  </body>
</html>`;

  return (
    <GestureHandlerRootView>
      <SafeAreaView className="bg-white w-full h-full">
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
          }
        >
          <View className=" w-full p-3 border-b border-slate-300  bg-white ">
            <View className="flex flex-row justify-between items-center">
              <Text className="font-bold text-lg ">History</Text>
              <TouchableOpacity onPress={printHistory}>
                <Text className="font-bold text-cyan-500 text-sm">
                  Download All
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View className="py-0 flex p-3 justify-between">
            <View className=" p-1 py-2">
              <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                <Text className="font-bold text-cyan-500">Choose Date</Text>
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={selectedDate}
                  onChange={handleDateChange}
                  mode="date"
                />
              )}
            </View>
            {filteredData.map((item, index) => (
              <View
                className="bg-white flex flex-row justify-between w-full border border-slate-300 items-center align-middle rounded-lg px-3 py-2 mb-2"
                key={index}
              >
                <View className="">
                  <Text className="text-base font-bold ">
                    {item.order_code}
                  </Text>

                  <View className="flex flex-col ">
                    {item.user_transactions?.map((value, index) => (
                      <Text className="text-md" key={index}>
                        {value.name}
                      </Text>
                    ))}
                    <Text className="text-md">
                      Rp{item.price} | {item.quantity}x
                    </Text>
                  </View>
                  <Text className="text-sm text-gray-400">
                    {formatDate(item.created_at)} |{" "}
                    {formatHour(item.created_at)}
                  </Text>
                </View>
                {item.status === "dibayar" ? (
                  <Text className="text-md text-black font-bold">
                    {item.status}
                  </Text>
                ) : item.status === "diambil" ? (
                  <Text className="text-md text-gray-400 font-bold">
                    {item.status}
                  </Text>
                ) : null}
                {item.status === "dibayar" ? (
                  <TouchableOpacity
                    className="p-1 rounded-full bg-cyan-500"
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
