import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_URL } from "../constantAPI";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import {
  GestureHandlerRootView,
  RefreshControl,
  ScrollView,
} from "react-native-gesture-handler";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const CategoryKantin = ({ navigation }) => {
  

  return (
    <GestureHandlerRootView>
      <SafeAreaView className="bg-white w-full h-full">
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View className=" w-full p-3 py-4 border-b border-slate-300 flex flex-row justify-between items-center bg-white ">
            <View>
              <Text className="font-bold text-lg">Category</Text>
            </View>
            <View className="flex flex-row gap-3">
              <TouchableOpacity
                onPress={() => navigation.navigate("CreateCategory")}
              >
                <MaterialCommunityIcons name="plus" color="#0F1035" size={24} />
              </TouchableOpacity>
            </View>
          </View>
          {dataCategory?.map((item, index) => (
            <View className=" border-b border-slate-300">
              <View key={index} className="flex   bg-white mb-2 rounded-lg p-3">
                <View className="flex justify-between flex-row">
                  <View className="flex-row flex">
                    <Text className="font-bold text-base">{item.name}</Text>
                  </View>
                  <View className="flex flex-row gap-3 justify-end items-center">
                    <View>
                      <TouchableOpacity
                        onPress={() => {
                          Alert.alert(
                            "Delete",
                            "Are you sure you want to delete this user?",
                            [
                              {
                                text: "Cancel",
                                style: "cancel",
                              },
                              {
                                text: "Yes",
                                onPress: () => deleteCategory(item.id),
                              },
                            ],
                            { cancelable: false }
                          );
                        }}
                      >
                        <MaterialCommunityIcons name="trash-can" size={24} />
                      </TouchableOpacity>
                    </View>
                    <View>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("EditCategory", {
                            pid: item.id,
                            pname: item.name,
                          })
                        }
                      >
                        <MaterialCommunityIcons name="pencil" size={20} />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default CategoryKantin;
