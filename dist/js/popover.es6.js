import { o as onDOMContentLoaded, B as BaseComponent, D as Data, E as EventHandler, j as findShadowRoot, k as getUID, n as noop, a as getTransitionDurationFromElement, T as TRANSITION_END, e as emulateTransitionEnd, S as SelectorEngine, f as isElement, M as Manipulator, c as typeCheckConfig, b as getjQuery, h as isRTL } from './dom-8eef6b5f.js';
import { P as Popper, c as createPopper } from './popper-5304749a.js';

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.0.0-beta1): util/sanitizer.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

const uriAttrs = new Set([
  'background',
  'cite',
  'href',
  'itemtype',
  'longdesc',
  'poster',
  'src',
  'xlink:href'
]);

const ARIA_ATTRIBUTE_PATTERN = /^aria-[\w-]*$/i;

/**
 * A pattern that recognizes a commonly useful subset of URLs that are safe.
 *
 * Shoutout to Angular 7 https://github.com/angular/angular/blob/7.2.4/packages/core/src/sanitization/url_sanitizer.ts
 */
const SAFE_URL_PATTERN = /^(?:(?:https?|mailto|ftp|tel|file):|[^#&/:?]*(?:[#/?]|$))/gi;

/**
 * A pattern that matches safe data URLs. Only matches image, video and audio types.
 *
 * Shoutout to Angular 7 https://github.com/angular/angular/blob/7.2.4/packages/core/src/sanitization/url_sanitizer.ts
 */
const DATA_URL_PATTERN = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i;

const allowedAttribute = (attr, allowedAttributeList) => {
  const attrName = attr.nodeName.toLowerCase();

  if (allowedAttributeList.includes(attrName)) {
    if (uriAttrs.has(attrName)) {
      return Boolean(attr.nodeValue.match(SAFE_URL_PATTERN) || attr.nodeValue.match(DATA_URL_PATTERN))
    }

    return true
  }

  const regExp = allowedAttributeList.filter(attrRegex => attrRegex instanceof RegExp);

  // Check if a regular expression validates the attribute.
  for (let i = 0, len = regExp.length; i < len; i++) {
    if (attrName.match(regExp[i])) {
      return true
    }
  }

  return false
};

const DefaultAllowlist = {
  // Global attributes allowed on any supplied element below.
  '*': ['class', 'dir', 'id', 'lang', 'role', ARIA_ATTRIBUTE_PATTERN],
  a: ['target', 'href', 'title', 'rel'],
  area: [],
  b: [],
  br: [],
  col: [],
  code: [],
  div: [],
  em: [],
  hr: [],
  h1: [],
  h2: [],
  h3: [],
  h4: [],
  h5: [],
  h6: [],
  i: [],
  img: ['src', 'srcset', 'alt', 'title', 'width', 'height'],
  li: [],
  ol: [],
  p: [],
  pre: [],
  s: [],
  small: [],
  span: [],
  sub: [],
  sup: [],
  strong: [],
  u: [],
  ul: []
};

function sanitizeHtml(unsafeHtml, allowList, sanitizeFn) {
  if (!unsafeHtml.length) {
    return unsafeHtml
  }

  if (sanitizeFn && typeof sanitizeFn === 'function') {
    return sanitizeFn(unsafeHtml)
  }

  const domParser = new window.DOMParser();
  const createdDocument = domParser.parseFromString(unsafeHtml, 'text/html');
  const allowlistKeys = Object.keys(allowList);
  const elements = [].concat(...createdDocument.body.querySelectorAll('*'));

  for (let i = 0, len = elements.length; i < len; i++) {
    const el = elements[i];
    const elName = el.nodeName.toLowerCase();

    if (!allowlistKeys.includes(elName)) {
      el.parentNode.removeChild(el);

      continue
    }

    const attributeList = [].concat(...el.attributes);
    const allowedAttributes = [].concat(allowList['*'] || [], allowList[elName] || []);

    attributeList.forEach(attr => {
      if (!allowedAttribute(attr, allowedAttributes)) {
        el.removeAttribute(attr.nodeName);
      }
    });
  }

  return createdDocument.body.innerHTML
}

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.0.0-beta1): tooltip.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

const NAME = 'tooltip';
const DATA_KEY = 'bs.tooltip';
const EVENT_KEY = `.${DATA_KEY}`;
const CLASS_PREFIX = 'bs-tooltip';
const BSCLS_PREFIX_REGEX = new RegExp(`(^|\\s)${CLASS_PREFIX}\\S+`, 'g');
const DISALLOWED_ATTRIBUTES = new Set(['sanitize', 'allowList', 'sanitizeFn']);

const DefaultType = {
  animation: 'boolean',
  template: 'string',
  title: '(string|element|function)',
  trigger: 'string',
  delay: '(number|object)',
  html: 'boolean',
  selector: '(string|boolean)',
  placement: '(string|function)',
  container: '(string|element|boolean)',
  fallbackPlacements: '(null|array)',
  boundary: '(string|element)',
  customClass: '(string|function)',
  sanitize: 'boolean',
  sanitizeFn: '(null|function)',
  allowList: 'object',
  popperConfig: '(null|object)'
};

const AttachmentMap = {
  AUTO: 'auto',
  TOP: 'top',
  RIGHT: isRTL ? 'left' : 'right',
  BOTTOM: 'bottom',
  LEFT: isRTL ? 'right' : 'left'
};

const Default = {
  animation: true,
  template: '<div class="tooltip" role="tooltip">' +
              '<div class="tooltip-arrow"></div>' +
              '<div class="tooltip-inner"></div>' +
            '</div>',
  trigger: 'hover focus',
  title: '',
  delay: 0,
  html: false,
  selector: false,
  placement: 'top',
  container: false,
  fallbackPlacements: null,
  boundary: 'clippingParents',
  customClass: '',
  sanitize: true,
  sanitizeFn: null,
  allowList: DefaultAllowlist,
  popperConfig: null
};

const Event = {
  HIDE: `hide${EVENT_KEY}`,
  HIDDEN: `hidden${EVENT_KEY}`,
  SHOW: `show${EVENT_KEY}`,
  SHOWN: `shown${EVENT_KEY}`,
  INSERTED: `inserted${EVENT_KEY}`,
  CLICK: `click${EVENT_KEY}`,
  FOCUSIN: `focusin${EVENT_KEY}`,
  FOCUSOUT: `focusout${EVENT_KEY}`,
  MOUSEENTER: `mouseenter${EVENT_KEY}`,
  MOUSELEAVE: `mouseleave${EVENT_KEY}`
};

const CLASS_NAME_FADE = 'fade';
const CLASS_NAME_MODAL = 'modal';
const CLASS_NAME_SHOW = 'show';

const HOVER_STATE_SHOW = 'show';
const HOVER_STATE_OUT = 'out';

const SELECTOR_TOOLTIP_INNER = '.tooltip-inner';

const TRIGGER_HOVER = 'hover';
const TRIGGER_FOCUS = 'focus';
const TRIGGER_CLICK = 'click';
const TRIGGER_MANUAL = 'manual';

/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

class Tooltip extends BaseComponent {
  constructor(element, config) {
    if (typeof Popper === 'undefined') {
      throw new TypeError('Bootstrap\'s tooltips require Popper (https://popper.js.org)')
    }

    super(element);

    // private
    this._isEnabled = true;
    this._timeout = 0;
    this._hoverState = '';
    this._activeTrigger = {};
    this._popper = null;

    // Protected
    this.config = this._getConfig(config);
    this.tip = null;

    this._setListeners();
  }

  // Getters

  static get Default() {
    return Default
  }

  static get NAME() {
    return NAME
  }

  static get DATA_KEY() {
    return DATA_KEY
  }

  static get Event() {
    return Event
  }

  static get EVENT_KEY() {
    return EVENT_KEY
  }

  static get DefaultType() {
    return DefaultType
  }

  // Public

  enable() {
    this._isEnabled = true;
  }

  disable() {
    this._isEnabled = false;
  }

  toggleEnabled() {
    this._isEnabled = !this._isEnabled;
  }

  toggle(event) {
    if (!this._isEnabled) {
      return
    }

    if (event) {
      const dataKey = this.constructor.DATA_KEY;
      let context = Data.getData(event.delegateTarget, dataKey);

      if (!context) {
        context = new this.constructor(event.delegateTarget, this._getDelegateConfig());
        Data.setData(event.delegateTarget, dataKey, context);
      }

      context._activeTrigger.click = !context._activeTrigger.click;

      if (context._isWithActiveTrigger()) {
        context._enter(null, context);
      } else {
        context._leave(null, context);
      }
    } else {
      if (this.getTipElement().classList.contains(CLASS_NAME_SHOW)) {
        this._leave(null, this);
        return
      }

      this._enter(null, this);
    }
  }

  dispose() {
    clearTimeout(this._timeout);

    EventHandler.off(this._element, this.constructor.EVENT_KEY);
    EventHandler.off(this._element.closest(`.${CLASS_NAME_MODAL}`), 'hide.bs.modal', this._hideModalHandler);

    if (this.tip) {
      this.tip.parentNode.removeChild(this.tip);
    }

    this._isEnabled = null;
    this._timeout = null;
    this._hoverState = null;
    this._activeTrigger = null;
    if (this._popper) {
      this._popper.destroy();
    }

    this._popper = null;
    this.config = null;
    this.tip = null;
    super.dispose();
  }

  show() {
    if (this._element.style.display === 'none') {
      throw new Error('Please use show on visible elements')
    }

    if (this.isWithContent() && this._isEnabled) {
      const showEvent = EventHandler.trigger(this._element, this.constructor.Event.SHOW);
      const shadowRoot = findShadowRoot(this._element);
      const isInTheDom = shadowRoot === null ?
        this._element.ownerDocument.documentElement.contains(this._element) :
        shadowRoot.contains(this._element);

      if (showEvent.defaultPrevented || !isInTheDom) {
        return
      }

      const tip = this.getTipElement();
      const tipId = getUID(this.constructor.NAME);

      tip.setAttribute('id', tipId);
      this._element.setAttribute('aria-describedby', tipId);

      this.setContent();

      if (this.config.animation) {
        tip.classList.add(CLASS_NAME_FADE);
      }

      const placement = typeof this.config.placement === 'function' ?
        this.config.placement.call(this, tip, this._element) :
        this.config.placement;

      const attachment = this._getAttachment(placement);
      this._addAttachmentClass(attachment);

      const container = this._getContainer();
      Data.setData(tip, this.constructor.DATA_KEY, this);

      if (!this._element.ownerDocument.documentElement.contains(this.tip)) {
        container.appendChild(tip);
      }

      EventHandler.trigger(this._element, this.constructor.Event.INSERTED);

      this._popper = createPopper(this._element, tip, this._getPopperConfig(attachment));

      tip.classList.add(CLASS_NAME_SHOW);

      const customClass = typeof this.config.customClass === 'function' ? this.config.customClass() : this.config.customClass;
      if (customClass) {
        tip.classList.add(...customClass.split(' '));
      }

      // If this is a touch-enabled device we add extra
      // empty mouseover listeners to the body's immediate children;
      // only needed because of broken event delegation on iOS
      // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html
      if ('ontouchstart' in document.documentElement) {
        [].concat(...document.body.children).forEach(element => {
          EventHandler.on(element, 'mouseover', noop());
        });
      }

      const complete = () => {
        const prevHoverState = this._hoverState;

        this._hoverState = null;
        EventHandler.trigger(this._element, this.constructor.Event.SHOWN);

        if (prevHoverState === HOVER_STATE_OUT) {
          this._leave(null, this);
        }
      };

      if (this.tip.classList.contains(CLASS_NAME_FADE)) {
        const transitionDuration = getTransitionDurationFromElement(this.tip);
        EventHandler.one(this.tip, TRANSITION_END, complete);
        emulateTransitionEnd(this.tip, transitionDuration);
      } else {
        complete();
      }
    }
  }

  hide() {
    if (!this._popper) {
      return
    }

    const tip = this.getTipElement();
    const complete = () => {
      if (this._hoverState !== HOVER_STATE_SHOW && tip.parentNode) {
        tip.parentNode.removeChild(tip);
      }

      this._cleanTipClass();
      this._element.removeAttribute('aria-describedby');
      EventHandler.trigger(this._element, this.constructor.Event.HIDDEN);

      if (this._popper) {
        this._popper.destroy();
        this._popper = null;
      }
    };

    const hideEvent = EventHandler.trigger(this._element, this.constructor.Event.HIDE);
    if (hideEvent.defaultPrevented) {
      return
    }

    tip.classList.remove(CLASS_NAME_SHOW);

    // If this is a touch-enabled device we remove the extra
    // empty mouseover listeners we added for iOS support
    if ('ontouchstart' in document.documentElement) {
      [].concat(...document.body.children)
        .forEach(element => EventHandler.off(element, 'mouseover', noop));
    }

    this._activeTrigger[TRIGGER_CLICK] = false;
    this._activeTrigger[TRIGGER_FOCUS] = false;
    this._activeTrigger[TRIGGER_HOVER] = false;

    if (this.tip.classList.contains(CLASS_NAME_FADE)) {
      const transitionDuration = getTransitionDurationFromElement(tip);

      EventHandler.one(tip, TRANSITION_END, complete);
      emulateTransitionEnd(tip, transitionDuration);
    } else {
      complete();
    }

    this._hoverState = '';
  }

  update() {
    if (this._popper !== null) {
      this._popper.update();
    }
  }

  // Protected

  isWithContent() {
    return Boolean(this.getTitle())
  }

  getTipElement() {
    if (this.tip) {
      return this.tip
    }

    const element = document.createElement('div');
    element.innerHTML = this.config.template;

    this.tip = element.children[0];
    return this.tip
  }

  setContent() {
    const tip = this.getTipElement();
    this.setElementContent(SelectorEngine.findOne(SELECTOR_TOOLTIP_INNER, tip), this.getTitle());
    tip.classList.remove(CLASS_NAME_FADE, CLASS_NAME_SHOW);
  }

  setElementContent(element, content) {
    if (element === null) {
      return
    }

    if (typeof content === 'object' && isElement(content)) {
      if (content.jquery) {
        content = content[0];
      }

      // content is a DOM node or a jQuery
      if (this.config.html) {
        if (content.parentNode !== element) {
          element.innerHTML = '';
          element.appendChild(content);
        }
      } else {
        element.textContent = content.textContent;
      }

      return
    }

    if (this.config.html) {
      if (this.config.sanitize) {
        content = sanitizeHtml(content, this.config.allowList, this.config.sanitizeFn);
      }

      element.innerHTML = content;
    } else {
      element.textContent = content;
    }
  }

  getTitle() {
    let title = this._element.getAttribute('data-bs-original-title');

    if (!title) {
      title = typeof this.config.title === 'function' ?
        this.config.title.call(this._element) :
        this.config.title;
    }

    return title
  }

  updateAttachment(attachment) {
    if (attachment === 'right') {
      return 'end'
    }

    if (attachment === 'left') {
      return 'start'
    }

    return attachment
  }

  // Private

  _getPopperConfig(attachment) {
    const flipModifier = {
      name: 'flip',
      options: {
        altBoundary: true
      }
    };

    if (this.config.fallbackPlacements) {
      flipModifier.options.fallbackPlacements = this.config.fallbackPlacements;
    }

    const defaultBsConfig = {
      placement: attachment,
      modifiers: [
        flipModifier,
        {
          name: 'preventOverflow',
          options: {
            rootBoundary: this.config.boundary
          }
        },
        {
          name: 'arrow',
          options: {
            element: `.${this.constructor.NAME}-arrow`
          }
        },
        {
          name: 'onChange',
          enabled: true,
          phase: 'afterWrite',
          fn: data => this._handlePopperPlacementChange(data)
        }
      ],
      onFirstUpdate: data => {
        if (data.options.placement !== data.placement) {
          this._handlePopperPlacementChange(data);
        }
      }
    };

    return {
      ...defaultBsConfig,
      ...this.config.popperConfig
    }
  }

  _addAttachmentClass(attachment) {
    this.getTipElement().classList.add(`${CLASS_PREFIX}-${this.updateAttachment(attachment)}`);
  }

  _getContainer() {
    if (this.config.container === false) {
      return document.body
    }

    if (isElement(this.config.container)) {
      return this.config.container
    }

    return SelectorEngine.findOne(this.config.container)
  }

  _getAttachment(placement) {
    return AttachmentMap[placement.toUpperCase()]
  }

  _setListeners() {
    const triggers = this.config.trigger.split(' ');

    triggers.forEach(trigger => {
      if (trigger === 'click') {
        EventHandler.on(this._element, this.constructor.Event.CLICK, this.config.selector, event => this.toggle(event)
        );
      } else if (trigger !== TRIGGER_MANUAL) {
        const eventIn = trigger === TRIGGER_HOVER ?
          this.constructor.Event.MOUSEENTER :
          this.constructor.Event.FOCUSIN;
        const eventOut = trigger === TRIGGER_HOVER ?
          this.constructor.Event.MOUSELEAVE :
          this.constructor.Event.FOCUSOUT;

        EventHandler.on(this._element, eventIn, this.config.selector, event => this._enter(event));
        EventHandler.on(this._element, eventOut, this.config.selector, event => this._leave(event));
      }
    });

    this._hideModalHandler = () => {
      if (this._element) {
        this.hide();
      }
    };

    EventHandler.on(this._element.closest(`.${CLASS_NAME_MODAL}`), 'hide.bs.modal', this._hideModalHandler);

    if (this.config.selector) {
      this.config = {
        ...this.config,
        trigger: 'manual',
        selector: ''
      };
    } else {
      this._fixTitle();
    }
  }

  _fixTitle() {
    const title = this._element.getAttribute('title');
    const originalTitleType = typeof this._element.getAttribute('data-bs-original-title');

    if (title || originalTitleType !== 'string') {
      this._element.setAttribute('data-bs-original-title', title || '');
      if (title && !this._element.getAttribute('aria-label') && !this._element.textContent) {
        this._element.setAttribute('aria-label', title);
      }

      this._element.setAttribute('title', '');
    }
  }

  _enter(event, context) {
    const dataKey = this.constructor.DATA_KEY;
    context = context || Data.getData(event.delegateTarget, dataKey);

    if (!context) {
      context = new this.constructor(
        event.delegateTarget,
        this._getDelegateConfig()
      );
      Data.setData(event.delegateTarget, dataKey, context);
    }

    if (event) {
      context._activeTrigger[
        event.type === 'focusin' ? TRIGGER_FOCUS : TRIGGER_HOVER
      ] = true;
    }

    if (context.getTipElement().classList.contains(CLASS_NAME_SHOW) || context._hoverState === HOVER_STATE_SHOW) {
      context._hoverState = HOVER_STATE_SHOW;
      return
    }

    clearTimeout(context._timeout);

    context._hoverState = HOVER_STATE_SHOW;

    if (!context.config.delay || !context.config.delay.show) {
      context.show();
      return
    }

    context._timeout = setTimeout(() => {
      if (context._hoverState === HOVER_STATE_SHOW) {
        context.show();
      }
    }, context.config.delay.show);
  }

  _leave(event, context) {
    const dataKey = this.constructor.DATA_KEY;
    context = context || Data.getData(event.delegateTarget, dataKey);

    if (!context) {
      context = new this.constructor(
        event.delegateTarget,
        this._getDelegateConfig()
      );
      Data.setData(event.delegateTarget, dataKey, context);
    }

    if (event) {
      context._activeTrigger[
        event.type === 'focusout' ? TRIGGER_FOCUS : TRIGGER_HOVER
      ] = false;
    }

    if (context._isWithActiveTrigger()) {
      return
    }

    clearTimeout(context._timeout);

    context._hoverState = HOVER_STATE_OUT;

    if (!context.config.delay || !context.config.delay.hide) {
      context.hide();
      return
    }

    context._timeout = setTimeout(() => {
      if (context._hoverState === HOVER_STATE_OUT) {
        context.hide();
      }
    }, context.config.delay.hide);
  }

  _isWithActiveTrigger() {
    for (const trigger in this._activeTrigger) {
      if (this._activeTrigger[trigger]) {
        return true
      }
    }

    return false
  }

  _getConfig(config) {
    const dataAttributes = Manipulator.getDataAttributes(this._element);

    Object.keys(dataAttributes).forEach(dataAttr => {
      if (DISALLOWED_ATTRIBUTES.has(dataAttr)) {
        delete dataAttributes[dataAttr];
      }
    });

    if (config && typeof config.container === 'object' && config.container.jquery) {
      config.container = config.container[0];
    }

    config = {
      ...this.constructor.Default,
      ...dataAttributes,
      ...(typeof config === 'object' && config ? config : {})
    };

    if (typeof config.delay === 'number') {
      config.delay = {
        show: config.delay,
        hide: config.delay
      };
    }

    if (typeof config.title === 'number') {
      config.title = config.title.toString();
    }

    if (typeof config.content === 'number') {
      config.content = config.content.toString();
    }

    typeCheckConfig(NAME, config, this.constructor.DefaultType);

    if (config.sanitize) {
      config.template = sanitizeHtml(config.template, config.allowList, config.sanitizeFn);
    }

    return config
  }

  _getDelegateConfig() {
    const config = {};

    if (this.config) {
      for (const key in this.config) {
        if (this.constructor.Default[key] !== this.config[key]) {
          config[key] = this.config[key];
        }
      }
    }

    return config
  }

  _cleanTipClass() {
    const tip = this.getTipElement();
    const tabClass = tip.getAttribute('class').match(BSCLS_PREFIX_REGEX);
    if (tabClass !== null && tabClass.length > 0) {
      tabClass.map(token => token.trim())
        .forEach(tClass => tip.classList.remove(tClass));
    }
  }

  _handlePopperPlacementChange(popperData) {
    const { state } = popperData;

    if (!state) {
      return
    }

    this.tip = state.elements.popper;
    this._cleanTipClass();
    this._addAttachmentClass(this._getAttachment(state.placement));
  }

  // Static

  static jQueryInterface(config) {
    return this.each(function () {
      let data = Data.getData(this, DATA_KEY);
      const _config = typeof config === 'object' && config;

      if (!data && /dispose|hide/.test(config)) {
        return
      }

      if (!data) {
        data = new Tooltip(this, _config);
      }

      if (typeof config === 'string') {
        if (typeof data[config] === 'undefined') {
          throw new TypeError(`No method named "${config}"`)
        }

        data[config]();
      }
    })
  }
}

/**
 * ------------------------------------------------------------------------
 * jQuery
 * ------------------------------------------------------------------------
 * add .Tooltip to jQuery only if jQuery is present
 */

onDOMContentLoaded(() => {
  const $ = getjQuery();
  /* istanbul ignore if */
  if ($) {
    const JQUERY_NO_CONFLICT = $.fn[NAME];
    $.fn[NAME] = Tooltip.jQueryInterface;
    $.fn[NAME].Constructor = Tooltip;
    $.fn[NAME].noConflict = () => {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return Tooltip.jQueryInterface
    };
  }
});

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.0.0-beta1): popover.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

