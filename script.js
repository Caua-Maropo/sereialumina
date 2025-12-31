const botoes = document.querySelectorAll('.filtros button');
const produtos = document.querySelectorAll('.produto');

function normalizar(texto) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/s$/, "");
}

botoes.forEach(botao => {
  botao.addEventListener('click', () => {
    botoes.forEach(b => b.classList.remove('ativo'));
    botao.classList.add('ativo');

    const categoria = normalizar(botao.textContent);

    produtos.forEach(produto => {
      const categorias = produto.dataset.categoria
        .split(" ")
        .map(c => normalizar(c));

      if (categoria === 'todos' || categorias.includes(categoria)) {
        produto.style.display = '';
        produto.classList.add('mostrar');
      } else {
        produto.style.display = 'none';
        produto.classList.remove('mostrar');
      }
    });
  });
});

// ✅ Ao carregar a página, ativa o filtro "Todos"
window.addEventListener('DOMContentLoaded', () => {
  const botaoTodos = document.querySelector('.filtros button'); // primeiro botão é "Todos"
  botaoTodos.click();
});
