import Modal from '../../node_modules/bootstrap/js/src/modal.js'

if (window.Joomla) {
  window.Joomla.Bootstrap = window.Joomla.Bootstrap || {};
  window.Joomla.Bootstrap.Methods = window.Joomla.Bootstrap.Methods || {};
  window.Joomla.Bootstrap.Instances = window.Joomla.Bootstrap.Instances || {};
  window.Joomla.Bootstrap.Methods.Modal = Modal;

  const modals= Joomla.getOptions('bootstrap.modal');
  if (modals.length) {
    window.Joomla.Bootstrap.Instances.collapse = new WeakMap();
    modals.forEach((selector) => {
      const modal = document.querySelectorAll(selector);
      if (modal) {
        const instance = new Joomla.Bootstrap.Methods.Modal(modal);
        window.Joomla.Bootstrap.Instances.Modal.set(modal, instance);
      }
    });
  }
}

export default Modal
