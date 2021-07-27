// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase';

export const firebaseConfig = {
    apiKey: "AIzaSyChT7-otCpvdn03tbUYBtu3uSG0iTrY3OY",
    authDomain: "slack-ba6ff.firebaseapp.com",
    projectId: "slack-ba6ff",
    storageBucket: "slack-ba6ff.appspot.com",
    messagingSenderId: "103578643881",
    appId: "1:103578643881:web:fa2b6efe98e93465e6e8b8",
    measurementId: "G-JVJ7DJ73BQ"
  };

const firebaseApp=firebase.initializeApp(firebaseConfig);
const db=firebaseApp.firestore();
const auth=firebase.auth();
const provider=new firebase.auth.GoogleAuthProvider();
export {db,auth,provider};