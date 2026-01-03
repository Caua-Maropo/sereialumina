// Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// 🔑 CONFIG (COLE A SUA AQUI)
const firebaseConfig = {
  apiKey: "AIzaSyBp_mqQKIps49q48ilqIsvvKle3I2Rjgag",
  authDomain: "seria-lumina.firebaseapp.com",
  projectId: "seria-lumina",
  storageBucket: "seria-lumina.firebasestorage.app",
  messagingSenderId: "388959223244",
  appId: "1:388959223244:web:15f1f9cc98a052fd397169",
  measurementId: "G-XX4V20FLMZ"
};
// Init
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// ==========================
// ABAS LOGIN / CADASTRO
// ==========================
const tabLogin = document.getElementById("tab-login");
const tabCadastro = document.getElementById("tab-cadastro");
const formLogin = document.getElementById("form-login");
const formCadastro = document.getElementById("form-cadastro");

tabLogin.addEventListener("click", () => {
  tabLogin.classList.add("ativo");
  tabCadastro.classList.remove("ativo");
  formLogin.classList.remove("hidden");
  formCadastro.classList.add("hidden");
});

tabCadastro.addEventListener("click", () => {
  tabCadastro.classList.add("ativo");
  tabLogin.classList.remove("ativo");
  formCadastro.classList.remove("hidden");
  formLogin.classList.add("hidden");
});

// ==========================
// CADASTRO
// ==========================
formCadastro.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("cad-email").value;
  const senha = document.getElementById("cad-senha").value;

  try {
    await createUserWithEmailAndPassword(auth, email, senha);
    alert("Conta criada com sucesso 💙");
    tabLogin.click();
  } catch (error) {
    alert(traduzirErro(error.code));
  }
});

// ==========================
// LOGIN
// ==========================
formLogin.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("login-email").value;
  const senha = document.getElementById("login-senha").value;

  try {
    await signInWithEmailAndPassword(auth, email, senha);
    window.location.href = "index.html";
  } catch (error) {
    alert(traduzirErro(error.code));
  }
});

// ==========================
// ERROS AMIGÁVEIS
// ==========================
function traduzirErro(code) {
  switch (code) {
    case "auth/email-already-in-use":
      return "Esse email já está cadastrado.";
    case "auth/invalid-email":
      return "Email inválido.";
    case "auth/weak-password":
      return "A senha deve ter no mínimo 6 caracteres.";
    case "auth/user-not-found":
      return "Usuário não encontrado.";
    case "auth/wrong-password":
      return "Senha incorreta.";
    default:
      return "Erro ao autenticar. Tente novamente.";
  }
}
