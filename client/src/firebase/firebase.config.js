// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAKCOrGobRYnrZrcVmPm8LUdGN7IQLLwug",
  authDomain: "foodparadise-9f663.firebaseapp.com",
  projectId: "foodparadise-9f663",
  storageBucket: "foodparadise-9f663.appspot.com",
  messagingSenderId: "17269551709",
  appId: "1:17269551709:web:463a87f91a07352bfe13b4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app