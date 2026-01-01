const botoes = document.querySelectorAll('.filtros button');
const produtos = document.querySelectorAll('.produto');

function filtrarProdutos(categoria) {
  produtos.forEach(produto => {
    const deveMostrar =
      categoria === 'todos' || produto.dataset.category === categoria;

    if (deveMostrar) {
      produto.classList.remove('oculto');
    } else {
      produto.classList.add('oculto');
    }
  });
}

botoes.forEach(botao => {
  botao.addEventListener('click', () => {
    botoes.forEach(b => b.classList.remove('ativo'));
    botao.classList.add('ativo');

    const categoria = botao.dataset.category;
    filtrarProdutos(categoria);
  });
});

// Mostrar todos ao carregar
document.addEventListener('DOMContentLoaded', () => {
  filtrarProdutos('todos');
});

const telefoneWhatsApp = '5581984782598';

// selecionar tamanho
document.querySelectorAll('.tamanhos').forEach(grupo => {
  const botoes = grupo.querySelectorAll('.tamanho');

  botoes.forEach(botao => {
    botao.addEventListener('click', () => {
      botoes.forEach(b => b.classList.remove('ativo'));
      botao.classList.add('ativo');
    });
  });
});

// WhatsApp dinâmico com tamanho
document.querySelectorAll('.btn-comprar').forEach(botao => {
  botao.addEventListener('click', e => {
    e.preventDefault();

    const produto = botao.dataset.produto;
    const card = botao.closest('.card');
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

    const tamanho = tamanhoAtivo.textContent;

    carrinho.push({ produto, tamanho });

    atualizarCarrinho();
  });
});
