import Toast from '../../node_modules/bootstrap/js/src/toast.js'

if (window.Joomla) {
  window.Joomla.Bootstrap = window.Joomla.Bootstrap || {};
  window.Joomla.Bootstrap.Methods = window.Joomla.Bootstrap.Methods || {};
  window.Joomla.Bootstrap.Instances = window.Joomla.Bootstrap.Instances || {};
  window.Joomla.Bootstrap.Methods.Toast = Toast;
  window.Joomla.Bootstrap.Instances.Toast = new WeakMap();

  const toasts= Joomla.getOptions('bootstrap.toast');

  if (toasts) {
    for (const toast in toasts) {
      const toastElements = document.querySelectorAll(toast);

      if (toastElements) {
        toastElements.map((el) => window.Joomla.Bootstrap.Instances.Toast.set(el, new Joomla.Bootstrap.Methods.Toast(el, toasts[toast])));
      }
    }
  }
}

export default Toast
