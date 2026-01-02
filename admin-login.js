import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { app } from "./firebase.js";

const auth = getAuth(app);
const db = getFirestore(app);

const form = document.getElementById('form-login-admin');
const erroLogin = document.getElementById('erro-login');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = form.email.value;
  const senha = form.senha.value;

  try {
    // Login
    const cred = await signInWithEmailAndPassword(auth, email, senha);
    const uid = cred.user.uid;

    // Verificar se é admin
    const refUser = doc(db, 'users', uid);
    const snap = await getDoc(refUser);

    if (!snap.exists() || snap.data().role !== 'admin') {
      erroLogin.textContent = 'Acesso negado. Usuário não é administrador.';
      return;
    }

    // Sucesso → painel admin
    window.location.href = 'admin.html';

  } catch (error) {
    erroLogin.textContent = 'Email ou senha inválidos.';
  }
});
