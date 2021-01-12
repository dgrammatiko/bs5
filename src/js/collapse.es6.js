import Collapse from '../../node_modules/bootstrap/js/src/collapse.js'

if (window.Joomla) {
  window.Joomla.Bootstrap = window.Joomla.Bootstrap || {};
  window.Joomla.Bootstrap.Methods = window.Joomla.Bootstrap.Methods || {};
  window.Joomla.Bootstrap.Instances = window.Joomla.Bootstrap.Instances || {};
  window.Joomla.Bootstrap.Methods.Collapse = Collapse;
  window.Joomla.Bootstrap.Instances.Collapse = new WeakMap();

  const collapses= Joomla.getOptions('bootstrap.collapse');

  if (collapses) {
    for (const collapse in collapses) {
      const collapseElement = document.querySelector(collapse);

      if (collapseElement) {
        const instance = new Joomla.Bootstrap.Methods.Collapse(collapseElement, collapses[collapse]);
        window.Joomla.Bootstrap.Instances.Collapse.set(collapse, instance);
      }
    }
  }
}

export default Collapse
