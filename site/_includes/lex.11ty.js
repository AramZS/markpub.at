const { processLex } = require('../../lib/shortcodes.js');

class Lex {
  data() {
    return {
      // Writes to "/my-permalink/index.html"
      permalink: (data) => `/lexicons/${data.lex.id}.json`,
    };
  }

  render(data) {
    let lex = data.lex;
    const lexicon = processLex(lex);
    return JSON.stringify(lexicon, null, 2);
  }
}

module.exports = Lex;
