console.log("produto.js carregado");

document.addEventListener("DOMContentLoaded", () => {

  const nomeEl = document.getElementById("produto-nome");
  const precoEl = document.getElementById("produto-preco");
  const descricaoEl = document.getElementById("produto-descricao");
  const imagemEl = document.getElementById("produto-imagem");
  const btnCarrinho = document.querySelector(".btn-carrinho");

  if (!nomeEl || !precoEl || !descricaoEl || !imagemEl) {
    console.error("Elementos do produto não encontrados no DOM");
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  const produto = window.PRODUTOS?.find(p => p.id === id);

  if (!produto) {
    nomeEl.textContent = "Produto não encontrado";
    return;
  }

  nomeEl.textContent = produto.nome;
  precoEl.textContent = produto.preco.toFixed(2).replace(".", ",");
  descricaoEl.textContent = produto.descricao;
  imagemEl.src = `../${produto.imagem}`;
  imagemEl.alt = produto.nome;

  // Integra com o carrinho global
  btnCarrinho.dataset.produto = produto.nome;
  btnCarrinho.dataset.preco = produto.preco;

});
