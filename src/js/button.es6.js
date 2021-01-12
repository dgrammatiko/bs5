import Button from '../../node_modules/bootstrap/js/src/button.js'

if (window.Joomla) {
  window.Joomla.Bootstrap = window.Joomla.Bootstrap || {};
  window.Joomla.Bootstrap.Methods = window.Joomla.Bootstrap.Methods || {};
  window.Joomla.Bootstrap.Instances = window.Joomla.Bootstrap.Instances || {};
  window.Joomla.Bootstrap.Methods.Button = Button;

  const buttons = Joomla.getOptions('bootstrap.button');

  if (buttons && buttons.length) {
    window.Joomla.Bootstrap.Instances.Button = new WeakMap();

    buttons.forEach((selector) => {
      const button = document.querySelectorAll(selector);
      if (button) {
        const instance = new Joomla.Bootstrap.Methods.Button(button);
        window.Joomla.Bootstrap.Instances.Button.set(button, instance);
      }
    });
  }
}

export default Button
