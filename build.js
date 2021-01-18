const { readdir, readFile, rename, writeFile, rm } = require('fs').promises;
const {resolve} = require('path');
const {minify} = require('terser');
const rimraf = require('rimraf');
const rollup = require('rollup')
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const replace = require('@rollup/plugin-replace');
const { babel } = require('@rollup/plugin-babel');
const tasks = [];

const createMinified = async (file) => {
  const initial = await readFile(resolve('dist/js', file), {encoding: 'utf8'});
  const mini = await minify(initial);
  await rename(resolve('dist/js', file), resolve(`dist/js/${file.split('-')[0]}.es6.js`));
  await writeFile(resolve('dist/js', `${file.split('-')[0]}.es6.min.js`), mini.code, {encoding: 'utf8'});
};

const build = async _ => {
  console.log(`Building ES6 Components...`)

  const bundle = await rollup.rollup({
    input: 'src/js/index.es6.js',
    plugins: [
      nodeResolve(),
      replace({
        'process.env.NODE_ENV': '\'production\''
      })
    ],
    external: [
      './base-component.js',
      './dom/data.js',
      './event-handler.js',
      './dom/manipulator.js',
      './selector-engine.js',
      './util/index.js',
    ],
    manualChunks: {
      'alert': [ 'src/js/alert.es6.js', ],
      'button': [ 'src/js/button.es6.js', ],
      'carousel': [ 'src/js/carousel.es6.js', ],
      'collapse': [ 'src/js/collapse.es6.js', ],
      'dropdown': [ 'src/js/dropdown.es6.js', ],
      'modal': [ 'src/js/modal.es6.js', ],
      'popover': [ 'src/js/popover.es6.js', ],
      'scrollspy': [ 'src/js/scrollspy.es6.js', ],
      'tab': [ 'src/js/tab.es6.js', ],
      'toast': [ 'src/js/toast.es6.js', ],
      'popper': [ '@popperjs/core', ],
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
    sourcemap: false,
    dir: 'dist/js',
  });
}

const buildLegacy = async _ => {
  console.log(`Building Legacy...`);

  const bundle = await rollup.rollup({
    input: 'src/js/index.es6.js',
    plugins: [
      nodeResolve(),
      replace({
        'process.env.NODE_ENV': '\'production\''
      }),
      babel({
        exclude: 'node_modules/core-js/**',
        babelHelpers: 'bundled',
        babelrc: false,
        presets: [
          [
            '@babel/preset-env',
            {
              corejs: '3.8',
              useBuiltIns: 'usage',
              targets: {
                "chrome": "58",
                "ie": "11"
              },
              loose: true,
              bugfixes: true,
              modules: false
            }
          ]
        ]
      })
    ],
    external: [],
  })

  await bundle.write({
    format: 'iife',
    sourcemap: false,
    name: 'Bootstrap',
    file: 'dist/js/bootstrap.es5.js',
  })
}

(async () => {
  rimraf.sync('dist');

  try {
    await build('src/js/index.es6.js');
    await rm(resolve('dist/js/index.es6.js'));
  } catch (error) {
    console.error(error)
    process.exit(1)
  }

  (await readdir('dist/js')).forEach(file => {
    if (!(file.startsWith('dom-') || file.startsWith('popper-'))) {
      tasks.push(createMinified(file))
    }
  });

  await Promise.all(tasks).catch(er => console.log(er));
  console.log(`ES6 components ready ✅`)

  try {
    await buildLegacy('src/js/index.es6.js');
    const es5File = await readFile('dist/js/bootstrap.es5.js', {encoding: 'utf8'});
    const mini = await minify(es5File);
    await writeFile('dist/js/bootstrap.es5.min.js', mini.code, {encoding: 'utf8'});
    console.log(`Legacy done! ✅`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
