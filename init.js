const {stats, mkdir, copy} = require('fs-extra');

(async () => {
  try {
    await mkdir('src')
  } catch (e) {
    console.log('folder exists');
  }

  await copy('node_modules/bootstrap/js/src', 'src/js');
  await copy('node_modules/@popperjs/core/dist/esm', 'src/js/popper')
})()
