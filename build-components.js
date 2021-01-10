#!/usr/bin/env node

/*!
 * Script to build our plugins to use them separately.
 * Copyright 2020-2021 The Bootstrap Authors
 * Copyright 2020-2021 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 */

'use strict'

const {mkdirSync, existsSync} = require('fs');
const path = require('path')
const rollup = require('rollup')
const { babel } = require('@rollup/plugin-babel')
const { terser } = require('rollup-plugin-terser');
const replace = require('@rollup/plugin-replace');


function skipES6notation(path, isnMin) {
  if ([
  'data.js',
  'event-handler.js',
  'manipulator.js',
  'selector-engine.js',
  'index.js'
].includes(path)) {
  return path;
}

return isnMin ? path.replace('.js', '.es6.min.js') : path.replace('.js', '.es6.js')
}

if (!existsSync(path.resolve(__dirname, 'dist/js'))) {
  mkdirSync(path.resolve(__dirname, 'dist/js'), {recursive: true})
}

const rootPath = path.resolve(__dirname, 'dist/js')

const plugins = [
    replace({
      // Imports
      'import * as Popper from \'@popperjs/core\'' : 'import * as Popper from \'./popper/index.js\'',
      // 'import Data from \'./dom/data.js\'': 'import Data from \'./dom/data.es6.js\'',
      // 'import EventHandler from \'./dom/event-handler.js\'': 'import EventHandler from \'./dom/event-handler.es6.js\'',
      // 'import Manipulator from \'./dom/manipulator.js\'': 'import Manipulator from \'./dom/manipulator.es6.js\'',
      // 'import SelectorEngine from \'./dom/selector-engine.js\'': 'import SelectorEngine from \'./dom/selector-engine.es6.js\'',

      // Exports
      'export default Alert;': `window.Joomla = window.Joomla || {};
window.Joomla.Bootstrap = window.Joomla.Bootstrap || {};
window.Joomla.Bootstrap.Alert = Alert;

export default Alert;`,

      'export default Button;': `window.Joomla = window.Joomla || {};
window.Joomla.Bootstrap = window.Joomla.Bootstrap || {};
window.Joomla.Bootstrap.Button = Button;

export default Button;`,

      'export default Carousel;': `window.Joomla = window.Joomla || {};
window.Joomla.Bootstrap = window.Joomla.Bootstrap || {};
window.Joomla.Bootstrap.Carousel = Carousel;

export default Carousel;`,

      'export default Collapse;': `window.Joomla = window.Joomla || {};
window.Joomla.Bootstrap = window.Joomla.Bootstrap || {};
window.Joomla.Bootstrap.Collapse = Collapse;

export default Collapse;`,

      'export default Dropdown;': `window.Joomla = window.Joomla || {};
window.Joomla.Bootstrap = window.Joomla.Bootstrap || {};
window.Joomla.Bootstrap.Dropdown = Dropdown;

export default Dropdown;`,

      'export default Modal;': `window.Joomla = window.Joomla || {};
window.Joomla.Bootstrap = window.Joomla.Bootstrap || {};
window.Joomla.Bootstrap.Modal = Modal;

export default Modal;`,

      'export default Popover;': `window.Joomla = window.Joomla || {};
window.Joomla.Bootstrap = window.Joomla.Bootstrap || {};
window.Joomla.Bootstrap.Popover = Popover;
window.Joomla.Bootstrap.Tooltip = Tooltip;
export default Tooltip;
export default Popover;`,

      'export default Scrollspy;': `window.Joomla = window.Joomla || {};
window.Joomla.Bootstrap = window.Joomla.Bootstrap || {};
window.Joomla.Bootstrap.Scrollspy = Scrollspy;

export default Scrollspy;`,

      'export default Tab;': `window.Joomla = window.Joomla || {};
window.Joomla.Bootstrap = window.Joomla.Bootstrap || {};
window.Joomla.Bootstrap.Tab = Tab;

export default Tab;`,

      'export default Toast;': `window.Joomla = window.Joomla || {};
window.Joomla.Bootstrap = window.Joomla.Bootstrap || {};
window.Joomla.Bootstrap.Toast = Toast;

export default Toast;`,

      'export default Tooltip;': `window.Joomla = window.Joomla || {};
window.Joomla.Bootstrap = window.Joomla.Bootstrap || {};
window.Joomla.Bootstrap.Tooltip = Tooltip;

export default Tooltip;`,

    delimiters: ['', '']
    }),
  // babel({
  //   // Only transpile our source code
  //   exclude: 'node_modules/**',
  //   // Include the helpers in each file, at most one copy of each
  //   babelHelpers: 'bundled'
  // }),
]
const bsPlugins = {
  Data: path.resolve(__dirname, 'src/js/dom/data.js'),
  EventHandler: path.resolve(__dirname, 'src/js/dom/event-handler.js'),
  Manipulator: path.resolve(__dirname, 'src/js/dom/manipulator.js'),
  SelectorEngine: path.resolve(__dirname, 'src/js/dom/selector-engine.js'),
  Popper: path.resolve(__dirname, 'src/js/popper/index.js'),
  Alert: 'src/js/alert.js',
  Button: path.resolve(__dirname, 'src/js/button.js'),
  Carousel: path.resolve(__dirname, 'src/js/carousel.js'),
  Collapse: path.resolve(__dirname, 'src/js/collapse.js'),
  Dropdown: path.resolve(__dirname, 'src/js/dropdown.js'),
  Modal: path.resolve(__dirname, 'src/js/modal.js'),
  Popover: path.resolve(__dirname, 'src/js/popover.js'),
  ScrollSpy: path.resolve(__dirname, 'src/js/scrollspy.js'),
  Tab: path.resolve(__dirname, 'src/js/tab.js'),
  Toast: path.resolve(__dirname, 'src/js/toast.js'),
  // Tooltip: path.resolve(__dirname, 'src/js/tooltip.js')
}

