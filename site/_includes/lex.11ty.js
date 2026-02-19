class Lex {
  data() {
    return {
      // Writes to "/my-permalink/index.html"
      permalink: (data) => `/lexicons/${data.lex.id}.json`,
    };
  }

  render(data) {
    let lex = data.lex;
    let lexicon = {
      lexicon: 1,
      id: lex.id,
      defs: {
        main: {
          type: lex.type,
        },
      },
    };
    const innerType = lex[lex.type].type.toString();
    let type = { type: innerType };
    console.log('type', type);
    delete lex[lex.type].type;
    if (type.type === 'object') {
      let required = [];
      type.properties = {};
      for (let key in lex[lex.type]) {
        if (!lex[lex.type][key].optional) {
          required.push(key);
        }
        type.properties[key] = {
          description: lex[lex.type][key].description || '',
          type: lex[lex.type][key].type,
        };
        if (lex[lex.type][key].enum) {
          type.properties[key].enum = lex[lex.type][key].enum;
        }
        if (lex[lex.type][key].default) {
          type.properties[key].default = lex[lex.type][key].default;
        }
        if (lex[lex.type][key].items) {
          type.properties[key].items = lex[lex.type][key].items;
        }
      }
      type.required = required;
      lexicon.defs.main[lex.type] = type;
    }
    return JSON.stringify(lexicon, null, 2);
  }
}

module.exports = Lex;
