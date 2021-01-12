import Scrollspy from '../../node_modules/bootstrap/js/src/scrollspy.js'

if (window.Joomla) {
  window.Joomla.Bootstrap = window.Joomla.Bootstrap || {};
  window.Joomla.Bootstrap.Methods = window.Joomla.Bootstrap.Methods || {};
  window.Joomla.Bootstrap.Instances = window.Joomla.Bootstrap.Instances || {};
  window.Joomla.Bootstrap.Methods.Scrollspy = Scrollspy;

  const scrollspys= Joomla.getOptions('bootstrap.scrollspy');

  if (scrollspys && scrollspys.length) {
    window.Joomla.Bootstrap.Instances.Scrollspy = new WeakMap();

    scrollspys.forEach((selector) => {
      const scrollspy = document.querySelectorAll(selector);

      if (scrollspy) {
        const instance = new Joomla.Bootstrap.Methods.Scrollspy(scrollspy);
        window.Joomla.Bootstrap.Instances.Scrollspy.set(scrollspy, instance);
      }
    });
  }
}

export default Scrollspy
