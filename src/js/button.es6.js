import Button from '../../node_modules/bootstrap/js/src/button.js'

if (window.Joomla) {
  window.Joomla.Bootstrap = window.Joomla.Bootstrap || {};
  window.Joomla.Bootstrap.Methods = window.Joomla.Bootstrap.Methods || {};
  window.Joomla.Bootstrap.Instances = window.Joomla.Bootstrap.Instances || {};
  window.Joomla.Bootstrap.Methods.Button = Button;
  window.Joomla.Bootstrap.Instances.Button = new WeakMap();

  const buttons = Joomla.getOptions('bootstrap.button');

  if (buttons && buttons.length) {
    buttons.forEach((selector) => {
      const buttonElements = Array.from(document.querySelectorAll(selector));

      if (buttonElements.length) {
        buttonElements.map((el) => window.Joomla.Bootstrap.Instances.Button.set(el, new Joomla.Bootstrap.Methods.Button(el)));
      }
    });
  }
}

export default Button
