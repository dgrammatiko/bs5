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
      const toastElement = document.querySelector(toast);

      if (toastElement) {
        const instance = new Joomla.Bootstrap.Methods.Toast(toastElement, toasts[toast]);
        window.Joomla.Bootstrap.Instances.Toast.set(toastElement, instance);
      }
    }
  }
}

export default Toast
