const maandJaarElement = document.getElementById('maandJaar');
const datumElement = document.getElementById('datums');
const prevBtn = document.getElementById('prevBtn');
const nextButton = document.getElementById('nextButton');

let currentDate = new Date();

const updateKalender = () => {
    const huidigJaar = currentDate.getFullYear();
    const huidigeMaand = currentDate.getMonth();

    const eersteDag = new Date(huidigJaar, huidigeMaand, 1);
    const laatsteDag = new Date(huidigJaar, huidigeMaand + 1, 0);

    const totaleDagen = laatsteDag.getDate();
    const eersteDagIndex = eersteDag.getDay(); // 0 = zondag
    const laatsteDagIndex = laatsteDag.getDay();

    const maandJaarString = currentDate.toLocaleString('nl-NL', {
        month: 'long',
        year: 'numeric'
    });

    maandJaarElement.textContent = maandJaarString;

    let datesHTML = '';

    // dagen van vorige maand vullen
    for (let i = eersteDagIndex; i > 0; i--) {
        const prevDate = new Date(huidigJaar, huidigeMaand, 1 - i);
        datesHTML += `<div class="date inactive">${prevDate.getDate()}</div>`;
    }

    // dagen van huidige maand
    for (let i = 1; i <= totaleDagen; i++) {
        const date = new Date(huidigJaar, huidigeMaand, i);

        const isToday =
            date.toDateString() === new Date().toDateString()
                ? 'active'
                : '';

        datesHTML += `<div class="date ${isToday}">${i}</div>`;
    }

    // dagen van volgende maand vullen (kalender netjes maken tot 42 vakjes optioneel)
    for (let i = 1; i <= (7 - laatsteDagIndex); i++) {
        const nextDate = new Date(huidigJaar, huidigeMaand + 1, i);
        datesHTML += `<div class="date inactive">${nextDate.getDate()}</div>`;
    }

    datumElement.innerHTML = datesHTML;
};

prevBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    updateKalender();
});

nextButton.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    updateKalender();
});

updateKalender();

const toggles = document.querySelectorAll('.losse-dagen');

toggles.forEach(btn => {
    btn.addEventListener('click', () => {
        toggles.forEach(item => {
            if (item !== btn) {
                item.classList.remove('active');
            }
        });

        btn.classList.toggle('active');
    });
});