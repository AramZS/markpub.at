const base = require("./base.11ty.js");

module.exports = async function(data) {
  // console.log("layout data", data);
  let zones = {
    innerBody: `${data.content}

      <h2>Lexicons:</h2>
      <pre><code class="language.json">${data.lexicons ? this.processLexs(data.lexicons, 'h3') : ''}</code></pre>

      <a id="examples"></a>
      ${data.lexicons ? this.getAllExampleOutput(data.lexicons, '2') : ''}
    `
  }
  return base(data, zones);
};
