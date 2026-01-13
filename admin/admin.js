const form = document.getElementById("form-produto");

form.addEventListener("submit", e => {
  e.preventDefault();

  const novoProduto = {
    id: form.id.value,
    nome: form.nome.value,
    categoria: form.categoria.value,
    preco: Number(form.preco.value),
    imagem: form.imagem.value,
    descricao: form.descricao.value,
    peso: "200g",
    cores: {
      Padrão: { P: 5, M: 5, G: 5 }
    }
  };

  const produtos = JSON.parse(localStorage.getItem("produtos")) || [];
  produtos.push(novoProduto);

  localStorage.setItem("produtos", JSON.stringify(produtos));
  alert("Produto salvo!");
});
