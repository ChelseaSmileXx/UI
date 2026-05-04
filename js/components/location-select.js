const initLocationSelect = () => {
  const locationBtn = document.querySelector('.location__city')
  const locationSublist = document.querySelector('.location__sublist')
  const locationCityName = document.querySelector('.location__city-name')
  const locationSubitems = document.querySelectorAll('.location__subitem')

  if (!locationBtn || !locationSublist || !locationCityName || !locationSubitems) {
    return
  }

  const ACTIVE_CLASS = 'location__city--active'

  const toggleSublist = (evt) => {
    evt.stopPropagation()
    locationBtn.classList.toggle(ACTIVE_CLASS)
  }

  const selectCity = (evt) => {
    const selectedCity = evt.target.textContent
    locationCityName.textContent = selectedCity
    locationBtn.classList.remove(ACTIVE_CLASS)
  }

  const outsideClick = (evt) => {
    if (!locationBtn.classList.contains(ACTIVE_CLASS)) {
      return
    }

    if (!locationBtn.contains(evt.target) && !locationSublist.contains(evt.target)) {
      locationBtn.classList.remove(ACTIVE_CLASS)
    }
  }

  locationBtn.addEventListener('click', toggleSublist)
  locationSubitems.forEach(item => {
    item.addEventListener('click', selectCity)
  })

  document.addEventListener('click', outsideClick)

}

export { initLocationSelect }
