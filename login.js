const tabLogin = document.getElementById("tab-login");
const tabCadastro = document.getElementById("tab-cadastro");
const formLogin = document.getElementById("form-login");
const formCadastro = document.getElementById("form-cadastro");

// ================================
// TROCAR ABAS
// ================================
tabLogin.addEventListener("click", () => {
  tabLogin.classList.add("ativo");
  tabCadastro.classList.remove("ativo");
  formLogin.classList.remove("hidden");
  formCadastro.classList.add("hidden");
});

tabCadastro.addEventListener("click", () => {
  tabCadastro.classList.add("ativo");
  tabLogin.classList.remove("ativo");
  formCadastro.classList.remove("hidden");
  formLogin.classList.add("hidden");
});

// ================================
// CADASTRAR USUÁRIO
// ================================
formCadastro.addEventListener("submit", (e) => {
  e.preventDefault();

  const nome = document.getElementById("cad-nome").value;
  const email = document.getElementById("cad-email").value;
  const senha = document.getElementById("cad-senha").value;

  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  const existe = usuarios.find((u) => u.email === email);
  if (existe) {
    alert("Este email já está cadastrado.");
    return;
  }

  usuarios.push({ nome, email, senha });
  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  alert("Conta criada com sucesso!");
  tabLogin.click();
});

// ================================
// LOGIN
// ================================
formLogin.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("login-email").value;
  const senha = document.getElementById("login-senha").value;

  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  const user = usuarios.find(
    (u) => u.email === email && u.senha === senha
  );

  if (!user) {
    alert("Email ou senha inválidos");
    return;
  }

  localStorage.setItem("usuarioLogado", JSON.stringify(user));
  window.location.href = "index.html";
});
