const tape = require('tape');

const parsePrice = require('./price-parser');

tape('price parser', (test) => {
  test.equal(parsePrice(), 0, 'default price should be 0');
  test.equal(parsePrice(5), 5, 'should parse 1-digit number to itself');
  test.equal(parsePrice(10500), 10500, 'should parse multi-digit number to itself');
  test.equal(parsePrice('10500'), 10500, 'should parse string value to same number');
  test.equal(parsePrice('     10500  '), 10500, 'should parse string with spaces value to same number');
  test.equal(parsePrice('     10500 PLN '), 10500, 'should parse string with spaces and text to same number');
  test.end();
});
