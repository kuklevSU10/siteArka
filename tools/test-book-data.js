const assert = require('node:assert');
const { PROJECTS } = require('../book-data.js');

assert.equal(PROJECTS.length, 3, '3 projects');
const all = [];
for (const p of PROJECTS) {
  assert.ok(p.number && p.name && p.description, 'project meta: ' + p.name);
  assert.ok(Array.isArray(p.palette) && p.palette.length === 3, 'palette of 3: ' + p.name);
  const imgs = [p.hero].concat(p.photos);
  assert.equal(imgs.length, 4, p.name + ' must have exactly 4 photos');
  for (const im of imgs) {
    assert.ok(im.src && im.caption, 'photo needs src+caption in ' + p.name);
    all.push(im.src);
  }
}
assert.equal(all.length, 12, '12 photos total');
assert.equal(new Set(all).size, 12, 'all 12 unique');
console.log('book-data invariant OK');
