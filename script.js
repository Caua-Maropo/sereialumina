console.log('🔥 Script carregado com sucesso');

document.addEventListener('DOMContentLoaded', () => {

  /* ================================
     MODAIS
  ================================ */
  const btnLogin = document.getElementById('btn-login');
  const modalLogin = document.getElementById('modal-login');
  const closeLogin = document.getElementById('close-login');

  const btnCart = document.getElementById('btn-cart');
  const modalCart = document.getElementById('modal-cart');
  const closeCart = document.getElementById('close-cart');

  const formLogin = document.getElementById('form-login');
  const cartList = document.getElementById('cart-list');
  const cartTotal = document.getElementById('cart-total');

  let cart = [];

  // Abrir modal login
  if(btnLogin && modalLogin){
    btnLogin.addEventListener('click', e => {
      e.preventDefault();
      modalLogin.classList.remove('hidden');
    });
  }

  // Fechar modal login
  if(closeLogin && modalLogin){
    closeLogin.addEventListener('click', () => modalLogin.classList.add('hidden'));
  }

  // Abrir modal carrinho
  if(btnCart && modalCart){
    btnCart.addEventListener('click', e => {
      e.preventDefault();
      modalCart.classList.remove('hidden');
      renderCart();
    });
  }

  // Fechar modal carrinho
  if(closeCart && modalCart){
    closeCart.addEventListener('click', () => modalCart.classList.add('hidden'));
  }

  // Login simples (temporário)
  if(formLogin){
    formLogin.addEventListener('submit', e => {
      e.preventDefault();
      alert("Login realizado com sucesso!");
      modalLogin.classList.add('hidden');
      formLogin.reset();
    });
  }

  /* ================================
     FILTROS DE PRODUTOS
  ================================ */
  const filtroBtns = document.querySelectorAll('.filtros button');
  const produtos = document.querySelectorAll('.produto');

  filtroBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filtroBtns.forEach(b => b.classList.remove('ativo'));
      btn.classList.add('ativo');
      const cat = btn.dataset.category;
      produtos.forEach(prod => {
        prod.style.display = (cat === 'todos' || prod.dataset.category === cat) ? 'flex' : 'none';
      });
    });
  });

  /* ================================
     TAMANHOS
  ================================ */
  document.querySelectorAll('.tamanhos').forEach(grupo => {
    const botoes = grupo.querySelectorAll('.tamanho');
    botoes.forEach(botao => {
      botao.addEventListener('click', e => {
        e.stopPropagation();
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

    btnMais.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      quantidade++;
      valor.textContent = quantidade;
    });

    btnMenos.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      if(quantidade > 1){
        quantidade--;
        valor.textContent = quantidade;
      }
    });
  });

  /* ================================
     CARRINHO
  ================================ */
  function renderCart(){
    cartList.innerHTML = '';
    let total = 0;
    cart.forEach((item, index) => {
      total += item.price * item.qty;
      const li = document.createElement('li');
      li.innerHTML = `${item.name} x${item.qty} - R$ ${ (item.price*item.qty).toFixed(2) } <button class="remove-item" data-index="${index}">×</button>`;
      cartList.appendChild(li);
    });
    cartTotal.textContent = total.toFixed(2);

    // remover item
    document.querySelectorAll('.remove-item').forEach(btn => {
      btn.addEventListener('click', () => {
        cart.splice(btn.dataset.index, 1);
        renderCart();
      });
    });
  }

  // Botão adicionar ao carrinho
  document.querySelectorAll('.btn-carrinho').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const card = btn.closest('.card');
      const produto = btn.dataset.produto;
      const preco = parseFloat(btn.dataset.preco);
      const tamanhoAtivo = card.querySelector('.tamanho.ativo');
      const qtdValor = card.querySelector('.qtd-valor');

      if(!tamanhoAtivo){
        alert('Selecione um tamanho.');
        return;
      }

      cart.push({
        name: produto,
        size: tamanhoAtivo.textContent,
        qty: parseInt(qtdValor.textContent),
        price: preco
      });

      renderCart();

      // feedback visual
      const original = btn.textContent;
      btn.textContent = '✓ Adicionado';
      btn.classList.add('adicionado');
      setTimeout(() => {
        btn.textContent = original;
        btn.classList.remove('adicionado');
      }, 1400);
    });
  });

  /* ================================
     FINALIZAR NO WHATSAPP
  ================================ */
  const telefoneWhatsApp = '5581984782598';
  const botaoFinalizar = document.getElementById('checkout');

  if(botaoFinalizar){
    botaoFinalizar.addEventListener('click', () => {
      if(cart.length === 0){
        alert('Seu carrinho está vazio.');
        return;
      }
      let mensagem = 'Olá! Gostaria de finalizar meu pedido:\n\n';
      let total = 0;
      cart.forEach(item => {
        const subtotal = item.price*item.qty;
        total += subtotal;
        mensagem += `• ${item.name} — Tam ${item.size} — Qtde ${item.qty} — R$ ${subtotal.toFixed(2)}\n`;
      });
      mensagem += `\nTotal: R$ ${total.toFixed(2)}`;
      window.open(`https://wa.me/${telefoneWhatsApp}?text=${encodeURIComponent(mensagem)}`, '_blank');
    });
  }

});
