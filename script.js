// Seleciona todos os botões de filtro e todos os produtos
const botoes = document.querySelectorAll('.filtros button');
const produtos = document.querySelectorAll('.produto');

// Função para normalizar texto (remove acentos e plural simples)
function normalizar(texto) {
  return texto
    .toLowerCase()
    .normalize("NFD") // separa acentos
    .replace(/[\u0300-\u036f]/g, "") // remove acentos
    .replace(/s$/, ""); // remove "s" no final (plural simples)
}

// Função para atualizar a exibição dos produtos
function filtrarProdutos(categoria) {
  produtos.forEach(produto => {
    const cat = normalizar(produto.dataset.categoria);

    if (categoria === 'todos' || cat === categoria) {
      produto.style.display = 'block';
    } else {
      produto.style.display = 'none';
    }
  });
}

// Adiciona evento de clique a cada botão
botoes.forEach(botao => {
  botao.addEventListener('click', () => {
    // Remove a classe "ativo" de todos os botões
    botoes.forEach(b => b.classList.remove('ativo'));

    // Adiciona a classe "ativo" ao botão clicado
    botao.classList.add('ativo');

    // Normaliza o texto do botão
    const categoria = normalizar(botao.textContent);

    // Atualiza a exibição dos produtos
    filtrarProdutos(categoria);
  });
});

// Mostra todos os produtos por padrão ao carregar a página
window.addEventListener('DOMContentLoaded', () => {
  filtrarProdutos('todos');
});
