const botoes = document.querySelectorAll('.filtros button');
const produtos = document.querySelectorAll('.produto');

// Função para normalizar texto (remove acentos e plural simples)
function normalizar(texto) {
  return texto
    .toLowerCase()
    .normalize("NFD") // separa acentos
    .replace(/[\u0300-\u036f]/g, "") // remove acentos
    .replace(/s$/, ""); // remove "s" no final
}

// Função para mostrar/ocultar produtos
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

// Evento de clique nos botões de filtro
botoes.forEach(botao => {
  botao.addEventListener('click', () => {
    // Remove a classe ativo de todos os botões
    botoes.forEach(b => b.classList.remove('ativo'));
    botao.classList.add('ativo');

    let categoria = botao.textContent.toLowerCase().trim(); // remove espaços extras

    // Se for "todos", exibe todos os produtos e sai da função
    if (categoria === 'todos') {
      filtrarProdutos('todos');
      return;
    }

    // Normaliza outros botões
    categoria = normalizar(categoria);

    // Ajustes manuais para plurais/acento
    if (categoria === 'biquinis') categoria = 'biquini';
    if (categoria === 'maios') categoria = 'maio';
    if (categoria === 'saidas') categoria = 'saida';

    filtrarProdutos(categoria);
  });
});

// Mostra todos os produtos ao carregar a página
window.addEventListener('DOMContentLoaded', () => {
  filtrarProdutos('todos');
});
