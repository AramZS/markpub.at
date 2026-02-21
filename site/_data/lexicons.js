const markpubText = {
  id: 'at.markpub.text',
  description: 'Handles objects with Markdown text and potential describing facets.',
  type: "object",
  object: {
    type: "object",
    rawMarkdown: {
      description: "The raw markdown text can go here",
      type: "string",
      examples: ['# Hello World\nThis is a sample markdown text.'],
      optional: false
    },
    "facets": {
      "type": "array",
      description: "Facets here represent rendered versions of Markdown strings. A bold Markdown string `**bold**` might be represented by a richtext facet of #bold, in which case it is suggested to be presented without the Markdown markup as `<strong>bold</strong>. Facets select their character ranges based on position in the Markdown text but should be rendered without the related characters. For example: \"### Header\" will be selected using a character range that includes the hashes like (0,9) but will be rendered without the hashes like \"<h3>Header</h3>\". It is recommended that processors to not transform in-place for this reason. The goal of having an open union for facets is that constructing systems may choose to use the facets they prefer from across the ecosystem, either here or in other places like \"pub.leaflet.richtext.facet\"`",
      "items": {
        "type": "union",
        "closed": "false",
        "refs": []
      },
      optional: true
    },
    lenses: {
      type: "array",
      description: "Lenses are lexicons that define translatable facets for rendering layers with limited facets. \"pub.leaflet.richtext.facet#bold\" and \"at.markpub.facet#strong\" expect the same output. A lens would then include a union with both those facets and a renderer that understands either of them could translate between the two.",
      items: {
        "type": "union",
        "closed": "false",
        "refs": []
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
        ]
      }
    },
    "byteSlice": {
      "type": "object",
      "description": "Specifies the sub-string range a facet feature applies to. Start index is inclusive, end index is exclusive. Indices are zero-indexed, counting bytes of the UTF-8 encoded text. NOTE: some languages, like Javascript, use UTF-16 or Unicode codepoints for string slice indexing; in these languages, convert to byte arrays before working with facets.",
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
      "description": "Facet feature for a <strong> HTML tag. For the byteSlice provided it should surround the underlying text.",
      "required": [],
      "properties": {
      }
    },
  }
}

const blockFacet = {
  lexicon: 1,
  id: "at.markpub.baseBlocks"
}

const lens = {
  lexicon: 1,
  id: "at.markpub.lens",
  type: 'object',
  description: 'Use this lens to specify facets that can be interoperable.',
  object: {
    type: 'object',
    object: {
      outputDescription: {
        optional: true
      },
      "facets": {
        description: "",
        "type": "array",
        "items": {
          "type": "union",
          "closed": "false",
          "refs": []
        },
        optional: false
      },
      outputCode: {
        optional: true
      },
      outputTargetHTML: {
        optional: true,
        examples: ["<strong></strong>", "<a>"]
      }
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
        description: 'Text may be blob-ified as raw Markdown and stored on a PDS, pass it here by reference. If you use this property it is assumed that it overrides the `text` property',
        "accept": [
          "text/*"
        ],
        "maxSize": 1000000,
        "type": "blob",
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
];
