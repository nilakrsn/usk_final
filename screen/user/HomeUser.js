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
  VirtualizedList,
} from "react-native";
import { SafeAreaView } from "react-native";
import {
  GestureHandlerRootView,
  RefreshControl,
} from "react-native-gesture-handler";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { API_URL } from "../constantAPI";

const HomeUser = ({ navigation, route }) => {
  
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
              <Text className="font-bold text-lg">Fintech</Text>
              <Text className="text-sm">Welcome Back, {username ?? name}</Text>
            </View>
            <View className="flex flex-row gap-3 pt-6">
              <TouchableOpacity
                onPress={() => {
                  Alert.alert(
                    "Logout",
                    "Are you sure you want to logout?",
                    [
                      {
                        text: "Cancel",
                        style: "cancel",
                      },
                      {
                        text: "Yes",
                        onPress: logout,
                      },
                    ],
                    { cancelable: false }
                  );
                }}
              >
                <MaterialCommunityIcons
                  name="logout"
                  color="#0F1035"
                  size={24}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View className="py-0 p-3">
            <View className="bg-slate-900 p-4 rounded-lg flex flex-row justify-between items-center">
              <View>
                <Text className="text-white font-bold text-lg">Balance</Text>
                <Text className="text-white text-base">
                  Rp{data.difference}
                </Text>
              </View>
              <View>
                <TouchableOpacity
                  className="bg-white py-2 rounded-full px-6"
                  onPress={() => navigation.navigate("TopUp")}
                >
                  <Text className="text-black font-bold text-center">
                    Top Up
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View className="py-0 flex p-3 justify-between">
            <View>
              <Text className="font-bold text-lg mb-2">History</Text>
            </View>
            {data.products?.map((item, index) => (
              <CardProduct
                key={index}
                name={item.name}
                photo={`${item.photo}`}
                price={item.price}
                role={roleAuth}
                stand={item.stand}
                stock={item.stock}
                id={item.id}
                navigation={navigation}
              />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};
const CardProduct = ({
  id,
  name,
  photo,
  stand,
  stock,
  price,
  role,
  navigation,
  deleteProduct,
}) => {
  const [quantity, setquantity] = useState(1);

  const handleIncrease = () => {
    setquantity(quantity + 1);
  };

  const handleDecrease = () => {
    setquantity(quantity - 1 >= 0 ? quantity - 1 : 0);
  };

  const addToCart = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      setquantity("1");
      Alert.alert(
        "Success",
        "Check your cart!",
        [
          {
            text: "OK",
            onPress: () => {
              navigation.navigate("CartPage", {
                successCart: [quantity.toString(), price, id],
              });
            },
          },
        ],
        { cancelable: false }
      );
      await axios.post(
        `${API_URL}addcart`,
        {
          products_id: id,
          price: price,
          quantity: parseInt(quantity),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View className="flex flex-row justify-between border border-slate-300 p-3 rounded-lg mb-2">
      <View className="flex flex-row gap-4">
        <View>
          <View className="bg-slate-900 rounded-lg basis-auto">
            <Image
              className="h-24 w-20 rounded-lg"
              source={{
                uri: photo,
              }}
            />
          </View>
        </View>
        <View>
          <Text className="text-lg font-bold">{name}</Text>
          <Text className="text-base">Rp{price}</Text>
          <View className="flex flex-row items-center justify-between">
            <View style={{ alignItems: "center" }} className="flex flex-row">
              <TouchableOpacity
                onPress={handleDecrease}
                className="bg-slate-900 p-1 rounded-lg"
              >
                <MaterialCommunityIcons name="minus" color="white" size={20} />
              </TouchableOpacity>

              <TextInput
                style={{
                  textAlign: "center",
                  margin: 10,
                  fontSize: 19,
                }}
                keyboardType="numeric"
                value={quantity.toString()}
                onChangeText={(e) => setquantity(e)}
              />

              <TouchableOpacity
                onPress={handleIncrease}
                className="bg-slate-900 p-1 rounded-lg"
              >
                <MaterialCommunityIcons name="plus" color="white" size={20} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <View>
        <View className="flex justify-between items-end py-2 gap-7">
          <View className="flex flex-row">
            <MaterialCommunityIcons
              name="store-outline"
              color="black"
              size={20}
            />
            <Text className="text-sm">{stock}</Text>
          </View>
          <TouchableOpacity
            className="p-2 rounded-lg bg-slate-900"
            onPress={() => addToCart(quantity)}
          >
            <MaterialCommunityIcons
              name="cart-outline"
              color="white"
              size={18}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default HomeUser;
