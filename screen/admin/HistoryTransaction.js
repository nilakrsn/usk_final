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

const HistoryTrasanction = ({ route }) => {
  
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
                      {formatDate(item.created_at)} |{" "}
                      {formatHour(item.created_at)}
                    </Text>
                  </View>
                  <View>
                    {item.status === "dibayar" ? (
                      <Text className="text-md font-bold">{item.status}</Text>
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
