console.log("AUTH.JS CARREGOU");

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// 🔹 CONFIG FIREBASE
const firebaseConfig = {
  apiKey: "AIzaSyBp_mqQKIps49q48ilqIsvvKle3I2Rjgag",
  authDomain: "seria-lumina.firebaseapp.com",
  projectId: "seria-lumina",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// 🔹 ELEMENTOS (PODEM OU NÃO EXISTIR)
const loginForm = document.getElementById("login-form");
const emailInput = document.getElementById("email");
const senhaInput = document.getElementById("senha");
const logoutBtn = document.getElementById("logout-btn");
const userArea = document.getElementById("user-area");
const userEmail = document.getElementById("user-email");

// 🔹 LOGIN (SÓ NA TELA DE LOGIN)
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(
        auth,
        emailInput.value,
        senhaInput.value
      );

      window.location.href = "index.html";
    } catch (error) {
      alert("Email ou senha inválidos");
      console.error(error);
    }
  });
}

// 🔹 CONTROLE DE SESSÃO (SEM REDIRECIONAMENTO AGRESSIVO)
onAuthStateChanged(auth, (user) => {
  if (user) {
    // Usuário logado
    if (userArea && userEmail) {
      userArea.style.display = "flex";
      userEmail.textContent = user.email;
    }
  } else {
    // Usuário deslogado
    if (userArea) {
      userArea.style.display = "none";
    }
  }
});

// 🔹 LOGOUT
if (logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
    await signOut(auth);
    window.location.href = "login.html";
  });
}
