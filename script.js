console.log("script.js carregado");

// ================================
// CARRINHO (LocalStorage)
// ================================
let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

const listaCarrinho = document.getElementById("lista-carrinho");
const totalCarrinho = document.getElementById("total-carrinho");
const botaoFinalizar = document.getElementById("finalizar-whatsapp");

function atualizarCarrinho() {
  // 🔥 SEMPRE salva
  localStorage.setItem("carrinho", JSON.stringify(carrinho));

  // Só renderiza se existir carrinho.html
  if (!listaCarrinho || !totalCarrinho) return;

  listaCarrinho.innerHTML = "";
  let total = 0;

  carrinho.forEach((item) => {
    const subtotal = item.preco * item.quantidade;
    total += subtotal;

    const li = document.createElement("li");
    li.innerHTML = `
      <span>${item.produto} — ${item.tamanho} (x${item.quantidade})</span>
      <strong>R$ ${subtotal.toFixed(2).replace(".", ",")}</strong>
    `;
    listaCarrinho.appendChild(li);
  });

  totalCarrinho.textContent = total.toFixed(2).replace(".", ",");
}

// ================================
// BOTÕES ADICIONAR AO CARRINHO
// ================================
document.querySelectorAll(".btn-carrinho").forEach((botao) => {
  botao.addEventListener("click", () => {
    console.log("Clique no botão detectado");

    const produto = botao.dataset.produto;
    const preco = parseFloat(botao.dataset.preco);

    carrinho.push({
      produto,
      preco,
      tamanho: "Único",
      quantidade: 1
    });

    // 🔥 ISSO É O QUE FALTAVA
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

// Atualiza automaticamente ao abrir carrinho.html
atualizarCarrinho();
