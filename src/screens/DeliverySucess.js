import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Button,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from "react-native";
import axios from "axios";

import { useNavigation } from "@react-navigation/native";
import { BaseUrl } from "../../Database/BaseUrl";

const DeliverySucess = () => {
  const [progressMessages, setProgressMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigation = useNavigation();
  const fetchProgressMessages = async () => {
    try {
      const response = await axios.get(
        `${BaseUrl}DeliveryRider/DiliviredSucess/DiliveryRider?Name=ronaldomanoj25`
      );
      setProgressMessages(response.data);
      setLoading(false);
    } catch (error) {
      setError("Error fetching progress messages");
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProgressMessages();
  }, []);

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#32CD32" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text className="text-red-400">{error}</Text>
      </View>
    );
  }

  const renderOrderDetails = (orderDetails) => {
    const detailsArray = orderDetails.split(", ");
    return detailsArray.map((detail, index) => {
      if (detail.includes("Order ID")) return null; // Exclude Order ID
      const [key, value] = detail.split(": ");
      return (
        <Text key={index}>
          <Text style={styles.boldText}>{key}: </Text>
          {value}
        </Text>
      );
    });
  };

  // Function to format time in "YYYY MMM D h:mm A" format
  const formatTime = (timeString) => {
    const date = new Date(timeString);
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    };
    return date.toLocaleDateString("en-US", options);
  };
  return (
    <View style={styles.container} className="mt-8 font-bold">
      <View className="items-start justify-start">
        <View className="bg-dark-800 p-2 flex-row mt-3 mr-72">
          <TouchableOpacity
            className="bg-red-200 rounded-l-full p-2 "
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Text className=" font-bold text-lg">Back</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View className="m-5 bg-green-400 rounded-full p-3">
        <Text style={styles.title} className="">
          Delivered Item
        </Text>
      </View>

      <FlatList
        data={progressMessages}
        shouldRasterizeIOS={false}
        keyExtractor={(item, index) =>
          item && item.Id ? item.Id.toString() : index.toString()
        }
        renderItem={({ item }) => (
          <View style={styles.messageContainer} className="">
            <Text>Customer Name : {item.customerName}</Text>
            {renderOrderDetails(item.orderDetails)}
            <Text>
              Status :
              <Text className="text-green-700 font-bold">
                {item.diliveryStatus}
              </Text>
            </Text>
            <Text>
              Created Time :
              <Text className="text-black font-bold">
                {formatTime(item.diliveredTime)}
              </Text>
            </Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingContainer: {
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  messageContainer: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "blue",
    borderRadius: 5,
  },
  boldText: {
    fontWeight: "bold",
  },
});

export default DeliverySucess;
