import Modal from '../../node_modules/bootstrap/js/src/modal.js'

/**
 * Method to invoke a click on button inside an iframe
 *
 * @param   {object}  options  Object with the css selector for the parent element of an iframe
 *                             and the selector of the button in the iframe that will be clicked
 *                             { iframeSelector: '', buttonSelector: '' }
 * @returns {boolean}
 *
 * @since   4.0
 */
window.Joomla.iframeButtonClick = (options) => {
  if (!options.iframeSelector || !options.buttonSelector) {
    throw new Error('Selector is missing');
  }

  const iframe = document.querySelector(options.iframeSelector + ' iframe');
  if (iframe) {
    const button = iframe.contentWindow.document.querySelector(options.buttonSelector);
    if (button) {
      button.click();
    }
  }
};

if (window.Joomla) {
  window.Joomla.Bootstrap = window.Joomla.Bootstrap || {};
  window.Joomla.Bootstrap.Methods = window.Joomla.Bootstrap.Methods || {};
  window.Joomla.Bootstrap.Instances = window.Joomla.Bootstrap.Instances || {};
  window.Joomla.Bootstrap.Methods.Modal = Modal;
  window.Joomla.Bootstrap.Instances.Modal = new WeakMap();

  const modals = [].slice.call(document.querySelectorAll('.joomla-modal'));

  if (modals.length) {
    modals.forEach((modal) => {
      window.Joomla.Bootstrap.Instances.Modal.set(modal, new window.Joomla.Bootstrap.Methods.Modal(modal));

      // Comply with the Joomla API - Bound element.open/close
      modal.open = () => { window.Joomla.Bootstrap.Instances.Modal.get(modal).show(modal); };
      modal.close = () => { window.Joomla.Bootstrap.Instances.Modal.get(modal).hide(); };

      // Do some Joomla specific changes
      modal.addEventListener('show.bs.modal', () => {
        // Comply with the Joomla API - Set the current Modal ID
        Joomla.Modal.setCurrent(modal);

        if (modal.dataset.url) {
          const modalBody = modal.querySelector('.modal-body');
          const iframe = modalBody.querySelector('iframe');

          if (iframe) {
            iframe.parentNode.removeChild(iframe);
          }

          // @todo merge https://github.com/joomla/joomla-cms/pull/20788
          // Hacks because com_associations and field modals use pure javascript in the url!
          if (modal.dataset.iframe.indexOf("document.getElementById") > 0){
            const iframeTextArr = modal.dataset.iframe.split('+');
            let idFieldArr = iframeTextArr[1].split('"');
            let el;

            idFieldArr[0] = idFieldArr[0].replace(/&quot;/g,'"');

            if (!document.getElementById(idFieldArr[1])) {
              el = eval(idFieldArr[0]); // This is UNSAFE!!!!
            } else {
              el = document.getElementById(idFieldArr[1]).value;
            }

            modalBody.insertAdjacentHTML('afterbegin', `${iframeTextArr[0]}${el}${iframeTextArr[2]}`);
          } else {
            modalBody.insertAdjacentHTML('afterbegin', modal.dataset.iframe);
          }
        }
      });

      modal.addEventListener('shown.bs.modal', () => {
        const modalBody = modal.querySelector('.modal-body');
        const modalHeader = modal.querySelector('.modal-header');
        const modalFooter = modal.querySelector('.modal-footer');
        // const modalRects = modal.getBoundingClientRect();
        const modalHeaderRects = modalHeader.getBoundingClientRect();
        // const modalHeight = modalRects.height;
        const modalHeaderHeight = modalHeaderRects.height;
        const modalBodyHeightOuter = modalBody.offsetHeight;
        const modalBodyHeight = parseFloat(getComputedStyle(modalBody, null).height.replace("px", ""));
        const modalFooterHeight = parseFloat(getComputedStyle(modalFooter, null).height.replace("px", ""));
        const padding = modalBody.offsetTop;
        const maxModalHeight = parseFloat(getComputedStyle(document.body, null).height.replace("px", ""))-(padding * 2)
        const modalBodyPadding = modalBodyHeightOuter - modalBodyHeight;
        const maxModalBodyHeight = maxModalHeight - (modalHeaderHeight + modalFooterHeight + modalBodyPadding);

        if (modal.dataset.url) {
          const iframeEl = modal.querySelector('.iframe');
          var iframeHeight = parseFloat(getComputedStyle(iframeEl, null).height.replace("px", ""));
          if (iframeHeight > maxModalBodyHeight){
            modalBody.style.maxHeight = maxModalBodyHeight;
            modalBody.style.overflowY = 'auto';
            iframeEl.style.maxHeight = maxModalBodyHeight - modalBodyPadding;
          }
        }
      });

      modal.addEventListener('hide.bs.modal', () => {
        const modalBody = modal.querySelector('.modal-body');
        modalBody.style.maxHeight = 'initial'
      });

      modal.addEventListener('hidden.bs.modal', () => {
        // Comply with the Joomla API - Remove the current Modal ID
        Joomla.Modal.setCurrent('');
      });
    });
  }
}

export default Modal
