console.log("script.js carregado");

// ================================
// ESTADO GLOBAL
// ================================
const usuarioAtual = { uid: "guest" };
let carrinho = JSON.parse(localStorage.getItem(`carrinho_${usuarioAtual.uid}`)) || [];

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
function salvarCarrinho() {
  localStorage.setItem(
    `carrinho_${usuarioAtual.uid}`,
    JSON.stringify(carrinho)
  );
}

// ================================
// UI
// ================================
function atualizarBadgeCarrinho() {
  const badge = document.getElementById("badge-carrinho");
  if (!badge) return;

  const total = carrinho.reduce((s, i) => s + i.quantidade, 0);
  badge.textContent = total;
}

function atualizarCarrinho() {
  if (!listaCarrinho || !totalCarrinho) return;

  listaCarrinho.innerHTML = "";
  let total = 0;

  carrinho.forEach((item, index) => {
    const subtotal = item.preco * item.quantidade;
    total += subtotal;

    const li = document.createElement("li");
    li.className = "item-carrinho";

    li.innerHTML = `
      <div>
        <strong>${item.produto} <span class="cart-size">(${item.tamanho})</span></strong><br>
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
      salvarCarrinho();
      atualizarCarrinho();
      atualizarBadgeCarrinho();
    };
  });

  salvarCarrinho();
}

// ================================
// ADICIONAR AO CARRINHO
// ================================

document.addEventListener("click", (e) => {
  const botao = e.target.closest(".btn-carrinho");
  if (!botao) return;

  const id = botao.dataset.id;
  const produto = (window.PRODUTOS || []).find(p => p.id === id);
  if (!produto) return;

  const card = botao.closest(".card-produto");
  const select = card?.querySelector(".select-tamanho");
  const tamanho = select?.value;

  if (!tamanho) {
    alert("Selecione um tamanho (P/M/G) antes de adicionar.");
    return;
  }

  // Checa estoque disponível (estoque base - carrinho)
  const disponivel = window.estoqueDisponivel ? window.estoqueDisponivel(produto, tamanho) : 0;
  if (disponivel <= 0) {
    alert("Esse tamanho está esgotado.");
    return;
  }

  // chave composta: id+tamanho
  const item = carrinho.find(i => i.id === id && i.tamanho === tamanho);

  if (item) {
    if (item.quantidade >= disponivel) {
      alert("Você já adicionou o máximo disponível desse tamanho.");
      return;
    }
    item.quantidade += 1;
  } else {
    carrinho.push({
      id: produto.id,
      produto: produto.nome,
      preco: produto.preco,
      tamanho,
      quantidade: 1
    });
  }

  salvarCarrinho();
  atualizarCarrinho();

  // Re-render pra atualizar os estoques exibidos nos cards
  if (window.renderProdutos) window.renderProdutos(window.getProdutosBase());
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

function fecharCarrinhoLateral() {
  carrinhoLateral.classList.remove("ativo");
  overlay.classList.remove("ativo");
  document.body.style.overflow = "";
}

fecharCarrinho?.addEventListener("click", fecharCarrinhoLateral);
overlay?.addEventListener("click", fecharCarrinhoLateral);

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
    msg += `• ${item.produto} (${item.tamanho}) x${item.quantidade} — R$ ${sub.toFixed(2).replace(".", ",")}\n`;
  });

  msg += `\nTotal: R$ ${total.toFixed(2).replace(".", ",")}`;

  window.open(
    `https://wa.me/5581984782598?text=${encodeURIComponent(msg)}`,
    "_blank"
  );
});

// ================================
// INIT
// ================================
atualizarCarrinho();
atualizarBadgeCarrinho();
