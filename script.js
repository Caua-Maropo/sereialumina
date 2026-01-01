document.addEventListener('DOMContentLoaded', () => {

  /* ================================
     FILTROS
  ================================ */
  const botoesFiltro = document.querySelectorAll('.filtros button');
  const produtos = document.querySelectorAll('.produto');

  function filtrarProdutos(categoria) {
    produtos.forEach(produto => {
      const mostrar =
        categoria === 'todos' || produto.dataset.categoria === categoria;

      produto.classList.toggle('oculto', !mostrar);
    });
  }

  botoesFiltro.forEach(botao => {
    botao.addEventListener('click', () => {
      botoesFiltro.forEach(b => b.classList.remove('ativo'));
      botao.classList.add('ativo');

      filtrarProdutos(botao.dataset.category);
    });
  });

  filtrarProdutos('todos');

  /* ================================
     TAMANHOS
  ================================ */
  document.querySelectorAll('.tamanhos').forEach(grupo => {
    const botoes = grupo.querySelectorAll('.tamanho');

    botoes.forEach(botao => {
      botao.addEventListener('click', () => {
        botoes.forEach(b => b.classList.remove('ativo'));
        botao.classList.add('ativo');
      });
    });
  });

  /* ================================
     WHATSAPP DIRETO
  ================================ */
  const telefoneWhatsApp = '5581984782598';

  document.querySelectorAll('.btn-comprar').forEach(botao => {
    botao.addEventListener('click', e => {
      e.preventDefault();

      const card = botao.closest('.card');
      const produto = botao.dataset.produto;
      const tamanhoAtivo = card.querySelector('.tamanho.ativo');

      if (!tamanhoAtivo) {
        alert('Por favor, selecione um tamanho.');
        return;
      }

      const tamanho = tamanhoAtivo.textContent;
      const mensagem = `Olá! Gostaria de comprar o ${produto} – Tamanho ${tamanho}`;
      const url = `https://wa.me/${telefoneWhatsApp}?text=${encodeURIComponent(mensagem)}`;

      window.open(url, '_blank');
    });
  });

  /* ================================
     CARRINHO SIMPLES
  ================================ */
  let carrinho = [];
  const listaCarrinho = document.getElementById('lista-carrinho');

  function atualizarCarrinho() {
    listaCarrinho.innerHTML = '';

    carrinho.forEach(item => {
      const li = document.createElement('li');
      li.textContent = `${item.produto} — Tamanho ${item.tamanho}`;
      listaCarrinho.appendChild(li);
    });
  }

  document.querySelectorAll('.btn-carrinho').forEach(botao => {
    botao.addEventListener('click', e => {
      e.preventDefault();

      const card = botao.closest('.card');
      const produto = botao.dataset.produto;
      const tamanhoAtivo = card.querySelector('.tamanho.ativo');

      if (!tamanhoAtivo) {
        alert('Selecione um tamanho.');
        return;
      }

      carrinho.push({
        produto,
        tamanho: tamanhoAtivo.textContent
      });

      atualizarCarrinho();
    });
  });

});
const botaoFinalizar = document.getElementById('finalizar-whatsapp');

botaoFinalizar.addEventListener('click', () => {
  if (carrinho.length === 0) {
    alert('Seu carrinho está vazio.');
    return;
  }

  let mensagem = 'Olá! Gostaria de finalizar a compra com os seguintes itens:\n\n';

  carrinho.forEach(item => {
    mensagem += `• ${item.produto} — Tamanho ${item.tamanho}\n`;
  });

  const url = `https://wa.me/${telefoneWhatsApp}?text=${encodeURIComponent(mensagem)}`;
  window.open(url, '_blank');
});
