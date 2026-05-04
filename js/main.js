import { initAccordion } from "./components/accordion.js";
import { initBasket } from "./components/basket.js";
import { initBurgerMenu } from "./components/burger-menu.js";
import { initCatalogFilters } from "./components/catalog-filters.js";
import { initFormValidation } from "./components/form-validation.js";
import { initLocationSelect } from "./components/location-select.js";
import { initSlider } from "./components/slider.js";

window.addEventListener('DOMContentLoaded', () => {
  initBurgerMenu()
  initLocationSelect()
  initCatalogFilters()
  initBasket()
  initAccordion()
  initSlider()
  initFormValidation()
});
