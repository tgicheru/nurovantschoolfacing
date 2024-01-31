import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, OAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env["REACT_APP_APIKEY"],
  authDomain: process.env["REACT_APP_AUTHDOMAIN"],
  projectId: process.env["REACT_APP_PROJECTID"],
  storageBucket: process.env["REACT_APP_STORAGEBUCKET"],
  messagingSenderId: process.env["REACT_APP_MESSAGINGSENDERID"],
  appId: process.env["REACT_APP_APPID"],
  measurementId: process.env["REACT_APP_MEASUREMENTID"],
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const appleProvider = new OAuthProvider("apple.com");
export { auth, provider, appleProvider };
