import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Category = () => {
  return (
    <View style={styles.center}>
      <Text>This is the Category screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    color: "white"
  },
});

export default Category;
