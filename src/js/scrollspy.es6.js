import Scrollspy from '../../node_modules/bootstrap/js/src/scrollspy.js'

if (window.Joomla) {
  window.Joomla.Bootstrap = window.Joomla.Bootstrap || {};
  window.Joomla.Bootstrap.Methods = window.Joomla.Bootstrap.Methods || {};
  window.Joomla.Bootstrap.Instances = window.Joomla.Bootstrap.Instances || {};
  window.Joomla.Bootstrap.Methods.Scrollspy = Scrollspy;
  window.Joomla.Bootstrap.Instances.Scrollspy = new WeakMap();

  const scrollspys= Joomla.getOptions('bootstrap.scrollspy');

  if (scrollspys) {
    for (const scrollspy in scrollspys) {
      const scrollspyElement = document.querySelector(scrollspy);

      if (scrollspyElement) {
        const instance = new Joomla.Bootstrap.Methods.Scrollspy(scrollspyElement, scrollspys[scrollspy]);
        window.Joomla.Bootstrap.Instances.Scrollspy.set(scrollspyElement, instance);
      }
    }
  }
}

export default Scrollspy
