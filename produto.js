const produtos = {
  "biquini-amarelo": {
    nome: "Biquíni Amarelo",
    preco: 59.90,
    imagem: "imagens/biquini-amarelo.png",
    descricao: "Biquíni confeccionado em tecido premium, confortável, com ótimo ajuste ao corpo.",
    peso: "180g",
    cores: ["Amarelo", "Preto", "Branco"]
  },

  "biquini-preto": {
    nome: "Biquíni Preto",
    preco: 79.90,
    imagem: "imagens/biquini-preto.png",
    descricao: "Modelo clássico, elegante e perfeito para o verão.",
    peso: "190g",
    cores: ["Preto", "Vermelho"]
  }
};

// Lê o ID
const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const produto = produtos[id];

if (!produto) {
  document.body.innerHTML = "<h2>Produto não encontrado</h2>";
}

// Preenche
document.getElementById("produto-nome").textContent = produto.nome;
document.getElementById("produto-preco").textContent =
  `R$ ${produto.preco.toFixed(2).replace(".", ",")}`;

document.getElementById("produto-imagem").src = produto.imagem;
document.getElementById("produto-descricao").textContent = produto.descricao;
document.getElementById("produto-peso").textContent = produto.peso;

// Cores
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

