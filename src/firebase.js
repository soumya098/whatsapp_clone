import firebase from "firebase";

const config = {
  apiKey: "AIzaSyCL1VLDdPfa5i9Dc_hysYe6H0whgQZsdoU",
  authDomain: "mychatapp-a11ec.firebaseapp.com",
  projectId: "mychatapp-a11ec",
  storageBucket: "mychatapp-a11ec.appspot.com",
  messagingSenderId: "639415342585",
  appId: "1:639415342585:web:78e0b58c20ec34f0105928",
  measurementId: "G-JTQ8V5E3YS",
};

const firebaseApp = firebase.initializeApp(config);

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
export { provider };
export default auth;
