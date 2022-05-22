import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchBar from "../components/SearchBar";

const Category = () => {



  return (
    <SafeAreaView style={styles.center}>
      <Text style={styles.titleText}>Tìm kiếm phim, chương trình truyền hình và nhiều hơn thế nữa...</Text>
      <SearchBar />
      <View style={styles.categoryView}>
        <Text style={styles.categoryText}>Phim lẻ</Text>
        <Text style={styles.categoryText}>Phim bộ</Text>
        <Text style={styles.categoryText}>TV Shows</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "flex-start",
    // alignItems: "center",
    // textAlign: "center",
    // color: "white",
  },
  categoryView: {
    flex: 1,
    flexDirection: "row",
    color: "white",
    justifyContent: "space-between",
    paddingHorizontal: 12,
  },
  titleText: {
    color: "white",
    paddingTop: 24,
    fontSize: 18,
    lineHeight: 32,
  },
  categoryText: {
    color: "white",
    paddingTop: 24,
    fontSize: 16,
  }
});

export default Category;
