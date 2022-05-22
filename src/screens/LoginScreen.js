import { StatusBar } from "expo-status-bar";
import { AntDesign } from "@expo/vector-icons";
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
const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.navigate("Home");
      }
    });
  }, []);
  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user.email);
      })
      .catch((error) => alert(error.message));
  };
  const signUp = () => {
    navigation.navigate("SignUp");
  }
  return (
    <View style={styles.container}>
      {/* header */}
      <View style={styles.header}>
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 20,
          }}
        >
          <Text
            style={{
              fontSize: 24,
              color: "white",
              marginBottom: 10,
            }}
          >
            Xin Chào !
          </Text>
          <TouchableOpacity
            style={{
              position: "absolute",
              right: 0,
              paddingHorizontal: 20,
            }}  onPress = {signUp}
            
          >
            <Text
              style={{
                color: "#E51937",
                fontSize: 18,
              }}
            >
              Đăng Ký
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
        <View style={styles.userName}>
          <Text style={styles.text}>Tên đăng nhập</Text>
          <TextInput style={styles.textInput} value = {email} onChangeText ={(text) => setEmail(text)}></TextInput>
        </View>
        <View style={styles.passWord}>
          <Text style={styles.text}>Mật khẩu</Text>
          <TextInput style={styles.textInput} value = {password} onChangeText ={(text) => setPassword(text)}></TextInput>
        </View>
        <View style={{ alignItems: "center", marginTop: 30 }}>
          <Text style={{ color: "#FFFFFF", opacity: 0.5 }}>Quên mật khẩu?</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress = {handleLogin}>
          <Text
            style={{
              color: "white",
              fontSize: 16,
            }}
          >
            Đăng nhập
          </Text>
        </TouchableOpacity>
      </View>

      {/* footer */}
      <View style={styles.footer}>
        <View>
          <Text style={{ color: "white", opacity: 0.5 }}>
            Đăng nhập bằng phương thức khác
          </Text>
        </View>
        <View style={styles.icon}>
          <TouchableOpacity
            style={{
              margin: 15,
            }}
          >
            <AntDesign name="facebook-square" size={40} color="#3b5998" />
          </TouchableOpacity>
          {/* twitter */}
          <TouchableOpacity
            style={{
              margin: 15,
            }}
          >
            <AntDesign name="twitter" size={40} color="#1dcaff" />
          </TouchableOpacity>
          {/* google */}
          <TouchableOpacity
            style={{
              margin: 15,
            }}
          >
            <AntDesign name="googleplus" size={40} color="#EA4335" />
          </TouchableOpacity>
        </View>
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
    flex: 1.5,
    justifyContent: "flex-end",
    paddingBottom: 50,
  },
  body: {
    flex: 10,
    marginHorizontal: 20,
    justifyContent: "center",
  },
  button: {
    alignItems: "center",
    margin: 20,
    padding: 20,
    backgroundColor: "#E51937",
    borderRadius: 10,
  },
  footer: {
    flex: 3,
    alignItems: "center",
  },
  text: {
    marginBottom: 5,
    color: "white",
    fontSize: 16,
  },
  textInput: {
    padding: 15,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 18,
    color: "white",
  },
  userName: {},
  passWord: {
    marginTop: 20,
  },
  icon: {
    flexDirection: "row",
    marginVertical: 20,
  },
});
export default LoginScreen;
