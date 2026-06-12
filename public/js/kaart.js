// 1. Grenzen van het Amstelgebied
const grenzen = [[52.26, 4.85], [52.36, 5.05]];

// 2. Kaart initialiseren
const kaart = L.map('kaart', {
  minZoom: 13,
  maxZoom: 17,
  maxBounds: grenzen,
  maxBoundsViscosity: 1.0
}).setView([52.303, 4.940], 13);

// 3. Eigen afbeelding als achtergrond
L.imageOverlay('/img/amstel-kaart.jpg', grenzen).addTo(kaart);
kaart.fitBounds(grenzen, { padding: [0, 0] });

// 4. Iconen per type locatie
const iconen = {
  boerderij: L.divIcon({
    html: '<img src="/img/boerderij.png" width="55" height="55">',
    iconSize: [50, 50],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
    className: ''
  }),
  horeca: L.divIcon({
    html: '<img src="/img/bedrijf.png" width="55" height="55">',
    iconSize: [50, 50],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
    className: ''
  }),
  natuurgebieden: L.divIcon({
    html: '<img src="/img/grutto.png" width="55" height="55">',
    iconSize: [50, 50],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
    className: ''
  }),
  uitkijkpunten: L.divIcon({
    html: '<img src="/img/natuurherstel.png" width="55" height="55">',
    iconSize: [50, 50],
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
    coords: [52.320, 4.946],
    beschrijving: "Melkveehouderij aan de Amsteldijk"
  },
  {
    naam: "Boerderij de grazige weide",
    type: "boerderij",
    themas: ["Weidevogels", "Duurzame landbouw"],
    activiteiten: ["Rondleidingen"],
    producten: ["Kaas", "Melk"],
    coords: [52.270, 4.915],
    beschrijving: "Melkveehouderij aan de Amsteldijk"
  },
  {
    naam: "Boerderij Vredebest",
    type: "boerderij",
    themas: ["Weidevogels", "Duurzame landbouw"],
    activiteiten: ["Rondleidingen"],
    producten: ["Kaas", "Melk"],
    coords: [52.313, 4.968],
    beschrijving: "Melkveehouderij aan de Amsteldijk"
  },
  {
    naam: "Uitkijk toren",
    type: "uitkijkpunten",
    themas: ["Biodiversiteit"],
    activiteiten: ["Excursies"],
    producten: [],
    coords: [52.316, 4.960],
    beschrijving: "Kijk over het Amstelgebied en spot vogels"
  },
  {
    naam: "De voetangel",
    type: "horeca",
    themas: ["Duurzame landbouw"],
    activiteiten: ["Proeverijen"],
    producten: ["Kaas"],
    coords: [52.303, 4.976],
    beschrijving: "Restaurant met streekproducten uit het Amstelgebied"
  },
  {
    naam: "Weidenvogel nesten",
    type: "natuurgebieden",
    themas: ["Natuurherstel", "Weidevogels"],
    activiteiten: ["Excursies", "Vrijwilligerswerk"],
    producten: [],
    coords: [52.298, 4.952],
    beschrijving: "De weidenvogels worden beschermd en hier kunnen ze veilig broeden"
  }
];

// 6. Markers aanmaken en opslaan
const markerLijst = [];

locaties.forEach(loc => {
  const marker = L.marker(loc.coords, { icon: iconen[loc.type] })
    .bindPopup(`
      <strong>${loc.naam}</strong><br>
      ${loc.beschrijving}
    `)
    .addTo(kaart);

  markerLijst.push({ marker, loc });
});

// 7. Filter logica
function updateMarkers() {
  const geselecteerd = [...document.querySelectorAll('input[name="filter"]:checked')]
    .map(cb => cb.value);

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