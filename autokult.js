const selectors = {
  isDetailsPage: $ => $('.article__meta').length,
  linkToDetail: $ => $('.card__content.article h2 a'),
  pagination: $ => $('.load-more a'),
  hasNext: $ => ($('.card__footer').length === 20)
};

const offerDetailSelectors = {
  title: $ => $('.article__header h1').text(),
  postDate: $ => $('.article__meta span').text()
};

function createResult($, url) {
  return {
    title: offerDetailSelectors.title($).trim(),
    postDate: offerDetailSelectors.postDate($).trim(),
    href: url
  }
}

module.exports = {
  mode: 'lazy-load',
  URL: 'https://autokult.pl/more-posts/?context=series2&contextId=44&last=',
  selectors,
  createResult
};
