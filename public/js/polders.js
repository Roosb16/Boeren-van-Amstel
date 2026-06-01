document.querySelectorAll('.polder-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.getElementById('overlay-title').textContent = btn.dataset.naam.toUpperCase();
        document.getElementById('overlay').style.display = 'grid';
    });
});

document.getElementById('overlay-close').addEventListener('click', () => {
    document.getElementById('overlay').style.display = 'none';
});