const base = require("./base.11ty.js");

module.exports = async function(data) {
  // console.log("layout data", data);
  let zones = {
    innerBody: `${data.content}
    `
  }
  return base(data, zones);
};