const NAME$1 = 'popover';
const DATA_KEY$1 = 'bs.popover';
const EVENT_KEY$1 = `.${DATA_KEY$1}`;
const CLASS_PREFIX$1 = 'bs-popover';
const BSCLS_PREFIX_REGEX$1 = new RegExp(`(^|\\s)${CLASS_PREFIX$1}\\S+`, 'g');

const Default$1 = {
  ...Tooltip.Default,
  placement: 'right',
  trigger: 'click',
  content: '',
  template: '<div class="popover" role="tooltip">' +
              '<div class="popover-arrow"></div>' +
                '<h3 class="popover-header"></h3>' +
              '<div class="popover-body"></div>' +
            '</div>'
};

const DefaultType$1 = {
  ...Tooltip.DefaultType,
  content: '(string|element|function)'
};

const Event$1 = {
  HIDE: `hide${EVENT_KEY$1}`,
  HIDDEN: `hidden${EVENT_KEY$1}`,
  SHOW: `show${EVENT_KEY$1}`,
  SHOWN: `shown${EVENT_KEY$1}`,
  INSERTED: `inserted${EVENT_KEY$1}`,
  CLICK: `click${EVENT_KEY$1}`,
  FOCUSIN: `focusin${EVENT_KEY$1}`,
  FOCUSOUT: `focusout${EVENT_KEY$1}`,
  MOUSEENTER: `mouseenter${EVENT_KEY$1}`,
  MOUSELEAVE: `mouseleave${EVENT_KEY$1}`
};

