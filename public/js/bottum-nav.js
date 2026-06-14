const links = document.querySelectorAll('[data-popup]');
const popups = document.querySelectorAll('.pop-up');

links.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const id = link.dataset.popup;
    const popup = document.getElementById(id);

    popups.forEach(p => p.setAttribute('aria-hidden', 'true')); // sluit alle
    if (popup) popup.setAttribute('aria-hidden', 'false');
  });
});

document.querySelectorAll('.sluit-popup').forEach(knop => {
  knop.addEventListener('click', () => {
    knop.closest('.pop-up').setAttribute('aria-hidden', 'true');
  });
});