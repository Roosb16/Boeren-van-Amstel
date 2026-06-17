// Bovenaan je script, vóór de grenzen/kaart etc.
let quizTimer = null;

// 1. Grenzen van het Amstelgebied
const grenzen = [[52.26, 4.85], [52.36, 5.05]];

// 2. Kaart initialiseren
const kaart = L.map('kaart', {
  maxZoom: 17,
  maxBounds: grenzen,
  maxBoundsViscosity: 1.0
}).setView([52.303, 4.940], 13);

// 3. Eigen afbeelding als achtergrond
L.imageOverlay('/img/amstel-kaart.jpg', grenzen).addTo(kaart);

// 3b. Minimale zoom aanpassen op basis van schermbreedte (voorkomt grijze randen)
function stelMinZoomIn() {
  const minZoomGewenst = window.innerWidth >= 850 ? 14 : 13;
  kaart.setMinZoom(minZoomGewenst);
  if (kaart.getZoom() < minZoomGewenst) {
    kaart.setZoom(minZoomGewenst);
  }
}

// 3c. Route overlay (afbeelding even groot als de kaart-achtergrond, standaard uit)
const routeOverlay = L.imageOverlay('/img/route-overlay.png', grenzen, {
  opacity: 0.9,
  interactive: false
});

// 3d. Vlag-icoon voor route-startpunten
const startpuntIcoon = L.divIcon({
  html: '<img src="/img/startpunt.png" width="40" height="40">',
  iconSize: [40, 40],
  iconAnchor: [12, 36],
  popupAnchor: [0, -36],
  className: ''
});

stelMinZoomIn();
window.addEventListener('resize', stelMinZoomIn);

// 4. Iconen per type locatie
const iconen = {
  boerderij: L.divIcon({
    html: '<img src="/img/boerderij.png" width="55" height="55">',
    iconSize: [55, 55],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
    className: ''
  }),
  horeca: L.divIcon({
    html: '<img src="/img/restaurant.png" width="55" height="55">',
    iconSize: [55, 55],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
    className: ''
  }),
  natuurgebieden: L.divIcon({
    html: '<img src="/img/grutto.png" width="55" height="55">',
    iconSize: [55, 55],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
    className: ''
  }),
  uitkijkpunten: L.divIcon({
    html: '<img src="/img/natuurherstel.png" width="55" height="55">',
    iconSize: [55, 55],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
    className: ''
  }),
  kerk: L.divIcon({
    html: '<img src="/img/kerk.png" width="55" height="55">',
    iconSize: [55, 55],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
    className: ''
  }),
  pont: L.divIcon({
    html: '<img src="/img/pont.png" width="35" height="35">',
    iconSize: [35, 35],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
    className: ''
  })
};

