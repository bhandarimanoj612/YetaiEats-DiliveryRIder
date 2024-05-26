import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const AboutUs = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/splash.png")}
        style={styles.image}
      />
      <Text style={styles.heading}>About Yetai Eats</Text>
      <Text style={styles.description}>
        Yetai Eats is a platform connecting hungry customers with delivery
        riders. As a delivery rider for Yetai Eats, you'll be part of a
        dedicated team delivering delicious food straight to customers'
        doorsteps. Our mission is to provide high-quality, affordable meals
        while offering flexible earning opportunities for delivery riders.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
  },
});

export default AboutUs;
