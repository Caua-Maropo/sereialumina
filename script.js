const botoes = document.querySelectorAll('.filtros button');
const produtos = document.querySelectorAll('.produto');

function filtrarProdutos(categoria) {
  produtos.forEach(produto => {
    const deveMostrar =
      categoria === 'todos' || produto.dataset.category === categoria;

    if (deveMostrar) {
      produto.classList.remove('oculto');
    } else {
      produto.classList.add('oculto');
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

// Mostrar todos ao carregar
document.addEventListener('DOMContentLoaded', () => {
  filtrarProdutos('todos');
});
