import firebase from 'firebase';

// Initialize Firebase
var config = {
   apiKey: "AIzaSyBIA8-URHRpgcrw1kNif6YG_ROP2VWbEKg",
   authDomain: "noted-baf69.firebaseapp.com",
   databaseURL: "https://noted-baf69.firebaseio.com",
   projectId: "noted-baf69",
   storageBucket: "noted-baf69.appspot.com",
   messagingSenderId: "83910413264"
};
firebase.initializeApp(config);

export default firebase;