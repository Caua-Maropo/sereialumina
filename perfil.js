import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { app } from "./firebase.js";

const auth = getAuth(app);
const db = getFirestore(app);
const listaPedidos = document.getElementById('lista-pedidos');
const btnLogout = document.getElementById('logout');

// Verifica se o usuário está logado
onAuthStateChanged(auth, async user => {
  if(!user){
    // Se não estiver logado, redireciona para login
    window.location.href = 'login.html';
    return;
  }

  // Buscar pedidos do usuário no Firestore
  const q = query(collection(db, 'pedidos'), where('uid', '==', user.uid));
  const snap = await getDocs(q);

  if(snap.empty){
    listaPedidos.innerHTML = '<li>Você ainda não fez nenhum pedido.</li>';
  } else {
    snap.forEach(doc => {
      const data = doc.data();
      const li = document.createElement('li');
      li.textContent = `Pedido #${doc.id} - ${data.status} - R$ ${data.total.toFixed(2)}`;
      listaPedidos.appendChild(li);
    });
  }
});

// Logout
btnLogout.addEventListener('click', async e => {
  e.preventDefault();
  await signOut(auth);
  window.location.href = 'login.html';
});
