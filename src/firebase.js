import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/auth"
import "firebase/functions"

firebase.initializeApp(options: {
    apiKey: "AIzaSyAF4SEhkm7b6KAeNT09emGnMeeSNCYpCMY",
  authDomain: "todoist-clone-e2dd8.firebaseapp.com",
  projectId: "todoist-clone-e2dd8",
  storageBucket: "todoist-clone-e2dd8.appspot.com",
  messagingSenderId: "942497515201",
  appId: "1:942497515201:web:639d4bbc6d15170eda3640"

})

export const auth = firebase.auth()
export const firestore = firebase.firestore()
export const functions = firebase.functions()

export default firebase