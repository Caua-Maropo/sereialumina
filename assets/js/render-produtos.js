const lista = document.getElementById("lista-produtos");

function formatBRL(v) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(v);
}

function getCarrinho() {
  try {
    return JSON.parse(localStorage.getItem("carrinho")) || [];
  } catch {
    return [];
  }
}

function qtdNoCarrinho(id, tamanho) {
  const carrinho = getCarrinho();
  const item = carrinho.find((i) => i.id === id && i.tamanho === tamanho);
  return item ? item.quantidade : 0;
}

function estoqueDisponivel(produto, tamanho) {
  const base = produto.estoque?.[tamanho] ?? 0;
  return Math.max(0, base - qtdNoCarrinho(produto.id, tamanho));
}

function criarCard(p) {
  const article = document.createElement("article");
  article.className = "card-produto";
  article.dataset.category = p.categoria;
  article.dataset.nome = (p.nome || "").toLowerCase();

  const dispP = estoqueDisponivel(p, "P");
  const dispM = estoqueDisponivel(p, "M");
  const dispG = estoqueDisponivel(p, "G");

  article.innerHTML = `
  <a class="link-produto" href="pages/produto.html?id=${encodeURIComponent(p.id)}" aria-label="Ver ${p.nome}">
    <img src="${p.imagem}" alt="${p.nome}" loading="lazy">
  </a>

  <a class="link-produto" href="pages/produto.html?id=${encodeURIComponent(p.id)}">
    <h3>${p.nome}</h3>
  </a>

  <p class="preco">R$ ${p.preco.toFixed(2).replace(".", ",")}</p>
  ...
`;

    <div class="linha-tamanho">
      <label class="sr-only" for="tam-${p.id}">Tamanho</label>
      <select id="tam-${p.id}" class="select-tamanho">
        <option value="">Tamanho</option>
        <option value="P" ${dispP === 0 ? "disabled" : ""}>P ${dispP === 0 ? "(esgotado)" : ""}</option>
        <option value="M" ${dispM === 0 ? "disabled" : ""}>M ${dispM === 0 ? "(esgotado)" : ""}</option>
        <option value="G" ${dispG === 0 ? "disabled" : ""}>G ${dispG === 0 ? "(esgotado)" : ""}</option>
      </select>

      <span class="estoque-mini" aria-label="Estoque disponível">
        P:${dispP} • M:${dispM} • G:${dispG}
      </span>
    </div>

    <button class="btn-carrinho" type="button"
      data-id="${p.id}">
      Adicionar ao carrinho
    </button>
  `;

  // Se tudo esgotado, desabilita o botão
  const btn = article.querySelector(".btn-carrinho");
  if (dispP + dispM + dispG === 0) {
    btn.disabled = true;
    btn.textContent = "Esgotado";
  }

  return article;
}

function getProdutosBase() {
  if (!window.PRODUTOS || !Array.isArray(window.PRODUTOS)) {
    console.error("PRODUTOS não encontrado. Verifique a ordem dos scripts.");
    return [];
  }
  return window.PRODUTOS;
}

function renderProdutos(produtos = getProdutosBase()) {
  if (!lista) return;
  lista.innerHTML = "";
  for (const p of produtos) lista.appendChild(criarCard(p));
}

// inicial
renderProdutos();

// deixa acessível pro script.js re-renderizar depois de mudar o carrinho
window.renderProdutos = renderProdutos;
window.getProdutosBase = getProdutosBase;
window.estoqueDisponivel = estoqueDisponivel;
