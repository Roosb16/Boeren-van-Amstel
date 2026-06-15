const zoekInput = document.getElementById('zoekInput')
const zoekResultaten = document.getElementById('zoekResultaten')

zoekInput.addEventListener('input', function () {
  const query = this.value.toLowerCase().trim()
  zoekResultaten.innerHTML = ''

  if (query.length < 2) {
    zoekResultaten.hidden = true
    return
  }

  const gevonden = locaties.filter(loc => {
    const zoekVelden = [
      loc.naam,
      loc.type,
      ...(loc.themas || []),
      ...(loc.activiteiten || []),
      ...(loc.producten || [])
    ].map(v => v.toLowerCase())

    return zoekVelden.some(v => v.includes(query))
  })

  if (gevonden.length === 0) {
    const li = document.createElement('li')
    li.textContent = 'Geen resultaten gevonden'
    li.classList.add('geen-resultaat')
    zoekResultaten.appendChild(li)
  } else {
    gevonden.forEach(loc => {
      const li = document.createElement('li')
      li.innerHTML = `${loc.naam}<span>${loc.type}</span>`
      li.addEventListener('click', function () {
        kaart.setView(loc.coords, 16, { animate: true })
        openLocatiePanel(loc)
        zoekResultaten.hidden = true
        zoekInput.value = loc.naam
      })
      zoekResultaten.appendChild(li)
    })
  }

  zoekResultaten.hidden = false
})

document.addEventListener('click', function (e) {
  if (!e.target.closest('.zoekbalk')) {
    zoekResultaten.hidden = true
  }
})