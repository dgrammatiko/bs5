import Alert from '../../node_modules/bootstrap/js/src/alert.js'

if (Joomla) {
  Joomla.Bootstrap = Joomla.Bootstrap || {};
  Joomla.Bootstrap.Methods = Joomla.Bootstrap.Methods || {};
  Joomla.Bootstrap.Instances = Joomla.Bootstrap.Instances || {};
  Joomla.Bootstrap.Methods.Alert = Alert;
  Joomla.Bootstrap.Instances.Alert = new WeakMap();

  const alerts = Joomla.getOptions('bootstrap.alert');

  if (alerts && alerts.length) {
    alerts.forEach((selector) => {
      const alertElements = Array.from(document.querySelectorAll(selector));
      if (alertElements.length) {
        alertElements.map((el) => Joomla.Bootstrap.Instances.Alert.set(el, new Joomla.Bootstrap.Methods.Alert(el)));
      }
    });
  }
}

export default Alert
