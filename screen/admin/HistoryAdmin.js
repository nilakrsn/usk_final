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

const HistoryAdmin = ({ route }) => {
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

  return (
    <GestureHandlerRootView>
      <SafeAreaView className="bg-white w-full h-full">
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View className=" w-full p-3 py-4 border-b border-slate-300 flex flex-row justify-between items-center bg-white ">
            <View className="pt-6">
              <Text className="font-bold text-lg">Admin</Text>
            </View>
          </View>
          <View className="py-0 flex p-3 justify-between">
            <View>
              <Text className="font-bold text-lg mb-2">
                History Transaction
              </Text>
              {report.transactions?.map((item, index) => (
                <View
                  key={index}
                  className="flex flex-row justify-between items-center border border-slate-300 rounded-lg p-3 mb-3"
                >
                  <View>
                    <Text className="text-base font-bold">
                      {item.order_code}
                    </Text>
                    <Text className="text-base">{item.user?.name}</Text>
                    <Text className="text-base">
                      {formatDate(item.created_at)}
                    </Text>
                  </View>
                  <View>
                    <Text className="text-base font-bold ">{item.status}</Text>
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

export default HistoryAdmin;
