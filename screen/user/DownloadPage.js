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
import { printToFileAsync } from "expo-print";
import { shareAsync } from "expo-sharing";

const DownloadPage = ({ route }) => {
  

  return (
    <GestureHandlerRootView>
      <SafeAreaView className="bg-white w-full h-full">
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
          }
        >
          <View className="p-3">
            <View className="border border-slate-300 p-3 rounded-md">
              <View>
                {downloadData.report?.map((value, index) => (
                  <View
                    className="flex flex-col justify-between border-b border-slate-300 py-3"
                    key={index}
                  >
                    <View className="flex flex-row justify-between">
                      <Text>{value.products.name}</Text>
                      <Text>{value.quantity} x </Text>
                      <Text>Rp{value.products.price}</Text>
                    </View>
                    <View className="flex flex-row justify-between">
                      <View>
                        <Text className="font-bold ">Status:</Text>
                      </View>
                      <View>
                        <Text className="font-bold">{value.status}</Text>
                      </View>
                    </View>
                  </View>
                ))}
                <View className="flex flex-row justify-between mt-3">
                  <View>
                    <Text className="font-bold text-base">Total Harga</Text>
                  </View>
                  <View>
                    <Text className="font-bold text-base">
                      Rp{downloadData.totalPrice}
                    </Text>
                  </View>
                </View>
              </View>
              <View>
                <TouchableOpacity
                  className="border bg-stone-700 p-3 rounded-md items-center mt-2"
                  onPress={printHistory}
                >
                  <Text className="text-white font-bold">Save as PDF</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default DownloadPage;
