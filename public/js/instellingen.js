const instellingenPanel = document.querySelector('.instellingen-panel');
const instellingenCloseBtn = document.getElementById('closeInstellingenBtn');
const instellingenOpenBtn = document.getElementById('openInstellingenBtn');

instellingenOpenBtn.addEventListener('click', function () {
    instellingenPanel.classList.add('open');
});

instellingenCloseBtn.addEventListener('click', function () {
    instellingenPanel.classList.remove('open');
});

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') instellingenPanel.classList.remove('open');
});

// Lettertype aanpassen
lettertype.addEventListener('input', function () {
    const groottes = { 1: '100%', 2: '125%', 3: '150%' };
    document.documentElement.style.fontSize = groottes[this.value];
});

// Dark mode
const toggleDarkmode = document.getElementById('darkMode');

toggleDarkmode.addEventListener('change', function () {
    document.body.classList.toggle('dark-mode', this.checked);
});