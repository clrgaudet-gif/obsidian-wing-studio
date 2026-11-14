document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
    });
  }

  // Price update on size change
  document.querySelectorAll('.size-select').forEach(select => {
    select.addEventListener('change', () => {
      const card = select.closest('.print-details');
      const priceEl = card.querySelector('.price');
      if (priceEl) {
        priceEl.textContent = '$' + select.value + ' CAD';
      }
    });
  });

  // Cart logic
  let cart = JSON.parse(localStorage.getItem('obsidianCart')) || [];

  function updateCartUI() {
    const cartItemsEl = document.getElementById('cart-items');
    const cartTotalEl = document.getElementById('cart-total');
    const cartCountEl = document.querySelector('.cart-count');
    cartItemsEl.innerHTML = '';
    let total = 0;
    let count = 0;

    cart.forEach((item, index) => {
      total += item.price;
      count++;
      const div = document.createElement('div');
      div.className = 'cart-item';
      div.innerHTML = `
        <div class="cart-item-info">
          <h4>${item.title}</h4>
          <p>${item.size} — $${item.price} CAD</p>
        </div>
        <button class="remove-item" data-index="${index}">Remove</button>
      `;
      cartItemsEl.appendChild(div);
    });

    cartTotalEl.textContent = total;
    cartCountEl.textContent = count;
    localStorage.setItem('obsidianCart', JSON.stringify(cart));

    // Remove listeners
    document.querySelectorAll('.remove-item').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.index);
        cart.splice(idx, 1);
        updateCartUI();
      });
    });
  }

  // Add to cart
  document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.print-card');
      const title = card.querySelector('h3').textContent;
      const select = card.querySelector('.size-select');
      const price = parseInt(select.value);
      const size = select.options[select.selectedIndex].dataset.size;
      cart.push({ title, size, price });
      updateCartUI();
      // Open cart
      document.getElementById('cart-sidebar').classList.add('open');
      document.getElementById('cart-overlay').classList.add('open');
    });
  });

  // Cart toggle
  document.querySelector('.cart-toggle').addEventListener('click', () => {
    document.getElementById('cart-sidebar').classList.add('open');
    document.getElementById('cart-overlay').classList.add('open');
  });

  document.querySelector('.close-cart').addEventListener('click', () => {
    document.getElementById('cart-sidebar').classList.remove('open');
    document.getElementById('cart-overlay').classList.remove('open');
  });

  document.getElementById('cart-overlay').addEventListener('click', () => {
    document.getElementById('cart-sidebar').classList.remove('open');
    document.getElementById('cart-overlay').classList.remove('open');
  });

  // Checkout
  document.getElementById('checkout-btn').addEventListener('click', () => {
    if (cart.length === 0) {
      alert('Your cart is empty.');
      return;
    }
    let body = 'Print Order Request\n\n';
    cart.forEach(item => {
      body += `${item.title} — ${item.size} — $${item.price} CAD\n`;
    });
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    body += `\nTotal: $${total} CAD\n\nPlease confirm availability, final price (including shipping), and payment options.\n\nName:\nEmail:\nShipping Address:\n\nThank you.`;
    const subject = 'Print Order from Obsidian Wing Studio';
    window.location.href = `mailto:milaluxx.official@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });

  updateCartUI();
});