import Tooltip from '../../node_modules/bootstrap/js/src/tooltip.js'

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
        const tooltipElements = document.querySelectorAll(tooltip);

        if (tooltipElements.length) {
          tooltipElements.map((el) => window.Joomla.Bootstrap.Instances.Tooltip.set(el, new Joomla.Bootstrap.Methods.Tooltip(el, tooltips[tooltip])));
        }
      }
    }
  }
}

export default Tooltip
