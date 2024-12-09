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
  console.log("final:", precoFinal);

  preco.textContent = `R$ ${precoFinal.toFixed(2)}`;
  preco.setAttribute("data-current-price", precoFinal); // Store the updated price for use in cart functions
}

// Adicionar ao carrinho
function addToCart(productId, productName, productBasePrice) {
  //conferir se usuário selecionou opções
  const tamanho = document.getElementById(`tamanho${productId}`);
  const sabormassa = document.getElementById(`sabormassa${productId}`);
  const saborrecheio = document.getElementById(`saborrecheio${productId}`);

  if (!tamanho.value || !sabormassa.value || !saborrecheio.value) {
    alert("Por favor, selecione todas as opções antes de adicionar ao carrinho.");
    return;
  }
  
  // adicionando ao carrinho
  const precoElement = document.getElementById(`preco${productId}`);
  const currentPrice = parseFloat(precoElement.getAttribute("data-current-price")) || parseFloat(productBasePrice);

  console.log("Adicionando ao carrinho:", productId, productName, currentPrice);

  let cart = JSON.parse(localStorage.getItem('cart')) || []; // busca o carrinho no localStorage

  // busca opções selecionadas
  const opcoesSelecionadas = {
    tamanho: tamanho.value,
    sabormassa: sabormassa.value,
    saborrecheio: saborrecheio.value
  };

  // verifica se o item já existe no carrinho
  let existingProduct = cart.find(item => item.id === productId && JSON.stringify(item.options) === JSON.stringify(opcoesSelecionadas));

  if (existingProduct) {
    existingProduct.quantity++;
    existingProduct.price = currentPrice;
  } else {
    cart.push({ id: productId, name: productName, price: currentPrice, quantity: 1, options: opcoesSelecionadas });
  }

  // Update the cart in the server session via AJAX
  fetch('/add-to-cart', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ produtoId: productId,
      tamanho,
      sabormassa,
      saborrecheio, }),
  })
    .then(response => response.json())
    .then(data => {
      console.log(data.message);
    })
    .catch(error => {
      console.error("Erro ao atualizar o carrinho:", error);
    });

  localStorage.setItem('cart', JSON.stringify(cart)); // Save updated cart to localStorage
  updateCart();
  alert(`${productName} adicionado ao carrinho!`);
}

// Função para atualizar o carrinho na tela (modal)
function updateCart() {
  let cart = JSON.parse(localStorage.getItem('cart')) || []; // busca o carrinho no localStorage
  console.log("Carrinho:", JSON.stringify(cart, null, 2));

  const itensCarrinho = document.getElementById('itensCarrinho');
  itensCarrinho.innerHTML = '';
  let total = 0;

  if (cart.length === 0) {
    itensCarrinho.innerHTML = `
      <tr>
        <td colspan="5" style="text-align: center;">Seu carrinho está vazio.</td>
      </tr>
    `;
    
  } else {
    cart.forEach((item, index) => {
      console.log("Tipo de item.price:", typeof item.price);

      const subtotal = item.price * item.quantity;
      total += subtotal;

      const row = document.createElement("tr");
      const opcoesSelecionadas = Object.entries(item.options || {})
      .map(([key, value]) => `${key}: ${value}`)
      .join("<br>");
      row.innerHTML = `
      <td>
        ${item.name}<br>
        <small>${opcoesSelecionadas}</small>
      </td>
      <td>R$ ${item.price.toFixed(2)}</td>
      <td>
        <input type="number" min="1" value="${item.quantity}" 
               onchange="updateQuantity(${index}, this.value)" 
               style="width: 50px;">
      </td>
      <td>R$ ${subtotal.toFixed(2)}</td>
      <td>
        <button class="btn btn-danger btn-sm" onclick="removeFromCart(${index})">
          Remover
        </button>
      </td>
      `;

      itensCarrinho.appendChild(row);
      //total += item.price * item.quantity;
    });
  }

  const totalCarrinho = document.getElementById('totalCarrinho');
  totalCarrinho.textContent = `R$ ${total.toFixed(2)}`;
}

// modificar quantidade
function updateQuantity(index, newQuantity) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (newQuantity < 1) {
    alert("A quantidade mínima é 1.");
    return;
  }
  cart[index].quantity = parseInt(newQuantity);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart(); // Refresh cart
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

// Menu Hamburger
document.addEventListener('DOMContentLoaded', function () {
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