const CLASS_NAME_FADE$1 = 'fade';
const CLASS_NAME_SHOW$1 = 'show';

const SELECTOR_TITLE = '.popover-header';
const SELECTOR_CONTENT = '.popover-body';

/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

class Popover extends Tooltip {
  // Getters

  static get Default() {
    return Default$1
  }

  static get NAME() {
    return NAME$1
  }

  static get DATA_KEY() {
    return DATA_KEY$1
  }

  static get Event() {
    return Event$1
  }

  static get EVENT_KEY() {
    return EVENT_KEY$1
  }

  static get DefaultType() {
    return DefaultType$1
  }

  // Overrides

  isWithContent() {
    return this.getTitle() || this._getContent()
  }

  setContent() {
    const tip = this.getTipElement();

    // we use append for html objects to maintain js events
    this.setElementContent(SelectorEngine.findOne(SELECTOR_TITLE, tip), this.getTitle());
    let content = this._getContent();
    if (typeof content === 'function') {
      content = content.call(this._element);
    }

    this.setElementContent(SelectorEngine.findOne(SELECTOR_CONTENT, tip), content);

    tip.classList.remove(CLASS_NAME_FADE$1, CLASS_NAME_SHOW$1);
  }

  // Private

  _addAttachmentClass(attachment) {
    this.getTipElement().classList.add(`${CLASS_PREFIX$1}-${this.updateAttachment(attachment)}`);
  }

