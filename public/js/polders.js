const overlay = document.getElementById('overlay');
const overlayTitle = document.getElementById('overlay-title');
const overlayImg = document.getElementById('overlay-img');

document.querySelectorAll('.polder-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        overlayTitle.textContent = btn.dataset.naam.toUpperCase();
        overlayImg.src = btn.dataset.img;
        overlayImg.alt = btn.dataset.naam;
        overlay.classList.add('overlay--active');
    });
});

document.getElementById('overlay-close').addEventListener('click', () => {
    overlay.classList.remove('overlay--active');
});