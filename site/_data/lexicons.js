


const exampleMarkdownText = '# Hello World\nThis is a sample markdown text.'

const getBytePosition = (rawText, startChar, breakChar, charIndex) => {

  // Convert to UTF-8 bytes
  const encoder = new TextEncoder();
  const totalBytes = encoder.encode(rawText);

  // Find the newline position to determine where the header ends
  const text = rawText;
  const sequenceStart = text.indexOf(startChar); // This gives character position
  const sequenceEnd = text.indexOf(breakChar); // This gives character position

  // For the header "# Hello World" (excluding the newline):
  const selectedText = text.substring(sequenceStart, sequenceEnd);
  const headerBytes = encoder.encode(selectedText);

  const byteStart = encoder.encode(text.substring(0, sequenceStart)).length; // This gives byte position of the start of the header
  const byteEnd = byteStart + headerBytes.length; // This gives byte position of the end of the header

  console.log('Selected text:', selectedText);
  console.log('byteStart:', byteStart);
  console.log('byteEnd:', byteEnd);
  console.log('Total bytes in header:', byteEnd - byteStart);
  return { byteStart, byteEnd, totalBytes };
}
let headerByteData = getBytePosition(exampleMarkdownText, '#', '\n');
const facetExamples = [
  {
    index: {
      byteStart: headerByteData.byteStart,
      byteEnd: headerByteData.byteEnd
    },
    features: [
      {
        $type: 'at.markpub.baseFormattingFacets#header',
        level: 1
      },
      {
        $type: 'at.markpub.baseFormattingFacets#idify',
      }
    ]
  },
  {
    index: {
      byteStart: 86,
      byteEnd: 102
    },
    features: [
      {
        $type: 'at.markpub.baseFormattingFacets#strong',
      },
    ]
  },
  {
    index: {
      byteStart: 6,
      byteEnd: 15
    },
    features: [{
      $type: 'app.bsky.richtext.facet#link',
      uri: 'https://example.com'
    }]
  },
  {
    index: {
      byteStart: 208,
      byteEnd: 223
    },
    features: [{
      $type: 'pub.leaflet.richtext.facet#underline'
    }]
  }
];

console.log('facet examples', JSON.stringify(facetExamples, null, 2));

const markpubText = {
  id: 'at.markpub.text',
  description: 'Handles objects with Markdown text and potential describing facets.',
  type: "object",
  object: {
    type: "object",
    rawMarkdown: {
      description: "The raw markdown text can go here",
      type: "string",
      examples: [exampleMarkdownText],
      optional: false
    },
    "facets": {
      "type": "array",
      description: "Facets here represent rendered versions of Markdown strings. A bold Markdown string `**bold**` might be represented by a richtext facet of #bold, in which case it is suggested to be presented without the Markdown markup as `&lt;strong&gt;bold&lt;/strong&gt;`. Facets select their character ranges based on position in the Markdown text but should be rendered without the related characters. For example: `### Header` will be selected using a character range that includes the hashes like (0,9) but will be rendered without the hashes like `&lt;h3&gt;Header&lt;/h3&gt;`. It is recommended that processors to not transform in-place for this reason. The goal of having an open union for facets is that constructing systems may choose to use the facets they prefer from across the ecosystem, either here or in other places like `pub.leaflet.richtext.facet`",
      "items": {
        "type": "union",
        "closed": "false",
        "refs": []
      },
      examples: facetExamples.map(facet => JSON.stringify(facet)),
      optional: true
    },
    lenses: {
      type: "array",
      description: "Lenses are lexicons that define translatable facets for rendering layers with limited facets. `pub.leaflet.richtext.facet#bold` and `at.markpub.facet#strong` expect the same output. A lens would then include a union with both those facets and a renderer that understands either of them could translate between the two.",
      items: {
        "type": "union",
        "closed": "false",
        "refs": [],
        "examples": []
      },
      optional: true
    }
  }
};

const sliceFacetsMarkpub = {
  lexicon: 1,
  id: "at.markpub.baseFormattingFacets",
  description: "",
  type: "object",
  object: {
    type: "object",
    index: {
      "type": "ref",
      "ref": "#byteSlice"
    },
    "features": {
      "type": "array",
      "items": {
        "type": "union",
        "refs": [
          "#strong",
          "#header",
          "#idify"
        ]
      }
    },
    "byteSlice": {
      "type": "object",
      "description": "Specifies the sub-string range a facet feature applies to. Start index is inclusive, end index is exclusive. Indices are zero-indexed, counting bytes of the UTF-8 encoded text. NOTE: some languages, like Javascript, use UTF-16 or Unicode codepoints for string slice indexing; in these languages, convert to byte arrays before working with facets. Byte slices can overlap.",
      "required": [
        "byteStart",
        "byteEnd"
      ],
      "properties": {
        "byteStart": {
          "type": "integer",
          "minimum": 0
        },
        "byteEnd": {
          "type": "integer",
          "minimum": 0
        }
      }
    },
    "strong": {
      "type": "object",
      "description": "Facet feature for a `&lt;strong&gt;` HTML tag. For the byteSlice provided it should surround the underlying text.",
      "required": [],
      "properties": {
      },
    },
    "header": {
      "type": "object",
      "description": "Facet feature for a `&lt;h1&gt;` HTML tag. The integer is the level you want to use, as in h1, h2, h3, etc... For the byteSlice provided it should surround the underlying text.",
      "required": ["level"],
      "properties": {
        "level": {
          "type": "integer",
          "minimum": 1,
          "maximum": 6
        }
      }
    },
    "idify": {
      "type": "object",
      "description": "Facet feature instructs parsers to stringify the underlying text and include it as an id property on an HTML element. If this overlaps with an existing HTML tag generated by another facet, it is assumed that it will be applied to that tag. If there is no matching tag, use `&lt;span&gt;&lt;/span&gt;`. It is expected spaces are turned into hyphens. For example, a header facet with an idify feature might produce `&lt;h1 id=\"header-text\"&gt;Header Text&lt;/h1&gt;`.",
      "required": [],
      "properties": {
      }
    },
  }
};

