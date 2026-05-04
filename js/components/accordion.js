const initAccordion = () => {
  const accordionBtns = document.querySelectorAll('.accordion__btn')

  if (!accordionBtns.length) {
    return
  }

  const ACTIVE_CLASS = 'accordion__btn--active'

  accordionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const isActive = btn.classList.contains(ACTIVE_CLASS)

      accordionBtns.forEach(btn => {
        btn.classList.remove(ACTIVE_CLASS)
      })

      if (!isActive) {
        btn.classList.add(ACTIVE_CLASS)
      }
    })
  })
}

export { initAccordion }
