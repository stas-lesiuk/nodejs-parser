function parsePrice(input) {
  if(input) {
    return parseInt(input);
  }
  return 0;
}

module.exports = parsePrice;
