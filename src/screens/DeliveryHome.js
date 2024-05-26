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
import { BaseUrl } from "../../Database/BaseUrl";
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";

const DeliveryHome = () => {
  const [progressMessages, setProgressMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigation = useNavigation();

  const fetchProgressMessages = async () => {
    try {
      const response = await axios.get(
        `${BaseUrl}DeliveryRider/GetProgress/DiliveryRider?Name=ronaldomanoj25`
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

  const markDelivered = async (orderId) => {
    try {
      const response = await axios.post(
        `${BaseUrl}DeliveryRider/MarkDelivered?orderId=${orderId}`
      );
      // Handle successful response (e.g., display success message)
      Alert.alert("Delivery delivered successfully");
      fetchProgressMessages();
      console.log(response.data);
    } catch (error) {
      // Handle error (e.g., display error message)
      console.error("Error marking order as delivered:", error);
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#32CD32" />
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
    <View style={styles.container} className="font-bold">
      <View>
        <View className="bg-dark-800 p-2 flex-row   ">
          <TouchableOpacity
            className="bg-red-400 rounded-full p-2 "
            onPress={() => {
              navigation.navigate("DeliveryPendingRequest");
            }}
          >
            <Text className="text-white p-1 font-bold text-lg">
              New Delivery Request
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View className="m-5 bg-yellow-400 rounded-xl p-3">
        <Text style={styles.title} className="text-white">
          Delivery Progress :-
        </Text>
      </View>

      <FlatList
        data={progressMessages}
        keyExtractor={(item, index) =>
          item && item.Id ? item.Id.toString() : index.toString()
        }
        renderItem={({ item }) => (
          <View style={styles.messageContainer} className="">
            <Text>Customer Name : {item.customerName}</Text>
            {renderOrderDetails(item.orderDetails)}
            <Text>
              Status :
              <Text className="text-red-500 font-bold">
                {item.diliveryStatus}
              </Text>
            </Text>
            <Text>
              Created Time :
              <Text className="text-black font-bold">
                {formatTime(item.diliveredTime)}
              </Text>
            </Text>
            <View className="bg-green-600 rounded-full m-3">
              <Button
                title="Mark Delivered"
                color={"white"}
                onPress={() => markDelivered(item.orderId)}
              />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text className="text-red-600">No Delivery messages available</Text>
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

export default DeliveryHome;
