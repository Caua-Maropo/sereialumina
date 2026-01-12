console.log("render-produtos.js carregado");

const container = document.getElementById("lista-produtos");

if (!container) {
  console.error("Container #lista-produtos não encontrado");
}

if (!Array.isArray(PRODUTOS) || PRODUTOS.length === 0) {
  console.warn("Nenhum produto disponível");
  return;
}

PRODUTOS.forEach(produto => {
  const article = document.createElement("article");
  article.classList.add("card-produto");
  article.dataset.category = produto.categoria;

  article.innerHTML = `
    <a href="pages/produto.html?id=${produto.id}">
      <img src="${produto.imagem}" alt="${produto.nome}">
      <h3>${produto.nome}</h3>
      <p class="preco">R$ ${produto.preco.toFixed(2).replace(".", ",")}</p>
    </a>

    <button
      type="button"
      class="btn-favorito"
      data-id="${produto.id}">
      <i class="fa-regular fa-heart"></i>
    </button>

    <button
      type="button"
      class="btn-carrinho"
      data-produto="${produto.nome}"
      data-preco="${produto.preco}">
      Adicionar ao carrinho
    </button>
  `;

  container.appendChild(article);
});
