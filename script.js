console.log("script.js carregado");

// ================================
// CARRINHO (LocalStorage)
// ================================
let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

const listaCarrinho = document.getElementById("lista-carrinho");
const totalCarrinho = document.getElementById("total-carrinho");
const botaoFinalizar = document.getElementById("finalizar-whatsapp");

// ================================
// ATUALIZAR CARRINHO
// ================================
function atualizarCarrinho() {
  if (!listaCarrinho || !totalCarrinho) {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    return;
  }

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
        <button class="remover" data-index="${index}">✕</button>
      </div>
    `;

    listaCarrinho.appendChild(li);
  });

  totalCarrinho.textContent = total.toFixed(2).replace(".", ",");
  localStorage.setItem("carrinho", JSON.stringify(carrinho));

  document.querySelectorAll(".remover").forEach((botao) => {
    botao.addEventListener("click", () => {
      const index = botao.dataset.index;
      carrinho.splice(index, 1);
      atualizarCarrinho();
      atualizarBadge();
    });
  });
}

// ================================
// BOTÕES ADICIONAR AO CARRINHO
// ================================
document.querySelectorAll(".btn-carrinho").forEach((botao) => {
  botao.addEventListener("click", () => {
    const produto = botao.dataset.produto;
    const preco = parseFloat(botao.dataset.preco);
    const tamanho = "Único";

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
    atualizarBadge();
    mostrarToast();

    botao.textContent = "✓ Adicionado";
    setTimeout(() => {
      botao.textContent = "Adicionar ao carrinho";
    }, 1200);
  });
});

// ================================
// BADGE DO CARRINHO
// ================================
function atualizarBadge() {
  const badge = document.getElementById("badge-carrinho");
  if (!badge) return;

  const totalItens = carrinho.reduce((soma, item) => soma + item.quantidade, 0);
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

    let msg = "Olá! Meu pedido:\n\n";
    let total = 0;

    carrinho.forEach((item) => {
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
}

// ================================
// INIT
// ================================
atualizarCarrinho();
atualizarBadge();
// ================================
// CARRINHO LATERAL (NÍVEL 3)
// ================================
const abrirCarrinho = document.getElementById("abrir-carrinho");
const fecharCarrinho = document.getElementById("fechar-carrinho");
const carrinhoLateral = document.getElementById("carrinho-lateral");
const overlay = document.getElementById("overlay-carrinho");

function abrir() {
  carrinhoLateral.classList.add("ativo");
  overlay.classList.add("ativo");
  document.body.style.overflow = "hidden"
}

function fechar() {
  carrinhoLateral.classList.remove("ativo");
  overlay.classList.remove("ativo");
  document.body.style.overflow = "";
}

if (abrirCarrinho) abrirCarrinho.addEventListener("click", (e) => {
  e.preventDefault();
  abrir();
});

if (fecharCarrinho) fecharCarrinho.addEventListener("click", fechar);
if (overlay) overlay.addEventListener("click", fechar);
// ================================
// FILTRO DE CATEGORIAS (INDEX)
// ================================
const categorias = document.querySelectorAll(".cat-card");
const produtos = document.querySelectorAll(".produto");

categorias.forEach((categoria) => {
  categoria.addEventListener("click", () => {
    const filtro = categoria.dataset.category;

    // destaque visual
    categorias.forEach((c) => c.classList.remove("ativo"));
    categoria.classList.add("ativo");

    // 🔹 MOSTRAR TODOS
    if (filtro === "todos") {
      produtos.forEach((produto) => {
        produto.style.display = "block";
      });
      return;
    }

    // 🔹 FILTRO NORMAL
    produtos.forEach((produto) => {
      if (produto.dataset.category === filtro) {
        produto.style.display = "block";
      } else {
        produto.style.display = "none";
      }
    });
  });
});
const tabLogin = document.getElementById("tab-login");
const tabCadastro = document.getElementById("tab-cadastro");

const formLogin = document.getElementById("form-login");
const formCadastro = document.getElementById("form-cadastro");

tabLogin.addEventListener("click", () => {
  tabLogin.classList.add("ativo");
  tabCadastro.classList.remove("ativo");

  formLogin.classList.remove("hidden");
  formCadastro.classList.add("hidden");
});

tabCadastro.addEventListener("click", () => {
  tabCadastro.classList.add("ativo");
  tabLogin.classList.remove("ativo");

  formCadastro.classList.remove("hidden");
  formLogin.classList.add("hidden");
});


