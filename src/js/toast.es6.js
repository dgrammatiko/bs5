import Toast from '../../node_modules/bootstrap/js/src/toast.js'

Joomla = Joomla || {};
Joomla.Bootstrap = Joomla.Bootstrap || {};
Joomla.Bootstrap.Initialise = Joomla.Bootstrap.Initialise || {};
Joomla.Bootstrap.Instances = Joomla.Bootstrap.Instances || {};
Joomla.Bootstrap.Initialise.Toast = initiator;
Joomla.Bootstrap.Instances.Toast = new WeakMap();

/**
 * Initialise the iteractivity
 *
 * @param {HTMLElement} el The element that will become an toast
 * @param {object} options The options for this toast
 */
Joomla.Bootstrap.Initialise.Toast = (el, options) => {
  if (!(el instanceof Element)) {
    return;
  }
  if (Joomla.Bootstrap.Instances.Toast.get(el)) {
    el.dispose();
  }
  Joomla.Bootstrap.Instances.Toast.set(el, new Toast(el, options));
};

const toasts = Joomla.getOptions('bootstrap.toast');

if (toasts) {
  Object.keys(toasts).map((toast) => {
    const opt = toasts[toast];
    const options = {
      animation: opt.animation ? opt.animation : true,
      autohide: opt.autohide ? opt.autohide : true,
      delay: opt.delay ? opt.delay : 5000,
    };

    Array.from(document.querySelectorAll(toast)).map((el) => Joomla.Bootstrap.Initialise.Toast(el, options));
  });
}

export default Toast
