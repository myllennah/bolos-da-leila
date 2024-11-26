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

// Alterar o preço do produto de acordo com o tamanho 
document.addEventListener('DOMContentLoaded', () => {
  console.log("DOM fully loaded and parsed");

  // Function to update the price based on the selected size
  function alterarPreço() {
    // Get the 'tamanho' select element
    const tamanho = document.getElementById('tamanho');
    console.log("tamanho element:", tamanho);

    if (!tamanho) {
      console.error("Error: 'tamanho' element not found.");
      return;
    }

    // Check if a valid option is selected (not the first empty option)
    const selectedOption = tamanho.options[tamanho.selectedIndex];
    if (selectedOption.value === "") {
      console.error("Error: No size selected (empty option).");
      return; // Exit if no size is selected
    }

    // Get the selected option's data-price attribute
    const precoTamanho = parseFloat(selectedOption.getAttribute('data-price'));
    console.log("preço tamanho:", precoTamanho);

    if (isNaN(precoTamanho)) {
      console.error("Error: Invalid preçoTamanho value:", precoTamanho);
      return;
    }

    // Get the base price from EJS (Ensure it's a valid number)
    const precoBase = parseFloat('<%= produto.preco %>');
    console.log("preco base:", precoBase);

    if (isNaN(precoBase)) {
      console.error("Error: Invalid precoBase value:", precoBase);
      return;
    }

    // Calculate the total price
    const totalPrice = precoBase + precoTamanho;
    console.log('preço total:', totalPrice);

    // Update the displayed price in the modal
    const precoElement = document.getElementById('preco');
    if (precoElement) {
      precoElement.textContent = `Preço: R$ ${totalPrice.toFixed(2)}`;
    } else {
      console.error("Error: 'preco' element not found.");
    }
  }

  // Add event listener to the 'tamanho' select element to update price on change
  const tamanhoElement = document.getElementById('tamanho');
  if (tamanhoElement) {
    tamanhoElement.addEventListener('change', alterarPreço);
    console.log("Event listener added for 'tamanho' change.");
  } else {
    console.error("Error: 'tamanho' element not found.");
  }

  // Call alterarPreço on page load to show the initial price
  alterarPreço();
});
