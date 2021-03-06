import { B as BaseComponent, g as getElementFromSelector, E as EventHandler, a as getTransitionDurationFromElement, T as TRANSITION_END, e as emulateTransitionEnd, D as Data, o as onDOMContentLoaded, b as getjQuery } from './dom-8eef6b5f.js';

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.0.0-beta1): alert.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

const NAME = 'alert';
const DATA_KEY = 'bs.alert';
const EVENT_KEY = `.${DATA_KEY}`;
const DATA_API_KEY = '.data-api';

const SELECTOR_DISMISS = '[data-bs-dismiss="alert"]';

const EVENT_CLOSE = `close${EVENT_KEY}`;
const EVENT_CLOSED = `closed${EVENT_KEY}`;
const EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`;

const CLASSNAME_ALERT = 'alert';
const CLASSNAME_FADE = 'fade';
const CLASSNAME_SHOW = 'show';

/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

class Alert extends BaseComponent {
  // Getters

  static get DATA_KEY() {
    return DATA_KEY
  }

  // Public

  close(element) {
    const rootElement = element ? this._getRootElement(element) : this._element;
    const customEvent = this._triggerCloseEvent(rootElement);

    if (customEvent === null || customEvent.defaultPrevented) {
      return
    }

    this._removeElement(rootElement);
  }

  // Private

  _getRootElement(element) {
    return getElementFromSelector(element) || element.closest(`.${CLASSNAME_ALERT}`)
  }

  _triggerCloseEvent(element) {
    return EventHandler.trigger(element, EVENT_CLOSE)
  }

  _removeElement(element) {
    element.classList.remove(CLASSNAME_SHOW);

    if (!element.classList.contains(CLASSNAME_FADE)) {
      this._destroyElement(element);
      return
    }

    const transitionDuration = getTransitionDurationFromElement(element);

    EventHandler.one(element, TRANSITION_END, () => this._destroyElement(element));
    emulateTransitionEnd(element, transitionDuration);
  }

  _destroyElement(element) {
    if (element.parentNode) {
      element.parentNode.removeChild(element);
    }

    EventHandler.trigger(element, EVENT_CLOSED);
  }

  // Static

  static jQueryInterface(config) {
    return this.each(function () {
      let data = Data.getData(this, DATA_KEY);

      if (!data) {
        data = new Alert(this);
      }

      if (config === 'close') {
        data[config](this);
      }
    })
  }

  static handleDismiss(alertInstance) {
    return function (event) {
      if (event) {
        event.preventDefault();
      }

      alertInstance.close(this);
    }
  }
}

/**
 * ------------------------------------------------------------------------
 * Data Api implementation
 * ------------------------------------------------------------------------
 */
EventHandler.on(document, EVENT_CLICK_DATA_API, SELECTOR_DISMISS, Alert.handleDismiss(new Alert()));

/**
 * ------------------------------------------------------------------------
 * jQuery
 * ------------------------------------------------------------------------
 * add .Alert to jQuery only if jQuery is present
 */

onDOMContentLoaded(() => {
  const $ = getjQuery();
  /* istanbul ignore if */
  if ($) {
    const JQUERY_NO_CONFLICT = $.fn[NAME];
    $.fn[NAME] = Alert.jQueryInterface;
    $.fn[NAME].Constructor = Alert;
    $.fn[NAME].noConflict = () => {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return Alert.jQueryInterface
    };
  }
});

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
  if (!(el instanceof Element)) {
    return;
  }
  if (Joomla.Bootstrap.Instances.Alert.get(el)) {
    el.dispose();
  }
  Joomla.Bootstrap.Instances.Alert.set(el, new Alert(el));
};

const alerts = Joomla.getOptions('bootstrap.alert');

// Force Vanilla mode!
if (!document.body.dataset.hasOwnProperty('bsNoJquery')) {
  document.body.dataset.bsNoJquery = '';
}

if (alerts && alerts.length) {
  alerts.map((selector) => {
    Array.from(document.querySelectorAll(selector)).map((el) => Joomla.Bootstrap.Initialise.Alert(el));
  });
}

export { Alert as A };
