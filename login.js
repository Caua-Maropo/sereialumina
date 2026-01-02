import { auth } from './firebase.js';
import { signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const formLogin = document.getElementById('form-login-admin');
const erroLogin = document.getElementById('erro-login');

formLogin.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;

  signInWithEmailAndPassword(auth, email, senha)
    .then(() => {
      // Login OK → redireciona para perfil
      window.location.href = 'perfil.html';
    })
    .catch((err) => {
      console.error(err);
      erroLogin.textContent = 'Email ou senha incorretos!';
    });
});

// Protege a página se o usuário já estiver logado
onAuthStateChanged(auth, (user) => {
  if (user) {
    // Se o usuário já estiver logado e estiver no login.html, envia direto pro perfil
    if (window.location.pathname.includes('login.html')) {
      window.location.href = 'perfil.html';
    }
  }
});
