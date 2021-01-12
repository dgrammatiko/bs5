import Carousel from '../../node_modules/bootstrap/js/src/carousel.js'

if (window.Joomla) {
  window.Joomla.Bootstrap = window.Joomla.Bootstrap || {};
  window.Joomla.Bootstrap.Methods = window.Joomla.Bootstrap.Methods || {};
  window.Joomla.Bootstrap.Instances = window.Joomla.Bootstrap.Instances || {};
  window.Joomla.Bootstrap.Methods.Carousel = Carousel;
  window.Joomla.Bootstrap.Instances.Carousel = new WeakMap();

  const carousels = Joomla.getOptions('bootstrap.carousel');

  if (carousels) {
    for (const carousel in carousels) {
      const carouselElement = document.querySelector(carousel);

      if (carouselElement) {
        const instance = new Joomla.Bootstrap.Methods.Carousel(
          carouselElement,
          {
            interval: carousels[carousel].interval ? carousels[carousel].interval : 5000,
            pause: carousels[carousel].pause ? carousels[carousel].pause : 'hover'
          });
        window.Joomla.Bootstrap.Instances.Carousel.set(carousel, instance);
      }
    }
  }
}

export default Carousel
