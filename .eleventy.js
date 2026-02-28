const shortcodes = require('./lib/shortcodes.js')
module.exports = function(eleventyConfig) {

  Object.keys(shortcodes).forEach((shortCodeName) => {
    eleventyConfig.addShortcode(shortCodeName, shortcodes[shortCodeName]);
  });

  Object.keys(shortcodes).forEach((shortCodeName) => {
    eleventyConfig.addPairedShortcode(shortCodeName, shortcodes[shortCodeName]);
  });

  //Passthroughs
  eleventyConfig.addPassthroughCopy("site/assets/css", "assets/css");
  eleventyConfig.addPassthroughCopy({ "site/assets/favicon": "." });

  return {
    dir: {
      input: 'site',
      output: 'dist',
    },
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
  };
};
