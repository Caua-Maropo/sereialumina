import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { app } from "./firebase.js";

const auth = getAuth(app);

// Elementos do modal
const modalLogin = document.getElementById('modal-login');
const btnLogin = document.getElementById('btn-login'); // botão do header
const closeLogin = document.getElementById('close-login');
const formLogin = document.getElementById('form-login');
const erroLogin = document.getElementById('erro-login');

// Abre o modal ao clicar no botão Login
btnLogin?.addEventListener('click', () => {
  modalLogin?.classList.remove('hidden');
});

// Fecha o modal ao clicar no X
closeLogin?.addEventListener('click', () => {
  modalLogin?.classList.add('hidden');
});

// Fecha clicando fora do conteúdo do modal
window.addEventListener('click', (e) => {
  if(e.target === modalLogin) modalLogin.classList.add('hidden');
});

// Login com Firebase
formLogin?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email-login').value;
  const senha = document.getElementById('senha-login').value;

  try {
    await signInWithEmailAndPassword(auth, email, senha);
    window.location.href = 'perfil.html'; // redireciona para perfil
  } catch (error) {
    console.error(error);
    erroLogin.textContent = 'Email ou senha inválidos.';
  }
});
