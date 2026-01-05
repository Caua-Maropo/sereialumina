const produtos = [
  {
    id: "biquini-amarelo",
    nome: "Biquíni Amarelo",
    preco: 59.90,
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
    preco: 79.90,
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
    preco: 89.90,
    imagem: "imagens/maio-azul.png",
    descricao: "Maiô com proteção UV e modelagem confortável.",
    peso: "220g",
    cores: {
      Azul: { P: 1, M: 2, G: 2 },
      Preto: { P: 0, M: 1, G: 1 }
    }
  }
];


// 🔎 Lê o ID da URL
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const produto = produtos.find(p => p.id === id);

if (!produto) {
  document.body.innerHTML = "<h2>Produto não encontrado</h2>";
  throw new Error("Produto inválido");
}

// 📦 Preenche os dados
document.getElementById("produto-nome").textContent = produto.nome;
document.getElementById("produto-preco").textContent =
  produto.preco.toFixed(2).replace(".", ",");
document.getElementById("produto-descricao").textContent = produto.descricao;
document.getElementById("produto-peso").textContent = produto.peso;
document.getElementById("produto-imagem").src = produto.imagem;

// 🎨 Cores
const coresContainer = document.getElementById("produto-cores");
const cores = Object.keys(produto.cores);

let corSelecionada = Object.keys(produto.cores)[0];

cores.forEach((cor, index) => {

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
// ADICIONAR AO CARRINHO (PRODUTO)
// ================================

const btnAddProduto = document.getElementById("btn-add-produto");

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

  // Feedback visual
  btnAddProduto.textContent = "✓ Adicionado";
  setTimeout(() => {
    btnAddProduto.textContent = "Adicionar ao carrinho";
  }, 1200);
});

// Carregar carrinho existente
let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

btnAdd.addEventListener("click", () => {

  const itemExistente = carrinho.find(
    item =>
      item.produto === produto.nome &&
      item.tamanho === corSelecionada
  );

  if (itemExistente) {
    itemExistente.quantidade++;
  } else {
    carrinho.push({
      produto: produto.nome,
      preco: produto.preco,
      tamanho: corSelecionada,
      quantidade: 1
    });
  }

  // Salvar
  localStorage.setItem("carrinho", JSON.stringify(carrinho));

  // Feedback visual
  btnAdd.textContent = "✓ Adicionado ao carrinho";
  btnAdd.disabled = true;

  setTimeout(() => {
    btnAdd.textContent = "Adicionar ao carrinho";
    btnAdd.disabled = false;
  }, 1500);
});
const tamanhosContainer = document.getElementById("produto-tamanhos");
const estoqueInfo = document.getElementById("estoque-info");

let tamanhoSelecionado = null;

// Criar botões de tamanho
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

      const qtd = tamanhos[tamanho];
      estoqueInfo.textContent =
        qtd > 0
          ? `Em estoque: ${qtd} unidade(s)`
          : "Fora de estoque";
    });

    tamanhosContainer.appendChild(btn);
  });
}
