console.log("favoritos.js carregado");

// ================================
// LOGIN
// ================================
function usuarioEstaLogado() {
  return localStorage.getItem("usuarioLogado");
}

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

  if (favoritos.includes(idProduto)) {
    favoritos = favoritos.filter(id => id !== idProduto);
  } else {
    favoritos.push(idProduto);
  }

  salvarFavoritos(favoritos);
}

// ================================
// FAVORITO NO PRODUTO.HTML
// ================================
const btnFavoritoProduto = document.getElementById("btn-favorito-produto");

if (btnFavoritoProduto) {
  const id = btnFavoritoProduto.dataset.id;

  if (getFavoritos().includes(id)) {
    btnFavoritoProduto.classList.add("ativo");
  }

  btnFavoritoProduto.addEventListener("click", () => {

    if (!usuarioEstaLogado()) {
      sessionStorage.setItem("redirectAposLogin", window.location.href);
      alert("Faça login para favoritar ❤️");
      window.location.href = "login.html";
      return;
    }

    alternarFavorito(id);
    btnFavoritoProduto.classList.toggle("ativo");
  });
}

// ================================
// FAVORITOS NO INDEX
// ================================
document.querySelectorAll(".btn-favorito").forEach(botao => {
  const id = botao.dataset.id;

  if (!id) return;

  if (getFavoritos().includes(id)) {
    botao.classList.add("ativo");
  }

  botao.addEventListener("click", () => {

    if (!usuarioEstaLogado()) {
      sessionStorage.setItem("redirectAposLogin", window.location.href);
      alert("Faça login para favoritar ❤️");
      window.location.href = "login.html";
      return;
    }

    alternarFavorito(id);
    botao.classList.toggle("ativo");
  });
});
