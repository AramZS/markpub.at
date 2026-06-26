
const normalizeDefName = (name) => {
  return String(name).replace(/-([a-zA-Z0-9])/g, (_, chr) => chr.toUpperCase());
};

const cloneWithoutExamples = (value) => {
  const cloned = structuredClone(value);
  if (cloned && typeof cloned === 'object' && 'examples' in cloned) {
    delete cloned.examples;
  }
  return cloned;
};

const remapRef = (ref, defNameMap) => {
  if (typeof ref !== 'string' || !ref.startsWith('#')) {
    return ref;
  }
  const raw = ref.slice(1);
  const mapped = defNameMap[raw] || raw;
  return `#${mapped}`;
};

const remapSchemaRefs = (schema, defNameMap) => {
  if (!schema || typeof schema !== 'object') {
    return schema;
  }

  if (schema.ref) {
    schema.ref = remapRef(schema.ref, defNameMap);
  }

  if (Array.isArray(schema.refs)) {
    schema.refs = schema.refs.map((ref) => remapRef(ref, defNameMap));
  }

  if (schema.items) {
    schema.items = remapSchemaRefs(schema.items, defNameMap);
  }

  if (schema.properties) {
    for (let key in schema.properties) {
      schema.properties[key] = remapSchemaRefs(schema.properties[key], defNameMap);
    }
  }

  return schema;
};

const buildSchemaObject = (source) => {
  const schema = {};

  const passthroughFields = [
    'description',
    'type',
    'enum',
    'knownValues',
    'default',
    'maxSize',
    'accept',
    'ref',
    'refs',
    'closed',
    'minimum',
    'maximum',
    'minLength',
    'maxLength',
    'minGraphemes',
    'maxGraphemes',
    'const',
    'format',
  ];

  for (let index = 0; index < passthroughFields.length; index++) {
    const fieldName = passthroughFields[index];
    if (source[fieldName] !== undefined) {
      schema[fieldName] = structuredClone(source[fieldName]);
    }
  }

  if (source.items) {
    schema.items = cloneWithoutExamples(source.items);
  }

  if (source.properties) {
    let inferredRequired = [];
    schema.properties = {};

    for (let propKey in source.properties) {
      const propObj = source.properties[propKey];
      schema.properties[propKey] = buildSchemaObject(propObj);
      if (!propObj.optional) {
        inferredRequired.push(propKey);
      }
    }

    let required = [];
    if (Array.isArray(source.internalRequired)) {
      required = structuredClone(source.internalRequired);
    } else if (Array.isArray(source.required)) {
      required = structuredClone(source.required);
    } else {
      required = inferredRequired;
    }

    if (required.length > 0) {
      schema.required = required;
    }
  }

  if (Array.isArray(source.required) && source.required.length > 0 && !schema.required) {
    schema.required = structuredClone(source.required);
  }

  return schema;
};

const collectReferencedDefs = (sourceProperties) => {
  const refs = new Set();

  for (let key in sourceProperties) {
    const prop = sourceProperties[key];
    if (typeof prop.ref === 'string' && prop.ref.startsWith('#')) {
      refs.add(prop.ref.slice(1));
    }
    if (prop.items && Array.isArray(prop.items.refs)) {
      for (let index = 0; index < prop.items.refs.length; index++) {
        const ref = prop.items.refs[index];
        if (typeof ref === 'string' && ref.startsWith('#')) {
          refs.add(ref.slice(1));
        }
      }
    }
  }

  return refs;
};

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

  let lexType = lex.type;

  if (lexType === 'object' || lexType === 'record') {
    const sourceProperties = structuredClone(lex[lexType] || {});
    delete sourceProperties.type;

    const hasMainFacetShape = !!sourceProperties.index && !!sourceProperties.features;
    const hasBlockFacetShorthand = !hasMainFacetShape && !!sourceProperties.byteSlice;

    if (hasBlockFacetShorthand) {
      sourceProperties.index = {
        type: 'ref',
        ref: '#byteSlice',
        optional: false,
      };
      sourceProperties.features = {
        type: 'array',
        items: {
          type: 'union',
          refs: Object.keys(sourceProperties)
            .filter((key) => key !== 'byteSlice' && key !== 'index' && key !== 'features')
            .map((key) => `#${key}`),
        },
        optional: false,
      };
    }

    const referencedDefs = collectReferencedDefs(sourceProperties);
    const defNameMap = {};
    referencedDefs.forEach((defKey) => {
      defNameMap[defKey] = normalizeDefName(defKey);
    });

    const mainType = { properties: {} };
    const required = [];

    for (let key in sourceProperties) {
      const schema = buildSchemaObject(sourceProperties[key]);
      remapSchemaRefs(schema, defNameMap);

      if (referencedDefs.has(key)) {
        const defName = defNameMap[key] || key;
        lexicon.defs[defName] = schema;
        continue;
      }

      mainType.properties[key] = schema;
      if (!sourceProperties[key].optional) {
        required.push(key);
      }
    }

    if (required.length > 0) {
      mainType.required = required;
    }

    Object.assign(lexicon.defs.main, mainType);
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

      if (lex[lex.type][key].items && lex[lex.type][key].items.examples && lex[lex.type][key].items.examples.length > 0) {
        let val = lex[lex.type][key].items.examples[0];
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

  examples['at.markpub.text'].lenses = [examples['at.markpub.lens']];

  examples['at.markpub.markdown'].text = examples['at.markpub.text'];

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
    output += `\n<h${headerNumber + 1}>Example for ${typeName}</h${headerNumber + 1}><br />\n<pre><code class="language.json language-json">`;
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
