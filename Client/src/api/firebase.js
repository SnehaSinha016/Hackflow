import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDp6Gtn-h0AxKhAJj9cICmyiUxhW1MoKEo",
  authDomain: "hackflow-d22f5.firebaseapp.com",
  projectId: "hackflow-d22f5",
  storageBucket: "hackflow-d22f5.firebasestorage.app",
  messagingSenderId: "716758567332",
  appId: "1:716758567332:web:ec26841d49b86787e39931",
  measurementId: "G-MS2L6X5EMM",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();