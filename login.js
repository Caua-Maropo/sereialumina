import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { app } from "./firebase.js";

const auth = getAuth(app);

auth.onAuthStateChanged(user => {
  if(!user){
    // Usuário não está logado → redireciona para login
    window.location.href = 'login.html';
  }
});

const form = document.getElementById('form-login');
const erroLogin = document.getElementById('erro-login');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;

  try {
    // Faz login com Firebase
    await signInWithEmailAndPassword(auth, email, senha);

    // Redireciona para perfil
    window.location.href = 'perfil.html';
  } catch (error) {
    console.error(error);
    erroLogin.textContent = 'Email ou senha inválidos.';
  }
});
