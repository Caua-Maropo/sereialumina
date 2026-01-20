console.log("produto.js carregado");

document.addEventListener("DOMContentLoaded", () => {

  const nomeEl = document.getElementById("produto-nome");
  const precoEl = document.getElementById("produto-preco");
  const descricaoEl = document.getElementById("produto-descricao");
  const imagemEl = document.getElementById("produto-imagem");
  const btnCarrinho = document.querySelector(".btn-carrinho");
  const listaTamanhos = document.getElementById("lista-tamanhos");
  const avisoTamanho = document.getElementById("aviso-tamanho");

  let tamanhoSelecionado = null;

  // ================================
  // PRODUTO DA URL
  // ================================
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  const produto = window.PRODUTOS?.find(p => p.id === id);

  if (!produto) {
    nomeEl.textContent = "Produto não encontrado";
    return;
  }

  // ================================
  // RENDER PRODUTO
  // ================================
  nomeEl.textContent = produto.nome;
  precoEl.textContent = produto.preco.toFixed(2).replace(".", ",");
  descricaoEl.textContent = produto.descricao;
  imagemEl.src = `../${produto.imagem}`;
  imagemEl.alt = produto.nome;

  // ================================
  // TAMANHOS
  // ================================
  produto.tamanhos.forEach(tam => {
    const btn = document.createElement("button");
    btn.textContent = tam;

    btn.addEventListener("click", () => {
  document
    .querySelectorAll(".lista-tamanhos button")
    .forEach(b => b.classList.remove("ativo"));

  btn.classList.add("ativo");
  tamanhoSelecionado = tam;

  // 🔓 libera botão
  btnCarrinho.disabled = false;
  btnCarrinho.classList.add("ativo");

  avisoTamanho.textContent = `Tamanho ${tam} selecionado`;
  avisoTamanho.style.color = "#2e7d32";
});

    listaTamanhos.appendChild(btn);
  });

  // ================================
  // BOTÃO CARRINHO
  // ================================
  btnCarrinho.addEventListener("click", () => {
    if (!tamanhoSelecionado) {
      avisoTamanho.textContent = "Por favor, selecione um tamanho";
      avisoTamanho.classList.add("erro");
      return;
    }

    console.log("Produto:", produto.nome);
    console.log("Tamanho:", tamanhoSelecionado);

    // aqui depois entra o carrinho real
  });
const avisoTamanho = document.getElementById("aviso-tamanho");

// botão começa bloqueado
btnCarrinho.disabled = true;

});
