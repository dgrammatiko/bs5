import Collapse from '../../node_modules/bootstrap/js/src/collapse.js'

if (window.Joomla) {
  window.Joomla.Bootstrap = window.Joomla.Bootstrap || {};
  window.Joomla.Bootstrap.Methods = window.Joomla.Bootstrap.Methods || {};
  window.Joomla.Bootstrap.Instances = window.Joomla.Bootstrap.Instances || {};
  window.Joomla.Bootstrap.Methods.Collapse = Collapse;

  const collapses= Joomla.getOptions('bootstrap.collapse');
  if (collapses.length) {
    window.Joomla.Bootstrap.Instances.Collapse = new WeakMap();
    collapses.forEach((selector) => {
      const collapse = document.querySelectorAll(selector);
      if (collapse) {
        const instance = new Joomla.Bootstrap.Methods.Collapse(collapse);
        window.Joomla.Bootstrap.Instances.Collapse.set(collapse, instance);
      }
    });
  }
}

export default Collapse
