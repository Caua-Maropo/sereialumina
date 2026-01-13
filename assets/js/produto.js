console.log("produto.js carregado");

// ================================
// PRODUTO PELA URL
// ================================
const params = new URLSearchParams(window.location.search);
const idProduto = params.get("id");

const produto = PRODUTOS.find(p => p.id === idProduto);

if (!produto) {
  document.body.innerHTML = "<h2>Produto não encontrado</h2>";
  throw new Error("Produto inválido");
}

// ================================
// ELEMENTOS
// ================================
const $ = id => document.getElementById(id);

$("produto-nome").textContent = produto.nome;
$("produto-preco").textContent = `R$ ${produto.preco.toFixed(2).replace(".", ",")}`;
$("produto-descricao").textContent = produto.descricao;
$("produto-peso").textContent = produto.peso;
$("produto-imagem").src = "../" + produto.imagem;

// ================================
// CORES
// ================================
let corSelecionada = Object.keys(produto.cores)[0];
let tamanhoSelecionado = null;

Object.keys(produto.cores).forEach(cor => {
  const div = document.createElement("div");
  div.className = "cor-item";
  div.title = cor;

  div.onclick = () => {
    document.querySelectorAll(".cor-item").forEach(c => c.classList.remove("ativa"));
    div.classList.add("ativa");
    corSelecionada = cor;
    renderTamanhos();
  };

  $("produto-cores").appendChild(div);
});

// ================================
// TAMANHOS
// ================================
function renderTamanhos() {
  $("produto-tamanhos").innerHTML = "";
  $("estoque-info").textContent = "Selecione um tamanho";
  tamanhoSelecionado = null;

  const estoque = produto.cores[corSelecionada];

  Object.keys(estoque).forEach(tam => {
    const btn = document.createElement("button");
    btn.textContent = tam;

    if (estoque[tam] === 0) btn.disabled = true;

    btn.onclick = () => {
      document.querySelectorAll("#produto-tamanhos button")
        .forEach(b => b.classList.remove("ativo"));
      btn.classList.add("ativo");
      tamanhoSelecionado = tam;
      $("estoque-info").textContent = `Em estoque: ${estoque[tam]}`;
    };

    $("produto-tamanhos").appendChild(btn);
  });
}

renderTamanhos();

// ================================
// CARRINHO
// ================================
$("btn-add-produto").onclick = () => {
  if (!tamanhoSelecionado) {
    alert("Selecione um tamanho");
    return;
  }

  document.dispatchEvent(new CustomEvent("addCarrinho", {
    detail: {
      produto: produto.nome,
      preco: produto.preco
    }
  }));
};
