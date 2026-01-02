// admin-login.js
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { app } from "./firebase.js";

// Inicializa auth e firestore
const auth = getAuth(app);
const db = getFirestore(app);

// Pega elementos do HTML
const form = document.getElementById('form-login-admin');
const erroLogin = document.getElementById('erro-login');

form.addEventListener('submit', async (e) => {
  e.preventDefault(); // previne recarregar a página

  const email = form.email.value.trim();
  const senha = form.senha.value.trim();

  // Checa se os campos não estão vazios
  if (!email || !senha) {
    erroLogin.textContent = 'Por favor, preencha email e senha.';
    return;
  }

  try {
    // 🔐 Faz login com Firebase Auth
    const cred = await signInWithEmailAndPassword(auth, email, senha);
    const uid = cred.user.uid;

    // 📄 Verifica no Firestore se é admin
    const refUser = doc(db, 'users', uid);
    const snap = await getDoc(refUser);

    if (!snap.exists()) {
      erroLogin.textContent = 'Usuário não encontrado no banco de dados.';
      return;
    }

    const userData = snap.data();
    if (userData.role !== 'admin') {
      erroLogin.textContent = 'Acesso negado. Usuário não é administrador.';
      return;
    }

    // ✅ Sucesso → redireciona para o painel
    window.location.href = 'admin.html';

  } catch (error) {
    // Mostra o erro real do Firebase no console e na tela
    console.error(error.code, error.message);

    switch (error.code) {
      case 'auth/user-not-found':
        erroLogin.textContent = 'Email não cadastrado.';
        break;
      case 'auth/wrong-password':
        erroLogin.textContent = 'Senha incorreta.';
        break;
      case 'auth/invalid-email':
        erroLogin.textContent = 'Email inválido.';
        break;
      default:
        erroLogin.textContent = 'Erro ao fazer login: ' + error.message;
    }
  }
});
