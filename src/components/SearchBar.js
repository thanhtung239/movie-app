import { View, Text, StyleSheet } from "react-native";

const SearchBar = () => {
  return (
    <View>
      <Text style={styles.searchBar}>Search Bar</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    searchBar: {
        color: "white",
    }
});

export default SearchBar;