// 5. Locaties
const locaties = [
  {
    naam: "Boerderij Polderzicht",
    type: "boerderij",
    themas: ["Weidevogels", "Duurzame landbouw"],
    activiteiten: ["Rondleidingen"],
    producten: ["Kaas", "Melk"],
    coords: [52.323, 4.946],
    beschrijving: "Op boerderij Polderzicht werken boer en natuur samen. Met aandacht voor biodiversiteit en weidevogels draagt de boerderij bij aan een groen en levendig Amstelland.",
    fotos: ["/img/boerderij-polderzicht.jpg", "/img/werpspel-polderzicht.jpg"],
    quiz: {
      vraag: "Wat maakt Boerderij Polderzicht bijzonder?",
      antwoorden: [
        "A) Er worden alleen schapen gehouden",
        "B) De boerderij werkt aan meer biodiversiteit en bescherming van weidevogels",
        "C) De boerderij produceert tropisch fruit",
        "D) Er zijn geen dieren op de boerderij"
      ],
      correct: 1
    }
  },
  {
    naam: "Boerderij de grazige weide",
    type: "boerderij",
    themas: ["Weidevogels", "Duurzame landbouw"],
    activiteiten: ["Rondleidingen"],
    producten: ["Kaas", "Melk"],
    coords: [52.288, 4.920],
    beschrijving: "Op De Grazige Weide zorgt Vincent Post samen met zijn familie voor zo'n 60 melkkoeien. De boerderij staat voor duurzame landbouw, met aandacht voor biodiversiteit, gezonde graslanden en een goede balans tussen natuur en voedselproductie.",
    fotos: ["/img/boerderij-grazige-weide.png", "/img/boerderij-grazige-weide2.jpg"],
    quiz: {
      vraag: "Waarom zijn kruidenrijke graslanden belangrijk op De Grazige Weide?",
      antwoorden: [
        "A) Ze zorgen voor meer biodiversiteit en insecten ",
        "B) Ze maken het gras altijd langer",
        "C) Ze voorkomen regenval",
        "D) Ze zorgen ervoor dat koeien minder drinken"
      ],
      correct: 0
    }
  },
  {
    naam: "Boerderij Vredebest",
    type: "boerderij",
    themas: ["Weidevogels", "Duurzame landbouw"],
    activiteiten: ["Rondleidingen"],
    producten: ["Kaas", "Melk"],
    coords: [52.317, 4.965],
    beschrijving: "Bas en Gerard Timmer geloven dat natuur en landbouw elkaar versterken. Op hun boerderij werken zij aan biodiversiteit, gezonde graslanden en een leefgebied voor weidevogels. Zo produceren ze voedsel met aandacht voor de natuur om hen heen.",
    fotos: ["/img/boerderij-vredebest.jpg", "/img/boerderij-vredebest2.jpg"],
    quiz: {
      vraag: "Waarom vinden Bas en Gerard de 'korte keten' zo belangrijk?",
      antwoorden: [
        "A) Hierdoor hoeven koeien minder ver te lopen",
        "B) Hierdoor kunnen boeren meer machines gebruiken",
        "C) Hierdoor worden bewoners uit de omgeving betrokken bij natuur en landbouw ",
        "D) Hierdoor groeit het gras sneller"
      ],
      correct: 2
    }
  },
  {
    naam: "Het poldernest",
    type: "uitkijkpunten",
    themas: ["Biodiversiteit"],
    activiteiten: ["Excursies"],
    producten: [],
    coords: [52.319, 4.958],
    beschrijving: "Beklim Het Poldernest en geniet van een prachtig uitzicht over de Ronde Hoep. Vanaf de 18 meter hoge toren zie je het karakteristieke polderlandschap, de vele sloten en met een beetje geluk zelfs weidevogels in de verte.",
    fotos: ["/img/uitkijktoren.jpg", "/img/uitkijktoren2.jpg"],
    quiz: {
      vraag: "Waarom heet deze uitkijktoren Het Poldernest?",
      antwoorden: [
        "A) Omdat er bovenin een vogelnest is gebouwd",
        "B) Omdat de toren midden in een vogelrijk poldergebied staat ",
        "C) Omdat de toren de vorm heeft van een nest",
        "D) Omdat er alleen in het voorjaar vogels te zien zijn"
      ],
      correct: 1
    }
  },
  {
    naam: "Sint-Urbanuskerk van Nes aan de Amstel",
    type: "kerk",
    themas: ["Biodiversiteit"],
    activiteiten: ["Excursies"],
    producten: [],
    coords: [52.293, 4.910],
    beschrijving: "De Sint-Urbanuskerk is een van de bekendste herkenningspunten van het Amstelland. Met haar opvallende toren steekt de kerk al meer dan 130 jaar boven het polderlandschap uit. Vanaf de Amstel is de kerk van verre te zien en vormt zij een bijzonder stukje geschiedenis midden in de natuur.",
    fotos: ["/img/kerk-urbanus.jpg", "/img/kerk-urbanus2.jpg"],
    quiz: {
      vraag: "Hoeveel Urbanuskerken zijn er in het Amstelland?",
      antwoorden: [
        "A) 2",
        "B) 3",
        "C) 4",
        "D) 5"
      ],
      correct: 2
    }
  },
  {
    naam: "Pontveer Fuut",
    type: "pont",
    themas: ["Biodiversiteit"],
    activiteiten: ["Excursies"],
    producten: [],
    coords: [52.299, 4.923],
    beschrijving: "De pontjes van het Amstelland verbinden fiets- en wandelroutes aan beide kanten van de Amstel. Al jarenlang helpen ze bezoekers om het polderlandschap op een bijzondere manier te ontdekken, vanaf het water én vanaf de dijken.",
    fotos: ["/img/pontveer.jpg", "/img/pontveer2.png"],
    quiz: {
      vraag: "Hoe steken de meeste pontjes in het Amstelland de rivier over?",
      antwoorden: [
        "A) Met een elektrische motor",
        "B) Door stroming van de rivier",
        "C) Met zonnepanelen op het dak",
        "D) Met behulp van een kabelverbinding"
      ],
      correct: 3
    }
  },
  {
    naam: "De voetangel",
    type: "horeca",
    themas: ["Duurzame landbouw"],
    activiteiten: ["Proeverijen"],
    producten: ["Kaas"],
    coords: [52.312, 4.970],
    beschrijving: "Restaurant met streekproducten uit het Amstelgebied.",
    fotos: ["/img/restaurant-voetangel.jpg", "/img/restaurant-voetangel2.png"],
    quiz: {
      vraag: "Wat serveert De Voetangel?",
      antwoorden: [
        "A) Alleen buitenlands eten",
        "B) Streekproducten uit het Amstelgebied",
        "C) Alleen frisdrank",
        "D) Fastfood"
      ],
      correct: 1
    }
  },
  {
    naam: "Weidenvogel nesten",
    type: "natuurgebieden",
    themas: ["Natuurherstel", "Weidevogels"],
    activiteiten: ["Excursies", "Vrijwilligerswerk"],
    producten: [],
    coords: [52.305, 4.948],
    beschrijving: "De weidevogels worden beschermd en hier kunnen ze veilig broeden.",
    fotos: ["/img/grutto-nesten.jpg", "/img/grutto-nesten2.jpg"],
    quiz: {
      vraag: "Waarom is dit gebied belangrijk?",
      antwoorden: [
        "A) Er worden auto's gemaakt",
        "B) Weidevogels kunnen hier veilig broeden",
        "C) Het is een pretpark",
        "D) Er is een winkelcentrum"
      ],
      correct: 1
    }
  }
];

