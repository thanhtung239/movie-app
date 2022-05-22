import React from "react";
import { View, Text, StyleSheet } from "react-native";

const MovieDetail = () => {
  return (
    <View style={styles.center}>
      <Text style= {{ color: 'white'}}>This is the MovieDetail screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
});

export default MovieDetail;