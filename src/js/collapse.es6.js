import Collapse from '../../node_modules/bootstrap/js/src/collapse.js'

if (Joomla) {
  Joomla.Bootstrap = Joomla.Bootstrap || {};
  Joomla.Bootstrap.Methods = Joomla.Bootstrap.Methods || {};
  Joomla.Bootstrap.Instances = Joomla.Bootstrap.Instances || {};
  Joomla.Bootstrap.Methods.Collapse = Collapse;
  Joomla.Bootstrap.Instances.Collapse = new WeakMap();

  const collapses= Joomla.getOptions('bootstrap.collapse');

  if (collapses) {
    collapses.forEach((collapse) => {
      const collapseElement = document.querySelector(collapse);

      if (collapseElement) {
        Joomla.Bootstrap.Instances.Collapse.set(collapseElement, new Joomla.Bootstrap.Methods.Collapse(collapseElement));
      }
    });
  }
}

export default Collapse
