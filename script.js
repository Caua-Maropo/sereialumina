import { db } from "./firebase.js";
import {
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// ================================
// CARRINHO
// ================================
let carrinho = [];
const listaCarrinho = document.getElementById("lista-carrinho");
const totalCarrinho = document.getElementById("total-carrinho");
const botaoFinalizar = document.getElementById("finalizar-whatsapp");
const telefoneWhatsApp = "5581982959208";

// Atualiza carrinho
function atualizarCarrinho() {
  if (!listaCarrinho || !totalCarrinho) return;

  listaCarrinho.innerHTML = '';
  let total = 0;

  carrinho.forEach((item, index) => {
    const subtotal = item.preco * item.quantidade;
    total += subtotal;

    const li = document.createElement("li");
    li.innerHTML = `
      ${item.produto} — Tam ${item.tamanho} — Qtde ${item.quantidade}
      <br>
      R$ ${subtotal.toFixed(2).replace('.', ',')}
      <button class="remover" data-index="${index}">×</button>
    `;
    listaCarrinho.appendChild(li);
  });

  totalCarrinho.textContent = total.toFixed(2).replace('.', ',');
}

  document.querySelectorAll(".remover").forEach((btn) => {
    btn.addEventListener("click", () => {
      carrinho.splice(btn.dataset.index, 1);
      atualizarCarrinho();
    });

// Adicionar ao carrinho
document.querySelectorAll(".btn-carrinho").forEach((botao) => {
  botao.addEventListener("click", () => {
    const produto = botao.dataset.produto;
    const preco = parseFloat(botao.dataset.preco);

    console.log({
  produto,
  preco,
  tamanho: tamanhoAtivo?.textContent,
  quantidade: qtdValor?.textContent
});

 carrinho.push({
  produto,
  preco,
  tamanho: tamanhoAtivo.textContent,
  quantidade: parseInt(qtdValor.textContent)
});


    // Feedback visual
    const textoOriginal = botao.textContent;
    botao.textContent = "✓ Adicionado";
    botao.classList.add("adicionado");

    setTimeout(() => {
      botao.textContent = textoOriginal;
      botao.classList.remove("adicionado");
    }, 1400);
  });
  
// Finalizar no WhatsApp
if (botaoFinalizar) {
  botaoFinalizar.addEventListener('click', () => {
    if (carrinho.length === 0) {
      alert('Seu carrinho está vazio.');
      return;
    }

    let mensagem = 'Olá! Gostaria de finalizar meu pedido:\n\n';
    let total = 0;

    carrinho.forEach(item => {
      const subtotal = item.preco * item.quantidade;
      total += subtotal;
      mensagem += `• ${item.produto} — Tam ${item.tamanho} — Qtde ${item.quantidade} — R$ ${subtotal.toFixed(2)}\n`;
    });

    mensagem += `\nTotal: R$ ${total.toFixed(2)}`;

    const url = `https://wa.me/5581982959208?text=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank');
  });

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

