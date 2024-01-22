import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { GestureHandlerRootView, RefreshControl } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { API_URL } from "../constantAPI";
const ProductCanteen = ({ navigation, route }) => {
  

  return (
    <GestureHandlerRootView>
      <SafeAreaView className="bg-white w-full h-full">
        <ScrollView refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <View className=" w-full p-3 py-4 border-b border-slate-300 flex flex-row justify-between items-center bg-white ">
            <View>
              <Text className="font-bold text-lg">Product Canteen</Text>
            </View>
            <View className="flex flex-row gap-3">
              <TouchableOpacity
                onPress={() => navigation.navigate("CreateProduct")}
              >
                <MaterialCommunityIcons name="plus" color="black" size={26} />
              </TouchableOpacity>
            </View>
          </View>
          <View>
            {dataProduk.products?.map((item, index) => (
              <View key={index} className="flex p-3 border border-slate-300 bg-white">
                <View className="flex justify-between flex-row">
                  <View className="flex-row flex">
                    <View className="bg-slate-900 rounded-lg mr-3 basis-auto">
                      <Image
                        className="h-16 w-20 rounded-lg"
                        source={{
                          uri: `${item.photo}`,
                        }}
                      />
                    </View>
                    <View className="flex basis-auto">
                      <View className="flex ">
                        <View className="flex w-auto flex-row justify-between">
                          <Text className="font-bold text-base">
                            {item.name}
                          </Text>
                        </View>
                        <Text className="font-base text-base text-slate-800 -mt-1">
                          {item.price}
                        </Text>
                      </View>
                      <View className="flex ">
                        <Text className="font-base text-sm text-slate-800">
                          Stock: {item.stock}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View className="flex flex-row gap-3 justify-end items-center">
                    <View>
                      <TouchableOpacity
                        onPress={() => {
                          Alert.alert(
                            "Delete",
                            "Are you sure you want to delete this product?",
                            [
                              {
                                text: "Cancel",
                                style: "cancel",
                              },
                              {
                                text: "Yes",
                                onPress: () => deleteProduct(item.id),
                              },
                            ],
                            { cancelable: false }
                          );
                        }}
                      >
                        <MaterialCommunityIcons
                          name="trash-can-outline"
                          size={24}
                        />
                      </TouchableOpacity>
                    </View>
                    <View>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("EditProduct", { id: item.id })
                        }
                      >
                        <MaterialCommunityIcons
                          name="pencil-outline"
                          size={24}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default ProductCanteen;
