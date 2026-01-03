// admin.js
import { auth } from "./firebase.js";
import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// PROTEÇÃO DO ADMIN
onAuthStateChanged(auth, (user) => {
  if (!user) {
    // Não está logado → volta para login
    window.location.href = "login.html";
  }
});

// LOGOUT
const btnLogout = document.getElementById("logout-admin");

btnLogout.addEventListener("click", () => {
  signOut(auth).then(() => {
    window.location.href = "login.html";
  });
});
