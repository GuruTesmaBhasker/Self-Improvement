// Firebase configuration and initialization
// Import the functions you need from the SDKs you need
// (For use with module bundlers or modern JS environments)
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

// Import Firebase App initialization (for module-based environments)
// Note: This import style is for ES modules or bundlers. For CDN, use a <script> tag in HTML.
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCYyTIYCX5bvN7r0BcJvLOKEON1nUaFnQk",
  authDomain: "self-improvement-7c7f6.firebaseapp.com",
  projectId: "self-improvement-7c7f6",
  storageBucket: "self-improvement-7c7f6.firebasestorage.app",
  messagingSenderId: "494829137683",
  appId: "1:494829137683:web:1e9e6f4a910b02b70774e6",
  measurementId: "G-43X839WMSM"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
  // Get form and message elements at the top
  const signUpForm = document.getElementById("signUpForm");
  const signUpMessage = document.getElementById("signUpMessage");

  if (signUpForm) {
    signUpForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const emailInput = document.getElementById("signUpEmail").value;
      const passwordInput = document.getElementById("signUpPassword").value;

      console.log("Form submitted with:", emailInput); // Debug log

      createUserWithEmailAndPassword(auth, emailInput, passwordInput)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log("User created:", user.uid);
          alert("User registered successfully!");
          signUpMessage.textContent = "User registered successfully!";
          signUpMessage.style.color = "green";
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error("Firebase error code:", errorCode);
          console.error("Firebase error message:", errorMessage);
          
          let userFriendlyMessage = "";
          switch(errorCode) {
            case 'auth/api-key-not-valid':
              userFriendlyMessage = "Firebase configuration error. Please check your API key.";
              break;
            case 'auth/email-already-in-use':
              userFriendlyMessage = "This email is already registered.";
              break;
            case 'auth/weak-password':
              userFriendlyMessage = "Password should be at least 6 characters.";
              break;
            case 'auth/invalid-email':
              userFriendlyMessage = "Please enter a valid email address.";
              break;
            default:
              userFriendlyMessage = errorMessage;
          }
          
          alert("Error: " + userFriendlyMessage);
          signUpMessage.textContent = "Error: " + userFriendlyMessage;
          signUpMessage.style.color = "red";
        });
    });
  } else {
    console.error("signUpForm not found!");
  }
});
