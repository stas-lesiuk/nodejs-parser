const selectors = {
  isDetailsPage: $ => $('.offer-header__row').length,
  linkToDetail: $ => $('.offer-title > a'),
  pagination: $ => $('.om-pager a')
};

const offerDetailSelectors = {
  title: $ => $('h1').text(),
  postDate: $ => $('.offer-meta__value').text(),
  manufactureDate: $ => $('.offer-main-params__item').eq(0),
  km: $ => $('.offer-main-params__item').eq(1),
  fuelType: $ => $('.offer-main-params__item').eq(2),
  price: $ => $('.offer-price__number'),
  size: $ => $('.offer-description').text().length
};

function createResult($, url) {
  return {
    title: offerDetailSelectors.title($).trim(),
    postDate: offerDetailSelectors.postDate($).trim(),
    manufactureDate: offerDetailSelectors.manufactureDate($).text().trim(),
    km: offerDetailSelectors.km($).text().trim(),
    fuelType: offerDetailSelectors.fuelType($).text().trim(),
    price: offerDetailSelectors.price($).text().trim(),
    href: url,
    size: offerDetailSelectors.size($)
  }
}

module.exports = {
  URL: 'https://www.otomoto.pl/osobowe/od-2003/miasto_lublin/?search%5Bbrand_program_id%5D%5B0%5D=&search%5Bdist%5D=5&search%5Bfilter_enum_damaged%5D=0&search%5Bfilter_float_mileage%3Ato%5D=175000&search%5Bfilter_float_price%3Afrom%5D=10000&search%5Bfilter_float_price%3Ato%5D=15000',
  selectors,
  createResult
};
