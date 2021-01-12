import Tab from '../../node_modules/bootstrap/js/src/tab.js'

if (window.Joomla) {
  window.Joomla.Bootstrap = window.Joomla.Bootstrap || {};
  window.Joomla.Bootstrap.Methods = window.Joomla.Bootstrap.Methods || {};
  window.Joomla.Bootstrap.Instances = window.Joomla.Bootstrap.Instances || {};
  window.Joomla.Bootstrap.Methods.Tab = Tab;
  window.Joomla.Bootstrap.Instances.Tab = new WeakMap();

  const tabs= Joomla.getOptions('bootstrap.tab');

  if (tabs) {
    for (const tabSelector in tabs) {
      const nSelector = tabSelector.split('.')[1];
      const tab = document.querySelector(`#${nSelector}Content`);

      if (tab) {
        const related = Array.from(tab.children);

        // Build the navigation
        if (related.length) {
          related.forEach((element) => {
            if (!element.classList.contains('tab-pane')) {
              return;
            }

            const isActive = element.dataset.active !== '' ? true : false;
            const ul = document.querySelector(`#${nSelector}Tabs`);

            if (ul) {
              const link = document.createElement('a');
              link.href = `#${element.dataset.id}`;
              link.classList.add('nav-link')
              if (isActive) {
                link.classList.add('active')
              }

              link.dataset.bsToggle = 'tab';
              link.setAttribute('role', 'tab');
              link.setAttribute('aria-controls', element.dataset.id);
              link.setAttribute('aria-selected', element.dataset.id);

              link.innerHTML = element.dataset.title; // Not safe!!!

              const li = document.createElement('li');
              li.classList.add('nav-item');
              li.setAttribute('role', 'presentation');
              li.appendChild(link);

              ul.appendChild(li)
            }
          })
        }

        const instance = new Joomla.Bootstrap.Methods.Tab(tab);
        window.Joomla.Bootstrap.Instances.Tab.set(tab, instance);
      }
    }
  }
}

export default Tab
