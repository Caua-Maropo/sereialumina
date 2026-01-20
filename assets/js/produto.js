console.log("produto.js carregado");

document.addEventListener("DOMContentLoaded", () => {

  // ================================
  // ELEMENTOS
  // ================================
  const nomeEl = document.getElementById("produto-nome");
  const precoEl = document.getElementById("produto-preco");
  const descricaoEl = document.getElementById("produto-descricao");
  const imagemEl = document.getElementById("produto-imagem");
  const btnCarrinho = document.querySelector(".btn-carrinho");
  const listaTamanhos = document.getElementById("lista-tamanhos");
  const estoqueInfo = document.getElementById("estoque-info");

  if (!nomeEl || !precoEl || !descricaoEl || !imagemEl || !btnCarrinho) {
    console.error("Elementos do produto não encontrados");
    return;
  }

  // botão começa desativado
  btnCarrinho.disabled = true;

  let tamanhoSelecionado = null;

  // ================================
  // PRODUTO PELA URL
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
  // TAMANHOS / ESTOQUE
  // ================================
  if (!produto.estoque || !listaTamanhos) {
    console.warn("Produto sem estoque/tamanhos definidos");
    return;
  }

  Object.entries(produto.estoque).forEach(([tamanho, quantidade]) => {
    const btn = document.createElement("button");
    btn.textContent = tamanho;

    if (quantidade === 0) {
      btn.disabled = true;
      btn.classList.add("esgotado");
    }

    btn.addEventListener("click", () => {
      document
       if (estoqueInfo) {
      estoqueInfo.textContent = `Em estoque: ${quantidade}`;
      }
   .forEach(b => b.classList.remove("ativo"));

      btn.classList.add("ativo");
      tamanhoSelecionado = tamanho;

      if (estoqueInfo) {
        estoqueInfo.textContent = `Em estoque: ${quantidade}`;
      }

      // libera o botão do carrinho
      btnCarrinho.disabled = false;
    });

    listaTamanhos.appendChild(btn);
  });

  // ================================
  // ADICIONAR AO CARRINHO
  // ================================
  btnCarrinho.addEventListener("click", () => {
    if (!tamanhoSelecionado) {
      alert("Selecione um tamanho");
      return;
    }

    // integração com script.js
    btnCarrinho.dataset.produto = `${produto.nome} - Tam ${tamanhoSelecionado}`;
    btnCarrinho.dataset.preco = produto.preco;

    // feedback visual
    btnCarrinho.textContent = "✓ Adicionado";
    setTimeout(() => {
      btnCarrinho.textContent = "Adicionar ao carrinho";
    }, 1200);
  });

});
