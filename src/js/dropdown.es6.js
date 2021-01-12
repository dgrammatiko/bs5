import Dropdown from '../../node_modules/bootstrap/js/src/dropdown.js'

if (window.Joomla) {
  window.Joomla.Bootstrap = window.Joomla.Bootstrap || {};
  window.Joomla.Bootstrap.Methods = window.Joomla.Bootstrap.Methods || {};
  window.Joomla.Bootstrap.Instances = window.Joomla.Bootstrap.Instances || {};
  window.Joomla.Bootstrap.Methods.Dropdown = Dropdown;
  window.Joomla.Bootstrap.Instances.Dropdown = new WeakMap();

  const dropdowns= Joomla.getOptions('bootstrap.dropdown');

  if (dropdowns) {
    for (const dropdown in dropdowns) {
      const dropdownElement = document.querySelector(dropdown);

      if (dropdownElement) {
        const instance = new Joomla.Bootstrap.Methods.Dropdown(dropdownElement, dropdowns[dropdown]);
        window.Joomla.Bootstrap.Instances.Dropdown.set(dropdown, instance);
      }
    }
  }
}

export default Dropdown
