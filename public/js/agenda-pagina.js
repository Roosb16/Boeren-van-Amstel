// document.addEventListener('DOMContentLoaded', () => {
//     const maandJaarElement = document.getElementById('maandJaar');
//     const datumElement = document.getElementById('datums');
//     const prevBtn = document.getElementById('prevBtn');
//     const nextButton = document.getElementById('nextButton');

//     let currentDate = new Date();

//     function updateKalender() {
//         const huidigJaar = currentDate.getFullYear();
//         const huidigeMaand = currentDate.getMonth();

//         const eersteDag = new Date(huidigJaar, huidigeMaand, 1);
//         const laatsteDag = new Date(huidigJaar, huidigeMaand + 1, 0);

//         const totaleDagen = laatsteDag.getDate();

//         // Maandag = eerste dag van de week
//         let eersteDagIndex = eersteDag.getDay();
//         eersteDagIndex = eersteDagIndex === 0 ? 6 : eersteDagIndex - 1;

//         const maandJaarString = currentDate.toLocaleString('nl-NL', {
//             month: 'long',
//             year: 'numeric'
//         });

//         maandJaarElement.textContent = maandJaarString;

//         let datesHTML = '';

//         // Vorige maand
//         for (let i = eersteDagIndex; i > 0; i--) {
//             const prevDate = new Date(huidigJaar, huidigeMaand, 1 - i);
//             datesHTML += `<div class="date inactive">${prevDate.getDate()}</div>`;
//         }

//         // Huidige maand
//         for (let i = 1; i <= totaleDagen; i++) {
//             const date = new Date(huidigJaar, huidigeMaand, i);

//             const isToday =
//                 date.toDateString() === new Date().toDateString()
//                     ? 'active'
//                     : '';

//             datesHTML += `<div class="date ${isToday}">${i}</div>`;
//         }

//         // Kalender opvullen tot 42 vakjes (6 weken)
//         const gebruikteVakjes = eersteDagIndex + totaleDagen;
//         const resterendeVakjes = 42 - gebruikteVakjes;

//         for (let i = 1; i <= resterendeVakjes; i++) {
//             datesHTML += `<div class="date inactive">${i}</div>`;
//         }

//         datumElement.innerHTML = datesHTML;
//     }

//     prevBtn.addEventListener('click', () => {
//         currentDate.setMonth(currentDate.getMonth() - 1);
//         updateKalender();
//     });

//     nextButton.addEventListener('click', () => {
//         currentDate.setMonth(currentDate.getMonth() + 1);
//         updateKalender();
//     });

//     updateKalender();
// });