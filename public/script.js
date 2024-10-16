document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger");
  const menu = document.querySelector(".menu");

  if (hamburger && menu) {
    hamburger.addEventListener("click", function () {
      menu.classList.toggle("active");
    });
  }
});

// Script para gerenciar o carrinho
const cart = [];
const itensCarrinho = document.getElementById('itensCarrinho');
const totalCarrinho = document.getElementById('totalCarrinho');
const abrirCarrinho = document.getElementById('abrirCarrinho');
const fecharCarrinho = document.getElementById('fecharCarrinho');
const carrinho = document.getElementById('carrinho');
const carrinhoMenu = document.getElementById('carrinho-menu');

function addToCart(item, price) {
  cart.push({ item, price });
  updateCart();
  alert(`${item} adicionado ao carrinho!`);
}

function updateCart() {
  itensCarrinho.innerHTML = '';
  let total = 0;
  cart.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.item} - R$ ${item.price},00`;
    itensCarrinho.appendChild(li);
    total += item.price;
  });
  totalCarrinho.textContent = `Total: R$ ${total},00`;
}

abrirCarrinho.addEventListener('click', () => {
  carrinho.style.display = 'block';
});

fecharCarrinho.addEventListener('click', () => {
  carrinho.style.display = 'none';
});

carrinhoMenu.addEventListener('click', () => {
  carrinho.style.display = 'block';
});

// Atualiza o carrinho ao carregar a página
updateCart();