import { db } from './firebase.js';
import { collection, onSnapshot } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Elementos do dashboard
const totalPedidosEl = document.getElementById('total-pedidos');
const pedidosPagosEl = document.getElementById('pedidos-pagos');
const pedidosEnviadosEl = document.getElementById('pedidos-enviados');
const pedidosEntreguesEl = document.getElementById('pedidos-entregues');

// Listener para atualização em tempo real
onSnapshot(collection(db, 'orders'), (snapshot) => {
  let total = snapshot.size;
  let pagos = 0, enviados = 0, entregues = 0;

  snapshot.forEach(docSnap => {
    const status = docSnap.data().status;
    if (status === 'Pago') pagos++;
    else if (status === 'Enviado') enviados++;
    else if (status === 'Entregue') entregues++;
  });

  totalPedidosEl.textContent = total;
  pedidosPagosEl.textContent = pagos;
  pedidosEnviadosEl.textContent = enviados;
  pedidosEntreguesEl.textContent = entregues;
});