  _getContent() {
    return this._element.getAttribute('data-bs-content') || this.config.content
  }

  _cleanTipClass() {
    const tip = this.getTipElement();
    const tabClass = tip.getAttribute('class').match(BSCLS_PREFIX_REGEX$1);
    if (tabClass !== null && tabClass.length > 0) {
      tabClass.map(token => token.trim())
        .forEach(tClass => tip.classList.remove(tClass));
    }
  }

  // Static

  static jQueryInterface(config) {
    return this.each(function () {
      let data = Data.getData(this, DATA_KEY$1);
      const _config = typeof config === 'object' ? config : null;

      if (!data && /dispose|hide/.test(config)) {
        return
      }

      if (!data) {
        data = new Popover(this, _config);
        Data.setData(this, DATA_KEY$1, data);
      }

      if (typeof config === 'string') {
        if (typeof data[config] === 'undefined') {
          throw new TypeError(`No method named "${config}"`)
        }

        data[config]();
      }
    })
  }
}

/**
 * ------------------------------------------------------------------------
 * jQuery
 * ------------------------------------------------------------------------
 * add .Popover to jQuery only if jQuery is present
 */

onDOMContentLoaded(() => {
  const $ = getjQuery();
  /* istanbul ignore if */
  if ($) {
    const JQUERY_NO_CONFLICT = $.fn[NAME$1];
    $.fn[NAME$1] = Popover.jQueryInterface;
    $.fn[NAME$1].Constructor = Popover;
    $.fn[NAME$1].noConflict = () => {
      $.fn[NAME$1] = JQUERY_NO_CONFLICT;
      return Popover.jQueryInterface
    };
  }
});

