import Dropdown from '../../node_modules/bootstrap/js/src/dropdown.js'

if (window.Joomla) {
  window.Joomla.Bootstrap = window.Joomla.Bootstrap || {};
  window.Joomla.Bootstrap.Methods = window.Joomla.Bootstrap.Methods || {};
  window.Joomla.Bootstrap.Instances = window.Joomla.Bootstrap.Instances || {};
  window.Joomla.Bootstrap.Methods.Dropdown = Dropdown;

  const dropdowns= Joomla.getOptions('bootstrap.dropdown');

  if (dropdowns && dropdowns.length) {
    window.Joomla.Bootstrap.Instances.Dropdown = new WeakMap();

    dropdowns.forEach((selector, options) => {
      const dropdown = document.querySelector(selector);

      if (dropdown) {
        const instance = new Joomla.Bootstrap.Methods.Dropdown(
          dropdown,
          {
            // @todo options?
          });

        window.Joomla.Bootstrap.Instances.Dropdown.set(dropdown, instance);
      }
    });
  }
}

export default Dropdown
