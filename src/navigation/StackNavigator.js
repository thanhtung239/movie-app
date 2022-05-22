import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MovieDetail from "../screens/MovieDetail";
import Home from "../screens/Home";
import BottomTabNavigator from "./TabNavigator";

const HomeStack = createStackNavigator();

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator
      sceneContainerStyle={{
        backgroundColor: "#15141F",
      }}
      screenOptions={{ headerShown: false }}
    >
      <HomeStack.Screen
        name="Home"
        component={BottomTabNavigator}
        options={{
          title: "Home",
        }}
      />
      <HomeStack.Screen
        name="MovieDetail"
        component={MovieDetail}
        options={{
          title: "MovieDetail",
        }}
      />
    </HomeStack.Navigator>
  );
};

export default HomeStackNavigator;

