import Alert from '../../node_modules/bootstrap/js/src/alert.js'

Joomla = Joomla || {};
Joomla.Bootstrap = Joomla.Bootstrap || {};
Joomla.Bootstrap.Initialise = Joomla.Bootstrap.Initialise || {};
Joomla.Bootstrap.Instances = Joomla.Bootstrap.Instances || {};
Joomla.Bootstrap.Instances.Alert = new WeakMap();

/**
 * Initialise the Alert iteractivity
 *
 * @param {HTMLElement} el The element that will become an Alert
 */
Joomla.Bootstrap.Initialise.Alert = (el) => {
  if (typeof el !== HTMLElement) {
    return;
  }
  if (Joomla.Bootstrap.Instances.Alert.get(el)) {
    el.dispose();
  }
  Joomla.Bootstrap.Instances.Alert.set(el, new Alert(el));
};

const alerts = Joomla.getOptions('bootstrap.alert');

if (alerts && alerts.length) {
  alerts.map((selector) => {
    Array.from(document.querySelectorAll(selector)).map((el) => Joomla.Bootstrap.Initialise.Alert(el));
  });
}

export default Alert
