console.log("script.js carregado");

// ================================
// CARRINHO (LocalStorage)
// ================================
let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

// Elementos (podem ou não existir)
const listaCarrinho = document.getElementById("lista-carrinho");
const totalCarrinho = document.getElementById("total-carrinho");
const botaoFinalizar = document.getElementById("finalizar-whatsapp");

// ================================
// ATUALIZAR CARRINHO
// ================================
function atualizarCarrinho() {
  // Sempre salva no localStorage
  localStorage.setItem("carrinho", JSON.stringify(carrinho));

  // Se não estiver na página com carrinho lateral
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
        <span>${item.produto} — ${item.tamanho || "Único"}</span>
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

  // Remover item
  document.querySelectorAll(".btn-remover").forEach((btn) => {
    btn.addEventListener("click", () => {
      const index = Number(btn.dataset.index);
      carrinho.splice(index, 1);
      atualizarCarrinho();
      atualizarBadgeCarrinho();
    });
  });
}

// ================================
// ADICIONAR AO CARRINHO (INDEX)
// ================================
document.querySelectorAll(".btn-carrinho").forEach((botao) => {
  botao.addEventListener("click", () => {
    const produto = botao.dataset.produto;
    const preco = Number(botao.dataset.preco);
    const tamanho = "Único";

    if (!produto || isNaN(preco)) return;

    const itemExistente = carrinho.find(
      (item) => item.produto === produto && item.tamanho === tamanho
    );

    if (itemExistente) {
      itemExistente.quantidade++;
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

    const textoOriginal = botao.textContent;
    botao.textContent = "✓ Adicionado";
    setTimeout(() => {
      botao.textContent = textoOriginal;
    }, 1200);
  });
});

// ================================
// BADGE DO CARRINHO
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

    carrinho.forEach((item) => {
      const sub = item.preco * item.quantidade;
      total += sub;
      mensagem += `• ${item.produto} (${item.tamanho || "Único"}) x${item.quantidade} — R$ ${sub.toFixed(2)}\n`;
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
  if (!carrinhoLateral || !overlay) return;
  carrinhoLateral.classList.add("ativo");
  overlay.classList.add("ativo");
  document.body.style.overflow = "hidden";
}

function fecharCarrinhoLateral() {
  if (!carrinhoLateral || !overlay) return;
  carrinhoLateral.classList.remove("ativo");
  overlay.classList.remove("ativo");
  document.body.style.overflow = "";
}

if (abrirCarrinho) {
  abrirCarrinho.addEventListener("click", (e) => {
    e.preventDefault();
    abrirCarrinhoLateral();
  });
}

if (fecharCarrinho) fecharCarrinho.addEventListener("click", fecharCarrinhoLateral);
if (overlay) overlay.addEventListener("click", fecharCarrinhoLateral);

// ================================
// FILTRO DE CATEGORIAS (INDEX)
// ================================
const categorias = document.querySelectorAll(".cat-card");
const produtosCards = document.querySelectorAll(".produto");

categorias.forEach((categoria) => {
  categoria.addEventListener("click", () => {
    const filtro = categoria.dataset.category;

    categorias.forEach((c) => c.classList.remove("ativo"));
    categoria.classList.add("ativo");

    produtosCards.forEach((produto) => {
      if (filtro === "todos" || produto.dataset.category === filtro) {
        produto.style.display = "block";
      } else {
        produto.style.display = "none";
      }
    });
  });
});

// ================================
// BADGE FAVORITOS
// ================================
function atualizarBadgeFavoritos() {
  const badge = document.getElementById("badge-favoritos");
  if (!badge) return;

  const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
  badge.textContent = favoritos.length;
}

// ================================
// INIT
// ================================
atualizarCarrinho();
atualizarBadgeCarrinho();
atualizarBadgeFavoritos();
