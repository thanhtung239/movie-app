import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, Pressable, ScrollView } from "react-native";
import axios from "axios";
import { Ionicons, MaterialIcons, AntDesign } from "@expo/vector-icons";
import { useFonts } from "expo-font";

const TvShowDetail = ({ route, navigation }) => {

  const imageRrl = "https://image.tmdb.org/t/p/original/";
  const detailUrl = "https://api.themoviedb.org/3/tv/";
  const optionUrl =
    "?api_key=e6a1f542151faa8fa248872d0b421cad&language=vi&append_to_response=videos";

  const [state, setState] = useState({
    s: "",
  });
  const [entries, setEntries] = useState([]);

  let [fontsLoaded] = useFonts({
    Lato: require("../../assets/fonts/Lato-Regular.ttf"),
    "Lato-Bold": require("../../assets/fonts/Lato-Bold.ttf"),
  });

  const reformatDate = (dateStr) => {
    if (typeof dateStr !== "undefined") {
      const dArr = dateStr.split("-");
      return dArr[2] + "-" + dArr[1] + "-" + dArr[0];
    }
    return;
  };
  useEffect(() => {
    const getTvShowDetail = async () => {
      const itemId = route.params.id;
      console.log(detailUrl + itemId + optionUrl);
      try {
        const response = await axios.get(detailUrl + itemId + optionUrl);
        setEntries(response.data);
        console.log(entries);
      } catch (error) {
        console.error(error);
      }
    };
    getTvShowDetail();
  }, []);

  return (
    <View style={styles.center}>
      <View style={styles.modal}>
        <Image
          source={{ uri: imageRrl + entries.backdrop_path }}
          style={styles.detailImage}
          resizeMode="contain"
        />
        <Pressable
          onPress={() => navigation.navigate("Home")}
          style={styles.backButton}
        >
          <Ionicons name="chevron-back-sharp" size={35} color="white" />
        </Pressable>
        <Text style={styles.detailTitle}>{entries.name}</Text>
        <View style={styles.detailContainer}>
          <View style={{ flexDirection: "row" }}>
            <MaterialIcons name="access-time" size={24} color="white" style={{ marginLeft: 5 }} />
            <Text style={styles.detailText}>{entries.runtime} phút</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <AntDesign name="star" size={24} color="yellow" />
            <Text style={styles.detailText}>
              {entries.vote_average} (IMDb)
            </Text>
          </View>
        </View>
        <View style={styles.detailContainer}>
          <View style={{ flexDirection: "row" }}>
            <AntDesign name="calendar" size={24} color="white" style={{ marginLeft: 5 }} />
            <Text style={styles.detailText}>
              Ngày công chiếu: {reformatDate(entries.release_date)}
            </Text>
          </View>
        </View>
        <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }} style={styles.overviewContainer}>
          <Text style={styles.overviewTitle}>Tóm tắt</Text>
          <Text style={styles.overviewText}>{entries.overview}</Text>
        </ScrollView>
      </View>
    </View>
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

export default TvShowDetail;
