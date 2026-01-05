// ================================
// LISTA DE PRODUTOS
// ================================
const produtos = [
  {
    id: "biquini-amarelo",
    nome: "Biquíni Amarelo",
    preco: 59.9,
    imagem: "imagens/biquini-amarelo.png",
    descricao: "Biquíni confortável, tecido premium e secagem rápida.",
    peso: "180g",
    cores: {
      Amarelo: { P: 3, M: 5, G: 0 },
      Preto: { P: 2, M: 0, G: 4 }
    }
  },
  {
    id: "biquini-preto",
    nome: "Biquíni Preto",
    preco: 79.9,
    imagem: "imagens/biquini-preto.png",
    descricao: "Modelo elegante e moderno, perfeito para o verão.",
    peso: "200g",
    cores: {
      Preto: { P: 5, M: 10, G: 3 },
      Vermelho: { P: 0, M: 7, G: 1 },
      Azul: { P: 1, M: 5, G: 0 }
    }
  },
  {
    id: "maio-azul",
    nome: "Maiô Azul",
    preco: 89.9,
    imagem: "imagens/maio-azul.png",
    descricao: "Maiô com proteção UV e modelagem confortável.",
    peso: "220g",
    cores: {
      Azul: { P: 1, M: 2, G: 2 },
      Preto: { P: 0, M: 1, G: 1 }
    }
  }
];

// ================================
// BUSCAR PRODUTO PELO ID DA URL
// ================================
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const produto = produtos.find(p => p.id === id);

if (!produto) {
  document.body.innerHTML = "<h2>Produto não encontrado</h2>";
  throw new Error("Produto inválido");
}

// ================================
// ELEMENTOS DA PÁGINA
// ================================
const nomeEl = document.getElementById("produto-nome");
const precoEl = document.getElementById("produto-preco");
const descricaoEl = document.getElementById("produto-descricao");
const pesoEl = document.getElementById("produto-peso");
const imagemEl = document.getElementById("produto-imagem");
const coresContainer = document.getElementById("produto-cores");
const tamanhosContainer = document.getElementById("produto-tamanhos");
const estoqueInfo = document.getElementById("estoque-info");
const btnAddProduto = document.getElementById("btn-add-produto");

// ================================
// PREENCHER DADOS DO PRODUTO
// ================================
nomeEl.textContent = produto.nome;
precoEl.textContent = produto.preco.toFixed(2).replace(".", ",");
descricaoEl.textContent = produto.descricao;
pesoEl.textContent = produto.peso;
imagemEl.src = produto.imagem;

// ================================
// CONTROLE DE SELEÇÃO
// ================================
let corSelecionada = Object.keys(produto.cores)[0];
let tamanhoSelecionado = null;

// ================================
// CORES
// ================================
Object.keys(produto.cores).forEach((cor, index) => {
  const div = document.createElement("div");
  div.classList.add("cor-item");

  const corLower = cor.toLowerCase();
  div.style.background =
    corLower === "amarelo" ? "#f5d300" :
    corLower === "preto" ? "#000" :
    corLower === "branco" ? "#fff" :
    corLower === "vermelho" ? "#c00" :
    corLower === "azul" ? "#0055cc" :
    "#ccc";

  if (index === 0) div.classList.add("ativa");

  div.addEventListener("click", () => {
    document.querySelectorAll(".cor-item")
      .forEach(c => c.classList.remove("ativa"));

    div.classList.add("ativa");
    corSelecionada = cor;
    atualizarTamanhos(cor);
  });

  coresContainer.appendChild(div);
});

// ================================
// TAMANHOS E ESTOQUE
// ================================
function atualizarTamanhos(cor) {
  tamanhosContainer.innerHTML = "";
  tamanhoSelecionado = null;
  estoqueInfo.textContent = "Selecione um tamanho";

  const tamanhos = produto.cores[cor];

  Object.keys(tamanhos).forEach(tamanho => {
    const btn = document.createElement("button");
    btn.textContent = tamanho;

    if (tamanhos[tamanho] === 0) {
      btn.disabled = true;
      btn.classList.add("indisponivel");
    }

    btn.addEventListener("click", () => {
      document.querySelectorAll("#produto-tamanhos button")
        .forEach(b => b.classList.remove("ativo"));

      btn.classList.add("ativo");
      tamanhoSelecionado = tamanho;

      estoqueInfo.textContent =
        tamanhos[tamanho] > 0
          ? `Em estoque: ${tamanhos[tamanho]} unidade(s)`
          : "Fora de estoque";
    });

    tamanhosContainer.appendChild(btn);
  });
}

// Inicializa tamanhos da primeira cor
atualizarTamanhos(corSelecionada);

// ================================
// ADICIONAR AO CARRINHO
// ================================
btnAddProduto.addEventListener("click", () => {
  if (!tamanhoSelecionado) {
    alert("Selecione um tamanho");
    return;
  }

  const estoque = produto.cores[corSelecionada][tamanhoSelecionado];

  if (estoque <= 0) {
    alert("Produto fora de estoque");
    return;
  }

  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

  const itemExistente = carrinho.find(
    item =>
      item.produto === produto.nome &&
      item.cor === corSelecionada &&
      item.tamanho === tamanhoSelecionado
  );

  if (itemExistente) {
    itemExistente.quantidade++;
  } else {
    carrinho.push({
      produto: produto.nome,
      preco: produto.preco,
      cor: corSelecionada,
      tamanho: tamanhoSelecionado,
      quantidade: 1
    });
  }

  localStorage.setItem("carrinho", JSON.stringify(carrinho));

  btnAddProduto.textContent = "✓ Adicionado";
  setTimeout(() => {
    btnAddProduto.textContent = "Adicionar ao carrinho";
  }, 1200);
});
