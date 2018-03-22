const request = require('request');
const tress = require('tress');
const cheerio = require('cheerio');
const resolve = require('url').resolve;
const fs = require('fs');

const URL = 'https://www.otomoto.pl/osobowe/od-2003/miasto_lublin/?search%5Bbrand_program_id%5D%5B0%5D=&search%5Bdist%5D=5&search%5Bfilter_enum_damaged%5D=0&search%5Bfilter_float_mileage%3Ato%5D=175000&search%5Bfilter_float_price%3Afrom%5D=10000&search%5Bfilter_float_price%3Ato%5D=15000';

let results = [];
let visitedPaginationLinks = [];

const q = tress(function (url, callback) {
  request(url, function (err, res, body) {
    if (err) {
      throw err;
    }

    const $ = cheerio.load(res.body);
    if ($('.offer-header__row').length) {
      results.push({
        title: $('h1').text().trim(),
        postDate: $('.offer-meta__value').text().trim(),
        manufactureDate: $('.offer-main-params__item').eq(0).text().trim(),
        km: $('.offer-main-params__item').eq(1).text().trim(),
        fuelType: $('.offer-main-params__item').eq(2).text().trim(),
        price: $('.offer-price__number').text().trim(),
        href: url,
        size: $('.offer-description').text().length
      });
    }

    //push all links to details pages (offer-title is present only on list page)
    $('.offer-title > a').each(function () {
      q.push($(this).attr('href'));
    });

    //pagination
    $('.om-pager a').each(function () {
      // resolve is used to make relative path absolute
      const href = resolve(URL, $(this).attr('href'));
      if(!visitedPaginationLinks.includes(href)) {
        console.log('pushing pagination link: ', href);
        visitedPaginationLinks.push(href);
        q.push(href);
      }
    });

    callback();
  });
});

q.drain = function () {
  fs.writeFileSync('./data.json', JSON.stringify(results, null, 4));
};

q.push(URL);
