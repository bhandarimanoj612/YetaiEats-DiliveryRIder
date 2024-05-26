import { View, Text } from "react-native";
import { ScrollView } from "react-native-virtualized-view";
import React, { useEffect } from "react";
import HomeHeader from "../components/HomeHeader";
import DeliveryHome from "./DeliveryHome";

const HomeScreen = () => {
  // const { user } = useAuth(); // Assuming there's a function to refresh user data
  // const navigation = useNavigation();

  return (
    <ScrollView className="mt-12">
      <HomeHeader />
      <Text className="ml-4 font-semibold text-xl mt-3 mb-2">
        Welcome back !
      </Text>
      <DeliveryHome />
    </ScrollView>
  );
};

export default HomeScreen;
