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
     QUANTIDADE
  ================================ */
  document.querySelectorAll('.produto').forEach(produto => {
    const btnMais = produto.querySelector('.qtd-mais');
    const btnMenos = produto.querySelector('.qtd-menos');
    const valor = produto.querySelector('.qtd-valor');

    let quantidade = 1;

    btnMais.addEventListener('click', () => {
      quantidade++;
      valor.textContent = quantidade;
    });

    btnMenos.addEventListener('click', () => {
      if (quantidade > 1) {
        quantidade--;
        valor.textContent = quantidade;
      }
    });
  });

  /* ================================
     CARRINHO
  ================================ */
  const carrinho = [];
  const listaCarrinho = document.getElementById('lista-carrinho');
  const botaoFinalizar = document.getElementById('finalizar-whatsapp');
  const telefoneWhatsApp = '5581984782598';

  function atualizarCarrinho() {
    listaCarrinho.innerHTML = '';

    carrinho.forEach((item, index) => {
      const li = document.createElement('li');
      li.innerHTML = `
        ${item.produto} — Tam ${item.tamanho} — Qtde ${item.quantidade}
        <button class="remover" data-index="${index}">×</button>
      `;
      listaCarrinho.appendChild(li);
    });

    document.querySelectorAll('.remover').forEach(btn => {
      btn.addEventListener('click', () => {
        const index = btn.dataset.index;
        carrinho.splice(index, 1);
        atualizarCarrinho();
      });
    });
  }

  document.querySelectorAll('.btn-carrinho').forEach(botao => {
    botao.addEventListener('click', e => {
      e.preventDefault();

      const card = botao.closest('.card');
      const produto = botao.dataset.produto;
      const tamanhoAtivo = card.querySelector('.tamanho.ativo');
      const qtdValor = card.querySelector('.qtd-valor');

      if (!tamanhoAtivo) {
        alert('Selecione um tamanho.');
        return;
      }

      carrinho.push({
        produto,
        tamanho: tamanhoAtivo.textContent,
        quantidade: parseInt(qtdValor.textContent)
      });

      atualizarCarrinho();

      // feedback visual
      const textoOriginal = botao.textContent;
      botao.textContent = '✓ Adicionado';
      botao.classList.add('adicionado');

      setTimeout(() => {
        botao.textContent = textoOriginal;
        botao.classList.remove('adicionado');
      }, 1400);
    });
  });

  /* ================================
     FINALIZAR NO WHATSAPP
  ================================ */
  botaoFinalizar.addEventListener('click', () => {
    if (carrinho.length === 0) {
      alert('Seu carrinho está vazio.');
      return;
    }

    let mensagem = 'Olá! Gostaria de finalizar meu pedido:\n\n';

    carrinho.forEach(item => {
      mensagem += `• ${item.produto} — Tam ${item.tamanho} — Qtde ${item.quantidade}\n`;
    });

    const url = `https://wa.me/${telefoneWhatsApp}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank');
  });

});