// 5b. Startpunten van de route
const startpunten = [
  {
    naam: "Fietsroute De Ronde Hoep",
    coords: [52.300, 4.935],
    afstand: "16 km",
    thema: "vogels, natuur",
    duur: "60 min",
    knooppunten: "9"
  }
  // later: meer startpunten hier toevoegen
];

// 6. Markers aanmaken en opslaan
const markerLijst = [];

locaties.forEach(loc => {
  const marker = L.marker(loc.coords, { icon: iconen[loc.type] })
    .addTo(kaart);

  marker.on('click', function () {
    openLocatiePanel(loc);
  });

  markerLijst.push({ marker, loc });
});

// 6b. Startpunt-markers aanmaken (verborgen totdat route-filter actief is)
const startpuntMarkerLijst = [];

startpunten.forEach(punt => {
  const marker = L.marker(punt.coords, { icon: startpuntIcoon });

  marker.on('click', function () {
    openRouteInfoPanel(punt);
  });

  startpuntMarkerLijst.push(marker);
});

// 7. Locatie panel openen en vullen
function openLocatiePanel(loc) {
  const panel = document.querySelector('.boeren-info');
  if (!panel) return;

  panel.querySelector('[data-veld="naam"]').textContent = loc.naam;
  panel.querySelector('[data-veld="beschrijving"]').textContent = loc.beschrijving;

  const fotoContainer = panel.querySelector('[data-veld="fotos"]');
  fotoContainer.innerHTML = '';
  (loc.fotos || []).forEach(function (src) {
    const img = document.createElement('img');
    img.src = src;
    img.alt = loc.naam;
    fotoContainer.appendChild(img);
  });

  const quizVraag = panel.querySelector('[data-veld="quiz-vraag"]');
  const quizAntwoorden = panel.querySelector('[data-veld="quiz-antwoorden"]');
  quizVraag.textContent = loc.quiz.vraag;
  quizAntwoorden.innerHTML = '';

  loc.quiz.antwoorden.forEach(function (antwoord, index) {
    const btn = document.createElement('button');
    btn.textContent = antwoord;
    btn.addEventListener('click', function () {
      document.querySelectorAll('[data-veld="quiz-antwoorden"] button').forEach(function (b) {
        b.classList.remove('correct', 'fout');
      });
      btn.classList.add(index === loc.quiz.correct ? 'correct' : 'fout');

      if (quizTimer) clearTimeout(quizTimer);
      quizTimer = setTimeout(function () {
        document.querySelectorAll('[data-veld="quiz-antwoorden"] button').forEach(function (b) {
          b.classList.remove('correct', 'fout');
        });
        quizTimer = null;
      }, 2000);
    });
    quizAntwoorden.appendChild(btn);
  });

  panel.classList.add('open');
}

