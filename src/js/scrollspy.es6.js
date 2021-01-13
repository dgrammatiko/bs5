import Scrollspy from '../../node_modules/bootstrap/js/src/scrollspy.js'

if (window.Joomla) {
  window.Joomla.Bootstrap = window.Joomla.Bootstrap || {};
  window.Joomla.Bootstrap.Methods = window.Joomla.Bootstrap.Methods || {};
  window.Joomla.Bootstrap.Instances = window.Joomla.Bootstrap.Instances || {};
  window.Joomla.Bootstrap.Methods.Scrollspy = Scrollspy;
  window.Joomla.Bootstrap.Instances.Scrollspy = new WeakMap();

  const scrollspys= Joomla.getOptions('bootstrap.scrollspy');

  if (scrollspys) {
      Object.keys(scrollspys).forEach((scrollspy) => {
      const scrollspyElements = Array.from(document.querySelector(scrollspy));

      if (scrollspyElements.length) {
        scrollspyElements.map((el) => window.Joomla.Bootstrap.Instances.Scrollspy.set(el, new window.Joomla.Bootstrap.Methods.Scrollspy(el, scrollspys[scrollspy])));
      }
    });
  }
}

export default Scrollspy
