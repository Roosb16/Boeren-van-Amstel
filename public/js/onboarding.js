const slides = document.querySelectorAll('.slide');
const btnNext = document.querySelector('.btn-next');
const btnStart = document.querySelector('.btn-start');
let current = 0;

function goTo(index) {
  current = index;
  const slideWidth = track.parentElement.offsetWidth;
  track.style.transform = `translateX(-${index * slideWidth}px)`;

  document.querySelectorAll('.dot').forEach(dot => {
    dot.classList.toggle('active', Number(dot.dataset.index) === index);
  });

  // wissel knop op laatste slide
  btnNext.hidden = index === slides.length - 1;
  btnStart.hidden = index !== slides.length - 1;
}

btnNext.addEventListener('click', () => goTo(current + 1));
btnStart.addEventListener('click', () => window.location.href = '/polders');

document.querySelectorAll('.dot').forEach(dot => {
  dot.addEventListener('click', () => goTo(Number(dot.dataset.index)));
});