import { auth } from './firebase.js';
import { signInWithEmailAndPassword } from
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const btn = document.getElementById('btn-login');
const msg = document.getElementById('login-msg');

btn.addEventListener('click', async () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    window.location.href = "admin.html";
  } catch (error) {
    msg.textContent = "Email ou senha inválidos";
    msg.style.color = "red";
  }
});
