import firebase from "firebase";

// Your web app's Firebase configuration
const firebaseApp = firebase.initializeApp({
  // CREDITIONAL_DATA & API_KEY FROM USER FIRESTORE ACCOUNT
});
// Initialize Firebase
const db = firebaseApp.firestore();
export default db;
