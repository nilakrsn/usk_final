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
import DateTimePicker from "@react-native-community/datetimepicker";

const HistoryTopUp = () => {
  const [dataBank, setDataBank] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filteredData, setFilteredData] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const getDataBank = async () => {
    const token = await AsyncStorage.getItem("token");
    try {
      const response = await axios.get(`${API_URL}admin`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDataBank(response.data);
      setFilteredData(response.data.wallets || []);
    } catch (e) {
      console.log(e);
    }
  };

  const handleDateChange = async (event, selectedDate) => {
    if (selectedDate === undefined || selectedDate === null) {
      setShowDatePicker(false);
      return;
    }

    const currentDate = selectedDate || new Date();
    setSelectedDate(currentDate);

    const filtered = dataBank.wallets.filter((item) => {
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
  <h1>History Bank</h1>
    <table>
      <thead>
        <tr>
          <th>User</th>
          <th>Credit</th>
          <th>Debit</th>
          <th>Status</th>
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
                    <td><h3>${value.user.name}</h3></td>
                    <td>Rp${value.credit || 0 } </td>
                    <td>Rp${value.debit || 0}</td>
                    <td> ${value.status}</td>
                    <td> ${formatDate(value.created_at)} | ${formatHour(
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
            <View>
              {filteredData.map((item, index) => (
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
