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
  Image
} from "react-native";
import { Button } from "react-native-web";
import React, { useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from "@firebase/auth";
import { auth } from "../config/firebase";
import { useNavigation } from "@react-navigation/core";
const Profile = () => {
  const [name , setName] = useState("");
  const [email, setEmail] = useState(auth.currentUser.email);
  const [phoneNumber , setPhoneNumber] = useState("");
  const [birthday , setBirthday] = useState("");
  const navigation = useNavigation();
  const logOut =() => {
    signOut(auth).then(() =>{
        navigation.replace("Login");
    }).catch((error) => {alert(error.message)})
}
  const updateUser = () => {
    const db = getDatabase();
     update(ref(db , 'users/' + auth.currentUser.uid) , {  
       name : name,
      email : email,
       phoneNumber : phoneNumber,
       birthday : birthday,
     }).then(() => {
       alert("update thanh cong");
     }).catch((error) => {
       alert(error);
     });
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
         <TouchableOpacity style ={{position : "absolute" , right : 20 , top : 4}} onPress ={logOut}>
         <Text
            style={{
              fontSize: 18,
              color: "#E51937",
              marginBottom: 10,
          
            }}
          >
            Đăng xuất
          </Text>
         </TouchableOpacity>
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
            <Text style={styles.text}>Tên</Text>
          </View>
          <View style={styles.Section}>
            <FontAwesome5
              name="user"
              size={24}
              color="#FFFFFF"
              style={styles.icon}
            />
            <TextInput style={styles.input} value = {name} onChangeText = {(text) => setName(text)}></TextInput>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <View style={{ marginHorizontal: 20, marginBottom: 10 }}>
            <Text style={styles.text}>Email</Text>
          </View>
          <View style={styles.Section}>
            <MaterialIcons
              name="email"
              size={24}
              color="#FFFFFF"
              style={styles.icon}
            />
            <TextInput style={styles.input} value = {email} onChangeText ={(text)=> setEmail(text)}></TextInput>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <View style={{ marginHorizontal: 20, marginBottom: 10 }}>
            <Text style={styles.text}>Điện thoại</Text>
          </View>
          <View style={styles.Section}>
            <MaterialIcons
              name="phone-iphone"
              size={24}
              color="#FFFFFF"
              style={styles.icon}
            />
            <TextInput style={styles.input} value ={phoneNumber} onChangeText = {(text) => setPhoneNumber(text)}></TextInput>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <View style={{ marginHorizontal: 20, marginBottom: 10 }}>
            <Text style={styles.text}>Sinh nhật</Text>
          </View>
          <View style={styles.Section}>
            <FontAwesome5
              name="birthday-cake"
              size={24}
              color="#FFFFFF"
              style={styles.icon}
            />
            <TextInput style={styles.input} value ={birthday} onChangeText= {(text) => setBirthday(text)}></TextInput>
          </View>
        </View>
        <TouchableOpacity style ={{
          justifyContent : "center",
          alignItems : "center",
          marginVertical : 20,
        }} 
        onPress ={() => {navigation.navigate("ResetPassword")}}>
          <Text style = {{fontSize : 16 , color : 'red'}}>Đổi mật khẩu</Text>
        </TouchableOpacity>
        <TouchableOpacity style= {styles.button} onPress ={updateUser} >
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
    flex: 8,
  },
  footer : {
    flex :0.1,
    marginTop : 20
  },
  Section: {
    flex: 1,
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
  },
});
export default Profile;
