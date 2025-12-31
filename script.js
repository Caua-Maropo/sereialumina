const botoes = document.querySelectorAll('.filtros button');
const produtos = document.querySelectorAll('.produto');

botoes.forEach(botao => {
  botao.addEventListener('click', () => {
    // Remove a classe "ativo" de todos os botões
    botoes.forEach(b => b.classList.remove('ativo'));
    botao.classList.add('ativo');

    // Pega o texto do botão clicado
    const categoria = botao.textContent.toLowerCase();

    // Mostra/esconde produtos
    produtos.forEach(produto => {
      const cat = produto.dataset.categoria;

      if (categoria === 'todos' || cat === categoria) {
        produto.style.display = 'block';
      } else {
        produto.style.display = 'none';
      }
    });
  });
});
