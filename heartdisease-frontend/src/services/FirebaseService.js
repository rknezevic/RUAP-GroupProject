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
    const user = firebase.auth().currentUser;
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

  async getUserData(userId) {
    try{
      const db = firebase.firestore();
      const data = await db.collection("predictions").where("UserId", "==", userId).orderBy("DateCreated", "desc").get();

      const userData = data.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      }));
        
      return userData;

    }catch(error){
      console.error("Error fetching documents: ", error);
    }
  }

  async getDocumentById(documentId) {
    try{
      const db = firebase.firestore();

      const documentRef =  db.collection("predictions").doc(documentId)
      const document = await documentRef.get();
      const documentData = document.data();

      return documentData;
    }catch(error){
      console.log("Error retrieving document", error);
    }
  }
}

export default FirebaseService;