const blockFacet = {
  lexicon: 1,
  id: "at.markpub.baseBlocks",
  type: 'object',
  description: "A block facet is a facet intended to insert an HTML element before a specific single byte index in the text. This is useful for things like line breaks, dividers, or any other element that doesn't have a clear character range to apply to. It can be thought of as a point annotation rather than a range annotation like the slice facets. Where a range is specified with a start and end index, the intention is to replace that text with the target element.",
  object: {
    type: 'object',
    "byteSlice": {
      "type": "object",
      "description": "Specifies the sub-string range a facet feature applies to. Start index is inclusive, end index is exclusive. Indices are zero-indexed, counting bytes of the UTF-8 encoded text. NOTE: some languages, like Javascript, use UTF-16 or Unicode codepoints for string slice indexing; in these languages, convert to byte arrays before working with facets. Byte slices can overlap.",
      "required": [
        "byteStart",
        "byteEnd"
      ],
      "properties": {
        "byteStart": {
          "type": "integer",
          "minimum": 0
        },
        "byteEnd": {
          "type": "integer",
          "minimum": 0
        }
      }
    },
    "horizontalRule": {
      "type": "object",
      "description": "Place an `&lt;hr&gt;` element at the provided byte index.",
      "required": [],
      "properties": {
      }
    },
  }
}

const lens = {
  lexicon: 1,
  id: "at.markpub.lens",
  type: 'object',
  description: 'Use this lens to specify facets that can be interoperable.',
  object: {
    type: 'object',
    outputDescription: {
      optional: true,
      type: "string",
      description: "A human-readable description of what the output of this lens is intended to be. This is optional but can be helpful for documentation purposes and for anyone trying to understand how to use the lens.",
      examples: ["This lens outputs bold or strong styling on web text."]
    },
    "facets": {
      description: "A list of facet types that this lens can translate between. For example, if you include `pub.leaflet.richtext.facet#bold` and `at.markpub.facet#strong` then this lens can be used to translate between those two facet types and any renderer that understands either of those facet types can use this lens to render the facets it understands.",
      "type": "array",
      "items": {
        "type": "union",
        "closed": "false",
        "refs": [],
        examples: ['["at.markpub.facet#strong", "pub.leaflet.richtext.facet#bold"]']
      },
      optional: false
    },
    outputCode: {
      "description": "You may include code here intended to process a string with the provided facets. This is optional and not expected to be used by most lenses, but it can be helpful for testing or for providing examples of how a renderer might use the lens.",
      "type": "string",
      examples: ["function renderWithLens(text, facets) { /* code to render text with facets */ }"],
      optional: true
    },
    outputTargetHTML: {
      optional: true,
      type: "string",
      examples: ["&lt;strong&gt;&lt;/strong&gt;", "&lt;a&gt;"]
    }
  }
}

module.exports = [
  {
    id: 'at.markpub.markdown',
    description:
      'A block of markdown text with metadata about its flavor and renderer.',
    type: 'object',
    object: {
      type: 'object',
      text: {
        description:
          'Text in markdown. May include anything that is valid markdown syntax for your flavor. Make sure it is properly escaped if necessary.',
        type: 'ref',
        //examples: ['# Hello World\nThis is a sample markdown text.'],
        optional: false,
        ref: markpubText.id

      },
      textBlob: {
        description: 'Text may be blob-ified as raw Markdown and stored on a PDS, pass it here by reference. If you use this property it is assumed that it overrides the `text` property. It is a PDS address for a text file.',
        "accept": [
          "text/*",
        ],
        "maxSize": 1000000,
        "type": "blob",
        "examples": [],
        optional: true,
      },
      flavor: {
        description:
          "Markdown may be rendered in many flavors. The most common are CommonMark and Github Flavored Markdown (GFM). Generally your markdown is one of those two and if you don't know then it is likely CommonMark. At this time the lexicon only recognizes these two flavors. Submit a PR if you think one should be added.",
        type: 'string',
        knownValues: ['gfm', 'commonmark'],
        default: 'commonmark',
        examples: ['gfm', 'commonmark'],
        optional: false,
      },
      renderingRules: {
        description:
          "Different rendering systems for Markdown may introduce slight or significant changes to the resulting HTML. This setting allows you to specify your renderer so systems can understand the rules you expect. Keep in mind that no consuming entity is obligated to honor this preference. While rendering views may infer rules established by different Markdown renderers with this field, they can and should use the rendering system of their choice. Do **not** use rendering systems you don't know. Some examples might be `marked`, `pandoc`, `markdown-it` `mdxt`, etc. Generally, this lexicon assumes that you are pulling the Markdown from an existing site that includes an existing rendering process. The processor used for that process to build your site's pages is the one you should include here. If you don\'t know then just leave this field out.",
        type: 'string',
        examples: ['markdown-it'],
        optional: true,
      },
      extensions: {
        description:
          'The Markdown community expects certain extensions to mainline Markdown flavors. This setting allows you to note to a renderer what extensions might be expected. The most common is LaTeX. Rendering systems may choose to render these extensions in a variety of ways or present them raw. It is not required that you include YAML in the text field itself, if you choose to, note it in this field.',
        type: 'array',
        items: {
          type: 'string',
        },
        examples: ['["LaTeX","YAML"]', '["YAML"]'],
        optional: true,
      },
    },
  },
  markpubText,
  sliceFacetsMarkpub,
  blockFacet,
  lens
];
