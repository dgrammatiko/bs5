import Scrollspy from '../../node_modules/bootstrap/js/src/scrollspy.js'

if (Joomla) {
  Joomla.Bootstrap = Joomla.Bootstrap || {};
  Joomla.Bootstrap.Methods = Joomla.Bootstrap.Methods || {};
  Joomla.Bootstrap.Instances = Joomla.Bootstrap.Instances || {};
  Joomla.Bootstrap.Methods.Scrollspy = Scrollspy;
  Joomla.Bootstrap.Instances.Scrollspy = new WeakMap();

  const scrollspys= Joomla.getOptions('bootstrap.scrollspy');

  if (scrollspys) {
      Object.keys(scrollspys).forEach((scrollspy) => {
      const scrollspyElements = Array.from(document.querySelector(scrollspy));

      if (scrollspyElements.length) {
        scrollspyElements.map((el) => Joomla.Bootstrap.Instances.Scrollspy.set(el, new Joomla.Bootstrap.Methods.Scrollspy(el, scrollspys[scrollspy])));
      }
    });
  }
}

export default Scrollspy
