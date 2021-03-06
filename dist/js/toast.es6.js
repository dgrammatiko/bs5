import { B as BaseComponent, E as EventHandler, r as reflow, a as getTransitionDurationFromElement, T as TRANSITION_END, e as emulateTransitionEnd, M as Manipulator, c as typeCheckConfig, D as Data, o as onDOMContentLoaded, b as getjQuery } from './dom-8eef6b5f.js';

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.0.0-beta1): toast.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

const NAME = 'toast';
const DATA_KEY = 'bs.toast';
const EVENT_KEY = `.${DATA_KEY}`;

const EVENT_CLICK_DISMISS = `click.dismiss${EVENT_KEY}`;
const EVENT_HIDE = `hide${EVENT_KEY}`;
const EVENT_HIDDEN = `hidden${EVENT_KEY}`;
const EVENT_SHOW = `show${EVENT_KEY}`;
const EVENT_SHOWN = `shown${EVENT_KEY}`;

const CLASS_NAME_FADE = 'fade';
const CLASS_NAME_HIDE = 'hide';
const CLASS_NAME_SHOW = 'show';
const CLASS_NAME_SHOWING = 'showing';

const DefaultType = {
  animation: 'boolean',
  autohide: 'boolean',
  delay: 'number'
};

const Default = {
  animation: true,
  autohide: true,
  delay: 5000
};

const SELECTOR_DATA_DISMISS = '[data-bs-dismiss="toast"]';

/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

class Toast extends BaseComponent {
  constructor(element, config) {
    super(element);

    this._config = this._getConfig(config);
    this._timeout = null;
    this._setListeners();
  }

  // Getters

  static get DefaultType() {
    return DefaultType
  }

  static get Default() {
    return Default
  }

  static get DATA_KEY() {
    return DATA_KEY
  }

  // Public

  show() {
    const showEvent = EventHandler.trigger(this._element, EVENT_SHOW);

    if (showEvent.defaultPrevented) {
      return
    }

    this._clearTimeout();

    if (this._config.animation) {
      this._element.classList.add(CLASS_NAME_FADE);
    }

    const complete = () => {
      this._element.classList.remove(CLASS_NAME_SHOWING);
      this._element.classList.add(CLASS_NAME_SHOW);

      EventHandler.trigger(this._element, EVENT_SHOWN);

      if (this._config.autohide) {
        this._timeout = setTimeout(() => {
          this.hide();
        }, this._config.delay);
      }
    };

    this._element.classList.remove(CLASS_NAME_HIDE);
    reflow(this._element);
    this._element.classList.add(CLASS_NAME_SHOWING);
    if (this._config.animation) {
      const transitionDuration = getTransitionDurationFromElement(this._element);

      EventHandler.one(this._element, TRANSITION_END, complete);
      emulateTransitionEnd(this._element, transitionDuration);
    } else {
      complete();
    }
  }

  hide() {
    if (!this._element.classList.contains(CLASS_NAME_SHOW)) {
      return
    }

    const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE);

    if (hideEvent.defaultPrevented) {
      return
    }

    const complete = () => {
      this._element.classList.add(CLASS_NAME_HIDE);
      EventHandler.trigger(this._element, EVENT_HIDDEN);
    };

    this._element.classList.remove(CLASS_NAME_SHOW);
    if (this._config.animation) {
      const transitionDuration = getTransitionDurationFromElement(this._element);

      EventHandler.one(this._element, TRANSITION_END, complete);
      emulateTransitionEnd(this._element, transitionDuration);
    } else {
      complete();
    }
  }

  dispose() {
    this._clearTimeout();

    if (this._element.classList.contains(CLASS_NAME_SHOW)) {
      this._element.classList.remove(CLASS_NAME_SHOW);
    }

    EventHandler.off(this._element, EVENT_CLICK_DISMISS);

    super.dispose();
    this._config = null;
  }

  // Private

  _getConfig(config) {
    config = {
      ...Default,
      ...Manipulator.getDataAttributes(this._element),
      ...(typeof config === 'object' && config ? config : {})
    };

    typeCheckConfig(NAME, config, this.constructor.DefaultType);

    return config
  }

  _setListeners() {
    EventHandler.on(this._element, EVENT_CLICK_DISMISS, SELECTOR_DATA_DISMISS, () => this.hide());
  }

  _clearTimeout() {
    clearTimeout(this._timeout);
    this._timeout = null;
  }

  // Static

  static jQueryInterface(config) {
    return this.each(function () {
      let data = Data.getData(this, DATA_KEY);
      const _config = typeof config === 'object' && config;

      if (!data) {
        data = new Toast(this, _config);
      }

      if (typeof config === 'string') {
        if (typeof data[config] === 'undefined') {
          throw new TypeError(`No method named "${config}"`)
        }

        data[config](this);
      }
    })
  }
}

/**
 * ------------------------------------------------------------------------
 * jQuery
 * ------------------------------------------------------------------------
 * add .Toast to jQuery only if jQuery is present
 */

onDOMContentLoaded(() => {
  const $ = getjQuery();
  /* istanbul ignore if */
  if ($) {
    const JQUERY_NO_CONFLICT = $.fn[NAME];
    $.fn[NAME] = Toast.jQueryInterface;
    $.fn[NAME].Constructor = Toast;
    $.fn[NAME].noConflict = () => {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return Toast.jQueryInterface
    };
  }
});

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

// Force Vanilla mode!
if (!document.body.dataset.hasOwnProperty('bsNoJquery')) {
  document.body.dataset.bsNoJquery = '';
}

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

export { Toast as T };
