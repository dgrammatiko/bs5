const _ = require('lodash');

const {writeFileSync} = require('fs')
const components = [
  'Alert',
  'Button',
  'Carousel',
  'Collapse',
  'Dropdown',
  'Modal',
  'Popover',
  'Scrollspy',
  'Tab',
  'Toast',
  'Tooltip'
];

const final = [];
const comps = {};

components.forEach((component) => {
  const filtered = components.filter(c => c !== component);

  const length = filtered.length;

  for (let i = 0; i < length; i++) {
    let filtered1 = filtered.slice(0, i + 1);
        filtered1.push(component)

        final.push([...new Set(filtered1.sort().flat())])
        if (i > 0) {
            for (let j = 1; j < i; j++) {
              let filtered2 = filtered1
              const shift = filtered2.shift();

              if (shift) {
                  final.push([component, shift])
              }
            }
        }
  }
  // let filtered1 = filtered.slice(0, 1);
  // let filtered2 = filtered.slice(0, 2);
  // let filtered3 = filtered.slice(0, 3);
  // let filtered4 = filtered.slice(0, 4);
  // let filtered5 = filtered.slice(0, 5);
  // let filtered6 = filtered.slice(0, 6);
  // let filtered7 = filtered.slice(0, 7);
  // let filtered8 = filtered.slice(0, 8);
  // let filtered9 = filtered.slice(0, 9);
  // let filtered10 = filtered.slice(0, 10);

  // filtered1.push(component)
  // filtered2.push(component)
  // filtered3.push(component)
  // filtered4.push(component)
  // filtered5.push(component)
  // filtered6.push(component)
  // filtered7.push(component)
  // filtered8.push(component)
  // filtered9.push(component)
  // filtered10.push(component)

  // comps[component] = [
  //   `${filtered1.sort().join('-')}`,
  //   `${filtered2.sort().join('-')}`,
  //   `${filtered3.sort().join('-')}`,
  //   `${filtered4.sort().join('-')}`,
  //   `${filtered5.sort().join('-')}`,
  //   `${filtered6.sort().join('-')}`,
  //   `${filtered7.sort().join('-')}`,
  //   `${filtered7.sort().join('-')}`,
  //   `${filtered8.sort().join('-')}`,
  //   `${filtered9.sort().join('-')}`,
  //   `${filtered10.sort().join('-')}`,
  // ]
})

const xxx = []
final.forEach(arr => {
  const filtered = components.filter(c => c !== arr);

  filtered.forEach(xx => {
    console.dir(_.isEqual(arr, xx))
  })
})


writeFileSync('test.json', JSON.stringify(final, '', 2), {encoding: 'utf8'})
