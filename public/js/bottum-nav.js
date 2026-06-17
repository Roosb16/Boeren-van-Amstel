const links = document.querySelectorAll('[data-popup]');
const popups = document.querySelectorAll('.pop-up');
const nav = document.querySelector('nav');

links.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const id = link.dataset.popup;
    const popup = document.getElementById(id);

    popups.forEach(p => p.setAttribute('aria-hidden', 'true'));
    if (popup) popup.setAttribute('aria-hidden', 'false');
    if (nav) nav.classList.add('nav-verschoven');
  });
});

document.querySelectorAll('.sluit-popup').forEach(knop => {
  knop.addEventListener('click', () => {
    knop.closest('.pop-up').setAttribute('aria-hidden', 'true');
    if (nav) nav.classList.remove('nav-verschoven');
  });
});