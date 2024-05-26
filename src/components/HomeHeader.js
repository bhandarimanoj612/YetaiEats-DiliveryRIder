import { View, Text, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { useAuth } from "../ContextHook/AuthProvider";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

const HomeHeader = () => {
  // Use the useAuth hook to access the user object
  const { user, refreshUser } = useAuth(); // Assuming there's a function to refresh user data

  useFocusEffect(
    React.useCallback(() => {
      // Fetch user data when the screen gains focus
      refreshUser().then(() => {
        setUsername(user ? user.username : null);
      });

      // Clean up function to clear the interval when the component unmounts
      return () => {};
    }, [])
  );

  return (
    <View className="bg-green-600 w-80 rounded-2xl ml-9 h-14 flex-row justify-around">
      {/*This is for the location section*/}
      <View className=" flex mr-14 ">
        <Text className="font-serif text-lg text-white ml-2">Hello</Text>
        <Text className="font-medium text-white text-lg ml-2 mb-2">
          {user?.username}
        </Text>
      </View>
    </View>
  );
};

export default HomeHeader;
