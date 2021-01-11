import Tab from '../../node_modules/bootstrap/js/src/tab.js'

if (window.Joomla) {
  window.Joomla.Bootstrap = window.Joomla.Bootstrap || {};
  window.Joomla.Bootstrap.Methods = window.Joomla.Bootstrap.Methods || {};
  window.Joomla.Bootstrap.Instances = window.Joomla.Bootstrap.Instances || {};
  window.Joomla.Bootstrap.Methods.Tab = Tab;

  const tabs= Joomla.getOptions('bootstrap.tab');
  if (tabs.length) {
    window.Joomla.Bootstrap.Instances.Tab = new WeakMap();
    tabs.forEach((selector) => {
      const tab = document.querySelectorAll(selector);
      if (tab) {
        const instance = new Joomla.Bootstrap.Methods.Tab(tab);
        window.Joomla.Bootstrap.Instances.Tab.set(tab, instance);
      }
    });
  }
}

export default Tab
