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
import { printToFileAsync } from "expo-print";
import { shareAsync } from "expo-sharing";
import DateTimePicker from "@react-native-community/datetimepicker";
const TopUpList = ({ navigator }) => {
  
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
              <Text className="font-bold text-lg">History</Text>
              <TouchableOpacity onPress={printHistory}>
                <Text className="font-bold text-cyan-500 text-md">
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
                  className="border mb-2 border-slate-300 px-3 py-2 rounded-lg flex flex-row justify-between items-center"
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
                  <View className="flex flex-row justify-between items-center">
                    <Text
                      className={`font-bold text-md ${
                        item.status === "selesai"
                          ? "text-green-600"
                          : "text-yellow-500"
                      }`}
                    >
                      {item.status}
                    </Text>
                    {item.status === "process" && (
                      <TouchableOpacity
                        className="p-1 rounded-full bg-cyan-500 ml-3"
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
