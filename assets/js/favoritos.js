console.log("favoritos.js carregado");

function usuarioLogado() {
  return !!localStorage.getItem("usuarioLogado");
}

function getFavoritos() {
  return JSON.parse(localStorage.getItem("favoritos")) || [];
}

function salvarFavoritos(lista) {
  localStorage.setItem("favoritos", JSON.stringify(lista));
}

function alternarFavorito(id) {
  let favs = getFavoritos();
  favs = favs.includes(id) ? favs.filter(f => f !== id) : [...favs, id];
  salvarFavoritos(favs);
}

// ================================
// INDEX
// ================================
document.addEventListener("click", (event) => {
  const btn = event.target.closest(".btn-favorito");
  if (!btn) return;

  const id = btn.dataset.id;

  let favoritos = getFavoritos();

  if (favoritos.includes(id)) {
    favoritos = favoritos.filter(f => f !== id);
    btn.classList.remove("ativo");
  } else {
    favoritos.push(id);
    btn.classList.add("ativo");
  }

  setFavoritos(favoritos);
  atualizarBadgeFavoritos();
});

document.addEventListener("DOMContentLoaded", () => {
  const favoritos = getFavoritos();

  document.querySelectorAll(".btn-favorito").forEach(btn => {
    if (favoritos.includes(btn.dataset.id)) {
      btn.classList.add("ativo");
    }
  });

  atualizarBadgeFavoritos();
});
