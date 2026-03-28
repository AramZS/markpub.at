const shortcodes = require('./lib/shortcodes.js');
const hljs = require('highlight.js/lib/core');

module.exports = function(eleventyConfig) {

  Object.keys(shortcodes).forEach((shortCodeName) => {
    eleventyConfig.addShortcode(shortCodeName, shortcodes[shortCodeName]);
  });

  Object.keys(shortcodes).forEach((shortCodeName) => {
    eleventyConfig.addPairedShortcode(shortCodeName, shortcodes[shortCodeName]);
  });

  //Passthroughs
  eleventyConfig.addPassthroughCopy("site/assets/css", "assets/css");
  eleventyConfig.addPassthroughCopy("site/assets/imgs", "assets/imgs");
  eleventyConfig.addPassthroughCopy("site/assets/fonts", "assets/fonts");
  eleventyConfig.addPassthroughCopy({ "site/assets/favicon": "." });
  // Load any languages you need
  hljs.registerLanguage('javascript', require('highlight.js/lib/languages/javascript'));
  hljs.registerLanguage('json', require('highlight.js/lib/languages/javascript'));

  return {
    dir: {
      input: 'site',
      output: 'dist',
    },
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
  };
};
