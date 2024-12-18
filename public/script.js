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

// Adiciona ao carrinho bolos com opções
function addToCartOptions(productId, productName, productBasePrice) {
  //confere se usuário selecionou opções
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

  // fecha o modal
  const modal = document.getElementById(`detalhesModal${productId}`);
  if (modal) {
    modal.style.display = 'none';
    modal.classList.remove('show');
  }
  const backdrop = document.querySelector('.modal-backdrop');
  if (backdrop) {
    backdrop.remove();
  }
  document.body.classList.remove('modal-open');
}

// Adiciona ao carrinho itens sem opções a selecionar
function addToCartNoOptions(productId, productName, productPrice) {
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
  
  // fecha o modal
  const modal = document.getElementById(`detalhesModal${productId}`);
  if (modal) {
    modal.style.display = 'none';
    modal.classList.remove('show');
  }

  const backdrop = document.querySelector('.modal-backdrop');
  if (backdrop) {
    backdrop.remove();
  }

  document.body.classList.remove('modal-open');
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
  let cart = JSON.parse(localStorage.getItem('cart')) || []; // busca o carrinho no localStorage
  console.log("Carrinho:", JSON.stringify(cart, null, 2));

  const itensCarrinho = document.getElementById('itensCarrinho');
  itensCarrinho.innerHTML = '';
  let total = 0;

  const optionLabels = {
    tamanho: {
      '1kg': "1 kg",
      '2kg': "2 kg",
      '3kg': "3 kg",
    },

    sabormassa: {
      baunilha: "Baunilha",
      chocolate: "Chocolate",
    },
    
    saborrecheio: {
      brigadeiro: "Brigadeiro",
      ninhomorango: "Leite Ninho com morango",
      beijinho: "Beijinho",
      limao: "Mousse de limão",
      maracuja: "Mousse de maracujá",
      docedeleite: "Doce de Leite",
      docedeleiteameixa: "Doce de Leite com ameixa",
    }
  };

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
      .map(([key, value]) =>{
        const label = optionLabels[key];
        return label ? `<li>${label[value] || `${key}: ${value}`}</li>` : ``; // Handle missing values or keys
      })
      .join("");
      row.innerHTML = `
      <td>
        ${item.name}<br>
        <ul>${opcoesSelecionadas}</ul>
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

function clearCart() {
  if (confirm('Deseja limpar o carrinho?')) {
    localStorage.removeItem('cart');
    console.log('Carrinho limpo');
    updateCart();
  }
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

// exibe mensagem de sucesso ou erro no cadastro
const urlParams = new URLSearchParams(window.location.search);
const success = urlParams.get('success');
const error = urlParams.get('error');

if (success === 'true') {
  // mensagem de sucesso
  const messageDiv = document.getElementById("mensagemCadastro");
  messageDiv.textContent = "Cadastro realizado com sucesso!";
} else if (error === 'true') {
  // mensagem de erro
  const messageDiv = document.getElementById("mensagemCadastro");
  messageDiv.textContent = "Erro ao realizar o cadastro. Tente novamente.";
};

// pág de contato
document.getElementById('contactForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent default form submission

  const nome = document.getElementById('input_nome').value;
  const telefone = document.getElementById('telefone').value;
  const mensagem = document.getElementById('mensagem').value;

  fetch('/contato', { // envia dados para o servidor
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ nome, telefone, mensagem })
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      document.getElementById('contactMessage').innerHTML = '<p>Sua mensagem foi enviada!</p>';
      document.getElementById('contactForm').reset(); // limpa o formulário
    } else {
      document.getElementById('contactMessage').innerHTML = `<p>${data.mensagem}</p>`;
    }
  })
  .catch(error => {
    console.error('Error:', error);
    document.getElementById('contactMessage').innerHTML = '<p>Erro ao enviar mensagem. Tente novamente.</p>';
  });
});