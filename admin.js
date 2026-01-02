// admin.js
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { app } from "./firebase.js";

const auth = getAuth(app);
const db = getFirestore(app);

// Bloqueia acesso se não estiver logado como admin
onAuthStateChanged(auth, async (user) => {
  if (!user) {
    // Usuário não logado → redireciona para login
    window.location.href = 'admin-login.html';
    return;
  }

  // Verifica se o usuário é admin
  const snap = await getDoc(doc(db, 'users', user.uid));
  if (!snap.exists() || snap.data().role !== 'admin') {
    // Não é admin → redireciona para login
    auth.signOut(); // desloga por segurança
    window.location.href = 'admin-login.html';
  }
});

// Logout
const logoutBtn = document.getElementById('logout-admin');
logoutBtn.addEventListener('click', () => {
  auth.signOut().then(() => {
    window.location.href = 'admin-login.html';
  });
});