Joomla = Joomla || {};
Joomla.Bootstrap = Joomla.Bootstrap || {};
Joomla.Bootstrap.Initialise = Joomla.Bootstrap.Initialise || {};
Joomla.Bootstrap.Instances = Joomla.Bootstrap.Instances || {};
Joomla.Bootstrap.Instances.Popover = new WeakMap();
Joomla.Bootstrap.Instances.Tooltip = new WeakMap();

/**
 * Initialise the Popover iteractivity
 *
 * @param {HTMLElement} el The element that will become an popover
 * @param {object} options The options for this popover
 */
Joomla.Bootstrap.Initialise.Popover = (el, options) => {
  if (!(el instanceof Element)) {
    return;
  }
  if (Joomla.Bootstrap.Instances.Popover.get(el)) {
    el.dispose();
  }
  Joomla.Bootstrap.Instances.Popover.set(el, new Popover(el, options));
};

/**
 * Initialise the Tooltip iteractivity
 *
 * @param {HTMLElement} el The element that will become an tooltip
 * @param {object} options The options for this tooltip
 */
Joomla.Bootstrap.Initialise.Tooltip = (el, options) => {
  if (Joomla.Bootstrap.Instances.Tooltip.get(el)) {
    el.dispose();
  }
  Joomla.Bootstrap.Instances.Tooltip.set(el, new Tooltip(el, options));
};

