import { B as BaseComponent, D as Data, E as EventHandler, o as onDOMContentLoaded, b as getjQuery } from './dom-8eef6b5f.js';

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.0.0-beta1): button.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

const NAME = 'button';
const DATA_KEY = 'bs.button';
const EVENT_KEY = `.${DATA_KEY}`;
const DATA_API_KEY = '.data-api';

const CLASS_NAME_ACTIVE = 'active';

const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="button"]';

const EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`;

/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

class Button extends BaseComponent {
  // Getters

  static get DATA_KEY() {
    return DATA_KEY
  }

  // Public

  toggle() {
    // Toggle class and sync the `aria-pressed` attribute with the return value of the `.toggle()` method
    this._element.setAttribute('aria-pressed', this._element.classList.toggle(CLASS_NAME_ACTIVE));
  }

  // Static

  static jQueryInterface(config) {
    return this.each(function () {
      let data = Data.getData(this, DATA_KEY);

      if (!data) {
        data = new Button(this);
      }

      if (config === 'toggle') {
        data[config]();
      }
    })
  }
}

/**
 * ------------------------------------------------------------------------
 * Data Api implementation
 * ------------------------------------------------------------------------
 */

EventHandler.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, event => {
  event.preventDefault();

  const button = event.target.closest(SELECTOR_DATA_TOGGLE);

  let data = Data.getData(button, DATA_KEY);
  if (!data) {
    data = new Button(button);
  }

  data.toggle();
});

/**
 * ------------------------------------------------------------------------
 * jQuery
 * ------------------------------------------------------------------------
 * add .Button to jQuery only if jQuery is present
 */

onDOMContentLoaded(() => {
  const $ = getjQuery();
  /* istanbul ignore if */
  if ($) {
    const JQUERY_NO_CONFLICT = $.fn[NAME];
    $.fn[NAME] = Button.jQueryInterface;
    $.fn[NAME].Constructor = Button;

    $.fn[NAME].noConflict = () => {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return Button.jQueryInterface
    };
  }
});

Joomla = Joomla || {};
Joomla.Bootstrap = Joomla.Bootstrap || {};
Joomla.Bootstrap.Initialise = Joomla.Bootstrap.Initialise || {};
Joomla.Bootstrap.Instances = Joomla.Bootstrap.Instances || {};
Joomla.Bootstrap.Instances.Button = new WeakMap();

/**
 * Initialise the Button iteractivity
 *
 * @param {HTMLElement} el The element that will become an Button
 */
Joomla.Bootstrap.Initialise.Button = (el) => {
  if (typeof el !== HTMLElement) {
    return;
  }
  if (Joomla.Bootstrap.Instances.Button.get(el)) {
    el.dispose();
  }
  Joomla.Bootstrap.Instances.Button.set(el, new Button(el));
};

const buttons = Joomla.getOptions('bootstrap.button');

if (buttons && buttons.length) {
  buttons.map((selector) => {
      Array.from(document.querySelectorAll(selector)).map((el) => Joomla.Bootstrap.Initialise.Button(el));
  });
}

export { Button as B };
