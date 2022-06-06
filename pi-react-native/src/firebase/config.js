import app from 'firebase/app'
import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyAYb0lK6H_-Ov4h5nTCS0vVzMlhylp_dA0",
  authDomain: "trabajopractico2-8618c.firebaseapp.com",
  projectId: "trabajopractico2-8618c",
  storageBucket: "trabajopractico2-8618c.appspot.com",
  messagingSenderId: "522978732322",
  appId: "1:522978732322:web:d3f3d716fbaa92ee26dd7b"
};

app.initializeApp(firebaseConfig)

export const auth = firebase.auth()
export const storage = firebase.storage()
export const db = firebase.firestore()
