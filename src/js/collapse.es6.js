import Collapse from '../../node_modules/bootstrap/js/src/collapse.js'

if (window.Joomla) {
  window.Joomla.Bootstrap = window.Joomla.Bootstrap || {};
  window.Joomla.Bootstrap.Methods = window.Joomla.Bootstrap.Methods || {};
  window.Joomla.Bootstrap.Instances = window.Joomla.Bootstrap.Instances || {};
  window.Joomla.Bootstrap.Methods.Collapse = Collapse;
  window.Joomla.Bootstrap.Instances.Collapse = new WeakMap();

  const collapses= Joomla.getOptions('bootstrap.collapse');

  if (collapses) {
    Object.keys(collapses).forEach((collapse) => {
      const collapseElements = Array.from(document.querySelectorAll(collapse));

      if (collapseElements) {
        collapseElements.map((el) => window.Joomla.Bootstrap.Instances.Collapse.set(el, new Joomla.Bootstrap.Methods.Collapse(el, collapses[collapse])));
      }
    });
  }
}

export default Collapse
