document.addEventListener('DOMContentLoaded', () => {

  /* ================================
     CONFIGURAÇÕES
  ================================ */
  const telefoneWhatsApp = '5581984782598';
  let carrinho = [];

  const listaCarrinho = document.getElementById('lista-carrinho');
  const totalCarrinhoEl = document.getElementById('total-carrinho');
  const botaoFinalizar = document.getElementById('finalizar-whatsapp');

  /* ================================
     FILTROS
  ================================ */
  const botoesFiltro = document.querySelectorAll('.filtros button');
  const produtos = document.querySelectorAll('.produto');

  function filtrarProdutos(categoria) {
    produtos.forEach(produto => {
      const mostrar =
        categoria === 'todos' ||
        produto.dataset.categoria === categoria;

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
     SELEÇÃO DE TAMANHOS
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
     ATUALIZAR CARRINHO
  ================================ */
  function atualizarCarrinho() {
    listaCarrinho.innerHTML = '';
    let total = 0;

    carrinho.forEach((item, index) => {
      total += item.preco;

      const li = document.createElement('li');
      li.innerHTML = `
        ${item.produto} — Tam ${item.tamanho}
        <button class="remover" data-index="${index}">×</button>
      `;

      listaCarrinho.appendChild(li);
    });

    totalCarrinhoEl.innerHTML = `<strong>Total:</strong> R$ ${total.toFixed(2)}`;

    // remover item
    document.querySelectorAll('.remover').forEach(btn => {
      btn.addEventListener('click', () => {
        carrinho.splice(btn.dataset.index, 1);
        atualizarCarrinho();
      });
    });
  }

  /* ================================
     ADICIONAR AO CARRINHO
  ================================ */
  document.querySelectorAll('.btn-carrinho').forEach(botao => {
    botao.addEventListener('click', e => {
      e.preventDefault();

      const card = botao.closest('.card');
      const produto = botao.dataset.produto;
      const precoTexto = card.querySelector('.preco').textContent;
      const preco = parseFloat(precoTexto.replace('R$', '').replace(',', '.'));
      const tamanhoAtivo = card.querySelector('.tamanho.ativo');

      if (!tamanhoAtivo) {
        alert('Selecione um tamanho.');
        return;
      }

      carrinho.push({
        produto,
        tamanho: tamanhoAtivo.textContent,
        preco
      });

      atualizarCarrinho();

      // feedback visual
      const textoOriginal = botao.textContent;
      botao.textContent = '✓ Adicionado';
      botao.classList.add('adicionado');

      setTimeout(() => {
        botao.textContent = textoOriginal;
        botao.classList.remove('adicionado');
      }, 1200);
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

    let mensagem = 'Olá! Gostaria de finalizar a compra com os seguintes itens:\n\n';

    carrinho.forEach(item => {
      mensagem += `• ${item.produto} — Tam ${item.tamanho}\n`;
    });

    const url = `https://wa.me/${telefoneWhatsApp}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank');
  });

});
