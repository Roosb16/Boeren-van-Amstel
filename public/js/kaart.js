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
  bedrijf: L.divIcon({
    html: '<img src="/img/bedrijf.png" width="55" height="55">',
    iconSize: [50, 50],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
    className: ''
  }),
  natuurherstel: L.divIcon({
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
    naam: "Boerderij Langbroek",
    type: "boerderij",
    coords: [52.310, 4.938],
    beschrijving: "Melkveehouderij aan de Amsteldijk"
  },
  {
    naam: "Kaasmakerij Amstel",
    type: "bedrijf",
    coords: [52.298, 4.952],
    beschrijving: "Proeverijen en rondleidingen"
  },
  {
    naam: "Amstelpark",
    type: "natuurherstel",
    coords: [52.305, 4.945],
    beschrijving: "Groen park met speeltuin en tuinen"
  }
];
 
// 6. Markers toevoegen
locaties.forEach(loc => {
  L.marker(loc.coords, { icon: iconen[loc.type] })
    .bindPopup(`
      <strong>${loc.naam}</strong><br>
      ${loc.beschrijving}
    `)
    .addTo(kaart);
});