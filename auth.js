console.log("auth.js carregado");

/* =========================
   UTILITÁRIOS
========================= */

function getUsuario() {
  return JSON.parse(localStorage.getItem("usuarioLogado"));
}

function setUsuario(usuario) {
  localStorage.setItem("usuarioLogado", JSON.stringify(usuario));
}

function logout() {
  localStorage.removeItem("usuarioLogado");
  window.location.href = "index.html";
}

/* =========================
   HEADER (todas as páginas)
========================= */

const userArea = document.getElementById("user-area");
const userEmail = document.getElementById("user-email");
const logoutBtn = document.getElementById("logout-btn");
const iconLogin = document.querySelector(".fa-user");

const usuario = getUsuario();

if (usuario && userArea) {
  userArea.style.display = "flex";
  userEmail.textContent = usuario.email;
  if (iconLogin) iconLogin.style.display = "none";
}

if (logoutBtn) {
  logoutBtn.addEventListener("click", logout);
}

/* =========================
   PROTEGER PÁGINAS
========================= */

function protegerPagina() {
  if (!getUsuario()) {
    localStorage.setItem("redirectPosLogin", window.location.href);
    window.location.href = "login.html";
  }
}

/* =========================
   LOGIN / CADASTRO
========================= */

const loginForm = document.getElementById("login-form");
const cadastroForm = document.getElementById("cadastro-form");

if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = loginForm.email.value;
    const senha = loginForm.senha.value;

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuario = usuarios.find(
      (u) => u.email === email && u.senha === senha
    );

    if (!usuario) {
      alert("E-mail ou senha inválidos");
      return;
    }

    setUsuario(usuario);

    const redirect =
      localStorage.getItem("redirectPosLogin") || "index.html";
    localStorage.removeItem("redirectPosLogin");
    window.location.href = redirect;
  });
}

if (cadastroForm) {
  cadastroForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const nome = cadastroForm.nome.value;
    const email = cadastroForm.email.value;
    const senha = cadastroForm.senha.value;

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    if (usuarios.some((u) => u.email === email)) {
      alert("Este e-mail já está cadastrado");
      return;
    }

    const novoUsuario = { nome, email, senha };
    usuarios.push(novoUsuario);

    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    setUsuario(novoUsuario);

    const redirect =
      localStorage.getItem("redirectPosLogin") || "index.html";
    localStorage.removeItem("redirectPosLogin");
    window.location.href = redirect;
  });
}
