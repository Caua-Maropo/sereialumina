const botoes = document.querySelectorAll('.filtros button');
const produtos = document.querySelectorAll('.produto');

// Mapeamento botão → data-categoria
const mapaCategorias = {
  'todos': 'todos',
  'biquinis': 'biquini',
  'maiôs': 'maio',
  'saídas': 'saida'
};

function filtrarProdutos(categoria) {
  produtos.forEach(produto => {
    if(categoria === 'todos' || produto.dataset.categoria === categoria) {
      produto.style.display = 'block';
    } else {
      produto.style.display = 'none';
    }
  });
}

// Evento de clique
botoes.forEach(botao => {
  botao.addEventListener('click', () => {
    botoes.forEach(b => b.classList.remove('ativo'));
    botao.classList.add('ativo');

    const textoBotao = botao.textContent.toLowerCase().trim();
    const categoria = mapaCategorias[textoBotao];

    filtrarProdutos(categoria);
  });
});

// Mostrar todos os produtos ao carregar a página
window.addEventListener('DOMContentLoaded', () => {
  filtrarProdutos('todos');
});
