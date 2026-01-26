const lista = document.getElementById("lista-produtos");

function formatBRL(v) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(v);
}

function criarCard(p) {
  const article = document.createElement("article");
  article.className = "card-produto";
  article.dataset.category = p.categoria;
  article.dataset.nome = (p.nome || "").toLowerCase();

  article.innerHTML = `
    <img src="${p.imagem}" alt="${p.nome}" loading="lazy">
    <h3>${p.nome}</h3>
    <p class="preco">${formatBRL(p.preco)}</p>
    <button class="btn-carrinho" type="button"
      data-id="${p.id}">
      Adicionar ao carrinho
    </button>
  `;
  return article;
}

function renderProdutos(produtos) {
  if (!lista) return;
  lista.innerHTML = "";
  for (const p of produtos) lista.appendChild(criarCard(p));
}

function getProdutosBase() {
  if (!window.PRODUTOS || !Array.isArray(window.PRODUTOS)) {
    console.error("PRODUTOS não encontrado. Verifique a ordem dos scripts.");
    return [];
  }
  return window.PRODUTOS;
}

// Inicial
renderProdutos(getProdutosBase());

// Exponha helpers (se quiser usar no script.js depois)
window.renderProdutos = renderProdutos;
window.getProdutosBase = getProdutosBase;
