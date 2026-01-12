// admin-login.js
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { app } from "./firebase.js";

const auth = getAuth(app);
const db = getFirestore(app);

const form = document.getElementById('form-login-admin');
const erroLogin = document.getElementById('erro-login');

// Função de login
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = form.email.value.trim();
  const senha = form.senha.value.trim();

  if (!email || !senha) {
    erroLogin.textContent = 'Por favor, preencha email e senha.';
    return;
  }

  try {
    // Login com Firebase Auth
    const cred = await signInWithEmailAndPassword(auth, email, senha);
    const uid = cred.user.uid;

    // Verifica se é admin
    const snap = await getDoc(doc(db, 'users', uid));

    if (!snap.exists() || snap.data().role !== 'admin') {
      erroLogin.textContent = 'Acesso negado. Usuário não é administrador.';
      // Opcional: desloga o usuário que não é admin
      auth.signOut();
      return;
    }

    // Sucesso → redireciona
    window.location.href = 'admin.html';

  } catch (error) {
    console.error(error.code, error.message);
    switch (error.code) {
      case 'auth/user-not-found':
        erroLogin.textContent = 'Email não cadastrado.';
        break;
      case 'auth/wrong-password':
        erroLogin.textContent = 'Senha incorreta.';
        break;
      default:
        erroLogin.textContent = 'Erro ao fazer login: ' + error.message;
    }
  }
});
