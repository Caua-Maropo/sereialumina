const favoritosContainer = document.getElementById("lista-favoritos");

const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
const produtos = JSON.parse(localStorage.getItem("produtos")) || [];

if (favoritos.length === 0) {
  favoritosContainer.innerHTML = "<p>Nenhum produto favoritado 💔</p>";
}

favoritos.forEach(id => {
  const produto = produtos.find(p => p.id === id);
  if (!produto) return;

  const card = document.createElement("div");
  card.classList.add("produto");

  card.innerHTML = `
    <img src="${produto.imagem}">
    <h3>${produto.nome}</h3>
    <p>R$ ${produto.preco.toFixed(2).replace(".", ",")}</p>
    <a href="produto.html?id=${produto.id}">Ver produto</a>
  `;

  favoritosContainer.appendChild(card);
});
