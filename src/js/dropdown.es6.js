import Dropdown from '../../node_modules/bootstrap/js/src/dropdown.js'

if (window.Joomla) {
  window.Joomla.Bootstrap = window.Joomla.Bootstrap || {};
  window.Joomla.Bootstrap.Methods = window.Joomla.Bootstrap.Methods || {};
  window.Joomla.Bootstrap.Instances = window.Joomla.Bootstrap.Instances || {};
  window.Joomla.Bootstrap.Methods.Dropdown = Dropdown;

  const dropdowns= Joomla.getOptions('bootstrap.dropdown');
  if (dropdowns.length) {
    window.Joomla.Bootstrap.Instances.Dropdown = new WeakMap();
    dropdowns.forEach((selector) => {
      const dd = document.querySelectorAll(selector);
      if (dd) {
        const instance = new Joomla.Bootstrap.Methods.Dropdown(dd);
        window.Joomla.Bootstrap.Instances.Dropdown.set(dd, instance);
      }
    });
  }
}

export default Dropdown
