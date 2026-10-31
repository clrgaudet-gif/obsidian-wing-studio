document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
    });
  }

  document.querySelectorAll('.size-select').forEach(select => {
    select.addEventListener('change', () => {
      const card = select.closest('.print-details');
      const priceEl = card.querySelector('.price');
      if (priceEl) {
        priceEl.textContent = '$' + select.value + ' CAD';
      }
    });
  });

  document.querySelectorAll('.buy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const title = btn.dataset.title;
      const card = btn.closest('.print-details');
      const select = card.querySelector('.size-select');
      const optionText = select.options[select.selectedIndex].text;
      const body = encodeURIComponent(
        `Print Order Request\n\nTitle: ${title}\nSize: ${optionText}\n\nPlease confirm availability, final price (including shipping), and payment options.\n\nName:\nEmail:\nShipping Address:\n\nThank you.`
      );
      window.location.href = `mailto:milaluxx.official@gmail.com?subject=Print Order: ${encodeURIComponent(title)}&body=${body}`;
    });
  });
});