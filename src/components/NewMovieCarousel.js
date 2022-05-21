import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import Carousel, { ParallaxImage, Pagination } from 'react-native-snap-carousel';
import { View, Dimensions, StyleSheet, Platform } from 'react-native';


const horizontalMargin = 4;
const slideWidth = 200;
const sliderWidth = Dimensions.get('window').width;
const itemWidth = slideWidth + horizontalMargin * 2;
const itemHeight = 300;

const HotMovieCarousel = () => {
  const [entries, setEntries] = useState([]);
  const [index, setIndex] = React.useState(0);
  const carouselRef = useRef(null);

  useEffect(() => {
    const url = `https://api.themoviedb.org/3/movie/upcoming?api_key=e6a1f542151faa8fa248872d0b421cad`;
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
      </View>

    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.carouselContainer}>
        <Carousel
          ref={carouselRef}
          sliderWidth={itemWidth}
          itemWidth={itemWidth}
          data={entries}
          renderItem={renderItem}
          hasParallaxImages={true}
          onSnapToItem={(index) => setIndex(index)}
        />
      </View>
      <View style={styles.paginationContainer}>
        <Pagination
          dotsLength={5}
          activeDotIndex={index}
          containerStyle={{
            backgroundColor: "#15141F",
          }}
          dotStyle={{
            width: 10,
            height: 10,
            borderRadius: 5,
            marginHorizontal: 8,
            backgroundColor: 'rgba(255, 255, 255, 0.92)'
          }}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
          tappableDots={true}
        />
      </View>
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
  },
  carouselContainer: {
    flex: 1,
    width: sliderWidth - 60,
    backgroundColor: '#15141F',
    borderRadius: 8,
    marginHorizontal: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export default HotMovieCarousel;
