import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import HomeStackNavigator from "./src/navigator/StackNavigator";
import {LogBox} from 'react-native'
import 'react-native-gesture-handler';

LogBox.ignoreAllLogs(true)
const App = () => {
  return (
    <NavigationContainer>
      <HomeStackNavigator />
    </NavigationContainer>
  );
}
export default App;