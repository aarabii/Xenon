// Credit -
// https://github.com/ForbesLindesay/unescape-html/blob/master/index.js
// https://www.npmjs.com/package/unescape-html

/**
 * un-escape special characters in the given string of html.
 *
 * @param  {String} html
 * @return {String}
 */

module.exports = function (html) {
  return String(html)
    .replace(/&quot;/g, '"')
    .replace(/(&#039;)/g, "'")
    .replace(/(&#x3A;)/g, ":")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
};
