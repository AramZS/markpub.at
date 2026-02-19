
const processLex = (initLex) => {
  // clone object to handle non-destructively 
  let lex = structuredClone(initLex);

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
  return lexicon;
};

const processLexs = (lexs) => {
  let output = '\n'// ```json\n';
  for (let index = 0; index < lexs.length; index++) {
    const lex = lexs[index]; // Handle non-destructively for reuse.
    const aLex = processLex(lex)
    output += JSON.stringify(aLex, null, 2) + '\n';
  }
  return output + '\n'//```';
};

const version = () => String(Date.now());

module.exports = {
  processLex,
  processLexs,
  version,
};