// 7b. Route-info panel openen en vullen
function openRouteInfoPanel(punt) {
  const panel = document.querySelector('.route-info');
  if (!panel) return;

  panel.querySelector('[data-veld="naam"]').textContent = punt.naam;
  panel.querySelector('[data-veld="afstand"]').textContent = punt.afstand;
  panel.querySelector('[data-veld="thema"]').textContent = punt.thema;
  panel.querySelector('[data-veld="duur"]').textContent = punt.duur;
  panel.querySelector('[data-veld="knooppunten"]').textContent = punt.knooppunten;

  panel.setAttribute('aria-hidden', 'false');
  panel.classList.add('open');
}

// 8. Filter logica
function updateMarkers() {
  const geselecteerd = [...document.querySelectorAll('input[name="filter"]:checked')]
    .map(cb => cb.value);

  const routeActief = geselecteerd.map(v => v.toLowerCase().trim()).includes('route');

  // Route overlay aan/uit
  if (routeActief) {
    routeOverlay.addTo(kaart);
  } else {
    routeOverlay.remove();
  }

  // Startpunt-markers aan/uit (samen met de route)
  startpuntMarkerLijst.forEach(marker => {
    if (routeActief) {
      marker.addTo(kaart);
    } else {
      marker.remove();
    }
  });

  markerLijst.forEach(({ marker, loc }) => {
    if (geselecteerd.length === 0) {
      marker.addTo(kaart);
      return;
    }

    const alleWaarden = [
      loc.type,
      ...(loc.themas || []),
      ...(loc.activiteiten || []),
      ...(loc.producten || [])
    ].map(v => v.toLowerCase().trim());

    const match = geselecteerd.some(filter =>
      alleWaarden.includes(filter.toLowerCase().trim())
    );

    if (match) {
      marker.addTo(kaart);
    } else {
      marker.remove();
    }
  });
}

document.querySelectorAll('input[name="filter"]').forEach(checkbox => {
  checkbox.addEventListener('change', updateMarkers);
});

// 9. Locatie panel sluiten
const sluitBtn = document.getElementById('sluitLocatiePanel');

if (sluitBtn) {
  sluitBtn.addEventListener('click', function () {
    document.querySelector('.boeren-info').classList.remove('open');
  });
}

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    document.querySelector('.boeren-info').classList.remove('open');

    const routePanel = document.querySelector('.route-info');
    if (routePanel) {
      routePanel.classList.remove('open');
      routePanel.setAttribute('aria-hidden', 'true');
    }
  }
});

// 9b. Route-info panel sluiten
const sluitRouteInfoBtn = document.querySelector('.sluit-route-info');

if (sluitRouteInfoBtn) {
  sluitRouteInfoBtn.addEventListener('click', function () {
    const panel = document.querySelector('.route-info');
    sluitRouteInfoBtn.blur(); // focus eerst weghalen
    panel.classList.remove('open');
    panel.setAttribute('aria-hidden', 'true');
  });
}

// 10. Pop-up verschuiving op desktop
const navEl = document.querySelector('nav');
const kaartEl = document.getElementById('kaart');

document.querySelectorAll('[data-popup]').forEach(link => {
  link.addEventListener('click', () => {
    if (navEl) navEl.classList.add('nav-verschoven');
    if (kaartEl) kaartEl.classList.add('kaart-verschoven');
  });
});

document.querySelectorAll('.sluit-popup').forEach(knop => {
  knop.addEventListener('click', () => {
    if (navEl) navEl.classList.remove('nav-verschoven');
    if (kaartEl) kaartEl.classList.remove('kaart-verschoven');
  });
});

// 11. Kaart herberekenen bij grootteverandering (na pop-up open/dicht)
if (kaartEl) {
  kaartEl.addEventListener('transitionend', function (e) {
    if (e.propertyName === 'width') {
      kaart.invalidateSize();
      vulContainer();
    }
  });
}