console.log("produto.js carregado");

document.addEventListener("DOMContentLoaded", () => {

  const nomeEl = document.getElementById("produto-nome");
  const precoEl = document.getElementById("produto-preco");
  const descricaoEl = document.getElementById("produto-descricao");
  const imagemEl = document.getElementById("produto-imagem");
  const btnCarrinho = document.querySelector(".btn-carrinho");
  const listaTamanhos = document.getElementById("lista-tamanhos");
  const avisoTamanho = document.getElementById("aviso-tamanho");

  // botão começa bloqueado
btnCarrinho.disabled = true

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
// TAMANHOS + ESTOQUE
// ================================

const estoqueInfo = document.getElementById("estoque-info");

if (!produto.estoque || !listaTamanhos) {
  console.warn("Produto sem estoque definido");
  return;
}

Object.entries(produto.estoque).forEach(([tamanho, qtd]) => {
  const btn = document.createElement("button");
  btn.textContent = tamanho;

  if (qtd === 0) {
    btn.disabled = true;
    btn.classList.add("esgotado");
  }

 btn.addEventListener("click", () => {
  document
    .querySelectorAll(".lista-tamanhos button")
    .forEach(b => b.classList.remove("ativo"));

  btn.classList.add("ativo");
  tamanhoSelecionado = tamanho;
  estoqueInfo.textContent = `Em estoque: ${qtd}`;

  // ✅ HABILITA O BOTÃO
  btnCarrinho.disabled = false;
});

  listaTamanhos.appendChild(btn);
});

  btnCarrinho.addEventListener("click", () => {
  if (!tamanhoSelecionado) {
    alert("Por favor, selecione um tamanho disponível.");
    return;
  }

  // 🔗 Integração com o carrinho global
  btnCarrinho.dataset.produto = `${produto.nome} (${tamanhoSelecionado})`;
  btnCarrinho.dataset.preco = produto.preco;

  // feedback visual
  btnCarrinho.textContent = "✓ Adicionado";
  setTimeout(() => {
    btnCarrinho.textContent = "Adicionar ao carrinho";
  }, 1000);
});


  console.log("Produto:", produto.nome);
  console.log("Tamanho:", tamanhoSelecionado);
});


    // aqui depois entra o carrinho real

