console.log("script.js carregado");

// ================================
// FIREBASE AUTH
// ================================


// ================================
// VARIÁVEIS DE ESTADO
// ================================
let carrinho = [];
let usuarioAtual = { uid: "guest" }; // 🔹 fallback para TESTES

// ================================
// ELEMENTOS DO DOM
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

function salvarCarrinho(uid, dados) {
  localStorage.setItem(`carrinho_${uid}`, JSON.stringify(dados));
}

// ================================
// ATUALIZAR CARRINHO (UI)
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
    li.classList.add("item-carrinho");

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
      const produto = botao.dataset.produto;
      const preco = Number(botao.dataset.preco);

      const existente = carrinho.find(item => item.produto === produto);

      if (existente) {
        existente.quantidade++;
      } else {
        carrinho.push({
          produto,
          preco,
          quantidade: 1
        });
      }

      atualizarCarrinho();
      atualizarBadgeCarrinho();

      const texto = botao.textContent;
      botao.textContent = "✓ Adicionado";
      setTimeout(() => botao.textContent = texto, 1000);
    });
  });
}

// ================================
// CARRINHO LATERAL (ABRIR / FECHAR)
// ================================
function abrirCarrinhoLateral() {
  carrinhoLateral.classList.add("ativo");
  overlay.classList.add("ativo");
  document.body.style.overflow = "hidden";
}

function fecharCarrinhoLateral() {
  carrinhoLateral.classList.remove("ativo");
  overlay.classList.remove("ativo");
  document.body.style.overflow = "";
}

abrirCarrinho.addEventListener("click", e => {
  e.preventDefault();
  abrirCarrinhoLateral();
});

fecharCarrinho.addEventListener("click", fecharCarrinhoLateral);
overlay.addEventListener("click", fecharCarrinhoLateral);

// ================================
// FILTRO DE CATEGORIAS (ERRO ESTAVA AQUI)
// ================================
const categorias = document.querySelectorAll(".cat-card");
const produtosCards = document.querySelectorAll(".card-produto");

categorias.forEach(cat => {
  cat.addEventListener("click", () => {
    const filtro = cat.dataset.category;

    categorias.forEach(c => c.classList.remove("ativo"));
    cat.classList.add("ativo");

    // 🔴 ANTES: produtos (não existia)
    // ✅ AGORA: produtosCards
    produtosCards.forEach(prod => {
      prod.style.display =
        filtro === "todos" || prod.dataset.category === filtro
          ? "block"
          : "none";
    });
  });
});

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
      mensagem += `• ${item.produto} x${item.quantidade} — R$ ${sub.toFixed(2)}\n`;
    });

    mensagem += `\nTotal: R$ ${total.toFixed(2)}`;

    window.open(
      `https://wa.me/5581984782598?text=${encodeURIComponent(mensagem)}`,
      "_blank"
    );
  });
}

document.addEventListener("click", (event) => {
  const btn = event.target.closest(".btn-carrinho");
  if (!btn) return;

  const produto = btn.dataset.produto;
  const preco = Number(btn.dataset.preco);

  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

  carrinho.push({
    nome: produto,
    preco,
    quantidade: 1
  });

  localStorage.setItem("carrinho", JSON.stringify(carrinho));

  if (typeof atualizarBadge === "function") {
    atualizarBadge();
  }

  btn.textContent = "✓ Adicionado";
  setTimeout(() => {
    btn.textContent = "Adicionar ao carrinho";
  }, 1000);
});

// ================================
// INIT
// ================================
carrinho = getCarrinho(usuarioAtual.uid);
ativarBotoesCarrinho();
atualizarCarrinho();
atualizarBadgeCarrinho();
