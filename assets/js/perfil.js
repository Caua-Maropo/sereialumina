import { auth } from './firebase.js';
import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const btnLogout = document.getElementById('btn-logout');

// Protege a página
onAuthStateChanged(auth, (user) => {
  if (!user) {
    // Se não estiver logado, volta para login
    window.location.href = 'login.html';
  }
});

// Logout
btnLogout.addEventListener('click', () => {
  signOut(auth).then(() => {
    window.location.href = 'login.html';
  });
});
