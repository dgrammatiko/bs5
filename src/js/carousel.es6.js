import Carousel from '../../node_modules/bootstrap/js/src/carousel.js'

if (window.Joomla) {
  window.Joomla.Bootstrap = window.Joomla.Bootstrap || {};
  window.Joomla.Bootstrap.Methods = window.Joomla.Bootstrap.Methods || {};
  window.Joomla.Bootstrap.Instances = window.Joomla.Bootstrap.Instances || {};
  window.Joomla.Bootstrap.Methods.Carousel = Carousel;

  const carousels= Joomla.getOptions('bootstrap.carousel');
  if (carousels.length) {
    window.Joomla.Bootstrap.Instances.Carousel = new WeakMap();
    carousels.forEach((selector) => {
      const carousel = document.querySelectorAll(selector);
      if (carousel) {
        const instance = new Joomla.Bootstrap.Methods.Carousel(carousel);
        window.Joomla.Bootstrap.Instances.Carousel.set(carousel, instance);
      }
    });
  }
}

export default Carousel
