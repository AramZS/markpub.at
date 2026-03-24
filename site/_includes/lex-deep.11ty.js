const { processLex } = require('../../lib/shortcodes.js');

class LexDeep {
  data() {
    let lexPathMaker = (id) => (id.split('.')).reduce((acc, part) => `${acc}/${part}`, '');
    return {
      // Writes to "/my-permalink/index.html"
      permalink: (data) => `/lexicons/${lexPathMaker(data.lex.id)}.json`,
    };
  }

  render(data) {
    let lex = data.lex;
    const lexicon = processLex(lex);
    return JSON.stringify(lexicon, null, 2);
  }
}

module.exports = LexDeep;
