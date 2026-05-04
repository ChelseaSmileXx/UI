const initBurgerMenu = () => {
  const openMenuBtn = document.querySelector('.header__catalog-btn')
  const burgerMenu = document.querySelector('.header__catalog')
  const closeMenuBtn = document.querySelector('.main-menu__close')
  const menuOverlay = document.querySelector('.main-menu__overlay')

  if (!openMenuBtn || !burgerMenu || !closeMenuBtn || !menuOverlay) {
    return
  }

  const ACTIVE_CLASS = 'main-menu--active'

  const openMenu = (evt) => {
    evt.stopPropagation()
    burgerMenu.classList.add(ACTIVE_CLASS)
  }

  const closeMenu = () => {
    burgerMenu.classList.remove(ACTIVE_CLASS)
  }


  openMenuBtn.addEventListener('click', openMenu)
  menuOverlay.addEventListener('click', closeMenu)
  closeMenuBtn.addEventListener('click', closeMenu)
}

export { initBurgerMenu }
