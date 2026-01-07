console.log("favoritos.js carregado");

// ================================
// FAVORITOS (LocalStorage)
// ================================

const btnFavoritoProduto = document.getElementById("btn-favorito-produto");

function usuarioEstaLogado() {
  return localStorage.getItem("usuarioLogado");
}

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

if (btnFavoritoProduto) {

  // Estado inicial
  if (getFavoritos().includes(produto.id)) {
    btnFavoritoProduto.classList.add("ativo");
  }

  btnFavoritoProduto.addEventListener("click", () => {

    if (!usuarioEstaLogado()) {
      alert("Você precisa estar logado para favoritar ❤️");
      window.location.href = "login.html";
      return;
    }

    alternarFavorito(produto.id);
    btnFavoritoProduto.classList.toggle("ativo");
  });
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
