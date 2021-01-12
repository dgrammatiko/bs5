import Alert from '../../node_modules/bootstrap/js/src/alert.js'

if (window.Joomla) {
  window.Joomla.Bootstrap = window.Joomla.Bootstrap || {};
  window.Joomla.Bootstrap.Methods = window.Joomla.Bootstrap.Methods || {};
  window.Joomla.Bootstrap.Instances = window.Joomla.Bootstrap.Instances || {};
  window.Joomla.Bootstrap.Methods.Alert = Alert;
  window.Joomla.Bootstrap.Instances.Alert = new WeakMap();

  const alerts = Joomla.getOptions('bootstrap.alert');

  if (alerts && alerts.length) {
    alerts.forEach((selector) => {
      const alertElements = Array.from(document.querySelectorAll(selector));
      if (alertElements.length) {
        alertElements.map((el) => window.Joomla.Bootstrap.Instances.Alert.set(el, new Joomla.Bootstrap.Methods.Alert(el)));
      }
    });
  }
}

export default Alert
