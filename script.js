const botoes = document.querySelectorAll('.filtros button');
const produtos = document.querySelectorAll('.produto');

function normalizar(texto) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/s$/, "");
}

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

botoes.forEach(botao => {
  botao.addEventListener('click', () => {
    botoes.forEach(b => b.classList.remove('ativo'));
    botao.classList.add('ativo');

    let categoria = normalizar(botao.textContent);

    // Ajustes manuais para plurais/acento
    if (categoria === 'biquinis') categoria = 'biquini';
    if (categoria === 'maios') categoria = 'maio';
    if (categoria === 'saidas') categoria = 'saida';

    filtrarProdutos(categoria);
  });
});

window.addEventListener('DOMContentLoaded', () => {
  filtrarProdutos('todos');
});
