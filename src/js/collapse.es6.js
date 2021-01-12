import Collapse from '../../node_modules/bootstrap/js/src/collapse.js'

if (window.Joomla) {
  window.Joomla.Bootstrap = window.Joomla.Bootstrap || {};
  window.Joomla.Bootstrap.Methods = window.Joomla.Bootstrap.Methods || {};
  window.Joomla.Bootstrap.Instances = window.Joomla.Bootstrap.Instances || {};
  window.Joomla.Bootstrap.Methods.Collapse = Collapse;
  window.Joomla.Bootstrap.Instances.Collapse = new WeakMap();

  const collapses= Joomla.getOptions('bootstrap.collapse');

  if (collapses) {
    collapses.forEach((collapse) => {
      const collapseElement = document.querySelector(collapse);

      if (collapseElement) {
        window.Joomla.Bootstrap.Instances.Collapse.set(collapseElement, new Joomla.Bootstrap.Methods.Collapse(collapseElement));
      }
    });
  }
}

export default Collapse
