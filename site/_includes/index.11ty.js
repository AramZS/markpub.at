const base = require("./base.11ty.js");

module.exports = async function(data) {
  // console.log("layout data", data);
  let zones = {
    innerBody: `${data.content}

      <h2>Lexicon:</h2>
      <pre><code class="language.json">${data.lexicons ? this.processLexs(data.lexicons) : ''}</code></pre>
    `
  }
  return base(data, zones);
};
