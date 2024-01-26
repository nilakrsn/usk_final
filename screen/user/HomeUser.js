import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Alert,
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

const HomeUser = ({ navigation, route }) => {
  const [data, setData] = useState([]);
  const [roleAuth, setRoleAuth] = useState("");
  const [name, setName] = useState("");
  const [refresh, setRefresh] = useState(false);
  const { username } = route.params || {};
  const { getDataSiswaCallBack } = route.params || {};

  const getData = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const role = await AsyncStorage.getItem("role");
      const name = await AsyncStorage.getItem("name");
      const response = await axios.get(`${API_URL}get-product-siswa`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      setData(response.data);
      setRoleAuth(role);
      setName(name);
    } catch (e) {
      console.log(e);
    }
  };

  const onRefresh = () => {
    setRefresh(true);
    getData();
    setTimeout(() => {
      setRefresh(false);
    }, 2000);
  };

  const logout = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      await axios.post(
        `${API_URL}logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await AsyncStorage.multiRemove(["token", "role"]);
      navigation.navigate("Login");
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getData();
    if (getDataSiswaCallBack) {
      getData();
    }
  }, [getDataSiswaCallBack]);

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
          <View className="p-3">
            <View className="bg-cyan-500 p-4 rounded-lg flex flex-row justify-between items-center">
              <View>
                <Text className="text-white font-bold text-lg">Balance</Text>
                <Text className="text-white text-md">
                  Rp{data.difference}
                </Text>
              </View>
              <View className="gap-2">
                <TouchableOpacity
                  className="bg-white py-1 rounded-md px-3"
                  onPress={() => navigation.navigate("TopUp")}
                >
                  <Text className="text-black font-bold text-center text-md">
                    Top Up
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="bg-white py-1 rounded-md px-3"
                  onPress={() => navigation.navigate("WithDraw")}
                >
                  <Text className="text-black font-bold text-center text-md">
                    WithDraw
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View className="py-0 flex px-3 justify-between">
            <View>
              <Text className="font-bold text-lg mb-2">Data Product</Text>
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
const CardProduct = ({ id, name, photo, stock, price, navigation }) => {
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
    <View className="flex flex-row justify-between border border-slate-300 px-3 py-1 rounded-lg mb-2">
      <View className="flex flex-row gap-4">
        <View className="justify-center">
          <View className="bg-cyan-500 rounded-lg basis-auto">
            <Image
              className="h-20 w-20 rounded-lg"
              source={{
                uri: photo,
              }}
            />
          </View>
        </View>
        <View className="justify-center">
          <Text className="text-base font-bold">{name}</Text>
          <Text className="text-md">Rp{price}</Text>
            <View  className="flex flex-row items-center">
              <TouchableOpacity
                onPress={handleDecrease}
              >
                <MaterialCommunityIcons name="minus" color="black" size={16} />
              </TouchableOpacity>

              <TextInput
                style={{
                  textAlign: "center",
                  margin: 10,
                  fontSize: 15,
                }}
                keyboardType="numeric"
                value={quantity.toString()}
                onChangeText={(e) => setquantity(e)}
              />

              <TouchableOpacity
                onPress={handleIncrease}
               
              >
                <MaterialCommunityIcons name="plus" color="black" size={16} />
              </TouchableOpacity>
            </View>
        </View>
      </View>
      <View>
        <View className="flex justify-between items-end py-2 gap-7">
          <View className="flex flex-row">
            <MaterialCommunityIcons
              name="store"
              color="black"
              size={20}
            />
            <Text className="text-sm">{stock}</Text>
          </View>
          <TouchableOpacity
            onPress={() => addToCart(quantity)}
          >
            <MaterialCommunityIcons
              name="cart"
              color="black"
              size={19}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default HomeUser;
