const cartBadge = document.getElementById('cart-badge');
let carrinho = [];

// Atualiza badge do carrinho
function atualizarBadge() {
  cartBadge.textContent = carrinho.length;
}

// Modal de produto
const modal = document.getElementById('modal-produto');
const modalImg = document.getElementById('modal-img');
const modalNome = document.getElementById('modal-nome');
const modalDesc = document.getElementById('modal-desc');
const modalPreco = document.getElementById('modal-preco');
const modalAdd = document.getElementById('modal-add-cart');
const closeModal = modal.querySelector('.close');

// Abrir modal ao clicar na imagem do produto
document.querySelectorAll('.card-img img').forEach(img => {
  img.addEventListener('click', () => {
    const card = img.closest('.produto').querySelector('.card-info');
    modal.style.display = 'block';
    modalImg.src = img.src;
    modalNome.textContent = card.querySelector('h3').textContent;
    modalDesc.textContent = card.querySelector('.descricao').textContent;
    modalPreco.textContent = card.querySelector('.preco').textContent;
  });
});

// Fechar modal
closeModal.addEventListener('click', () => modal.style.display = 'none');
window.addEventListener('click', e => {
  if(e.target === modal) modal.style.display = 'none';
});

// Adicionar ao carrinho
document.querySelectorAll('.btn-carrinho').forEach(btn => {
  btn.addEventListener('click', () => {
    const produto = btn.dataset.produto;
    const preco = parseFloat(btn.dataset.preco);
    carrinho.push({produto, preco});
    atualizarBadge();
    btn.classList.add('adicionado');
    setTimeout(()=> btn.classList.remove('adicionado'), 800);
  });
});
