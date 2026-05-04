const initSlider = async () => {
  const sliderContainer = document.querySelector('.day-products__slider')
  const sliderList = document.querySelector('.day-products__list')
  const prevBtn = document.querySelector('.day-products__navigation-btn--prev')
  const nextBtn = document.querySelector('.day-products__navigation-btn--next')

  if (!sliderContainer || !sliderList) {
    return
  }

  const createProductCard = (product) => {
    const newPrice = product.price.new.toLocaleString('ru-RU')
    const oldPrice = product.price.old.toLocaleString('ru-RU')

    return `
    <li class="day-products__item swiper-slide">
      <div class="product-card product-card--small" data-id=${product.id}>
        <div class="product-card__visual">
          <img class="product-card__img" src="${product.image}" height="344" width="290"
                alt="Изображение товара">
          <div class="product-card__more">
            <a href="#" class="product-card__link btn btn--icon btn--add-to-basket">
              <span class="btn__text">В корзину</span>
              <svg width="24" height="24" aria-hidden="true">
                <use xlink:href="images/sprite.svg#icon-basket"></use>
              </svg>
            </a>
            <a href="#" class="product-card__link btn btn--secondary">
              <span class="btn__text">Подробнее</span>
            </a>
          </div>
        </div>
        <div class="product-card__info">
          <h2 class="product-card__title">${product.name}</h2>
          <span class="product-card__old">
            <span class="product-card__old-number">${oldPrice}</span>
            <span class="product-card__old-add">₽</span>
          </span>
          <span class="product-card__price">
            <span class="product-card__price-number">${newPrice}</span>
            <span class="product-card__price-add">₽</span>
          </span>
          <div class="product-card__tooltip tooltip">
            <button class="tooltip__btn" aria-label="Показать подсказку">
              <svg class="tooltip__icon" width="5" height="10" aria-hidden="true">
                <use xlink:href="images/sprite.svg#icon-i"></use>
              </svg>
            </button>
            <div class="tooltip__content">
              <span class="tooltip__text">Наличие товара по городам:</span>
              <ul class="tooltip__list">
                <li class="tooltip__item">
                  <span class="tooltip__text">Москва: <span class="tooltip__count">454</span></span>
                </li>
                <li class="tooltip__item">
                  <span class="tooltip__text">Оренбург: <span class="tooltip__count">381</span></span>
                </li>
                <li class="tooltip__item">
                  <span class="tooltip__text">Санкт-Петербург: <span class="tooltip__count">15</span></span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      </li>
    `
  }

  try {
    const response = await fetch('../../data/data.json')
    const products = await response.json()

    const daysProducts = products.filter(product => product.goodsOfDay === true)

    sliderList.innerHTML = ''

    if (daysProducts.length) {
      daysProducts.forEach(product => {
        const card = createProductCard(product)

        sliderList.insertAdjacentHTML('beforeend', card)
      });
    }

    const basketBtns = sliderList.querySelectorAll('.btn--add-to-basket')
    basketBtns.forEach(btn => {
    btn.addEventListener('click', (evt) => {
      evt.preventDefault()

      const card = btn.closest('.product-card')
      const productData = {
        id: Number(card.dataset.id),
        name: card.querySelector('.product-card__title').textContent,
        price: Number(card.querySelector('.product-card__price-number').textContent.replace(/\s/g, "")),
        image: card.querySelector('.product-card__img').src
      }

      const event = new CustomEvent('add-to-basket', {
        detail: { product: productData }
      })
      document.dispatchEvent(event)
    })
  })

    new Swiper(sliderContainer, {
      slidesPerView: 4,
      spaceBetween: 30,
      navigation: {
        prevEl: prevBtn,
        nextEl: nextBtn,
      },
    })
  }

  catch (error) {
    console.error('Не удалось получить данные о товарах: ', error)
  }
}

export { initSlider }
