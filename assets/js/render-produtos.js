const container = document.getElementById("lista-produtos");

PRODUTOS.forEach(produto => {
  const article = document.createElement("article");
  article.className = "card-produto";
  article.dataset.category = produto.categoria;

  article.innerHTML = `
    <a href="pages/produto.html?id=${produto.id}">
      <img src="${produto.imagem.replace('../', '')}" alt="${produto.nome}">
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
