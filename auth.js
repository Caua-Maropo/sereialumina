console.log("AUTH.JS CARREGOU");

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// 🔹 FIREBASE CONFIG
const firebaseConfig = {
  apiKey: "AIzaSyBp_mqQKIps49q48ilqIsvvKle3I2Rjgag",
  authDomain: "seria-lumina.firebaseapp.com",
  projectId: "seria-lumina",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// 🔹 LOGIN ELEMENTS
const loginForm = document.getElementById("form-login");
const loginEmail = document.getElementById("login-email");
const loginSenha = document.getElementById("login-senha");

// 🔹 CADASTRO ELEMENTS
const cadastroForm = document.getElementById("form-cadastro");
const cadEmail = document.getElementById("cad-email");
const cadSenha = document.getElementById("cad-senha");

// 🔹 HEADER
const logoutBtn = document.getElementById("logout-btn");
const userArea = document.getElementById("user-area");
const userEmail = document.getElementById("user-email");

// ================= LOGIN =================
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(
        auth,
        loginEmail.value,
        loginSenha.value
      );

      window.location.href = "index.html";
    } catch (err) {
      alert("Email ou senha inválidos");
      console.error(err);
    }
  });
}

// ================= CADASTRO =================
if (cadastroForm) {
  cadastroForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(
        auth,
        cadEmail.value,
        cadSenha.value
      );

      alert("Conta criada com sucesso!");
      window.location.href = "index.html";
    } catch (err) {
      alert("Erro ao criar conta");
      console.error(err);
    }
  });
}

// ================= SESSÃO =================
onAuthStateChanged(auth, (user) => {
  if (user) {
    if (userArea && userEmail) {
      userArea.style.display = "flex";
      userEmail.textContent = user.email;
    }
  } else {
    if (userArea) userArea.style.display = "none";
  }
});

// ================= LOGOUT =================
if (logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
    await signOut(auth);
    window.location.href = "login.html";
  });
}
