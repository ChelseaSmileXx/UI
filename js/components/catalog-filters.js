import { renderProducts } from "./catalog-render.js"

const initCatalogFilters = async () => {
  const filterForm = document.querySelector('.catalog-form')
  const catalogList = document.querySelector('.catalog__list')
  const catalogSort = document.querySelector('.catalog__sort-select')

  const countSpans = {
    pendant: document.querySelector('.custom-checkbox--pendant .custom-checkbox__count'),
    ceiling: document.querySelector('.custom-checkbox--ceiling .custom-checkbox__count'),
    overhead: document.querySelector('.custom-checkbox--overhead .custom-checkbox__count'),
    point: document.querySelector('.custom-checkbox--point .custom-checkbox__count'),
    nightlights: document.querySelector('.custom-checkbox--nightlights .custom-checkbox__count'),
  }

  const typeCheckboxes = {
    pendant: document.querySelector('#pendant'),
    ceiling: document.querySelector('#ceiling'),
    overhead: document.querySelector('#overhead'),
    point: document.querySelector('#point'),
    nightlights: document.querySelector('#nightlights'),
  }

  const statusRadios = {
    instock: document.querySelector('#instock'),
    all: document.querySelector('#all-item'),
  }

  if (!filterForm || !catalogList || !catalogSort) {
    return
  }

  try {
    const response = await fetch('../../data/data.json')
    const products = await response.json()

    const updateCounts = () => {
      const counts = {
        pendant: 0,
        ceiling: 0,
        overhead: 0,
        point: 0,
        nightlights: 0,
      }

      products.forEach(product => {
        product.type.forEach(type => {
          if (counts.hasOwnProperty(type)) {
            counts[type]++
          }
        })
      })

      for (const type in countSpans) {
        if (countSpans[type]) {
          countSpans[type].textContent = counts[type]
        }
      }
    }

    const filterProducts = () => {
      const selectedTypes = []
      for (const type in typeCheckboxes) {
        if (typeCheckboxes[type] && typeCheckboxes[type].checked) {
          selectedTypes.push(type)
        }
      }

      const showOnlyInStock = statusRadios.instock && statusRadios.instock.checked

      return products.filter(product => {
        if (selectedTypes.length > 0) {
          if (!product.type.some(type => selectedTypes.includes(type))) {
            return false
          }
        }

        if (showOnlyInStock) {
          if (product.availability.moscow === 0 && product.availability.orenburg === 0 && product.availability.saintPetersburg === 0) {
            return false
          }
        }

        return true
      })
    }

    const sortProducts = (products) => {
      const sortValue = catalogSort.value
      const sortedProducts = [...products]

      switch (sortValue) {
        case 'price-min':
          sortedProducts.sort((a, b) => a.price.new - b.price.new)
          break
        case 'price-max':
          sortedProducts.sort((a, b) => b.price.new - a.price.new)
          break
        case 'rating-max':
          sortedProducts.sort((a, b) => a.rating.new - b.rating.new)
          break
      }

      return sortedProducts
    }


    const onFilterChange = () => {
      const filteredProducts = filterProducts()
      const sortedProducts = sortProducts(filteredProducts)
      renderProducts(sortedProducts, catalogList)
    }

    const onFormReset = () => {
      setTimeout(() => {
        onFilterChange()
      }, 0);
    }


    filterForm.addEventListener('reset', onFormReset)

    for (const type in typeCheckboxes) {
      if (typeCheckboxes[type]) {
        typeCheckboxes[type].addEventListener('change', onFilterChange)
      }
    }

    for (const radio in statusRadios) {
      if (statusRadios[radio]) {
        statusRadios[radio].addEventListener('change', onFilterChange)
      }
    }

    catalogSort.addEventListener('change', onFilterChange)

    updateCounts()
    renderProducts(products, catalogList)

  } catch (error) {
    console.error('Ошибка загрузки товаров: ', error)
  }


}

export { initCatalogFilters }
