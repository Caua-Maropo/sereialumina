const produtos = {
  "biquini-amarelo": {
    nome: "Biquíni Amarelo",
    preco: "R$ 59,90",
    imagem: "imagens/biquini-amarelo.png",
    descricao: "Biquíni em tecido premium, confortável e ideal para o verão.",
    peso: "180g",
    cores: ["Amarelo", "Preto", "Branco"]
  },

  "biquini-preto": {
    nome: "Biquíni Preto",
    preco: "R$ 79,90",
    imagem: "imagens/biquini-preto.png",
    descricao: "Biquíni clássico, elegante e versátil.",
    peso: "190g",
    cores: ["Preto", "Vermelho"]
  }
};

// Lê o ID da URL
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const produto = produtos[id];

if (!produto) {
  document.body.innerHTML = "<h2>Produto não encontrado</h2>";
}

// Preencher página
document.getElementById("produto-nome").textContent = produto.nome;
document.getElementById("produto-preco").textContent = produto.preco;
document.getElementById("produto-imagem").src = produto.imagem;
document.getElementById("produto-descricao").textContent = produto.descricao;
document.getElementById("produto-peso").textContent = produto.peso;

const selectCores = document.getElementById("produto-cores");
produto.cores.forEach(cor => {
  const option = document.createElement("option");
  option.value = cor;
  option.textContent = cor;
  selectCores.appendChild(option);
});
