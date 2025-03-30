
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import {  getAuth,  signOut,
  onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { castVote } from "./database.js";




const firebaseConfig = {
  apiKey: "AIzaSyDKP3kMFIUM1B1uGKzbvbqeqXhM5iW5TdE",
  authDomain: "votingapp-5c924.firebaseapp.com",
  projectId: "votingapp-5c924",
  storageBucket: "votingapp-5c924.firebasestorage.app",
  messagingSenderId: "207343509772",
  appId: "1:207343509772:web:14386034c0d7f04e6fe929",
  measurementId: "G-09TR3JD7PK",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

let currentUserId = null;


// ✅ Prevent Redirection p
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User signed in:", user);
    currentUserId = user.uid;  // ✅ Get Google UUID
    if (window.location.pathname === "/vote.html") {
      
    }
    else if (window.location.pathname !== "/index.html") {
      // window.location.href = "index.html"; // Redirect only if not already there
    }
  } else {
    console.log("No user is signed in.");
    if (window.location.pathname === "/index.html") {
      window.location.href = "signin.html"; // Redirect to login page if logged out
    }
  }
});
  // ✅ Handle Voting in vote.html
  const voteButton = document.getElementById("submit-vote");
  if (voteButton) {
    var currentSessionId = "sess-2"; // Retrieve stored session ID
    console.log("Current Session ID:", currentSessionId);
    voteButton.addEventListener("click", async () => {
      if (!currentUserId || !currentSessionId) {
        alert("Something went wrong. Please verify your session again.");
        return;
      }

      const selectedVote = document.querySelector('input[name="vote"]:checked');
      if (!selectedVote) {
        alert("Please select a candidate before submitting.");
        return;
      }

      const voterName = localStorage.getItem("voterName") || "Unknown";
      const aadhaarNumber = localStorage.getItem("aadhaarNumber") || "0000";

      const result = await castVote(currentUserId, currentSessionId, voterName, aadhaarNumber, selectedVote.value);
      if (result.success) {
        alert("Your vote has been recorded successfully!");
        window.location.href = "/thanking.html"; // Redirect after successful vote      } else {
        alert(result.message);
      }
    });
  }