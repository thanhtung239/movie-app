import { initializeApp } from '@firebase/app';
import { getAuth } from '@firebase/auth';
const firebaseConfig = {
    apiKey: "AIzaSyBQCPF4ZUw9EK1nnxdo4U2-T1ai-bkzn4I",
    authDomain: "bai1-4b437.firebaseapp.com",
    databaseURL: "https://bai1-4b437-default-rtdb.firebaseio.com",
    projectId: "bai1-4b437",
    storageBucket: "bai1-4b437.appspot.com",
    messagingSenderId: "885789862024",
    appId: "1:885789862024:web:26d430402b5ffa4c95d73d",
    measurementId: "G-P55FTPMWKV"
  };
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  export {auth};