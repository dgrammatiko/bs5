import Button from '../../node_modules/bootstrap/js/src/button.js'

if (Joomla) {
  Joomla.Bootstrap = Joomla.Bootstrap || {};
  Joomla.Bootstrap.Methods = Joomla.Bootstrap.Methods || {};
  Joomla.Bootstrap.Instances = Joomla.Bootstrap.Instances || {};
  Joomla.Bootstrap.Methods.Button = Button;
  Joomla.Bootstrap.Instances.Button = new WeakMap();

  const buttons = Joomla.getOptions('bootstrap.button');

  if (buttons && buttons.length) {
    buttons.forEach((selector) => {
      const buttonElements = Array.from(document.querySelectorAll(selector));

      if (buttonElements.length) {
        buttonElements.map((el) => Joomla.Bootstrap.Instances.Button.set(el, new Joomla.Bootstrap.Methods.Button(el)));
      }
    });
  }
}

export default Button
