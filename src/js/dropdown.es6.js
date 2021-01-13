import Dropdown from '../../node_modules/bootstrap/js/src/dropdown.js'

if (Joomla) {
  Joomla.Bootstrap = Joomla.Bootstrap || {};
  Joomla.Bootstrap.Methods = Joomla.Bootstrap.Methods || {};
  Joomla.Bootstrap.Instances = Joomla.Bootstrap.Instances || {};
  Joomla.Bootstrap.Methods.Dropdown = Dropdown;
  Joomla.Bootstrap.Instances.Dropdown = new WeakMap();

  const dropdowns= Joomla.getOptions('bootstrap.dropdown');

  if (dropdowns) {
    dropdowns.forEach((dropdown) => {
      const dropdownElement = document.querySelector(dropdown);

      if (dropdownElement) {
        Joomla.Bootstrap.Instances.Dropdown.set(dropdownElement, new Joomla.Bootstrap.Methods.Dropdown(dropdownElement));
      }
    });
  }
}

export default Dropdown
