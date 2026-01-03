import { app } from "./firebase.js";
import { getAuth, onAuthStateChanged, signOut } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const auth = getAuth(app);

const userArea = document.getElementById("user-area");
const userEmail = document.getElementById("user-email");
const logoutBtn = document.getElementById("logout-btn");

onAuthStateChanged(auth, (user) => {
  if (user) {
    // USUÁRIO LOGADO
    userArea.style.display = "flex";
    userEmail.textContent = user.email;
  } else {
    // NÃO LOGADO
    userArea.style.display = "none";
  }
});

if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    signOut(auth).then(() => {
      window.location.href = "login.html";
    });
  });
}
