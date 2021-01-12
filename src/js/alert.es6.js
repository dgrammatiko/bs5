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
      const alert = document.querySelectorAll(selector);
      if (alert) {
        const instance = new Joomla.Bootstrap.Methods.Alert(alert);
        window.Joomla.Bootstrap.Instances.Alert.set(alert, instance);
      }
    });
  }
}

export default Alert
