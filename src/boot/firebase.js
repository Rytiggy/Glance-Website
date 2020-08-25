import Firebase from "firebase/app";
import "firebase/firestore"; // eslint-disable-line

export default ({ Vue }) => {
  // Initialize Firebase from settings
  Firebase.initializeApp({
    apiKey: "AIzaSyBgxy0tcMdfn6oNchHNu37MAmZC41neypI",
    authDomain: "fitbitglance.firebaseapp.com",
    databaseURL: "https://fitbitglance.firebaseio.com",
    projectId: "fitbitglance",
    storageBucket: "fitbitglance.appspot.com",
    messagingSenderId: "299868720669",
    appId: "1:299868720669:web:7d4e642c250f2c0e9e40f4"
  });

  Vue.prototype.$firebase = Firebase;
};
