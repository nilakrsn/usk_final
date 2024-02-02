import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  GestureHandlerRootView,
  RefreshControl,
} from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { API_URL } from "../constantAPI";

const ProductCanteen = ({ navigation, route }) => {
  const [dataProduk, setDataProduk] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const {createProductCallBack, editProductCallBack} = route.params || {};

  const getDataProduk = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get(`${API_URL}kantin`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDataProduk(response.data);
    } catch (e) {
      console.log(e);
    }
  };
  
  const deleteProduct = async (id) =>{
    try {
      const token = await AsyncStorage.getItem("token");
      await axios.delete(`${API_URL}delete-product-url/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      Alert.alert("Success delete product");
      getDataProduk();
    } catch (e) {
      console.log(e);
    }
  }

  const onRefresh = () => {
    setRefresh(true);
    getDataProduk();
    setTimeout(() => {
      setRefresh(false);
    }, 2000);
  };

  useEffect(() => {
    getDataProduk();
    if(createProductCallBack || editProductCallBack){
      getDataProduk();
    }
  }, [createProductCallBack, editProductCallBack]);

  return (
    <GestureHandlerRootView>
      <SafeAreaView className="bg-white w-full h-full">
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
          }
        >
          <View className=" w-full p-3 py-4 border-slate-300 flex flex-row justify-between items-center bg-white ">
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
              <View
                key={index}
                className="flex px-3 py-2 border border-slate-300 bg-white"
              >
                <View className="flex justify-between flex-row">
                  <View className="flex-row flex">
                    <View className="bg-cyan-500 rounded-lg mr-3 basis-auto">
                      <Image
                        className="h-16 w-20 rounded-lg"
                        source={{
                          uri: `${item.photo}`,
                        }}
                      />
                    </View>
                    <View>
                      <Text className="font-bold text-base">
                        {item.name} |{" "}
                        <MaterialCommunityIcons
                          name="store"
                          color="black"
                          size={15}
                        />
                        <Text className="text-sm">{item.stand}</Text>
                      </Text>
                      <Text className="text-sm  -mt-1">Rp{item.price}</Text>
                      <View className="flex ">
                        <Text className="text-sm">Stock: {item.stock}</Text>
                      </View>
                     
                    </View>
                  </View>
                  <View className="flex flex-row items-center gap-3">
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
                          name="trash-can"
                          size={24}
                          color="black"
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
                          name="pencil"
                          size={24}
                          color="black"
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
