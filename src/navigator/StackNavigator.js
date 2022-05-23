import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MovieDetail from "../screens/MovieDetail";
import BottomTabNavigator from "./TabNavigator";
import LoginScreen from "../screens/LoginScreen"
import Profile from '../screens/Profile';
import ResetPassWord from "../screens/ResetPassWord";
import SignupScreen from "../screens/SignupScreen";
import TvShowDetail from "../screens/TvShowDetail";
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
        name="Login"
        component= {LoginScreen}
        options={{
          title: "Login",
        }}
      />
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
      <HomeStack.Screen
        name="SignUp"
        component={SignupScreen}
        options={{
          title: "SignUp",
        }}
      />
      <HomeStack.Screen
        name="ResetPassword"
        component={ResetPassWord}
        options={{
          title: "Reset",
        }}
      />
    <HomeStack.Screen
        name="TvShowDetail"
        component={TvShowDetail}
        options={{
          title: "TvShowDetail",
        }}
      />
    </HomeStack.Navigator>
  );
};

export default HomeStackNavigator;

