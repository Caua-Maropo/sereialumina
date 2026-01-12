console.log("script.js carregado");

// ================================
// FIREBASE AUTH
// ================================
import {
  getAuth,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const auth = getAuth();

// ================================
// VARIÁVEIS
// ================================
let carrinho = [];
let usuarioAtual = null;

// Elementos
const listaCarrinho = document.getElementById("lista-carrinho");
const totalCarrinho = document.getElementById("total-carrinho");
const botaoFinalizar = document.getElementById("finalizar-whatsapp");

// ================================
// STORAGE POR USUÁRIO
// ================================
function getCarrinho(uid) {
  return JSON.parse(localStorage.getItem(`carrinho_${uid}`)) || [];
}

function salvarCarrinho(uid, dados) {
  localStorage.setItem(`carrinho_${uid}`, JSON.stringify(dados));
}

// ================================
// ATUALIZAR CARRINHO (UI)
// ================================
function atualizarCarrinho() {
  if (!usuarioAtual) return;

  salvarCarrinho(usuarioAtual.uid, carrinho);

  if (!listaCarrinho || !totalCarrinho) return;

  listaCarrinho.innerHTML = "";
  let total = 0;

  carrinho.forEach((item, index) => {
    const subtotal = item.preco * item.quantidade;
    total += subtotal;

    const li = document.createElement("li");
    li.classList.add("item-carrinho");

    li.innerHTML = `
      <div>
        <span>${item.produto} — ${item.tamanho}</span>
        <small>Qtd: ${item.quantidade}</small>
      </div>
      <div class="acoes">
        <strong>R$ ${subtotal.toFixed(2).replace(".", ",")}</strong>
        <button class="btn-remover" data-index="${index}">✕</button>
      </div>
    `;

    listaCarrinho.appendChild(li);
  });

  totalCarrinho.textContent = total.toFixed(2).replace(".", ",");

  document.querySelectorAll(".btn-remover").forEach(btn => {
    btn.addEventListener("click", () => {
      carrinho.splice(btn.dataset.index, 1);
      atualizarCarrinho();
      atualizarBadgeCarrinho();
    });
  });
}

// ================================
// BADGE CARRINHO
// ================================
function atualizarBadgeCarrinho() {
  const badge = document.getElementById("badge-carrinho");
  if (!badge) return;

  const totalItens = carrinho.reduce(
    (soma, item) => soma + item.quantidade,
    0
  );

  badge.textContent = totalItens;
}

// ================================
// ADICIONAR AO CARRINHO
// ================================
function ativarBotoesCarrinho() {
  document.querySelectorAll(".btn-carrinho").forEach(botao => {
    botao.addEventListener("click", () => {
      if (!usuarioAtual) {
        window.location.href = "login.html";
        return;
      }

      const produto = botao.dataset.produto;
      const preco = Number(botao.dataset.preco);
      const tamanho = "Único";

      const existente = carrinho.find(
        item => item.produto === produto && item.tamanho === tamanho
      );

      if (existente) {
        existente.quantidade++;
      } else {
        carrinho.push({
          produto,
          preco,
          tamanho,
          quantidade: 1
        });
      }

      atualizarCarrinho();
      atualizarBadgeCarrinho();
      mostrarToast();

      const texto = botao.textContent;
      botao.textContent = "✓ Adicionado";
      setTimeout(() => botao.textContent = texto, 1200);
    });
  });
}

// ================================
// TOAST
// ================================
function mostrarToast() {
  const toast = document.getElementById("toast");
  if (!toast) return;

  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2000);
}

// ================================
// FINALIZAR WHATSAPP
// ================================
if (botaoFinalizar) {
  botaoFinalizar.addEventListener("click", () => {
    if (carrinho.length === 0) {
      alert("Carrinho vazio");
      return;
    }

    let mensagem = "Olá! Meu pedido:\n\n";
    let total = 0;

    carrinho.forEach(item => {
      const sub = item.preco * item.quantidade;
      total += sub;
      mensagem += `• ${item.produto} (${item.tamanho}) x${item.quantidade} — R$ ${sub.toFixed(2)}\n`;
    });

    mensagem += `\nTotal: R$ ${total.toFixed(2)}`;

    window.open(
      `https://wa.me/5581984782598?text=${encodeURIComponent(mensagem)}`,
      "_blank"
    );
  });
}

// ================================
// CARRINHO LATERAL
// ================================
const abrirCarrinho = document.getElementById("abrir-carrinho");
const fecharCarrinho = document.getElementById("fechar-carrinho");
const carrinhoLateral = document.getElementById("carrinho-lateral");
const overlay = document.getElementById("overlay-carrinho");

function abrirCarrinhoLateral() {
  carrinhoLateral?.classList.add("ativo");
  overlay?.classList.add("ativo");
  document.body.style.overflow = "hidden";
}

function fecharCarrinhoLateral() {
  carrinhoLateral?.classList.remove("ativo");
  overlay?.classList.remove("ativo");
  document.body.style.overflow = "";
}

abrirCarrinho?.addEventListener("click", e => {
  e.preventDefault();
  abrirCarrinhoLateral();
});

fecharCarrinho?.addEventListener("click", fecharCarrinhoLateral);
overlay?.addEventListener("click", fecharCarrinhoLateral);

// ================================
// FILTRO DE CATEGORIAS
// ================================
const categorias = document.querySelectorAll(".cat-card");
const produtosCards = document.querySelectorAll(".card-produto");

categorias.forEach(cat => {
  cat.addEventListener("click", () => {
    const filtro = cat.dataset.category;

    categorias.forEach(c => c.classList.remove("ativo"));
    cat.classList.add("ativo");

    produtos.forEach(prod => {
      prod.style.display =
        filtro === "todos" || prod.dataset.category === filtro
          ? "block"
          : "none";
    });
  });
});

// ================================
// AUTH → INICIALIZA CARRINHO
// ================================
onAuthStateChanged(auth, (user) => {
  if (user) {
    usuarioAtual = user;
    carrinho = getCarrinho(user.uid);
    atualizarCarrinho();
    atualizarBadgeCarrinho();
    ativarBotoesCarrinho();
  } else {
    carrinho = [];
    atualizarCarrinho();
    atualizarBadgeCarrinho();
  }
});
