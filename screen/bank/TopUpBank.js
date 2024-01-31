import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_URL } from "../constantAPI";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  Alert,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

const TopUpBank = ({ navigation }) => {

 
  const textInputStyle =
    "tracking-widest border p-3 py-3 text-base border-slate-900 rounded-lg w-full";
  return (
    <GestureHandlerRootView>
      <SafeAreaView className="bg-white w-full h-full">
        <View className="p-3">
          <View className="p-3">
            <Text className="text-md py-2">Select Nasabah</Text>
            <Picker
              selectedValue={selectedUser}
              onValueChange={(item) => setSelectedUser(item)}
            >
              {dataSiswa && dataSiswa.siswa
                ? dataSiswa.siswa.map((siswa, index) => (
                    <Picker.Item
                      key={index}
                      label={siswa.name}
                      value={siswa.id}
                    />
                  ))
                : null}
            </Picker>
          </View>
          <View>
            <Text className="text-md py-2">Balance</Text>
            <TextInput
              className={`${textInputStyle}`}
              placeholder="Value"
              value={topUp}
              onChangeText={(text) => setTopUp(text)}
            />
          </View>

          <View className="mt-3">
            <TouchableOpacity
              className="bg-cyan-500 p-4 rounded-lg"
              onPress={topUpBank}
            >
              <Text className="text-base text-white font-bold text-center">
                Continue
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default TopUpBank;
