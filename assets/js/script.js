console.log("script.js carregado");

// ================================
// ESTADO
// ================================
let usuarioAtual = { uid: "guest" };
let carrinho = [];

// ================================
// ELEMENTOS
// ================================
const listaCarrinho = document.getElementById("lista-carrinho");
const totalCarrinho = document.getElementById("total-carrinho");
const botaoFinalizar = document.getElementById("finalizar-whatsapp");

const abrirCarrinho = document.getElementById("abrir-carrinho");
const fecharCarrinho = document.getElementById("fechar-carrinho");
const carrinhoLateral = document.getElementById("carrinho-lateral");
const overlay = document.getElementById("overlay-carrinho");

// ================================
// STORAGE
// ================================
function getCarrinho(uid) {
  return JSON.parse(localStorage.getItem(`carrinho_${uid}`)) || [];
}

function salvarCarrinho(uid, carrinho) {
  localStorage.setItem(`carrinho_${uid}`, JSON.stringify(carrinho));
}

// ================================
// UI CARRINHO
// ================================
function atualizarCarrinho() {
  if (!listaCarrinho || !totalCarrinho) return;

  salvarCarrinho(usuarioAtual.uid, carrinho);

  listaCarrinho.innerHTML = "";
  let total = 0;

  carrinho.forEach((item, index) => {
    const subtotal = item.preco * item.quantidade;
    total += subtotal;

    const li = document.createElement("li");
    li.className = "item-carrinho";

    li.innerHTML = `
      <div>
        <span>${item.produto}</span>
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
    btn.onclick = () => {
      carrinho.splice(btn.dataset.index, 1);
      atualizarCarrinho();
      atualizarBadgeCarrinho();
    };
  });
}

// ================================
// BADGE
// ================================
function atualizarBadgeCarrinho() {
  const badge = document.getElementById("badge-carrinho");
  if (!badge) return;

  badge.textContent = carrinho.reduce(
    (soma, item) => soma + item.quantidade,
    0
  );
}

// ================================
// ADICIONAR AO CARRINHO (DINÂMICO)
// ================================
document.addEventListener("click", (event) => {
  const btn = event.target.closest(".btn-carrinho");
  if (!btn) return;

  const produto = btn.dataset.produto;
  const preco = Number(btn.dataset.preco);

  const existente = carrinho.find(i => i.produto === produto);

  if (existente) {
    existente.quantidade++;
  } else {
    carrinho.push({ produto, preco, quantidade: 1 });
  }

  atualizarCarrinho();
  atualizarBadgeCarrinho();

  btn.textContent = "✓ Adicionado";
  setTimeout(() => btn.textContent = "Adicionar ao carrinho", 1000);
});

// ================================
// CARRINHO LATERAL
// ================================
abrirCarrinho?.addEventListener("click", e => {
  e.preventDefault();
  carrinhoLateral.classList.add("ativo");
  overlay.classList.add("ativo");
  document.body.style.overflow = "hidden";
});

fecharCarrinho?.addEventListener("click", fecharCarrinhoLateral);
overlay?.addEventListener("click", fecharCarrinhoLateral);

function fecharCarrinhoLateral() {
  carrinhoLateral.classList.remove("ativo");
  overlay.classList.remove("ativo");
  document.body.style.overflow = "";
}

// ================================
// FINALIZAR WHATSAPP
// ================================
botaoFinalizar?.addEventListener("click", () => {
  if (!carrinho.length) {
    alert("Carrinho vazio");
    return;
  }

  let msg = "Olá! Meu pedido:\n\n";
  let total = 0;

  carrinho.forEach(item => {
    const sub = item.preco * item.quantidade;
    total += sub;
    msg += `• ${item.produto} x${item.quantidade} — R$ ${sub.toFixed(2)}\n`;
  });

  msg += `\nTotal: R$ ${total.toFixed(2)}`;

  window.open(
    `https://wa.me/5581984782598?text=${encodeURIComponent(msg)}`,
    "_blank"
  );
});

// ================================
// INIT
// ================================
carrinho = getCarrinho(usuarioAtual.uid);
atualizarCarrinho();
atualizarBadgeCarrinho();
