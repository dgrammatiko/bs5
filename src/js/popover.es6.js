import Popover from '../../node_modules/bootstrap/js/src/popover.js'
import Tooltip from '../../node_modules/bootstrap/js/src/tooltip.js'

if (window.Joomla) {
  window.Joomla.Bootstrap = window.Joomla.Bootstrap || {};
  window.Joomla.Bootstrap.Methods = window.Joomla.Bootstrap.Methods || {};
  window.Joomla.Bootstrap.Instances = window.Joomla.Bootstrap.Instances || {};
  window.Joomla.Bootstrap.Methods.Popover = Popover;
  window.Joomla.Bootstrap.Instances.Popover = new WeakMap();

  const popovers= Joomla.getOptions('bootstrap.popover');

  if (popovers && popovers.length) {
    popovers.forEach((selector, options) => {
      const popover = document.querySelector(selector);

      if (popover) {
        const instance = new Joomla.Bootstrap.Methods.Popover(popover, options);
        window.Joomla.Bootstrap.Instances.Popover.set(popover, instance);
      }
    });
  }
}

if (window.Joomla) {
  window.Joomla.Bootstrap = window.Joomla.Bootstrap || {};
  window.Joomla.Bootstrap.Methods = window.Joomla.Bootstrap.Methods || {};
  window.Joomla.Bootstrap.Instances = window.Joomla.Bootstrap.Instances || {};
  window.Joomla.Bootstrap.Methods.Tooltip = Tooltip;

  if (!window.Joomla.Bootstrap.Instances.Tooltip) {
    window.Joomla.Bootstrap.Instances.Tooltip = new WeakMap();

    const tooltips= Joomla.getOptions('bootstrap.tooltip');

    if (tooltips && tooltips.length) {
      tooltips.forEach((selector, options) => {
        const tooltip = document.querySelector(selector);

        if (tooltip) {
          const instance = new Joomla.Bootstrap.Methods.Tooltip(tooltip);
          window.Joomla.Bootstrap.Instances.Tooltip.set(tooltip, instance);
        }
      });
    }
  }
}

export { Tooltip, Popover }
