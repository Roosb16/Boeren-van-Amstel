// Oogje om wachtwoord zichtbaar te maken
const toggles = document.querySelectorAll('.toggle-wachtwoord')
toggles.forEach(toggle => {
  toggle.addEventListener('click', function () {
    const wrapper = this.parentElement
    const input = wrapper.querySelector('input')
    const img = this.querySelector('img')
    if (input.type === 'password') {
      input.type = 'text'
      img.src = '/img/oog-open.png'
    } else {
      input.type = 'password'
      img.src = '/img/oog-dicht.png'
    }
  })
})