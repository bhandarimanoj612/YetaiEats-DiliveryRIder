import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  Alert,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import { BaseUrl } from "../../Database/BaseUrl";
import { useNavigation } from "@react-navigation/native";

const DeliveryPendingRequest = () => {
  const [pendingMessages, setPendingMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigation = useNavigation();
  const fetchPendingMessages = async () => {
    try {
      const userId = "a4dd70c1-cfc2-4c05-9044-a416c5bcddd0"; // Replace with actual user ID
      const response = await axios.get(
        `${BaseUrl}DeliveryRider/GetPendingMessages?userId=${userId}`
      );
      setPendingMessages(response.data);
      setLoading(false);
    } catch (error) {
      setError("Error fetching pending messages");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingMessages();
  }, []);

  const handleAccept = async (userId) => {
    try {
      const response = await axios.post(
        `${BaseUrl}DeliveryRider/AcceptMessage?userId=${userId}`
      );
      console.log(response.data); // Log the response from the backend
      if (response.status === 200) {
        // You can navigate after accepting the message if needed
        // navigation.navigate("DeliveryHome");

        Alert.alert("Message accepted successfully");
        navigation.goBack();
      }
      // Refresh the pending messages after accepting
      fetchPendingMessages();
    } catch (error) {
      console.error("Error accepting message:", error);
    }
  };

  const handleReject = async (userId) => {
    try {
      const response = await axios.post(
        `${BaseUrl}DeliveryRider/RejectMessage?userId=${userId}`
      );
      console.log(response.data); // Log the response from the backend
      // Refresh the pending messages after rejecting
      fetchPendingMessages();
      Alert.alert("Message rejected successfully");
    } catch (error) {
      console.error("Error rejecting message:", error);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#32CD32" />
      </View>
    );
  }

  if (error) {
    return (
      <View className=" items-center justify-center mt-96 ">
        <Text className="text-red-500 items-center justify-center ">
          No new request Has been added till now
        </Text>
      </View>
    );
  }

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

  const formatOrderDetails = (orderDetails) => {
    const detailsArray = orderDetails.split(", ");
    return detailsArray
      .filter((detail) => !detail.includes("Order ID")) // Exclude Order ID
      .map((detail, index) => (
        <Text key={index} style={styles.messageText}>
          {detail}
        </Text>
      ));
  };

  return (
    <View style={styles.container}>
      <View ClassName="p-3">
        <Text className="text-white bg-yellow-400 p-3 m-5 text-l ">
          Delivery Pending Requests
        </Text>
      </View>
      {pendingMessages.map((message, index) => (
        <View key={index} style={styles.messageContainer}>
          {formatOrderDetails(message.message)}
          <Text style={styles.dateTimeText}>
            {formatTime(message.dateTime)}
          </Text>
          <View style={styles.buttonContainer}>
            <View className="bg-green-600 rounded-xl">
              <Button
                title="Accept"
                color="white"
                onPress={() => handleAccept(message.userId)}
              />
            </View>
            <View className="bg-red-600 rounded-xl">
              <Button
                title="Reject"
                color="white"
                onPress={() => handleReject(message.userId)}
              />
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    marginTop: 35,
    alignItems: "center",
    // backgroundColor: "#ffffff",
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
  messageContainer: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 5,
    width: "80%",
  },
  messageText: {
    fontSize: 16,
    marginBottom: 5,
  },
  dateTimeText: {
    fontSize: 12,
    color: "#666666",
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

export default DeliveryPendingRequest;
