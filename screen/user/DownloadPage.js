import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native";
import {
  GestureHandlerRootView,
  RefreshControl,
} from "react-native-gesture-handler";
import { API_URL } from "../constantAPI";
import { printToFileAsync } from "expo-print";
import { shareAsync } from "expo-sharing";

const DownloadPage = ({ route }) => {
  const [downloadData, setDownloadData] = useState([]);
  const { order_code } = route.params || {};
  const [refresh, setRefresh] = useState(false);

  const getDataHistory = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get(`${API_URL}history/${order_code}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDownloadData(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const printHistory = async ()=>{
    const file = await printToFileAsync({
      html: htmlToPrint,
      base64 : false
    });
    await shareAsync(file.uri);
  }

   let htmlToPrint = `
   <html>
   <head>
     <style>
       body {
         text-align: center;
       }
 
       h1 {
         margin-top: 20px;
       }
 
       .order-item {
         margin-top: 10px;
         border-bottom: 1px solid #ccc;
         padding: 10px;
       }
 
       .product-info {
         display: flex;
         justify-content: space-between;
       }
 
       .status-info {
         display: flex;
         justify-content: space-between;
         margin-top: 5px;
       }
 
       .total-price {
         display: flex;
         margin-top: 20px;
         font-weight: bold;
         justify-content: space-between;
       }
     </style>
   </head>
   <body>
     <h1>${JSON.stringify(order_code)}</h1>
     ${
       downloadData.report
         ? downloadData.report
             .map(
               (value, index) => `
             <div class="order-item" key=${index}>
               <div class="product-info">
                 <span>${value.products.name}</span>
                 <span>${value.quantity}x</span>
                 <span>Rp${value.products.price}</span>
               </div>
               <div class="status-info">
                 <span class="font-bold">Status:</span>
                 <span class="font-bold">${value.status}</span>
               </div>
             </div>
           `
             )
             .join("")
         : ""
     }
     <div class="total-price">
       <h3>Total Harga: </h3>
       <h3>Rp${downloadData.totalPrice}</h3>
     </div>
   </body>
 </html>`;

  const onRefresh = () => {
    setRefresh(true);
    getDataHistory();
    setTimeout(() => {
      setRefresh(false);
    }, 2000);
  };

  useEffect(() => {
    getDataHistory();
  }, []);

  return (
    <GestureHandlerRootView>
      <SafeAreaView className="bg-white w-full h-full">
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
          }
        >
          <View className="p-3">
            <View className="border border-slate-300 p-3 rounded-md">
              <View>
                {downloadData.report?.map((value, index) => (
                  <View
                    className="flex flex-col justify-between border-b border-slate-300 py-3"
                    key={index}
                  ><Text className="text-center text-base font-bold mb-6">{value.order_code}</Text>
                    <View className="flex flex-row justify-between">
                      <Text>{value.products.name}</Text>
                      <Text>{value.quantity} x </Text>
                      <Text>Rp{value.products.price}</Text>
                    </View>
                    <View className="flex flex-row justify-between">
                      <View>
                        <Text className="font-bold ">Status:</Text>
                      </View>
                      <View>
                        <Text className="font-bold">{value.status}</Text>
                      </View>
                    </View>
                  </View>
                ))}
                <View className="flex flex-row justify-between mt-3">
                  <View>
                    <Text className="font-bold text-base">Total Harga</Text>
                  </View>
                  <View>
                    <Text className="font-bold text-base">
                      Rp{downloadData.totalPrice}
                    </Text>
                  </View>
                </View>
              </View>
              <View>
                <TouchableOpacity
                  className=" bg-cyan-500 p-3 rounded-md items-center mt-5"
                  onPress={printHistory}
                >
                  <Text className="text-white font-bold">Save as PDF</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default DownloadPage;
