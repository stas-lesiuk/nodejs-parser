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
  selectors,
  createResult
};
