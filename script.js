const botoes = document.querySelectorAll('.filtros button');
const produtos = document.querySelectorAll('.produto');

function filtrarProdutos(categoria) {
  produtos.forEach(produto => {
    if (categoria === 'todos' || produto.dataset.categoria === categoria) {
      produto.style.display = 'block';
    } else {
      produto.style.display = 'none';
    }
  });
}

botoes.forEach(botao => {
  botao.addEventListener('click', () => {
    // botão ativo
    botoes.forEach(b => b.classList.remove('ativo'));
    botao.classList.add('ativo');

    // pega categoria do atributo
    const categoria = botao.dataset.category;
    filtrarProdutos(categoria);
  });
});

// Garantir que todos apareçam ao carregar
document.addEventListener('DOMContentLoaded', () => {
  filtrarProdutos('todos');
});
