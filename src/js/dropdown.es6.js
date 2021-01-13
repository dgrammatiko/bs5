import Dropdown from '../../node_modules/bootstrap/js/src/dropdown.js'

if (window.Joomla) {
  window.Joomla.Bootstrap = window.Joomla.Bootstrap || {};
  window.Joomla.Bootstrap.Methods = window.Joomla.Bootstrap.Methods || {};
  window.Joomla.Bootstrap.Instances = window.Joomla.Bootstrap.Instances || {};
  window.Joomla.Bootstrap.Methods.Dropdown = Dropdown;
  window.Joomla.Bootstrap.Instances.Dropdown = new WeakMap();

  const dropdowns= Joomla.getOptions('bootstrap.dropdown');

  if (dropdowns) {
    dropdowns.forEach((dropdown) => {
      const dropdownElement = document.querySelector(dropdown);

      if (dropdownElement) {
        window.Joomla.Bootstrap.Instances.Dropdown.set(dropdownElement, new Joomla.Bootstrap.Methods.Dropdown(dropdownElement));
      }
    });
  }
}

export default Dropdown
