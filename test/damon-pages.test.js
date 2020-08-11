const test = require('ava')
const damonPages = require('..')

// TODO: Implement module test
test('<test-title>', t => {
  const err = t.throws(() => damonPages(100), TypeError)
  t.is(err.message, 'Expected a string, got number')

  t.is(damonPages('w'), 'w@zce.me')
  t.is(damonPages('w', { host: 'wedn.net' }), 'w@wedn.net')
})
