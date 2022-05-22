import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import { View, Text, Dimensions, StyleSheet, Platform } from 'react-native';


const horizontalMargin = 4;
const slideWidth = 200;
const sliderWidth = Dimensions.get('window').width;
const itemWidth = slideWidth + horizontalMargin * 2;
const itemHeight = 300;

const TVShowCarousel = () => {
  const [entries, setEntries] = useState([]);
  const carouselRef = useRef(null);

  useEffect(() => {
    const url = `https://api.themoviedb.org/3/trending/tv/week?api_key=e6a1f542151faa8fa248872d0b421cad`;
    const fetchMovies = async () => {
      try {
        const response = await axios.get(url);
        // console.log(response.data.results);
        setEntries(response.data.results);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMovies();
  }, []);

  const renderItem = ({ item }, parallaxProps) => {
    const basePosterPath = "https://image.tmdb.org/t/p/original";
    return (
      <View>
        <View style={styles.slide}>
          <ParallaxImage
            source={{ uri: basePosterPath + item.poster_path }}
            containerStyle={styles.imageContainer}
            style={styles.slideInnerContainer}
            parallaxFactor={0.6}
            {...parallaxProps}
          />
        </View>
        <Text style={styles.titleItem} numberOfLines={3}>
          {item.name}
        </Text>
      </View>

    );
  };

  return (
    <View style={styles.container}>
      <Carousel
        ref={carouselRef}
        sliderWidth={sliderWidth}
        itemWidth={itemWidth}
        data={entries}
        renderItem={renderItem}
        hasParallaxImages={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }),
    backgroundColor: "#15141F",
    borderRadius: 8,
  },
  titleItem: {
    color: "white",
    fontSize: 16,
    marginTop: 10,
    marginLeft: horizontalMargin
  },
  slide: {
    width: itemWidth,
    height: itemHeight,
    paddingHorizontal: horizontalMargin
  },
  slideInnerContainer: {
    width: slideWidth,
    flex: 1,
    resizeMode: 'contain',
  }
});

export default TVShowCarousel;