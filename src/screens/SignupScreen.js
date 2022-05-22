import { StatusBar } from "expo-status-bar";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

import { getDatabase, ref, onValue, set, remove, update } from 'firebase/database';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Button } from "react-native-web";
import React, { useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "@firebase/auth";
import { auth } from "../config/firebase";
import { useNavigation } from "@react-navigation/core";
const SignUpScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber , setPhoneNumber] = useState("");
  const [birthday , setBirthday] = useState("");
  const [resetPassword ,setResetPassword] = useState("");
  const navigation = useNavigation();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
      navigation.navigate("Home");
      }
    });
  }, []);

  const handleSingUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const db = getDatabase();
        const id = userCredential.user.uid;
        set(ref(db , 'users/' + id ) , {
          id : id,
          email : email,
          password : password,
          phoneNumber : phoneNumber,
          birthday : birthday,
        }).then(() => {
          console.log("them thanh cong");
        }).catch((error) => {
          alert(error);
        });
        console.log(userCredential.user.email);
      })
      .catch((error) => alert(error.message))                                                                             ;
  };
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
            onPress = {() => {navigation.goBack()}}
          />
          <Text
            style={{
              fontSize: 24,
              color: "#FF8F71",
              marginBottom: 10,
            }}
          >
            Đăng Kí
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
        <View style={{ flex: 1 }}>
          <View style={{ marginHorizontal: 20, marginBottom: 10 }}>
            <Text style={styles.text}>Tên đăng nhập</Text>
          </View>
          <View style={styles.Section}>
            <FontAwesome5
              name="user"
              size={24}
              color="#FFFFFF"
              style={styles.icon}
            />
            <TextInput style={styles.input} value = {email} onChangeText = {(text) => setEmail(text)}></TextInput>
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
            <TextInput style={styles.input} value = {email}></TextInput>
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
        <View style={{ flex: 1 }}>
          <View style={{ marginHorizontal: 20, marginBottom: 10 }}>
            <Text style={styles.text}>Mật khẩu</Text>
          </View>
          <View style={styles.Section}>
            <MaterialIcons
              name="lock-outline"
              size={24}
              color="#FFFFFF"
              style={styles.icon}
            />
            <TextInput style={styles.input} value = {password} onChangeText = {(text) => setPassword(text)} secureTextEntry></TextInput>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <View style={{ marginHorizontal: 20, marginBottom: 10 }}>
            <Text style={styles.text}>Nhập lại mật khẩu</Text>
          </View>
          <View style={styles.Section}>
            <MaterialIcons
              name="lock-outline"
              size={24}
              color="#FFFFFF"
              style={styles.icon}
            />
            <TextInput style={styles.input} value ={resetPassword} onChangeText = {(text) => setResetPassword(text)}></TextInput>
          </View>
        </View>
      </View>
      {/* footer */}
      <View style ={styles.footer}>
      <TouchableOpacity style= {styles.button} onPress = {handleSingUp}>
            <Text style = {{fontSize : 16 , color : 'white' , fontWeight : "bold"}}>Tạo tài khoản</Text>
        </TouchableOpacity>
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
    flex: 6,
  },
  footer : {
    flex :1,
  },
  Section: {
    flex: 0.8,
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
export default SignUpScreen;
