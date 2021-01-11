const { readdir, readFile, rename, writeFile, rm } = require('fs').promises;
const {resolve} = require('path');
const {minify} = require('terser');

const addJoomlaCode = async (file) => {

  const initial = await readFile(resolve('dist/js', file), {encoding: 'utf8'});
  await rename(resolve('dist/js', file), resolve(`dist/js/${file.split('-')[0]}.es6.js`));

  const mini = await minify(initial)

  await writeFile(resolve('dist/js', `${file.split('-')[0]}.es6.min.js`), mini.code, {encoding: 'utf8'});
};

(async () => {
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
})()
