import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Image,
  Pressable,
  Modal,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialIcons, AntDesign } from "@expo/vector-icons";
import { useFonts } from "expo-font";

import axios from "axios";

const Category = () => {
  const apiurl =
    "https://api.themoviedb.org/3/search/movie?api_key=e6a1f542151faa8fa248872d0b421cad&query=";
  const imageurl = "https://image.tmdb.org/t/p/original/";
  const detailurl = "https://api.themoviedb.org/3/movie/";
  const optionurl =
    "?api_key=e6a1f542151faa8fa248872d0b421cad&language=vi&append_to_response=videos";

  const [state, setState] = useState({
    s: "",
  });

  const [entries, setEntries] = useState([]);
  const [selected, setSelected] = useState({});

  let [fontsLoaded] = useFonts({
    "Lato": require("../../assets/fonts/Lato-Regular.ttf"),
    "Lato-Bold": require("../../assets/fonts/Lato-Bold.ttf"),
  });

  const convertString = (s) => {
    return s.replace(/ /g, "+");
  };

  const reformatDate = (dateStr) => {
    if (typeof dateStr !== "undefined") {
      const dArr = dateStr.split("-");
      return dArr[2] + "-" + dArr[1] + "-" + dArr[0];
    }
    return;
  };

  // useEffect(() => {
  const search = async () => {
    try {
      const response = await axios.get(
        apiurl + convertString(state.s) + "&language=vi"
      );
      setEntries(response.data.results);
    } catch (error) {
      console.error(error);
    }
  };

  const openPopup = async (id) => {
    try {
      const response = await axios.get(detailurl + id + optionurl);
      console.log(id);
      setSelected(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const renderItem = ({ item }) => {
    return (
      <Pressable
        key={item.id}
        style={styles.result}
        onPress={() => openPopup(item.id)}
      >
        <Image
          source={{ uri: imageurl + item.poster_path }}
          style={styles.searchImage}
          resizeMode="contain"
        />
        <Text style={styles.heading}>{item.title}</Text>
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={styles.center}>
      <Text style={styles.titleText}>
        Tìm kiếm phim, chương trình truyền hình và nhiều hơn thế nữa...
      </Text>
      <View style={styles.searchView}>
        <TextInput
          style={styles.searchBox}
          placeholder="Nhập tên phim..."
          onChangeText={(text) =>
            setState((prevState) => {
              return { prevState, s: text };
            })
          }
          onSubmitEditing={search}
        />
      </View>
      <FlatList
        numColumns={2}
        key={"#"}
        data={entries}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        //contentContainerStyle={{ flex: 1 }}
        // columnWrapperStyle={{ justifyContent: 'space-between' }}
      />

      <Modal
        animationType="fade"
        transparent={false}
        visible={typeof selected.title !== "undefined"}
      >
        <View style={styles.modal}>
          <Image
            source={{ uri: imageurl + selected.backdrop_path }}
            style={styles.detailImage}
            resizeMode="contain"
          />
          <Pressable
            onPress={() =>
              setSelected(() => {
                return {};
              })
            }
            style={styles.backButton}
          >
            <Ionicons name="chevron-back-sharp" size={35} color="white" />
          </Pressable>
          <Text style={styles.detailTitle}>{selected.title}</Text>
          <View style={styles.detailContainer}>
            <View style={{ flexDirection: "row" }}>
              <MaterialIcons name="access-time" size={24} color="white" style={{ marginLeft: 5 }} />
              <Text style={styles.detailText}>{selected.runtime} phút</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <AntDesign name="star" size={24} color="yellow" />
              <Text style={styles.detailText}>
                {selected.vote_average} (IMDb)
              </Text>
            </View>
          </View>
          <View style={styles.detailContainer}>
            <View style={{ flexDirection: "row" }}>
              <AntDesign name="calendar" size={24} color="white" style={{ marginLeft: 5 }} />
              <Text style={styles.detailText}>
                Ngày công chiếu: {reformatDate(selected.release_date)}
              </Text>
            </View>
          </View>
            <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }} style={styles.overviewContainer}>
              <Text style={styles.overviewTitle}>Tóm tắt</Text>
              <Text style={styles.overviewText}>{selected.overview}</Text>
            </ScrollView>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "flex-start",
  },
  searchView: {
    alignItems: "center",
  },
  titleText: {
    color: "white",
    padding: 24,
    fontSize: 18,
    lineHeight: 32,
  },
  categoryText: {
    color: "white",
    paddingTop: 24,
    fontSize: 16,
  },
  searchBox: {
    fontSize: 20,
    fontWeight: "300",
    padding: 10,
    width: "85%",
    backgroundColor: "white",
    borderRadius: 8,
    marginBottom: 40,
  },
  result: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 10,
    margin: 10,
  },
  heading: {
    color: "white",
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
  },
  searchImage: {
    width: "85%",
    height: 250,
    overflow: "hidden",
    borderRadius: 30,
    marginBottom: 10,
  },
  modal: {
    flex: 1,
    backgroundColor: "#15141F",
  },
  detailImage: {
    width: "100%",
    height: 220,
    marginBottom: 30,
  },
  detailTitle: {
    color: "white",
    fontSize: 30,
    marginBottom: 15,
    paddingBottom: 20,
    paddingHorizontal: 7,
    fontFamily: "Lato-Bold",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "white",
  },
  detailText: {
    marginLeft: 5,
    paddingHorizontal: 5,
    color: "white",
    fontSize: 18,
    fontFamily: "Lato",
  },
  detailContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  overviewContainer: {
    flex: 1,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "white",
    paddingVertical: 20,
  },
  overviewText: {
    marginTop: 5,
    marginHorizontal: 15,
    color: "white",
    fontSize: 16,
    fontFamily: "Lato",
    textAlign: "justify",
    lineHeight: 20,
  },
  overviewTitle: {
    marginLeft: 10,
    color: "white",
    fontSize: 30,
    fontFamily: "Lato",
    paddingBottom: 10,
  },
  backButton: {
    position: 'absolute',
    top: 15,
    left: 4,
    opacity: 0.5
  }
});


export default Category;