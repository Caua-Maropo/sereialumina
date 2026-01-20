console.log("produto.js carregado");

document.addEventListener("DOMContentLoaded", () => {

  const nomeEl = document.getElementById("produto-nome");
  const precoEl = document.getElementById("produto-preco");
  const descricaoEl = document.getElementById("produto-descricao");
  const imagemEl = document.getElementById("produto-imagem");
  const btnCarrinho = document.querySelector(".btn-carrinho");
  const listaTamanhos = document.getElementById("lista-tamanhos");

  let tamanhoSelecionado = null;

  // ================================
  // PEGAR PRODUTO DA URL
  // ================================
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  const produto = window.PRODUTOS?.find(p => p.id === id);

  if (!produto) {
    nomeEl.textContent = "Produto não encontrado";
    return;
  }

  // 👉 AGORA SIM PODE
  const corPadrao = Object.keys(produto.variacoes)[0];
  const estoque = produto.variacoes[corPadrao];

  console.log("Cor padrão:", corPadrao);
  console.log("Estoque:", estoque);

});

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
  if (produto.tamanhos && listaTamanhos) {
    produto.tamanhos.forEach(tam => {
      const btn = document.createElement("button");
      btn.textContent = tam;

      btn.addEventListener("click", () => {
        document
          .querySelectorAll(".lista-tamanhos button")
          .forEach(b => b.classList.remove("ativo"));

        btn.classList.add("ativo");
        tamanhoSelecionado = tam;
      });

      listaTamanhos.appendChild(btn);
    });
  }

  // ================================
  // BOTÃO CARRINHO
  // ================================
  btnCarrinho.addEventListener("click", () => {
    if (!tamanhoSelecionado) {
      alert("Por favor, selecione um tamanho.");
      return;
    }

    // integração com carrinho global
    btnCarrinho.dataset.produto = produto.nome;
    btnCarrinho.dataset.preco = produto.preco;
    btnCarrinho.dataset.tamanho = tamanhoSelecionado;

    console.log("Produto:", produto.nome);
    console.log("Tamanho:", tamanhoSelecionado);
  });


