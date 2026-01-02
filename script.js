console.log('🔥 JS principal carregado com sucesso');

import { auth } from './firebase.js';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

document.addEventListener('DOMContentLoaded', () => {

  /* ================================
     SELEÇÃO DE ELEMENTOS
  ================================ */
  const botoesFiltro = document.querySelectorAll('.filtros button');
  const produtos = document.querySelectorAll('.produto');

  const btnLogin = document.getElementById('btn-login');
  const modalLogin = document.getElementById('modal-login');
  const closeLogin = document.getElementById('close-login');
  const formLogin = document.getElementById('form-login');

  const btnCart = document.getElementById('btn-cart');
  const modalCart = document.getElementById('modal-cart');
  const closeCart = document.getElementById('close-cart');
  const cartList = document.getElementById('cart-list');
  const cartTotal = document.getElementById('cart-total');
  const btnCheckout = document.getElementById('checkout');

  const listaCarrinho = document.getElementById('lista-carrinho');
  const totalCarrinho = document.getElementById('total-carrinho');
  const botaoFinalizar = document.getElementById('finalizar-whatsapp');
  const telefoneWhatsApp = '5581984782598';

  /* ================================
     FILTRO DE PRODUTOS
  ================================ */
  function filtrarProdutos(categoria) {
    produtos.forEach(produto => {
      const mostrar = categoria === 'todos' || produto.dataset.category === categoria;
      produto.style.display = mostrar ? 'flex' : 'none';
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

    if (!btnMais || !btnMenos || !valor) return;

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
      if (quantidade > 1) {
        quantidade--;
        valor.textContent = quantidade;
      }
    });
  });

  /* ================================
     CARRINHO GLOBAL
  ================================ */
  let carrinho = [];

  function atualizarCarrinho() {
    listaCarrinho.innerHTML = '';
    let total = 0;

    carrinho.forEach((item, index) => {
      const subtotal = item.preco * item.quantidade;
      total += subtotal;

      const li = document.createElement('li');
      li.innerHTML = `
        ${item.produto} — Tam ${item.tamanho} — Qtde ${item.quantidade}
        <br>
        R$ ${subtotal.toFixed(2).replace('.',',')}
        <button class="remover" data-index="${index}">×</button>
      `;
      listaCarrinho.appendChild(li);
    });

    totalCarrinho.textContent = total.toFixed(2).replace('.',',');

    document.querySelectorAll('.remover').forEach(btn => {
      btn.addEventListener('click', () => {
        carrinho.splice(btn.dataset.index, 1);
        atualizarCarrinho();
      });
    });
  }

  document.querySelectorAll('.btn-carrinho').forEach(botao => {
    botao.addEventListener('click', e => {
      e.preventDefault();

      const card = botao.closest('.card');
      const produto = botao.dataset.produto || card.querySelector('h3')?.textContent;
      const preco = parseFloat(botao.dataset.preco || card.querySelector('.preco')?.textContent.replace('R$', '').replace(',', '.'));
      const tamanhoAtivo = card.querySelector('.tamanho.ativo');
      const qtdValor = card.querySelector('.qtd-valor');

      const quantidade = qtdValor ? parseInt(qtdValor.textContent) : 1;

      carrinho.push({
        produto,
        tamanho: tamanhoAtivo ? tamanhoAtivo.textContent : '-',
        quantidade,
        preco
      });

      atualizarCarrinho();

      // Feedback visual
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
    let total = 0;

    carrinho.forEach(item => {
      const subtotal = item.preco * item.quantidade;
      total += subtotal;
      mensagem += `• ${item.produto} — Tam ${item.tamanho} — Qtde ${item.quantidade} — R$ ${subtotal.toFixed(2)}\n`;
    });

    mensagem += `\nTotal: R$ ${total.toFixed(2)}`;

    const url = `https://wa.me/${telefoneWhatsApp}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank');
  });

  /* ================================
     MODAL LOGIN
  ================================ */
  if (btnLogin && modalLogin && closeLogin && formLogin) {
    btnLogin.addEventListener('click', e => {
      e.preventDefault();
      modalLogin.classList.remove('hidden');
    });

    closeLogin.addEventListener('click', () => modalLogin.classList.add('hidden'));

    formLogin.addEventListener('submit', e => {
      e.preventDefault();
      alert("Login realizado com sucesso!");
      modalLogin.classList.add('hidden');
      formLogin.reset();
    });
  }

  /* ================================
     MODAL CARRINHO
  ================================ */
  if (btnCart && modalCart && closeCart && cartList && cartTotal && btnCheckout) {
    btnCart.addEventListener('click', e => {
      e.preventDefault();
      modalCart.classList.remove('hidden');
      renderCart();
    });

    closeCart.addEventListener('click', () => modalCart.classList.add('hidden'));

    btnCheckout.addEventListener('click', () => {
      if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
      }
      alert("Compra finalizada! Total: R$ " + cartTotal.textContent);
      carrinho = [];
      atualizarCarrinho();
      modalCart.classList.add('hidden');
    });
  }

  /* ================================
     FUNÇÃO RENDER CARRINHO MODAL
  ================================ */
  function renderCart() {
    cartList.innerHTML = '';
    let total = 0;
    carrinho.forEach(item => {
      const li = document.createElement('li');
      li.textContent = `${item.produto} x${item.quantidade} - R$ ${(item.preco * item.quantidade).toFixed(2)}`;
      cartList.appendChild(li);
      total += item.preco * item.quantidade;
    });
    cartTotal.textContent = total.toFixed(2);
  }

});
