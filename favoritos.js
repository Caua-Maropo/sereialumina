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
document.querySelectorAll(".btn-favorito").forEach(btn => {
  const id = btn.dataset.id;

  if (getFavoritos().includes(id)) btn.classList.add("ativo");

  btn.onclick = () => {
    if (!usuarioLogado()) {
      alert("Faça login para favoritar ❤️");
      window.location.href = "login.html";
      return;
    }

    alternarFavorito(id);
    btn.classList.toggle("ativo");
  };
});
