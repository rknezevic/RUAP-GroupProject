import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";

import { firebaseConfig } from "../config/firebaseConfig";

class FirebaseService {
  constructor() {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  }

  async getCurrentUser() {
    const user = await firebase.auth().currentUser;
    return user;
  }

  async savePrediction(predictionData) {
    const db = firebase.firestore();
    try {
      const docRef = await db.collection("predictions").add(predictionData);
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  }
}

export default FirebaseService;
