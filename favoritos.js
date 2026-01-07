console.log("favoritos.js carregado");

// ================================
// FAVORITOS (LocalStorage)
// ================================
function getFavoritos() {
  return JSON.parse(localStorage.getItem("favoritos")) || [];
}

function salvarFavoritos(lista) {
  localStorage.setItem("favoritos", JSON.stringify(lista));
}

function alternarFavorito(idProduto) {
  let favoritos = getFavoritos();

  const index = favoritos.indexOf(idProduto);

  if (index >= 0) {
    favoritos.splice(index, 1);
  } else {
    favoritos.push(idProduto);
  }

  salvarFavoritos(favoritos);
}

// ================================
// INIT FAVORITOS (INDEX)
// ================================
document.querySelectorAll(".btn-favorito").forEach(botao => {
  const id = botao.dataset.id;

  if (!id) return;

  // estado inicial
  if (getFavoritos().includes(id)) {
    botao.classList.add("ativo");
  }

  botao.addEventListener("click", () => {
    alternarFavorito(id);
    botao.classList.toggle("ativo");
  });
});
