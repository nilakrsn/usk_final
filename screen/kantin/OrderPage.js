import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView, RefreshControl } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { API_URL } from "../constantAPI";
const OrderPage = ({navigation}) => {
  const [transaction, setTransaction] = useState([]);
  const [refreshing, setRefreshing ] = useState(true);

  const getTransaction = async () =>{
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get(`${API_URL}transaction-kantin`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTransaction(response.data.transactions);
    } catch (e) {
      console.log(e);
    }
  }
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };


  const verifPengambilan = async (id)=>{
    try {
      const token = await AsyncStorage.getItem("token");
     await axios.put(`${API_URL}transaction-kantin/${id}`,{}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      getTransaction();
      Alert.alert("Success Verif")
    } catch (e) {
      console.log(e);
    }
  }
 
  useEffect(()=>{
    getTransaction();
  })
  const onRefresh = async () => {
    setRefreshing(true);
    getTransaction();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  return (
    <GestureHandlerRootView>
      <SafeAreaView className="bg-white w-full h-full">
        <ScrollView refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <View className=" w-full p-3 py-4 border-b border-slate-300 flex flex-row justify-between items-center bg-white ">
            <View>
              <Text className="font-bold text-lg">Order Page</Text>
            </View>
          </View>
          <View className="py-0 flex p-3 justify-between">
            <View>
              <Text className="font-bold text-lg mb-2">History</Text>
            </View>
            {transaction.map((item, index) => (
              <View
                className="bg-white flex flex-row justify-between w-full border border-slate-300 items-center align-middle rounded-lg p-3 mb-2"
                key={index}
              >
                <View>
                  
                  <View className="flex flex-row items-center align-middle">
                    {item.user_transactions?.map((value, index) => (
                      <Text className="text-base font-bold" key={index}>
                        {value.name} |
                      </Text>
                    ))}
                    <Text className="text-base font-bold"> Rp{item.price}</Text>
                  </View>
                  <Text className="text-sm">
                    {formatDate(item.created_at)}
                  </Text>
                  <Text className="text-sm "> {item.order_code}</Text>
                </View>
                <Text className="text-base">{item.quantity}x</Text>
                <Text className="text-base">{item.status}</Text>
                {item.status === "dibayar" ? (
                  <TouchableOpacity className="p-1 rounded-full bg-slate-900" onPress={()=> verifPengambilan(item.id)}>
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
