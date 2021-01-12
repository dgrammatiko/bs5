import Tooltip from '../../node_modules/bootstrap/js/src/tooltip.js'

if (window.Joomla) {
  window.Joomla.Bootstrap = window.Joomla.Bootstrap || {};
  window.Joomla.Bootstrap.Methods = window.Joomla.Bootstrap.Methods || {};
  window.Joomla.Bootstrap.Instances = window.Joomla.Bootstrap.Instances || {};
  window.Joomla.Bootstrap.Methods.Tooltip = Tooltip;

  const tooltips= Joomla.getOptions('bootstrap.tooltip');

  if (tooltips && tooltips.length) {
    window.Joomla.Bootstrap.Instances.Tooltip = new WeakMap();

    tooltips.forEach((selector, options) => {
      const tooltip = document.querySelector(selector);
      if (tooltip) {
        const instance = new Joomla.Bootstrap.Methods.Tooltip(tooltip);
        window.Joomla.Bootstrap.Instances.Tooltip.set(tooltip, instance);
      }
    });
  }
}

export default Tooltip
