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
