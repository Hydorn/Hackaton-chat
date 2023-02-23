2; // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCpdXRSkINUVGKceRsBBD-Q_DKYfn4v9R0",
  authDomain: "chat-7ec8f.firebaseapp.com",
  projectId: "chat-7ec8f",
  storageBucket: "chat-7ec8f.appspot.com",
  messagingSenderId: "838366216139",
  appId: "1:838366216139:web:323e37f5d7a7f006c2804e",
  measurementId: "G-EDWCZ7E39K",
  dataBaseUrl: "https://chat-7ec8f-default-rtdb.firebaseio.com/",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const dataBase = getDatabase(app);
export { app, auth, provider, dataBase };
