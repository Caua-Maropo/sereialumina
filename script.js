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
     FILTROS
  ================================ */
  const botoesFiltro = document.querySelectorAll('.filtros button');
  const produtos = document.querySelectorAll('.produto');

  function filtrarProdutos(categoria) {
    produtos.forEach(produto => {
      const mostrar =
        categoria === 'todos' || produto.dataset.category === categoria;

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
     CARRINHO
  ================================ */
  let carrinho = [];
  const listaCarrinho = document.getElementById('lista-carrinho');
  const totalCarrinho = document.getElementById('total-carrinho');
  const botaoFinalizar = document.getElementById('finalizar-whatsapp');
  const telefoneWhatsApp = '5581984782598';

  function atualizarCarrinho() {
    if (!listaCarrinho || !totalCarrinho) return;

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
      if (!card) return;

      const produto = botao.dataset.produto;
      const preco = parseFloat(botao.dataset.preco);
      const tamanhoAtivo = card.querySelector('.tamanho.ativo');
      const qtdValor = card.querySelector('.qtd-valor');

      if (!tamanhoAtivo) {
        alert('Selecione um tamanho.');
        return;
      }

      carrinho.push({
        produto,
        tamanho: tamanhoAtivo.textContent,
        quantidade: parseInt(qtdValor.textContent),
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
      }, 1400);
    });
  });

  if(botaoFinalizar){
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
  }

  /* ================================
     MODAL LOGIN E CARRINHO
  ================================ */
  const btnLogin = document.getElementById('btn-login');
  const modalLogin = document.getElementById('modal-login');
  const closeLogin = document.getElementById('close-login');

  const btnCart = document.getElementById('btn-cart');
  const modalCart = document.getElementById('modal-cart');
  const closeCart = document.getElementById('close-cart');

  const formLogin = document.getElementById('form-login');

  // Abrir modais
  btnLogin?.addEventListener('click', e => {
    e.preventDefault();
    modalLogin?.classList.remove('hidden');
  });

  btnCart?.addEventListener('click', e => {
    e.preventDefault();
    modalCart?.classList.remove('hidden');
  });

  // Fechar modais
  closeLogin?.addEventListener('click', () => modalLogin?.classList.add('hidden'));
  closeCart?.addEventListener('click', () => modalCart?.classList.add('hidden'));

  // Login simples
  formLogin?.addEventListener('submit', e => {
    e.preventDefault();
    alert("Login realizado com sucesso!");
    modalLogin?.classList.add('hidden');
    formLogin.reset();
  });

});
