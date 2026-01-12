import { db } from './firebase.js';
import { collection, doc, onSnapshot, updateDoc, query, orderBy } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const pedidosContainer = document.getElementById('pedidos-container');

// Função para criar o HTML de cada pedido
function criarPedidoHTML(pedidoId, pedidoData) {
  const div = document.createElement('div');
  div.classList.add('pedido-item');

  div.innerHTML = `
    <p><strong>Cliente:</strong> ${pedidoData.customerName} (${pedidoData.customerEmail})</p>
    <p><strong>Itens:</strong> ${pedidoData.items.map(i => `${i.product} x${i.quantity}`).join(', ')}</p>
    <p><strong>Total:</strong> R$ ${pedidoData.total}</p>
    <p><strong>Status:</strong> <span class="status">${pedidoData.status}</span></p>
    <button class="btn-status" data-id="${pedidoId}" data-status="Pago">Pago</button>
    <button class="btn-status" data-id="${pedidoId}" data-status="Enviado">Enviado</button>
    <button class="btn-status" data-id="${pedidoId}" data-status="Entregue">Entregue</button>
    <hr>
  `;
  return div;
}

// Listener em tempo real para todos os pedidos
const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));

onSnapshot(q, (snapshot) => {
  pedidosContainer.innerHTML = ''; // limpa antes de atualizar
  snapshot.forEach(docSnap => {
    const pedidoDiv = criarPedidoHTML(docSnap.id, docSnap.data());
    pedidosContainer.appendChild(pedidoDiv);
  });

  // Adiciona eventos aos botões de status
  document.querySelectorAll('.btn-status').forEach(btn => {
    btn.addEventListener('click', async () => {
      const id = btn.dataset.id;
      const status = btn.dataset.status;
      await updateDoc(doc(db, 'orders', id), { status });
    });
  });
});
