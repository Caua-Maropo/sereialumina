import { db } from "./firebase.js";
import {
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// ================================
// CARRINHO
// ================================
let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

const listaCarrinho = document.getElementById('lista-carrinho');
const totalCarrinho = document.getElementById('total-carrinho');
const botaoFinalizar = document.getElementById('finalizar-whatsapp');

function atualizarCarrinho() {
  if (!listaCarrinho || !totalCarrinho) return;

  listaCarrinho.innerHTML = '';
  let total = 0;

  carrinho.forEach((item, index) => {
    const subtotal = item.preco * item.quantidade;
    total += subtotal;

    const li = document.createElement('li');
    li.innerHTML = `
      <span>
        ${item.produto} <br>
        Tam ${item.tamanho} — Qtde ${item.quantidade}
      </span>
      <strong>R$ ${subtotal.toFixed(2).replace('.', ',')}</strong>
    `;

    listaCarrinho.appendChild(li);
  });

  totalCarrinho.textContent = total.toFixed(2).replace('.', ',');
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

/* BOTÃO ADICIONAR */
document.querySelectorAll('.btn-carrinho').forEach(botao => {
  botao.addEventListener('click', () => {
    const card = botao.closest('.card');

    const produto = botao.dataset.produto;
    const preco = parseFloat(botao.dataset.preco);
    const tamanho = card.querySelector('.tamanho.ativo')?.textContent;
    const quantidade = parseInt(card.querySelector('.qtd-valor')?.textContent || 1);

    if (!tamanho) {
      alert('Selecione um tamanho');
      return;
    }

    carrinho.push({ produto, preco, tamanho, quantidade });
    atualizarCarrinho();

    botao.textContent = '✓ Adicionado';
    setTimeout(() => botao.textContent = 'Adicionar ao carrinho', 1200);
  });
});

/* FINALIZAR */
if (botaoFinalizar) {
  botaoFinalizar.addEventListener('click', () => {
    if (carrinho.length === 0) {
      alert('Carrinho vazio');
      return;
    }

    let mensagem = 'Olá! Meu pedido:\n\n';
    let total = 0;

    carrinho.forEach(item => {
      const sub = item.preco * item.quantidade;
      total += sub;
      mensagem += `• ${item.produto} (${item.tamanho}) x${item.quantidade} — R$ ${sub.toFixed(2)}\n`;
    });

    mensagem += `\nTotal: R$ ${total.toFixed(2)}`;

    window.open(
      `https://wa.me/5581984782598?text=${encodeURIComponent(mensagem)}`,
      '_blank'
    );
  });
}

atualizarCarrinho();

// ================================
// FILTROS
// ================================
const botoesFiltro = document.querySelectorAll(".filtros button");
const produtos = document.querySelectorAll(".produto");

botoesFiltro.forEach((btn) => {
  btn.addEventListener("click", () => {
    botoesFiltro.forEach((b) => b.classList.remove("ativo"));
    btn.classList.add("ativo");

    const categoria = btn.dataset.category;
    produtos.forEach((p) => {
      p.style.display =
        categoria === "todos" || p.dataset.category === categoria ? "flex" : "none";
    });
async function salvarPedido(pedido) {
  try {
    await addDoc(collection(db, "pedidos"), {
      ...pedido,
      status: "Recebido",
      criadoEm: serverTimestamp()
    });
    console.log("Pedido salvo com sucesso!");
  } catch (error) {
    console.error("Erro ao salvar pedido:", error);
  }
}

