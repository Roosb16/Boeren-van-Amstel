const overlay = document.getElementById('overlay');
const overlayTitle = document.getElementById('overlay-title');
const overlayText = document.getElementById('overlay-text');
const overlayImg = document.getElementById('overlay-img');

const polderTeksten = {
    Duivendrechtsepolder: 'De Duivendrechterpolder vormt een groene overgang tussen de stad en het omliggende landschap. Ondanks de nabijheid van Amsterdam biedt dit gebied ruimte aan natuur, water en agrarisch gebruik. In de polder worden verschillende natuurherstelprojecten uitgevoerd die bijdragen aan een grotere biodiversiteit en een gezonder ecosysteem. Dankzij de samenwerking tussen boeren, bewoners en natuurorganisaties blijft de Duivendrechterpolder een belangrijk onderdeel van het groene netwerk rondom Amsterdam.',
    Rondehoep: 'De Ronde Hoep is een van de oudste en best bewaarde polders van Nederland. Dit open veenweidelandschap biedt ruimte aan boeren, natuur en recreatie. Hier werken boeren en natuurorganisaties samen aan een gezond landschap, waarin biodiversiteit en duurzame landbouw hand in hand gaan.',
    Bovenkerkerpolder: 'De Bovenkerkerpolder is een karakteristiek veenweidegebied ten zuiden van Amsterdam. Dit open landschap wordt gekenmerkt door uitgestrekte graslanden, sloten en weidevogels. Hier werken boeren, natuurorganisaties en vrijwilligers samen aan het versterken van de biodiversiteit en het behoud van het traditionele polderlandschap. Door duurzame landbouw en natuurbeheer blijft de Bovenkerkerpolder een waardevol leefgebied voor mens en natuur.'
};

const overlayImgClasses = {
    Duivendrechtsepolder: 'overlay-img--duivendrecht',
    Rondehoep: 'overlay-img--rondehoep',
    Bovenkerkerpolder: 'overlay-img--bovenkerker'
};

document.querySelectorAll('.polder-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const naam = btn.dataset.naam;

        overlayTitle.textContent = naam.toUpperCase();
        overlayText.textContent = polderTeksten[naam];
        overlayImg.src = btn.dataset.img;
        overlayImg.alt = naam;

        // oude polder-class verwijderen, nieuwe toevoegen
        overlayImg.classList.remove(...Object.values(overlayImgClasses));
        overlayImg.classList.add(overlayImgClasses[naam]);

        overlay.classList.add('overlay--active');
    });
});

document.getElementById('overlay-close').addEventListener('click', () => {
    overlay.classList.remove('overlay--active');
});