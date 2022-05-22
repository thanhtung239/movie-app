import { StatusBar } from "expo-status-bar";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import BottomTabNavigator from "../navigator/TabNavigator";
import { getDatabase, ref, onValue, set, remove, update } from 'firebase/database';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  Alert
} from "react-native";

import React, { useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updatePassword
} from "@firebase/auth";
import { auth } from "../config/firebase";
import { useNavigation } from "@react-navigation/core";
const ResetPassword = () => {
  const [passWord , setPassword] = useState("");
  const [resetPassword ,setResetPassword] = useState("");
  const [newPassword ,setNewPassword] = useState("");
  const navigation = useNavigation();
  const update = () => {
      if(newPassword == resetPassword) {
          updatePassword(auth.currentUser , newPassword).then(()=>{
              Alert.alert("thay doi thanh cong");
              navigation.goBack();
          }).catch((error) => {

                Alert.error(error.message);
          })
          
      }
      else {
            console.log("thay doi k dc");
      }
  }
  return (
    <View style={styles.container}>
      {/* header */}
      <View style={styles.header}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Ionicons
            name="chevron-back"
            size={24}
            color="white"
            style={{ position: "absolute", left: 0 }}
            onPress ={() => navigation.goBack()}
          />
          <Text
            style={{
              fontSize: 22,
              color: "white",
              marginBottom: 10,
            }}
          >
            Tài khoản
          </Text>
        </View>
        <View
          style={{
            height: 2,
            backgroundColor: "#2C3F5B",
          }}
        ></View>
      </View>
      {/* body */}
      <View style={styles.body}>
        {/* user */}
        <View style ={{flex : 1 , justifyContent : "center" , alignItems : "center"}}>
          <Image source={{
          uri: 'https://reactnative.dev/img/tiny_logo.png',
        }} style ={{position :"absolute" , width :100 , height : 100  , borderRadius : 50  }}></Image>
        </View>
        <View style={{ flex: 1 }}>
          <View style={{ marginHorizontal: 20, marginBottom: 10 }}>
            <Text style={styles.text}>Mật khẩu cũ</Text>
          </View>
          <View style={styles.Section}>
            <FontAwesome5
              name="user"
              size={24}
              color="#FFFFFF"
              style={styles.icon}
            />
            <TextInput style={styles.input} value = {passWord} onChangeText = {(text) => setPassword(text)} secureTextEntry></TextInput>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <View style={{ marginHorizontal: 20, marginBottom: 10 }}>
            <Text style={styles.text}>Mật khẩu mới</Text>
          </View>
          <View style={styles.Section}>
            <MaterialIcons
              name="email"
              size={24}
              color="#FFFFFF"
              style={styles.icon}
            />
            <TextInput style={styles.input} value = {newPassword} onChangeText ={(text) => setNewPassword(text)} secureTextEntry></TextInput>
          </View>
        </View>
        <View style={{ flex: 1}} >
          <View style={{ marginHorizontal: 20, marginBottom: 10 }}>
            <Text style={styles.text}>Nhập lại mật khẩu</Text>
          </View>
          <View style={styles.Section}>
            <MaterialIcons
              name="phone-iphone"
              size={24}
              color="#FFFFFF"
              style={styles.icon}
            />
            <TextInput style={styles.input} value ={resetPassword} onChangeText = {(text) => setResetPassword(text)} secureTextEntry></TextInput>
          </View>
        </View>
        <TouchableOpacity style= {styles.button} onPress ={update} >
            <Text style = {{fontSize : 16 , color : 'white' , fontWeight : "bold"}}>Lưu thay đổi</Text>
        </TouchableOpacity>
      </View>
      {/* footer */}
      <View style ={styles.footer}>
          
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2B3543",
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 30,
  },
  body: {
    flex: 5,
  },
  footer : {
    flex :1,
    marginTop : 20
  },
  Section: {
    flex: 0.9,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderColor: "white",
    borderWidth: 1,
    marginHorizontal: 20,
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: "#2B3543",
    color: "white",
    fontSize: 16,
  },
  text: {
    fontSize: 16,
    color: "white",
    opacity: 0.5,
  },
  icon: {
    padding: 10,
    opacity: 0.5,
  },
  button: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "#E51937",
    borderRadius: 10,
    marginHorizontal : 20,
    marginTop : 40,
  },
});
export default ResetPassword;
