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

// 🔹 ELEMENTOS
const loginForm = document.getElementById("login-form");
const emailInput = document.getElementById("email");
const senhaInput = document.getElementById("senha");
const logoutBtn = document.getElementById("logout-btn");

// 🔹 LOGIN
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = emailInput.value;
    const senha = senhaInput.value;

    signInWithEmailAndPassword(auth, email, senha)
      .then(() => {
        // 🔥 REDIRECIONA AQUI
        window.location.href = "index.html";
      })
      .catch((error) => {
        alert("Email ou senha inválidos");
        console.error(error);
      });
  });
}

// 🔹 CONTROLE DE SESSÃO
onAuthStateChanged(auth, (user) => {
  if (!user && !window.location.pathname.includes("login.html")) {
    window.location.href = "login.html";
  }

  if (user && window.location.pathname.includes("login.html")) {
    window.location.href = "index.html";
  }
});

// 🔹 LOGOUT
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    signOut(auth).then(() => {
      window.location.href = "login.html";
    });
  });
}
