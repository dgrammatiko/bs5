import Carousel from '../../node_modules/bootstrap/js/src/carousel.js'

if (window.Joomla) {
  window.Joomla.Bootstrap = window.Joomla.Bootstrap || {};
  window.Joomla.Bootstrap.Methods = window.Joomla.Bootstrap.Methods || {};
  window.Joomla.Bootstrap.Instances = window.Joomla.Bootstrap.Instances || {};
  window.Joomla.Bootstrap.Methods.Carousel = Carousel;
  window.Joomla.Bootstrap.Instances.Carousel = new WeakMap();

  const carousels = Joomla.getOptions('bootstrap.carousel');

  if (carousels) {
    Object.keys(carousels).forEach((carousel) => {
      const carouselElements = Array.from(document.querySelectorAll(carousel));
      const options = {
        interval: carousels[carousel].interval ? carousels[carousel].interval : 5000,
        pause: carousels[carousel].pause ? carousels[carousel].pause : 'hover',
      };

      if (carouselElements) {
        carouselElementa.map((el) => window.Joomla.Bootstrap.Instances.Carousel.set(el, new window.Joomla.Bootstrap.Methods.Carousel(el, options)));
      }
    });
  }
}

export default Carousel
