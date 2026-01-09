import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBp_mqQKIps49q48ilqIsvvKle3I2Rjgag",
  authDomain: "seria-lumina.firebaseapp.com",
  projectId: "seria-lumina",
  storageBucket: "seria-lumina.firebasestorage.app",
  messagingSenderId: "388959223244",
  appId: "1:388959223244:web:15f1f9cc98a052fd397169"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// ================================
// ESTADO DE LOGIN
// ================================
onAuthStateChanged(auth, (user) => {

  const userArea = document.getElementById("user-area");
  const userEmail = document.getElementById("user-email");
  const logoutBtn = document.getElementById("logout-btn");

  if (user) {
    localStorage.setItem("usuarioLogado", user.email);

    if (userArea && userEmail) {
      userArea.style.display = "flex";
      userEmail.textContent = user.email;
    }

    if (logoutBtn) {
      logoutBtn.onclick = () => {
        signOut(auth);
        localStorage.removeItem("usuarioLogado");
        window.location.reload();
      };
    }

  } else {
    localStorage.removeItem("usuarioLogado");
    if (userArea) userArea.style.display = "none";
  }
});