const tooltips = Joomla.getOptions('bootstrap.tooltip');
const popovers = Joomla.getOptions('bootstrap.popover');

// Force Vanilla mode!
if (!document.body.dataset.hasOwnProperty('bsNoJquery')) {
  document.body.dataset.bsNoJquery = '';
}

if (popovers) {
  Object.keys(popovers).forEach((popover) => {
    const opt = popovers[popover];
    const options = {
      animation: opt.animation ? opt.animation : true,
      container: opt.container ? opt.container : false,
      content: opt.content ? opt.content : '',
      delay: opt.delay ? opt.delay : 0,
      html: opt.html ? opt.html : false,
      placement: opt.placement ? opt.placement : 'top',
      selector: opt.selector ? opt.selector : false,
      title: opt.title ? opt.title : '',
      trigger: opt.trigger ? opt.trigger : 'click',
      offset: opt.offset ? opt.offset : 0,
      fallbackPlacement: opt.fallbackPlacement ? opt.fallbackPlacement : 'flip',
      boundary: opt.boundary ? opt.boundary : 'scrollParent',
      customClass: opt.customClass ? opt.customClass : '',
      sanitize: opt.sanitize ? opt.sanitize : true,
      sanitizeFn: opt.sanitizeFn ? opt.sanitizeFn : null,
      popperConfig: opt.popperConfig ? opt.popperConfig : null,
    };

    if (opt.template) {
      options.template = opt.template;
    }
    if (opt.allowList) {
      options.allowList = opt.allowList;
    }

    Array.from(document.querySelectorAll(popover)).map((el) => Joomla.Bootstrap.Initialise.Popover(el, options));
  });
}

