// Alterar o preço do produto de acordo com o tamanho
function alterarPreco(produtoId) {
  const tamanho = document.getElementById(`tamanho${produtoId}`);
  console.log("tamanho:", tamanho);

  const selectedOption = tamanho.options[tamanho.selectedIndex];
  console.log("opção escolhida: ", selectedOption);

  const preco = document.getElementById(`preco${produtoId}`);
  const precoBase = parseFloat(preco.getAttribute("data-base-price"));

  const variacaoPreco = parseFloat(selectedOption.getAttribute("data-price"));
  console.log("adicional:", variacaoPreco);

  const precoFinal = precoBase + variacaoPreco;
  console.log('final:', precoFinal);

  preco.textContent = `R$ ${precoFinal.toFixed(2)}`;
  localStorage.setItem('updatedPrice', precoFinal.toFixed(2));
};

//Adicionar ao carrinho
function addToCart(productId, productName, productPrice) {
  console.log("Adicionando ao carrinho:", productId, productName, productPrice);
  let cart = JSON.parse(localStorage.getItem('cart')) || []; // Usando localStorage
  let existingProduct = cart.find(item => item.id === productId);

  if (existingProduct) {
    existingProduct.quantity++;
  } else {
    const priceAsNumber = parseFloat(productPrice);
    cart.push({ id: productId, name: productName, price: priceAsNumber, quantity: 1 });
  }

  // Atualiza o carrinho na sessão do servidor via AJAX
  fetch('/atualizar-carrinho', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ cart: cart })
  })
    .then(response => response.json())
    .then(data => {
      console.log(data.message);
    })
    .catch(error => {
      console.error('Erro ao atualizar o carrinho:', error);
    });

  localStorage.setItem('cart', JSON.stringify(cart)); // Usando localStorage
  updateCart();
  alert(`${productName} adicionado ao carrinho!`);
}

// Função para remover um item do carrinho
function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem('cart')) || []; // Usando localStorage
  cart.splice(index, 1);

  // Atualiza o carrinho na sessão do servidor via AJAX (remover)
  fetch('/atualizar-carrinho', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ cart: cart })
  })
    .then(response => response.json())
    .then(data => {
      console.log(data.message);
    })
    .catch(error => {
      console.error('Erro ao atualizar o carrinho:', error);
    });

  localStorage.setItem('cart', JSON.stringify(cart)); // Usando localStorage
  updateCart();
}

// Função para atualizar o carrinho na tela (modal)
function updateCart() {
  let cart = JSON.parse(localStorage.getItem('cart')) || []; // Usando localStorage
  const updatedPrice = parseFloat(localStorage.getItem('updatedPrice'));
  console.log("Carrinho:", JSON.stringify(cart, null, 2));

  const itensCarrinho = document.getElementById('itensCarrinho');
  itensCarrinho.innerHTML = '';
  let total = 0;

  if (cart.length === 0) {
    itensCarrinho.innerHTML = '<li>Seu carrinho está vazio.</li>';
  } else {
    cart.forEach((item, index) => {
      console.log("Tipo de item.price:", typeof item.price);
      const li = document.createElement('li');
      const itemPrice = !isNaN(updatedPrice) ? updatedPrice : item.price;
      li.innerHTML = `
        ${item.name} - R$ ${item.price.toFixed(2)} x ${item.quantity} 
        <button class="btn btn-danger btn-sm" onclick="removeFromCart(${index})"> remover</button>
      `;
      itensCarrinho.appendChild(li);
      total += item.price * item.quantity;
    });
  }

  const totalCarrinho = document.getElementById('totalCarrinho');
  totalCarrinho.textContent = `Total: R$ ${total.toFixed(2)}`;
}

document.addEventListener('DOMContentLoaded', function () {
  // Menu Hamburger
  const hamburger = document.querySelector(".hamburger");
  const menu = document.querySelector(".menu");

  if (hamburger && menu) {
    hamburger.addEventListener("click", function () {
      menu.classList.toggle("active");
    });
  }

  // Carrinho (abre o modal)
  const carrinhoModal = document.getElementById('carrinhoModal');
  const carrinhoMenu = document.getElementById('carrinho-menu');

  // Verifica se o elemento carrinhoMenu foi encontrado
  if (carrinhoMenu) {
    carrinhoMenu.addEventListener('click', () => {
      $('#carrinhoModal').modal('show');
    });
  } else {
    console.error("Elemento 'carrinho-menu' não encontrado!");
  }

  // Evento para atualizar o carrinho quando o modal for aberto
  $('#carrinhoModal').on('shown.bs.modal', function () {
    updateCart();
  });
});
