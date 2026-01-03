console.log("script.js carregado");

// ================================
// CARRINHO (LocalStorage)
// ================================
let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

const listaCarrinho = document.getElementById("lista-carrinho");
const totalCarrinho = document.getElementById("total-carrinho");
const botaoFinalizar = document.getElementById("finalizar-whatsapp");

// ================================
// ATUALIZAR CARRINHO
// ================================
function atualizarCarrinho() {
  if (!listaCarrinho || !totalCarrinho) {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    return;
  }

  listaCarrinho.innerHTML = "";
  let total = 0;

  carrinho.forEach((item, index) => {
    const subtotal = item.preco * item.quantidade;
    total += subtotal;

    const li = document.createElement("li");
    li.classList.add("item-carrinho");

    li.innerHTML = `
      <div>
        <span>${item.produto} — ${item.tamanho}</span>
        <small>Qtd: ${item.quantidade}</small>
      </div>

      <div class="acoes">
        <strong>R$ ${subtotal.toFixed(2).replace(".", ",")}</strong>
        <button class="remover" data-index="${index}">✕</button>
      </div>
    `;

    listaCarrinho.appendChild(li);
  });

  totalCarrinho.textContent = total.toFixed(2).replace(".", ",");
  localStorage.setItem("carrinho", JSON.stringify(carrinho));

  // ================================
  // REMOVER ITEM
  // ================================
  document.querySelectorAll(".remover").forEach((botao) => {
    botao.addEventListener("click", () => {
      const index = botao.dataset.index;
      carrinho.splice(index, 1);
      atualizarCarrinho();
    });
  });
}

// ================================
// BOTÕES "ADICIONAR AO CARRINHO"
// ================================
document.querySelectorAll(".btn-carrinho").forEach((botao) => {
  botao.addEventListener("click", () => {
    const produto = botao.dataset.produto;
    const preco = parseFloat(botao.dataset.preco);
    const tamanho = "Único";

    const itemExistente = carrinho.find(
      (item) => item.produto === produto && item.tamanho === tamanho
    );

    if (itemExistente) {
      itemExistente.quantidade++;
    } else {
      carrinho.push({
        produto,
        preco,
        tamanho,
        quantidade: 1
      });
    }

    atualizarCarrinho();

    botao.textContent = "✓ Adicionado";
    setTimeout(() => {
      botao.textContent = "Adicionar ao carrinho";
    }, 1200);
  });
});

// ================================
// FINALIZAR NO WHATSAPP
// ================================
if (botaoFinalizar) {
  botaoFinalizar.addEventListener("click", () => {
    if (carrinho.length === 0) {
      alert("Carrinho vazio");
      return;
    }

    let msg = "Olá! Meu pedido:\n\n";
    let total = 0;

    carrinho.forEach((item) => {
      const sub = item.preco * item.quantidade;
      total += sub;
      msg += `• ${item.produto} x${item.quantidade} — R$ ${sub.toFixed(2)}\n`;
    });

    msg += `\nTotal: R$ ${total.toFixed(2)}`;

    window.open(
      `https://wa.me/5581984782598?text=${encodeURIComponent(msg)}`,
      "_blank"
    );
  });
}

// ================================
// ATUALIZA AO ABRIR A PÁGINA
// ================================
atualizarCarrinho();
