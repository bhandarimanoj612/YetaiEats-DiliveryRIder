import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../src/screens/HomeScreen";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Account from "../src/screens/Account";
import Map from "../src/screens/Map";
import DeliverySucess from "../src/screens/DeliverySucess";
import { Text } from "react-native";

const Tab = createBottomTabNavigator();

const BottomNav = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name="home"
              size={focused ? 28 : 20}
              color={focused ? "#32CD32" : "gray"}
            />
          ),
          tabBarLabel: ({ focused, color }) => (
            <Text style={{ color: focused ? "#32CD32" : "gray" }}>Home</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Maps"
        component={Map}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons
              name="map-search"
              size={focused ? 28 : 20}
              color={focused ? "#32CD32" : "gray"}
            />
          ),
          tabBarLabel: ({ focused, color }) => (
            <Text style={{ color: focused ? "#32CD32" : "gray" }}>Maps</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Delivered"
        component={DeliverySucess}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons
              name="cart-arrow-down"
              size={focused ? 28 : 20}
              color={focused ? "#32CD32" : "gray"}
            />
          ),
          tabBarLabel: ({ focused, color }) => (
            <Text style={{ color: focused ? "#32CD32" : "gray" }}>
              Delivered
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={Account}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons
              name="account"
              size={focused ? 28 : 20}
              color={focused ? "#32CD32" : "gray"}
            />
          ),
          tabBarLabel: ({ focused, color }) => (
            <Text style={{ color: focused ? "#32CD32" : "gray" }}>Account</Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNav;
