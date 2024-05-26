import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SignUp from "../src/screens/SignUp";
import SignupHelp from "../src/screens/SignupHelp";
import LogIn from "../src/screens/LogIn";
import BuyerSignUp from "../src/screens/BuyerSignUp";
import IndividualSignUp from "../src/screens/IndividualSignUp";
import BusinessSignUp from "../src/screens/BusinessSignUp";
import DeliveryRiderSighup from "../src/screens/DeliveryRiderSighup";
import Route from "./Route";
import Profile from "../src/screens/Profile";
import AuthStorage from "../src/components/AuthStorage";
import AboutUs from "../src/screens/AboutUs";
import DeliveryHome from "../src/screens/DeliveryHome";
import DeliveryPendingRequest from "../src/screens/DeliveryPendingRequest";
import Map from "../src/screens/Map";
import DeliverySucess from "../src/screens/DeliverySucess";

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const authStorage = new AuthStorage();
      const token = await authStorage.getAccessToken();
      setIsLoggedIn(!!token);
      setLoading(false);
    };

    checkAuth();
  }, []);

  if (loading) {
    return null; // You may want to show a loading indicator here
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={isLoggedIn ? "HomeScreen" : "LogIn"}
      >
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="SignupHelp" component={SignupHelp} />
        <Stack.Screen name="LogIn" component={LogIn} />
        <Stack.Screen name="HomeScreen" component={Route} />
        <Stack.Screen name="BuyerSignUp" component={BuyerSignUp} />
        <Stack.Screen name="IndividualSignUp" component={IndividualSignUp} />
        <Stack.Screen name="BusinessSignUp" component={BusinessSignUp} />
        <Stack.Screen name="Map" component={Map} />
        <Stack.Screen name="DeliveryHome" component={DeliveryHome} />
        <Stack.Screen
          name="DeliveryPendingRequest"
          component={DeliveryPendingRequest}
        />
        <Stack.Screen name="DeliverySucess" component={DeliverySucess} />
        {/* for seller */}
        <Stack.Screen name="AboutUs" component={AboutUs} />
        <Stack.Screen
          name="DeliveryRiderSighup"
          component={DeliveryRiderSighup}
        />
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
