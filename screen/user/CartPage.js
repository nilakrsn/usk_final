import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native";
import {
  GestureHandlerRootView,
  RefreshControl,
} from "react-native-gesture-handler";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { API_URL } from "../constantAPI";

const CartPage = ({ navigation, route }) => {
 

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
              <Text className="font-bold text-lg">Fintech</Text>
            </View>
          </View>
          <View className="py-0 p-3">
            <View className="bg-cyan-500 p-4 rounded-lg flex flex-row justify-between items-center">
              <View>
                <Text className="text-white font-bold text-lg">Total</Text>
                <Text className="text-white text-md">
                  Rp{data.totalPrice}
                </Text>
              </View>
              <View>
                {data.totalPrice > data.difference ||
                data.transactionsKeranjang <= 0 ? (
                  <TouchableOpacity
                    className="bg-red-500 py-1 rounded-full px-2"
                    disabled
                  >
                    <Text className="text-white font-bold text-md">Cannot Payment</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    className="bg-white py-1 rounded-md px-6"
                    onPress={payProduct}
                  >
                    <Text className="text-black font-bold">Buy</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
          <View className="py-0 flex px-3 justify-between">
            <View>
              <Text className="font-bold text-lg mb-2">
                Your Cart {data.keranjanglength} result
              </Text>
            </View>
            {data.transactionsKeranjang?.map((item, index) => (
              <View
                key={index}
                className="flex flex-row justify-between items-center border border-slate-200 rounded-lg p-3 mb-3"
              >
                <View className="flex flex-row gap-3 items-center">
                  <View className="p-1.5 px-3 rounded-lg border border-slate-200 ">
                    <Text className="text-base">{item.quantity}x</Text>
                  </View>
                  <View>
                    <Text className="text-md  font-bold">
                      {item.products.name}
                    </Text>
                    <Text className="text-md text-green-600">
                      Rp{item.price}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                 
                  onPress={() => cancelCart(item.id)}
                >
                  <MaterialCommunityIcons
                    name="delete"
                    color="black"
                    size={20}
                  />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default CartPage;
