const request = require('request');
const tress = require('tress');
const cheerio = require('cheerio');
const resolve = require('url').resolve;
const fs = require('fs');

const domain = require('./autokult');
const selectors = domain.selectors;
const URL = domain.URL;
const mode = domain.mode || 'recursive';

let index = 1;
let results = [];
let visitedPaginationLinks = [];

const q = tress(mode === 'lazy-load' ? lazyLoadTress : recursiveTress);

q.drain = function () {
  fs.writeFileSync('./data.json', JSON.stringify(results, null, 4));
};

q.push(URL + index);

function recursiveTress(url, callback) {
  request(url, function (err, res, body) {
    if (err) {
      throw err;
    }

    const $ = cheerio.load(res.body);
    if (selectors.isDetailsPage($)) {
      results.push(domain.createResult($, url));
    }

    //push all links to details pages (offer-title is present only on list page)
    selectors.linkToDetail($).each(function () {
      q.push($(this).attr('href'));
    });

    //pagination
      selectors.pagination($).each(function () {
        // resolve is used to make relative path absolute
        const href = resolve(URL, $(this).attr('href'));
        if (!visitedPaginationLinks.includes(href)) {
          console.log('pushing pagination link: ', href);
          visitedPaginationLinks.push(href);
          q.push(href);
        }
      });

    callback();
  });
}

function lazyLoadTress(url, callback) {
  request(url, function (err, res, body) {
    if (err) {
      throw err;
    }

    const $ = cheerio.load(res.body);
    if (selectors.isDetailsPage($)) {
      results.push(domain.createResult($, url));
    }

    //push all links to details pages (offer-title is present only on list page)
    selectors.linkToDetail($).each(function () {
      q.push($(this).attr('href'));
    });

    if (selectors.hasNext($)) {
      index++;
      const href = URL + index;
      console.log('pushing next list page: ', href);
      q.push(href);
      //   if (!visitedPaginationLinks.includes(href)) {
      //     console.log('pushing pagination link: ', href);
      //     visitedPaginationLinks.push(href);
      //     q.push(href);
      //   }
    }

    callback();
  });
}

function log() {
  console.log(...args);
}