const defaultPluginConfig = {
  external: [
    bsPlugins.Data,
    bsPlugins.EventHandler,
    bsPlugins.SelectorEngine,
    bsPlugins.Popper,
  ],
  globals: {
    [bsPlugins.Data]: 'Data',
    [bsPlugins.EventHandler]: 'EventHandler',
    [bsPlugins.SelectorEngine]: 'SelectorEngine',
    [bsPlugins.Popper]: 'Popper',
  }
}

const getConfigByPluginKey = pluginKey => {
  if (
    pluginKey === 'Data' ||
    pluginKey === 'Manipulator' ||
    pluginKey === 'EventHandler' ||
    pluginKey === 'SelectorEngine' ||
    pluginKey === 'Util' ||
    pluginKey === 'Sanitizer' ||
    pluginKey === 'Popper'
  ) {
    return {
      external: []
    }
  }

  if (pluginKey === 'Alert' || pluginKey === 'Tab') {
    return defaultPluginConfig
  }

  if (
    pluginKey === 'Button' ||
    pluginKey === 'Carousel' ||
    pluginKey === 'Collapse' ||
    pluginKey === 'Modal' ||
    pluginKey === 'ScrollSpy'
  ) {
    const config = Object.assign(defaultPluginConfig)
    config.external.push(bsPlugins.Manipulator)
    config.globals[bsPlugins.Manipulator] = 'Manipulator'
    return config
  }

  if (pluginKey === 'Dropdown' || pluginKey === 'Tooltip') {
    const config = Object.assign(defaultPluginConfig)
    config.external.push(bsPlugins.Manipulator)
    config.external.push(bsPlugins.Manipulator, bsPlugins.Popper)
    config.globals[bsPlugins.Manipulator] = 'Manipulator'
    config.globals[bsPlugins.Popper] = 'Popper'
    return config
  }

  if (pluginKey === 'Popover') {
    return {
      external: [
        bsPlugins.Data,
        bsPlugins.SelectorEngine,
        // bsPlugins.Tooltip
      ],
      globals: {
        [bsPlugins.Data]: 'Data',
        [bsPlugins.SelectorEngine]: 'SelectorEngine',
        // [bsPlugins.Tooltip]: 'Tooltip'
      }
    }
  }

  if (pluginKey === 'Toast') {
    return {
      external: [
        bsPlugins.Data,
        bsPlugins.EventHandler,
        bsPlugins.Manipulator
      ],
      globals: {
        [bsPlugins.Data]: 'Data',
        [bsPlugins.EventHandler]: 'EventHandler',
        [bsPlugins.Manipulator]: 'Manipulator'
      }
    }
  }
}

const utilObjects = new Set([
  'Util',
  'Sanitizer'
])

const domObjects = new Set([
  'Data',
  'EventHandler',
  'Manipulator',
  'SelectorEngine'
])

const popperObjects = new Set([
  'Popper',
]);


const build = async plugin => {
  console.log(`Building ${plugin} plugin...`)

  const { external, globals } = getConfigByPluginKey(plugin)
  const pluginFilename = path.basename(bsPlugins[plugin])
  let pluginPath = rootPath

  if (utilObjects.has(plugin)) {
    pluginPath = `${rootPath}/util/`
  }

  if (domObjects.has(plugin)) {
    pluginPath = `${rootPath}/dom/`
  }

  if (popperObjects.has(plugin)) {
    pluginPath = `${rootPath}/popper/`
  }

  const bundle = await rollup.rollup({
    input: bsPlugins[plugin],
    plugins,
    external
  })

  await bundle.write({
    format: 'es',
    name: plugin,
    sourcemap: false,
    globals,
    file: path.resolve(__dirname, `${pluginPath}/${skipES6notation(pluginFilename, false)}`)
  })

  console.log(`Building ${plugin} plugin... Done!`)
}

const buildMin = async plugin => {
  console.log(`Building ${plugin} plugin...`)

  const { external, globals } = getConfigByPluginKey(plugin)
  const pluginFilename = path.basename(bsPlugins[plugin])
  let pluginPath = rootPath

  if (utilObjects.has(plugin)) {
    pluginPath = `${rootPath}/util/`
  }

  if (domObjects.has(plugin)) {
    pluginPath = `${rootPath}/dom/`
  }

  if (popperObjects.has(plugin)) {
    pluginPath = `${rootPath}/popper/`
  }

  plugins.push(terser());

  const bundle = await rollup.rollup({
    input: bsPlugins[plugin],
    plugins,
    external
  })

  await bundle.write({
    format: 'es',
    name: plugin,
    sourcemap: false,
    globals,
    file: path.resolve(__dirname, `${pluginPath}/${skipES6notation(pluginFilename, true)}`)
  })

  console.log(`Building ${plugin} plugin... Done!`)
}

const main = async () => {
  try {
    await Promise.all(Object.keys(bsPlugins).map(plugin => build(plugin)))
  } catch (error) {
    console.error(error)

    process.exit(1)
  }

    try {
    await Promise.all(Object.keys(bsPlugins).map(plugin => buildMin(plugin)))
  } catch (error) {
    console.error(error)

    process.exit(1)
  }
}

main()
