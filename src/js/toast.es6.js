import Toast from '../../node_modules/bootstrap/js/src/toast.js'

if (window.Joomla) {
  window.Joomla.Bootstrap = window.Joomla.Bootstrap || {};
  window.Joomla.Bootstrap.Methods = window.Joomla.Bootstrap.Methods || {};
  window.Joomla.Bootstrap.Instances = window.Joomla.Bootstrap.Instances || {};
  window.Joomla.Bootstrap.Methods.Toast = Toast;

  const toasts= Joomla.getOptions('bootstrap.tab');

  if (toasts && toasts.length) {
    window.Joomla.Bootstrap.Instances.Toast = new WeakMap();

    toasts.forEach((selector) => {
      const toast = document.querySelectorAll(selector);

      if (toast) {
        const instance = new Joomla.Bootstrap.Methods.Toast(toast);
        window.Joomla.Bootstrap.Instances.Toast.set(toast, instance);
      }
    });
  }
}

export default Toast
