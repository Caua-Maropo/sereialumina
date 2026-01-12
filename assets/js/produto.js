console.log("produto.js carregado");

const usuarioLogado = localStorage.getItem("usuarioLogado");

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
// PRODUTOS (FONTE ÚNICA)
// ================================
PRODUTOS.push = ({
    id: "biquini-amarelo",
    nome: "Biquíni Amarelo",
    categoria: "biquini",
    preco: 59.9,
    imagem: "../assets/imagens/biquini-amarelo.png",
    descricao: "Biquíni confortável, tecido premium e secagem rápida.",
    peso: "180g",
    cores: {
      Amarelo: { P: 3, M: 5, G: 0 },
      Preto: { P: 2, M: 0, G: 4 }
    }
  },
  {
    id: "biquini-preto",
    nome: "Biquíni Preto",
    categoria: "biquini",
    preco: 79.9,
    imagem: "../assets/imagens/biquini-preto.png",
    descricao: "Modelo elegante e moderno, perfeito para o verão.",
    peso: "200g",
    cores: {
      Preto: { P: 5, M: 10, G: 3 },
      Vermelho: { P: 0, M: 7, G: 1 }
    }
  },
  {
    id: "maio-azul",
    nome: "Maiô Azul",
    categoria: "maio",
    preco: 89.9,
    imagem: "../assets/imagens/biquini-azul.png",
    descricao: "Modelo elegante e moderno, perfeito para o verão.",
    peso: "200g",
    cores: {
      Azul: { P: 5, M: 10, G: 3 }
    }
  },
  {
    id: "mulher-amarelo",
    nome: "Mulher Amarelo",
    categoria: "biquini",
    preco: 59.9,
    imagem: "../assets/imagens/mulher-biquini-amarelo.jfif",
    descricao: "Modelo elegante e moderno, perfeito para o verão.",
    peso: "200g",
    cores: {
      Amarelo: { P: 5, M: 10, G: 3 }
    }
  },
  {
    id: "mulher-branco",
    nome: "Mulher Branco",
    categoria: "biquini",
    preco: 59.9,
    imagem: "../assets/imagens/mulher-biquini-branco.jfif",
    descricao: "Modelo elegante e moderno, perfeito para o verão.",
    peso: "200g",
    cores: {
      Branco: { P: 5, M: 10, G: 3 }
    }
  },
  {
    id: "mulher-pintado",
    nome: "Mulher Pintado",
    categoria: "biquini",
    preco: 59.9,
    imagem: "../assets/imagens/mulher-biquini-pintado.jfif",
    descricao: "Modelo elegante e moderno, perfeito para o verão.",
    peso: "200g",
    cores: {
      Estampado: { P: 5, M: 10, G: 3 }
    }
  },
  {
    id: "mulher-preto",
    nome: "Mulher Preto",
    categoria: "biquini",
    preco: 59.9,
    imagem: "../assets/imagens/mulher-biquini-preto.jfif",
    descricao: "Modelo elegante e moderno, perfeito para o verão.",
    peso: "200g",
    cores: {
      Preto: { P: 5, M: 10, G: 3 }
    }
  },
  {
    id: "mulher-vermelho",
    nome: "Mulher Vermelho",
    categoria: "biquini",
    preco: 59.9,
    imagem: "../assets/imagens/mulher-biquini-vermelho.jfif",
    descricao: "Modelo elegante e moderno, perfeito para o verão.",
    peso: "200g",
    cores: {
      Vermelho: { P: 5, M: 9, G: 3 }
    }
  }
);

// ================================
// PRODUTO ATUAL (URL)
// ================================
const params = new URLSearchParams(window.location.search);
const produtoAtual = PRODUTOS.find(p => p.id === params.get("id"));

if (!produtoAtual) {
  document.body.innerHTML = "<h2>Produto não encontrado</h2>";
  throw new Error("Produto inválido");
}

// ================================
// ELEMENTOS
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

// ================================
// VARIÁVEIS DE CONTROLE
// ================================
let corSelecionada = Object.keys(produtoAtual.cores)[0];
let tamanhoSelecionado = null;

// ================================
// CORES
// ================================
Object.keys(produtoAtual.cores).forEach((cor, i) => {
  const div = document.createElement("div");
  div.className = `cor-item ${i === 0 ? "ativa" : ""}`;
  div.title = cor;

  div.style.backgroundColor =
  cor.toLowerCase() === "amarelo" ? "#f5d300" :
  cor.toLowerCase() === "preto" ? "#000" :
  cor.toLowerCase() === "azul" ? "#0055cc" :
  cor.toLowerCase() === "vermelho" ? "#c00" :
  "#ccc";

  div.addEventListener("click", () => {
    document.querySelectorAll(".cor-item").forEach(c => c.classList.remove("ativa"));
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

    btn.onclick = () => {
      document.querySelectorAll("#produto-tamanhos button")
        .forEach(b => b.classList.remove("ativo"));
      btn.classList.add("ativo");
      tamanhoSelecionado = tam;
      elEstoque.textContent = `Em estoque: ${estoque[tam]}`;
    };

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

  const itemExistente = carrinho.find(
  i =>
    i.id === produtoAtual.id &&
    i.cor === corSelecionada &&
    i.tamanho === tamanhoSelecionado
);

if (itemExistente) {
  itemExistente.qtd++;
} else {
  carrinho.push({
    nome: produtoAtual.nome,
    preco: produtoAtual.preco,
    cor: corSelecionada,
    tamanho: tamanhoSelecionado,
    quantidade: 1
  });
}

  
  localStorage.setItem("carrinho", JSON.stringify(carrinho));

  btnCarrinho.textContent = "✓ Adicionado";
  setTimeout(() => btnCarrinho.textContent = "Adicionar ao carrinho", 1200);
});

if (typeof atualizarBadge === "function") {
  atualizarBadge();
}

// ================================
// FAVORITOS (ÚNICO SISTEMA)
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
  if (!localStorage.getItem("usuarioLogado")) {
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
});

atualizarFavorito();

if (typeof atualizarBadgeFavoritos === "function") {
  atualizarBadgeFavoritos();
}

