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

const footerLinks = document.querySelectorAll('.onderdelen-footer a');

footerLinks.forEach(link => {
    link.addEventListener('click', () => {
        footerLinks.forEach(item => item.classList.remove('active'));
        link.classList.add('active');
    });
});

document.querySelectorAll('.sluit-popup').forEach(knop => {
  knop.addEventListener('click', () => {
    const popup = knop.closest('.pop-up');
    popup.setAttribute('aria-hidden', 'true');

    // vind bijbehorende link en haal active weg
    const id = popup.id;

    const activeLink = document.querySelector(`[data-popup="${id}"]`);
    if (activeLink) activeLink.classList.remove('active');
  });
});
