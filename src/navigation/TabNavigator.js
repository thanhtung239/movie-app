import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Category from "../screens/Category";
import Profile from "../screens/Profile";
import Home from "../screens/Home";
import HomeStackNavigator from "./StackNavigator";


const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      sceneContainerStyle={{
        backgroundColor: "#15141F",
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home-variant';
          } else if (route.name === 'Category') {
            iconName = 'movie-open-play';
          } else if (route.name === 'Profile') {
            iconName = 'account-circle';
          }

          return <MaterialCommunityIcons name={iconName} size={34} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          height: 60,
          backgroundColor: "#15141F",
          borderTopWidth: 0,
        },
        tabBarShowLabel: false,
        headerShown: false
      })}
      >
      <Tab.Screen 
        name="Home"
        component={Home}
        options={{
          title: "Home",
        }}
      />
      <Tab.Screen
        name="Category"
        component={Category}
        options={{
          title: "Category",
        }}
        />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          title: "Profile",
        }}
        />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
