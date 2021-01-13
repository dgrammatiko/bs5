import Carousel from '../../node_modules/bootstrap/js/src/carousel.js'

if (Joomla) {
  Joomla.Bootstrap = Joomla.Bootstrap || {};
  Joomla.Bootstrap.Methods = Joomla.Bootstrap.Methods || {};
  Joomla.Bootstrap.Instances = Joomla.Bootstrap.Instances || {};
  Joomla.Bootstrap.Methods.Carousel = Carousel;
  Joomla.Bootstrap.Instances.Carousel = new WeakMap();

  const carousels = Joomla.getOptions('bootstrap.carousel');

  if (carousels) {
    Object.keys(carousels).forEach((carousel) => {
      const carouselElements = Array.from(document.querySelectorAll(carousel));
      const options = {
        interval: carousels[carousel].interval ? carousels[carousel].interval : 5000,
        pause: carousels[carousel].pause ? carousels[carousel].pause : 'hover',
      };

      if (carouselElements) {
        carouselElementa.map((el) => Joomla.Bootstrap.Instances.Carousel.set(el, new Joomla.Bootstrap.Methods.Carousel(el, options)));
      }
    });
  }
}

export default Carousel
