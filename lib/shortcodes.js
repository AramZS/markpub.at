
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
  // console.log('type', lex.type);
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
      if (lex[lex.type][key].knownValues) {
        type.properties[key].knownValues = lex[lex.type][key].knownValues;
      }
      if (lex[lex.type][key].default) {
        type.properties[key].default = lex[lex.type][key].default;
      }
      if (lex[lex.type][key].items) {
        type.properties[key].items = lex[lex.type][key].items;
      }
      if (lex[lex.type][key].maxSize) {
        type.properties[key].maxSize = lex[lex.type][key].maxSize;
      }
      if (lex[lex.type][key].accept) {
        type.properties[key].accept = lex[lex.type][key].accept;
      }
      if (lex[lex.type][key].ref) {
        type.properties[key].ref = lex[lex.type][key].ref;
      }
      if (lex[lex.type][key].refs) {
        type.properties[key].refs = lex[lex.type][key].refs;
      }
      if (lex[lex.type][key].closed) {
        type.properties[key].closed = lex[lex.type][key].closed;
      }
      if (lex[lex.type][key].properties) {
        let propKeyRequired = []
        type.properties[key].properties = {};
        for (let propKey in lex[lex.type][key].properties) {
          let propObj = lex[lex.type][key].properties[propKey]
          type.properties[key].properties[propKey] = {
            description: propObj.description,
            type: propObj.type,
          }
          if (!propObj.optional) {
            propKeyRequired.push(propKey)
          }
          if (propObj.items) {
            type.properties[key].properties[propKey].items = propObj.items
          }
        }
        type.properties[key].properties.required = propKeyRequired;
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

const processLexs = (lexs, headerLvl) => {
  let output = '\n'// ```json\n';
  for (let index = 0; index < lexs.length; index++) {
    const lex = lexs[index]; // Handle non-destructively for reuse.
    output = output + `<${headerLvl}>${lex.id}</${headerLvl}>`
    const aLex = processLex(lex)
    output += JSON.stringify(aLex, null, 2) + '\n';
  }
  return output + '\n'//```';
};

const genExamples = (initLex) => {
  let examples = {};
  for (let index = 0; index < initLex.length; index++) {
    let lex = structuredClone(initLex[index]);
    let example = { "$type": lex.id };
    for (let key in lex[lex.type]) {
      console.log('Generating examples for lex type ', lex.type, ' key ', key);
      if (lex[lex.type][key].examples && lex[lex.type][key].examples.length > 0) {
        let val = lex[lex.type][key].examples[0];
        /**if (lex[lex.type][key].type !== 'string' && lex[lex.type][key].type !== 'integer' && lex[lex.type][key].type !== 'boolean') {
          console.log('example val before parse, in type ', key, val);
          let exampleSet = JSON.parse(val);
          val = exampleSet[0];
          console.log('example val after parse, in type ', key, JSON.stringify(val));
        }**/
        try {
          val = JSON.parse(val);
        } catch (e) { }
        example[key] = val;
      }
    }
    if (Object.keys(example).length > 1) {
      examples[lex.id] = example;
    }
  }
  return examples;
}

const getExampleOutput = (lexs, typeName) => {
  return JSON.stringify(genExamples(lexs)[typeName], null, 2);
}

const getAllExampleOutput = (allLexes, headerLvlNumber) => {
  let headerNumber = parseInt(headerLvlNumber, 10);
  let examples = genExamples(allLexes);
  let output = `\n<h${headerNumber}>Examples</h${headerNumber}>`// ```json\n';
  for (let typeName in examples) {
    output += `\n<h${headerNumber + 1}>Example for ${typeName}</h${headerNumber + 1}>\n<pre><code class="language.json">`;
    output += JSON.stringify(examples[typeName], null, 2) + '</code></pre>\n';
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
