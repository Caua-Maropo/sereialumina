console.log("produtos.js carregado");

// ================================
// PRODUTOS (FONTE ÚNICA DE DADOS)
// ================================
const PRODUTOS = [
  {
    id: "biquini-amarelo",
    nome: "Biquíni Amarelo",
    categoria: "biquini",
    preco: 59.9,
    imagem: "assets/imagens/biquini-amarelo.png",
    descricao: "Biquíni confortável, tecido premium e secagem rápida.",
    peso: "180g",
    cores: {
      Amarelo: { P: 3, M: 5, G: 0 },
      Preto: { P: 2, M: 0, G: 4 }
    }
  },
  {
    id: "biquini-preto",
    nome: "Biquíni Preto",
    categoria: "biquini",
    preco: 79.9,
    imagem: "assets/imagens/biquini-preto.png",
    descricao: "Modelo elegante e moderno, perfeito para o verão.",
    peso: "200g",
    cores: {
      Preto: { P: 5, M: 10, G: 3 },
      Vermelho: { P: 0, M: 7, G: 1 }
    }
  },
  {
    id: "maio-azul",
    nome: "Maiô Azul",
    categoria: "maio",
    preco: 89.9,
    imagem: "assets/imagens/biquini-azul.png",
    descricao: "Modelo elegante e moderno, perfeito para o verão.",
    peso: "200g",
    cores: {
      Azul: { P: 5, M: 10, G: 3 }
    }
  },
  {
    id: "mulher-amarelo",
    nome: "Biquíni Feminino Amarelo",
    categoria: "biquini",
    preco: 59.9,
    imagem: "assets/imagens/mulher-biquini-amarelo.jfif",
    descricao: "Design vibrante para quem ama o verão.",
    peso: "200g",
    cores: {
      Amarelo: { P: 5, M: 10, G: 3 }
    }
  },
  {
    id: "mulher-branco",
    nome: "Biquíni Feminino Branco",
    categoria: "biquini",
    preco: 59.9,
    imagem: "assets/imagens/mulher-biquini-branco.jfif",
    descricao: "Visual clean e sofisticado.",
    peso: "200g",
    cores: {
      Branco: { P: 5, M: 10, G: 3 }
    }
  },
  {
    id: "mulher-pintado",
    nome: "Biquíni Feminino Estampado",
    categoria: "biquini",
    preco: 59.9,
    imagem: "assets/imagens/mulher-biquini-pintado.jfif",
    descricao: "Estampa exclusiva para destacar seu estilo.",
    peso: "200g",
    cores: {
      Estampado: { P: 5, M: 10, G: 3 }
    }
  },
  {
    id: "mulher-preto",
    nome: "Biquíni Feminino Preto",
    categoria: "biquini",
    preco: 59.9,
    imagem: "assets/imagens/mulher-biquini-preto.jfif",
    descricao: "Clássico, elegante e indispensável.",
    peso: "200g",
    cores: {
      Preto: { P: 5, M: 10, G: 3 }
    }
  },
  {
    id: "mulher-vermelho",
    nome: "Biquíni Feminino Vermelho",
    categoria: "biquini",
    preco: 59.9,
    imagem: "assets/imagens/mulher-biquini-vermelho.jfif",
    descricao: "Para quem quer chamar atenção.",
    peso: "200g",
    cores: {
      Vermelho: { P: 5, M: 9, G: 3 }
    }
  }
];

// ================================
// DISPONIBILIZA GLOBALMENTE
// ================================
window.PRODUTOS = PRODUTOS;
