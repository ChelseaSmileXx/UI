const initBasket = () => {
  const basket = document.querySelector('.basket')
  const basketBtn = document.querySelector('#basketBtn')
  const basketCount = document.querySelector('#basketCount')
  const basketList = document.querySelector('.basket__list')
  const basketEmpty = document.querySelector('.basket__empty-block')
  const basketLink = document.querySelector('.basket__link')

  if (!basket || !basketBtn || !basketList) {
    return
  }

  let basketItems = []

  const ACTIVE_CLASS = 'basket--active'

  const createBasketItemHTML = (item) => {
    const price = item.price.toLocaleString('ru-RU')
    return `
      <li class="basket__item">
        <div class="basket__img">
          <img src="${item.image}" alt="Фотография товара" height="60" width="60">
        </div>
        <span class="basket__name">${item.name}</span>
        <span class="basket__price">${price}</span>
        <button class="basket__item-close" type="button" data-id="${item.id}">
          <svg class="main-menu__icon" width="24" height="24" aria-hidden="true">
            <use xlink:href="images/sprite.svg#icon-close"></use>
          </svg>
        </button>
      </li>
    `
  }



  const saveBasket = () => {
    localStorage.setItem('basket', JSON.stringify(basketItems))
  }

  const updateBasket = () => {
    const totalCount = basketItems.reduce((sum, item) => sum + item.quantity, 0)

    basketCount.textContent = totalCount

    basketList.innerHTML = ''

    if (basketItems.length === 0) {
      basketEmpty.style.display = 'block'
      if (basketLink) basketLink.style.display = 'none'
    } else {
      basketEmpty.style.display = 'none'
      if (basketLink) basketLink.style.display = 'flex'

      basketItems.forEach(item => {
        const itemHTML = createBasketItemHTML(item)
        basketList.insertAdjacentHTML('beforeend', itemHTML)
      })
    }
  }

  const loadBasket = () => {
    const saved = localStorage.getItem('basket')
    if (saved) {
      basketItems = JSON.parse(saved)
    }
    updateBasket()
  }

  const addToBasket = (product) => {
    const existingItem = basketItems.find(item => item.id === product.id)
    if (existingItem) {
      existingItem.quantity += 1
    } else {
      basketItems.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
      })
    }

    saveBasket()
    updateBasket()
  }

  const removeFromBasket = (id) => {
    basketItems = basketItems.filter(item => item.id !== id)

    saveBasket()
    updateBasket()
  }

  const toggleBasket = (evt) => {
    evt.stopPropagation()
    basket.classList.toggle(ACTIVE_CLASS)
  }

  basketList.addEventListener('click', (evt) => {
    const closeBtn = evt.target.closest('.basket__item-close')
    if (closeBtn) {
      const id = Number(closeBtn.dataset.id)
      removeFromBasket(id)
    }
  })

  basketBtn.addEventListener('click', toggleBasket)

  loadBasket()

  document.addEventListener('add-to-basket', (evt) => {
    addToBasket(evt.detail.product)
  })

  return { addToBasket }
}

export { initBasket }
