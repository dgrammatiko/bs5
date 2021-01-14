import Collapse from '../../node_modules/bootstrap/js/src/collapse.js'

Joomla = Joomla || {};
Joomla.Bootstrap = Joomla.Bootstrap || {};
Joomla.Bootstrap.Initialise = Joomla.Bootstrap.Initialise || {};
Joomla.Bootstrap.Instances = Joomla.Bootstrap.Instances || {};
Joomla.Bootstrap.Instances.Collapse = new WeakMap();

/**
 * Initialise the Collapse iteractivity
 *
 * @param {HTMLElement} el The element that will become an collapse
 * @param {object} options The options for this collapse
 */
Joomla.Bootstrap.Initialise.Collapse = (el, options) => {
  if (typeof el !== HTMLElement) {
    return;
  }
  if (Joomla.Bootstrap.Instances.Collapse.get(el)) {
    el.dispose();
  }
  Joomla.Bootstrap.Instances.Collapse.set(el, new Collapse(el, options));
};

const collapses = { ...Joomla.getOptions('bootstrap.collapse'), ...Joomla.getOptions('bootstrap.accordion')};

if (collapses) {
  Object.keys(collapses).map((collapse) => {
    const opt = collapses[collapse];
    const options = {
      toggle: opt.toggle ? opt.toggle : true,
    };

    if (opt.parent) {
      options.parent = opt.parent;
    }

    Array.from(document.querySelectorAll(collapse)).map((el) => Joomla.Bootstrap.Initialise.Collapse(el, options));
  });
}

export default Collapse
