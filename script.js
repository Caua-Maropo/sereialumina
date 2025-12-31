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

botoes.forEach(botao => {
  botao.addEventListener('click', () => {
    // Remove a classe "ativo" de todos os botões
    botoes.forEach(b => b.classList.remove('ativo'));
    botao.classList.add('ativo');

    // Normaliza o texto do botão
    const categoria = normalizar(botao.textContent);

    // Mostra/esconde produtos
    produtos.forEach(produto => {
      const cat = normalizar(produto.dataset.categoria);

      if (categoria === 'todos' || cat === categoria) {
        produto.style.display = ''; // volta ao padrão do CSS (grid)
        produto.classList.add('mostrar');
      } else {
        produto.style.display = 'none';
        produto.classList.remove('mostrar');
      }
    });
  });
});
