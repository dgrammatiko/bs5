import Toast from '../../node_modules/bootstrap/js/src/toast.js'

if (Joomla) {
  Joomla.Bootstrap = Joomla.Bootstrap || {};
  Joomla.Bootstrap.Methods = Joomla.Bootstrap.Methods || {};
  Joomla.Bootstrap.Instances = Joomla.Bootstrap.Instances || {};
  Joomla.Bootstrap.Methods.Toast = Toast;
  Joomla.Bootstrap.Instances.Toast = new WeakMap();

  const toasts= Joomla.getOptions('bootstrap.toast');

  if (toasts) {
    Object.keys(toasts).forEach((toast) => {
      const toastElements = Array.from(document.querySelectorAll(toast));

      if (toastElements) {
        toastElements.map((el) => Joomla.Bootstrap.Instances.Toast.set(el, new Joomla.Bootstrap.Methods.Toast(el, toasts[toast])));
      }
    });
  }
}

export default Toast
