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
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API_URL } from "../constantAPI";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
const CreateProduct = ({ navigation }) => {
  const [nameProduct, setnameProduct] = useState("");
  const [priceProduct, setpriceProduct] = useState("");
  const [stockProduct, setstockProduct] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [standProduct, setstandProduct] = useState("");
  const [descProduct, setdescProduct] = useState("");
  const [displayPhoto, setdisplayPhoto] = useState("");
  const [categoryProduct, setDataCategory] = useState([]);
 
  const createProduct = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      await axios.post(`${API_URL}create-product-url`,{
        name: nameProduct,
        price: priceProduct,
        stock: stockProduct,
        photo: displayPhoto,
        desc: descProduct,
        categories_id: selectedCategory,
        stand: standProduct,
        
      }, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      Alert.alert("Success create");
      navigation.navigate("MainCanteen", { createProductCallBack: displayPhoto})
    } catch (e) {
      console.log(e);
    }
  }

  
  const getDataCategory = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get(`${API_URL}categories`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
        setDataCategory(response.data.categories);
    } catch (e) {
      console.log(e);
    }
  }
 
  useEffect(()=>{
    getDataCategory();
  })
    
  const textInputStyle =
    "tracking-widest border p-3 py-3 text-base border-slate-900 rounded-lg w-full";

  return (
    <GestureHandlerRootView>
      <SafeAreaView className="bg-white w-full h-full">
        <ScrollView>
          <View className=" w-full p-3 py-4 border-b border-slate-300 flex flex-row  items-center bg-white gap-3 ">
            <View className="flex flex-row items-center">
              <TouchableOpacity
                onPress={() => navigation.navigate("MainCanteen")}
              >
                <MaterialCommunityIcons
                  name="arrow-left"
                  color="black"
                  size={26}
                />
              </TouchableOpacity>
            </View>
            <View>
              <Text className="font-bold text-lg">Create Product</Text>
            </View>
          </View>
          <View className="p-3">
            <View>
              <Text className="text-md py-2">Name</Text>
              <TextInput
                className={`${textInputStyle}`}
                placeholder="Name"
                value={nameProduct}
                onChangeText={(text) => setnameProduct(text)}
              />
            </View>
            <View>
              <Text className="text-md py-2">Price</Text>
              <TextInput
                className={`${textInputStyle}`}
                placeholder="Price"
                value={priceProduct}
                onChangeText={(text) => setpriceProduct(text)}
              />
            </View>
            <View>
              <Text className="text-md py-2">Stock</Text>
              <TextInput
                className={`${textInputStyle}`}
                placeholder="Stock"
                value={stockProduct}
                onChangeText={(text) => setstockProduct(text)}
              />
            </View>
            <View>
              <Text className="text-md py-2">Description</Text>
              <TextInput
                className={`${textInputStyle}`}
                placeholder="Description"
                value={descProduct}
                onChangeText={(text) => setdescProduct(text)}
              />
            </View>
            <View>
              <Text className="text-md py-2">stand</Text>
              <TextInput
                className={`${textInputStyle}`}
                placeholder="Stand"
                value={standProduct}
                onChangeText={(text) => setstandProduct(text)}
              />
            </View>
            <View>
              <Text className="text-md py-2">Select Category</Text>
              <Picker
                className={`${textInputStyle}`}
                selectedValue={selectedCategory}
                onValueChange={(item) => setSelectedCategory(item)}
              >
                {categoryProduct.map((item, index) => (
                  <Picker.Item key={index} label={item.name} value={item.id} />
                ))}
              </Picker>
            </View>

            <View className="mb-3">
              <Text className="text-md py-2">Photo URL</Text>
              <TextInput
                className={`${textInputStyle}`}
                placeholder="Photo"
                value={displayPhoto}
                onChangeText={(text) => setdisplayPhoto(text)}
              />
            </View>
            <View>
              <TouchableOpacity
                className="bg-slate-900 p-4 rounded-lg"
                onPress={createProduct}
              >
                <Text className="text-base text-white font-bold text-center">
                  Continue
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default CreateProduct;
