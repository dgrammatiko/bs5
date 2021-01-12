const rollup = require('rollup')
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const replace = require('@rollup/plugin-replace');
const { readdir, readFile, rename, writeFile, rm } = require('fs').promises;
const {resolve} = require('path');
const {minify} = require('terser');
const rimraf = require('rimraf');

rimraf.sync('dist');

const plugins = [
nodeResolve(),
replace({
  'process.env.NODE_ENV': '\'production\''
})
];

const bsPlugins = {
  xxx: 'src/js/index.es6.js'
}

const getConfigByPluginKey = pluginKey => {

  if (pluginKey === 'Dropdown' || pluginKey === 'Tooltip') {
    return {
      external: [
        './dom/data.js',
        './event-handler.js',
        './dom/manipulator.js',
        './selector-engine.js',
        './util/index.js',
        '@popperjs/core'
      ],
    }
  }

  if (pluginKey === 'Popover') {
    return {
      external: [
        './base-component.js',
        './dom/data.js',
        './event-handler.js',
        './dom/manipulator.js',
        './selector-engine.js',
        './util/index.js',
      ],
    }
  }

    return {
      external: [
        './dom/data.js',
        './event-handler.js',
        './dom/manipulator.js',
        './selector-engine.js',
        './util/index.js'
      ],
    }
}


const build = async plugin => {
  console.log(`Building ${plugin} plugin...`)

  const { external } = getConfigByPluginKey(plugin)

  const bundle = await rollup.rollup({
    input: bsPlugins[plugin],
    plugins,
    external,
    manualChunks: {
      'alert': [
        'src/js/alert.es6.js'
      ],
      'button': [
        'src/js/button.es6.js'
      ],
      'carousel': [
        'src/js/carousel.es6.js'
      ],
      'collapse': [
        'src/js/collapse.es6.js'
      ],
      'dropdown': [
        'src/js/dropdown.es6.js'
      ],
      'modal': [
        'src/js/modal.es6.js'
      ],
      'popover': [
        'src/js/popover.es6.js'
      ],
      'scrollspy': [
        'src/js/scrollspy.es6.js'
      ],
      'tab': [
        'src/js/tab.es6.js'
      ],
      'toast': [
        'src/js/toast.es6.js'
      ],
      'tooltip': [
        'src/js/tooltip.es6.js'
      ],
      'popper': [
        '@popperjs/core'
      ],
      'dom': [
        'node_modules/bootstrap/js/src/base-component.js',
        'node_modules/bootstrap/js/src/dom/data.js',
        'node_modules/bootstrap/js/src/dom/event-handler.js',
        'node_modules/bootstrap/js/src/dom/manipulator.js',
        'node_modules/bootstrap/js/src/dom/selector-engine.js',
        'node_modules/bootstrap/js/src/util/index.js',
      ]
    },
  })

  await bundle.write({
    format: 'es',
    name: plugin,
    sourcemap: false,
    dir: 'dist/js',
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
}

const addJoomlaCode = async (file) => {

  const initial = await readFile(resolve('dist/js', file), {encoding: 'utf8'});
  await rename(resolve('dist/js', file), resolve(`dist/js/${file.split('-')[0]}.es6.js`));

  const mini = await minify(initial)

  await writeFile(resolve('dist/js', `${file.split('-')[0]}.es6.min.js`), mini.code, {encoding: 'utf8'});
};

const finalise = async () => {
  const files = await readdir('dist/js');
  const tasks = [];
  files.forEach(file => {
    if (file.startsWith('dom-') || file.startsWith('popper-')) {
      return;
    }
    tasks.push(addJoomlaCode(file))
  })

  await Promise.all(tasks).catch(er => console.log(er));

  await rm(resolve('dist/js/index.es6.js.es6.js'))
  await rm(resolve('dist/js/index.es6.js.es6.min.js'))
};

main().then(() => finalise()).catch(err => console.log(err));
