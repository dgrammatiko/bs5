import Popover from '../../node_modules/bootstrap/js/src/popover.js'
import Tooltip from '../../node_modules/bootstrap/js/src/tooltip.js'

if (window.Joomla) {
  window.Joomla.Bootstrap = window.Joomla.Bootstrap || {};
  window.Joomla.Bootstrap.Methods = window.Joomla.Bootstrap.Methods || {};
  window.Joomla.Bootstrap.Instances = window.Joomla.Bootstrap.Instances || {};
  window.Joomla.Bootstrap.Methods.Popover = Popover;
  window.Joomla.Bootstrap.Instances.Popover = new WeakMap();

  const popovers= Joomla.getOptions('bootstrap.popover');

  if (popovers) {
    for (const popover in popovers) {
      const popoverElements = document.querySelectorAll(popover);

      if (popoverElements) {
        popoverElements.map((el) => window.Joomla.Bootstrap.Instances.Popover.set(popoverElement, new Joomla.Bootstrap.Methods.Popover(el, popovers[popover])));
      }
    }
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

    if (tooltips) {
      for (const tooltip in tooltips) {
        const tooltipElement = document.querySelector(tooltip);

        if (tooltipElement) {
          const instance = new Joomla.Bootstrap.Methods.Tooltip(tooltipElement, tooltips[tooltip]);
          window.Joomla.Bootstrap.Instances.Tooltip.set(tooltipElement, instance);
        }
      }
    }
  }
}

export { Tooltip, Popover }
