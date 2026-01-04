const produtos = [
  {
    id: "biquini-amarelo",
    nome: "Biquíni Amarelo",
    preco: 59.90,
    imagem: "imagens/biquini-amarelo.png",
    descricao: "Biquíni confortável, tecido premium e secagem rápida.",
    cores: ["Amarelo", "Preto", "Branco"],
    peso: "180g",
    categoria: "biquini"
  },
  {
    id: "biquini-preto",
    nome: "Biquíni Preto",
    preco: 79.90,
    imagem: "imagens/biquini-preto.png",
    descricao: "Modelo elegante e moderno, perfeito para o verão.",
    cores: ["Preto", "Vermelho", "Azul"],
    peso: "190g",
    categoria: "biquini"
  },
  {
    id: "maio-azul",
    nome: "Maiô Azul",
    preco: 89.90,
    imagem: "imagens/maio-azul.png",
    descricao: "Maiô com proteção UV e modelagem confortável.",
    cores: ["Azul", "Preto"],
    peso: "220g",
    categoria: "maio"
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

let corSelecionada = produto.cores[0];

produto.cores.forEach((cor, index) => {
  const div = document.createElement("div");
  div.classList.add("cor-item");

  div.style.background =
    cor.toLowerCase() === "amarelo" ? "#f5d300" :
    cor.toLowerCase() === "preto" ? "#000" :
    cor.toLowerCase() === "branco" ? "#fff" :
    cor.toLowerCase() === "vermelho" ? "#c00" :
    cor.toLowerCase() === "azul" ? "#0055cc" :
    "#ccc";

  if (index === 0) div.classList.add("ativa");

  div.addEventListener("click", () => {
    document
      .querySelectorAll(".cor-item")
      .forEach(c => c.classList.remove("ativa"));

    div.classList.add("ativa");
    corSelecionada = cor;
  });

  coresContainer.appendChild(div);
});
// ================================
// ADICIONAR AO CARRINHO (PRODUTO)
// ================================

const btnAdd = document.getElementById("btn-add-produto");

if (btnAdd) {
  btnAdd.addEventListener("click", () => {
    // aqui futuramente vamos integrar com o carrinho global
    btnAdd.textContent = "✓ Adicionado ao carrinho";
    btnAdd.style.background = "#27ae60";
    btnAdd.disabled = true;

    setTimeout(() => {
      btnAdd.textContent = "Adicionar ao carrinho";
      btnAdd.style.background = "";
      btnAdd.disabled = false;
    }, 2000);
  });
}

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
