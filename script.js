const botoes = document.querySelectorAll('.filtros button');
const produtos = document.querySelectorAll('.produto');

function filtrarProdutos(categoria) {
  produtos.forEach(produto => {
    if (categoria === 'todos' || produto.dataset.category === categoria) {
      produto.style.display = 'block';
    } else {
      produto.style.display = 'none';
    }
  });
}

botoes.forEach(botao => {
  botao.addEventListener('click', () => {
    botoes.forEach(b => b.classList.remove('ativo'));
    botao.classList.add('ativo');

    const categoria = botao.dataset.category;
    filtrarProdutos(categoria);
  });
});

document.addEventListener('DOMContentLoaded', () => {
  filtrarProdutos('todos');
});
