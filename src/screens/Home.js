import React from "react";
import { ScrollView, View, Text, StyleSheet, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import HotMovieCarousel  from "../components/HotMovieCarousel";
import UpcommingMovieCarousel from "../components/UpcommingMovieCarousel"
import TVShowCarousel from "../components/TVShowCarousel";
import HotActorCarousel from "../components/HotActorCarousel";

const Home = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <MaterialCommunityIcons name="movie-roll" size={54} color="tomato" />
          <View style={styles.headerTitle}>
            <Text style= {{
              color: 'white',
              fontSize: 30
            }}>Trang chủ</Text>
          </View>
        </View>
        <View style={styles.carouselContainer}>
          <Text style={styles.carouselTitle}>Cooming soon</Text>
          <UpcommingMovieCarousel/>
        </View>
        <View style={styles.carouselContainer}>
          <Text style={styles.carouselTitle}>Phim hot</Text>
          <HotMovieCarousel navigation={navigation}/>
        </View>
        <View style={styles.carouselContainer}>
          <Text style={styles.carouselTitle}>TV show</Text>
          <TVShowCarousel />
        </View>
        <View style={styles.carouselContainer}>
          <Text style={styles.carouselTitle}>Diễn viên hot</Text>
          <HotActorCarousel />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    marginHorizontal: 0,
  },
  carouselTitle: {
    marginLeft: 30,
    marginBottom: 15,
    color: "#FFFFFF",
    fontSize: 25,
  },
  carouselContainer: {
    marginTop: 30,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 30,
    paddingLeft: 20

  },
  headerTitle: {
    color: 'white',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'start',
    marginLeft: 10
  }
});

export default Home;