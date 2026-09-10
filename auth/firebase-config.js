// Firebase App
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

// Firebase Authentication
import {
  getAuth,
  GoogleAuthProvider,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyChln5VCbxSJnoIOQlYm2hn_mQltY6ekXg",
  authDomain: "shop-itnow.firebaseapp.com",
  projectId: "shop-itnow",
  storageBucket: "shop-itnow.firebasestorage.app",
  messagingSenderId: "194908004108",
  appId: "1:194908004108:web:0e0f61497aa4f0769b7329",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Authentication
const auth = getAuth(app);

// Google Authentication Provider
const googleProvider = new GoogleAuthProvider();

// Export Firebase services
export {
  auth,
  googleProvider,
  RecaptchaVerifier,
  signInWithPhoneNumber,
};