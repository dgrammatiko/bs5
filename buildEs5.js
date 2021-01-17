const { readFile, writeFile } = require('fs').promises;
const {minify} = require('terser');
const rollup = require('rollup')
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const replace = require('@rollup/plugin-replace');
const { babel } = require('@rollup/plugin-babel')


const build = async plugin => {
  console.log(`Building Legacy...`)

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
    file: 'dist/js/bootstrap.es5.js',
  })

  console.log(`Building legacy... Done!`)
}

const main = async () => {
  try {
    await build('src/js/index.es6.js');

    const es5File = await readFile('dist/js/bootstrap.es5.js', {encoding: 'utf8'});
    const mini = await minify(es5File);
    await writeFile('dist/js/bootstrap.es5.min.js', mini.code, {encoding: 'utf8'});
  } catch (error) {
    console.error(error)

    process.exit(1)
  }
}

main();
