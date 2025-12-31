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
      const cat = normalizar(produto.dataset.categoria);

      if (categoria === 'todos' || cat === categoria) {
        produto.style.display = 'initial';
        produto.classList.add('mostrar');
      } else {
        produto.style.display = 'none';
        produto.classList.remove('mostrar');
      }
    });
  });
});