if (tooltips) {
  Object.keys(tooltips).forEach((tooltip) => {
    const opt = tooltips[tooltip];
    const options = {
      animation: opt.animation ? opt.animation : true,
      container: opt.container ? opt.container : false,
      delay: opt.delay ? opt.delay : 0,
      html: opt.html ? opt.html : false,
      selector: opt.selector ? opt.selector : false,
      trigger: opt.trigger ? opt.trigger : 'hover focus',
      fallbackPlacement: opt.fallbackPlacement ? opt.fallbackPlacement : null,
      boundary: opt.boundary ? opt.boundary : 'clippingParents',
      title: opt.title ? opt.title : '',
      customClass: opt.customClass ? opt.customClass : '',
      sanitize: opt.sanitize ? opt.sanitize : true,
      sanitizeFn: opt.sanitizeFn ? opt.sanitizeFn : null,
      popperConfig: opt.popperConfig ? opt.popperConfig : null,
    };

    if (opt.placement) {
      options.placement = opt.placement;
    }
    if (opt.template) {
      options.template = opt.template;
    }
    if (opt.allowList) {
      options.allowList = opt.allowList;
    }

    Array.from(document.querySelectorAll(tooltip)).map((el) => Joomla.Bootstrap.Initialise.Tooltip(el, options));
  });
}

export { Popover as P };
