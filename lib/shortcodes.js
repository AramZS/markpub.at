
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
  // const innerType = lex[lex.type].type.toString();
  //let type = { type: innerType };
  let type = {};
  console.log('type', lex.type);
  if (lex.type === "record") {
    type = { type: innerType };
  }
  // delete lex[lex.type].type;
  if (lex.type === 'object' || lex.type === "record") {
    let required = [];
    delete lex[lex.type].type;
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
    if (lex.type === "record") {
      lexicon.defs.main[lex.type] = type;
    } else {
      Object.assign(lexicon.defs.main, type);
    }
  }
  return lexicon;
};

const processLexs = (lexs) => {
  //lexs = data.lexicons
  let output = '\n'// ```json\n';
  for (let index = 0; index < lexs.length; index++) {
    const lex = lexs[index]; // Handle non-destructively for reuse.
    const aLex = processLex(lex)
    output += JSON.stringify(aLex, null, 2) + '\n';
  }
  return output + '\n'//```';
};

const genExamples = (lexs) => {
  let examples = {};
  for (let index = 0; index < lexs.length; index++) {
    let lex = structuredClone(initLex);
    let example = { "$type": lex.id };
    for (let key in lex[lex.type]) {
      if (lex[lex.type][key].examples) {
        let val = lex[lex.type][key].examples[0];
        if (lex[lex.type][key].type !== 'string') {
          val = JSON.parse(val);
        }
        example[key] = val;
      }
    }
    examples[lex.id] = example;
  }
  return examples;
}

const getExampleOutput = (typeName){
  return JSON.stringify(genExamples(lexs)[typeName], null, 2);
}

const getAllExampleOutput = (allLexes) => {
  let examples = genExamples(allLexes);
  let output = '\n'// ```json\n';
  for (let typeName in examples) {
    output += `<h2>Examples</h2>\n<h3>Example for ${typeName}</h3>\n`;
    output += JSON.stringify(examples[typeName], null, 2) + '\n\n';
  }
  return output + '\n'//```';
}

const version = () => String(Date.now());

module.exports = {
  processLex,
  processLexs,
  genExamples,
  getAllExampleOutput,
  getExampleOutput,
  version,
};
