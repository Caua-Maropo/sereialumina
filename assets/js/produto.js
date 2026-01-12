console.log("produto.js carregado");

// ================================
// USUÁRIO / ÍCONE LOGIN
// ================================
const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
const iconLogin = document.getElementById("icon-login");

if (iconLogin) {
  if (usuarioLogado) {
    iconLogin.innerHTML = `<i class="fa-solid fa-user-check"></i>`;
    iconLogin.title = `Olá, ${usuarioLogado.nome}`;
  } else {
    iconLogin.innerHTML = `<i class="fa-regular fa-user"></i>`;
  }
}

// ================================
// PRODUTO ATUAL (URL)
// ================================
const params = new URLSearchParams(window.location.search);
const produtoId = params.get("id");

if (!produtoId || typeof PRODUTOS === "undefined") {
  document.body.innerHTML = "<h2>Produto inválido</h2>";
  throw new Error("PRODUTOS não carregado ou ID ausente");
}

const produtoAtual = PRODUTOS.find(p => p.id === produtoId);

if (!produtoAtual) {
  document.body.innerHTML = "<h2>Produto não encontrado</h2>";
  throw new Error("Produto não encontrado");
}

// ================================
// ATALHO DOM
// ================================
const $ = id => document.getElementById(id);

const elNome = $("produto-nome");
const elPreco = $("produto-preco");
const elDescricao = $("produto-descricao");
const elPeso = $("produto-peso");
const elImagem = $("produto-imagem");
const elCores = $("produto-cores");
const elTamanhos = $("produto-tamanhos");
const elEstoque = $("estoque-info");
const btnCarrinho = $("btn-add-produto");
const btnFavorito = $("btn-favorito");

// ================================
// RENDER PRODUTO
// ================================
elNome.textContent = produtoAtual.nome;
elPreco.textContent = `R$ ${produtoAtual.preco.toFixed(2).replace(".", ",")}`;
elDescricao.textContent = produtoAtual.descricao;
elPeso.textContent = produtoAtual.peso;
elImagem.src = produtoAtual.imagem;
elImagem.alt = produtoAtual.nome;

// ================================
// VARIÁVEIS DE CONTROLE
// ================================
let corSelecionada = Object.keys(produtoAtual.cores)[0];
let tamanhoSelecionado = null;

// ================================
// CORES
// ================================
elCores.innerHTML = "";

Object.keys(produtoAtual.cores).forEach((cor, index) => {
  const div = document.createElement("div");
  div.className = `cor-item ${index === 0 ? "ativa" : ""}`;
  div.title = cor;

  div.style.backgroundColor =
    cor.toLowerCase() === "amarelo" ? "#f5d300" :
    cor.toLowerCase() === "preto" ? "#000" :
    cor.toLowerCase() === "azul" ? "#0055cc" :
    cor.toLowerCase() === "vermelho" ? "#c00" :
    cor.toLowerCase() === "branco" ? "#fff" :
    "#ccc";

  div.addEventListener("click", () => {
    document.querySelectorAll(".cor-item").forEach(c =>
      c.classList.remove("ativa")
    );
    div.classList.add("ativa");
    corSelecionada = cor;
    renderTamanhos();
  });

  elCores.appendChild(div);
});

// ================================
// TAMANHOS
// ================================
function renderTamanhos() {
  elTamanhos.innerHTML = "";
  tamanhoSelecionado = null;
  elEstoque.textContent = "Selecione um tamanho";

  const estoque = produtoAtual.cores[corSelecionada];

  Object.keys(estoque).forEach(tam => {
    const btn = document.createElement("button");
    btn.textContent = tam;

    if (estoque[tam] === 0) btn.disabled = true;

    btn.addEventListener("click", () => {
      document
        .querySelectorAll("#produto-tamanhos button")
        .forEach(b => b.classList.remove("ativo"));

      btn.classList.add("ativo");
      tamanhoSelecionado = tam;
      elEstoque.textContent = `Em estoque: ${estoque[tam]}`;
    });

    elTamanhos.appendChild(btn);
  });
}

renderTamanhos();

// ================================
// CARRINHO
// ================================
btnCarrinho?.addEventListener("click", () => {
  if (!tamanhoSelecionado) {
    alert("Selecione um tamanho");
    return;
  }

  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

  const existente = carrinho.find(
    i =>
      i.id === produtoAtual.id &&
      i.cor === corSelecionada &&
      i.tamanho === tamanhoSelecionado
  );

  if (existente) {
    existente.quantidade++;
  } else {
    carrinho.push({
      id: produtoAtual.id,
      nome: produtoAtual.nome,
      preco: produtoAtual.preco,
      cor: corSelecionada,
      tamanho: tamanhoSelecionado,
      quantidade: 1
    });
  }

  localStorage.setItem("carrinho", JSON.stringify(carrinho));

  btnCarrinho.textContent = "✓ Adicionado";
  setTimeout(() => {
    btnCarrinho.textContent = "Adicionar ao carrinho";
  }, 1200);

  if (typeof atualizarBadge === "function") {
    atualizarBadge();
  }
});

// ================================
// FAVORITOS
// ================================
function getFavoritos() {
  return JSON.parse(localStorage.getItem("favoritos")) || [];
}

function setFavoritos(lista) {
  localStorage.setItem("favoritos", JSON.stringify(lista));
}

function atualizarFavorito() {
  if (!btnFavorito) return;
  btnFavorito.classList.toggle(
    "ativo",
    getFavoritos().includes(produtoAtual.id)
  );
}

btnFavorito?.addEventListener("click", () => {
  if (!usuarioLogado) {
    alert("Faça login para favoritar 💙");
    localStorage.setItem("redirectPosLogin", location.href);
    location.href = "login.html";
    return;
  }

  let favoritos = getFavoritos();

  favoritos.includes(produtoAtual.id)
    ? favoritos = favoritos.filter(id => id !== produtoAtual.id)
    : favoritos.push(produtoAtual.id);

  setFavoritos(favoritos);
  atualizarFavorito();

  if (typeof atualizarBadgeFavoritos === "function") {
    atualizarBadgeFavoritos();
  }
});

atualizarFavorito();
