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

const HistoryPage = ({ navigation }) => {
  
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
