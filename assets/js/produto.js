btnCarrinho.addEventListener("click", () => {
  if (!tamanhoSelecionado) {
    alert("Por favor, selecione um tamanho disponível.");
    return;
  }

  // 🔗 Integração com o carrinho global
  btnCarrinho.dataset.produto = `${produto.nome} (${tamanhoSelecionado})`;
  btnCarrinho.dataset.preco = produto.preco;

  // feedback visual
  btnCarrinho.textContent = "✓ Adicionado";
  setTimeout(() => {
    btnCarrinho.textContent = "Adicionar ao carrinho";
  }, 1000);
});
