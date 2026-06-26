


const exampleMarkdownText = '# Hello World\nThis is a sample markdown text.'

/**
 * Grab byte positions for text to process. 
 * 
 * This is useful for determining the exact byte positions of specific text segments within a larger text, which is important for generating your facets. Facets rely on byte positions to accurately identify the segments of text they apply to, especially when dealing with multi-byte characters or complex markdown syntax. By providing the raw text along with the character index and the start and break characters, you can calculate the byte positions needed for your facets to function correctly.
 *
 * @param   {[type]}  rawText    The Raw Text you are processing. In order to get accurate byte positions you need to provide the full raw text including any markdown syntax. 
 * @param   {[type]}  startChar  The character to start selection at. For example, if you want to select a header you might start with the `#` character.
 * @param   {[type]}  breakChar  The character to end selection at. For example, if you want to select a header you might end with the newline character `\n`.
 * @param   {[type]}  charIndex  The character index to start selection at. This is used to calculate the byte position accurately. Important if you are selecting the `##` header for example, there may be more than one of these in the document and you need to specify which you are selecting @TODO: implement this. 
 *
 * @return  {[type]}             An object containing the byte start and end positions, as well as the total bytes in the text.
 */
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
        $type: 'at.markpub.facets.baseFormatting#header',
        level: 1
      },
      {
        $type: 'at.markpub.facets.baseFormatting#idify',
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
        $type: 'at.markpub.facets.baseFormatting#strong',
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
    markdown: {
      description: "The raw text in markdown. May include anything that is valid markdown syntax for your flavor. Make sure it is properly escaped if necessary.",
      type: "string",
      examples: [exampleMarkdownText],
      optional: false
    },
    textBlob: {
      description: `Text may be blob-ified as raw Markdown and stored on a PDS, pass it here by reference. If you use this property it is assumed that it overrides the "rawMarkdown" property. It is a PDS address for a markdown text file. You still must provide some value, even if it is a preview for "rawMarkdown" in this field.`,
      "accept": [
        "text/*",
      ],
      "maxSize": 1000000,
      "type": "blob",
      "examples": [],
      optional: true,
    },
    "facets": {
      "type": "array",
      description: "Facets here represent rendered versions of Markdown strings. A bold Markdown string `**bold**` might be represented by a richtext facet of #bold, in which case it is suggested to be presented without the Markdown markup as `&lt;strong&gt;bold&lt;/strong&gt;`. Facets select their character ranges based on position in the Markdown text but should be rendered without the related characters. For example: `### Header` will be selected using a character range that includes the hashes like (0,9) but will be rendered without the hashes like `&lt;h3&gt;Header&lt;/h3&gt;`. It is recommended that processors to not transform in-place for this reason. The goal of having an open union for facets is that constructing systems may choose to use the facets they prefer from across the ecosystem, either here or in other places like `pub.leaflet.richtext.facet`",
      "items": {
        "type": "union",
        "closed": false,
        "refs": []
      },
      examples: facetExamples.map(facet => JSON.stringify(facet)),
      optional: true
    },
    lenses: {
      type: "array",
      description: "Lenses are lexicons that define translatable facets for rendering layers with limited facets. `pub.leaflet.richtext.facet#bold` and `at.markpub.facets.baseFormatting#strong` expect the same output. A lens would then include a union with both those facets and a renderer that understands either of them could translate between the two.",
      items: {
        "type": "union",
        "closed": false,
        "refs": [],
      },
      "examples": [],
      optional: true
    }
  }
};


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
          'An object that includes the text in markdown. May include anything that is valid markdown syntax for your flavor. Make sure it is properly escaped if necessary.',
        type: 'ref',
        //examples: ['# Hello World\nThis is a sample markdown text.'],
        optional: false,
        ref: markpubText.id

      },
      flavor: {
        description:
          "Markdown may be rendered in many flavors. The most common are CommonMark and Github Flavored Markdown (GFM). Generally your markdown is one of those two and if you don't know then it is likely CommonMark. At this time the lexicon only recognizes these two flavors. Submit a PR if you think one should be added.",
        type: 'string',
        knownValues: ['gfm', 'commonmark'],
        examples: ['gfm', 'commonmark'],
        optional: true,
      },
      renderingRules: {
        description:
          "Using this field is highly suggested. Different rendering systems for Markdown may introduce slight or significant changes to the resulting HTML. This setting allows you to specify your renderer so systems can understand the rules you expect. Keep in mind that no consuming entity is obligated to honor this preference. While rendering views may infer rules established by different Markdown renderers with this field, they can and should use the rendering system of their choice. Do **not** use rendering systems you don't know. Some examples might be `marked`, `pandoc`, `markdown-it` `mdxt`, etc. Generally, this lexicon assumes that you are pulling the Markdown from an existing site that includes an existing rendering process. The processor used for that process to build your site's pages is the one you should include here. If you don\'t know then just leave this field out.",
        type: 'string',
        examples: ['markdown-it'],
        optional: true,
      },
      extensions: {
        description:
          'The Markdown community expects certain extensions to mainline Markdown flavors. This setting allows you to note to a renderer what extensions might be expected. The most common is LaTeX. Rendering systems may choose to render these extensions in a variety of ways or present them raw. It is not required that you include YAML in the markdown text itself, if you choose to include a YAML metadata block, note it in this field.',
        type: 'array',
        items: {
          type: 'string',
        },
        examples: ['["LaTeX","YAML"]', '["YAML"]'],
        optional: true,
      },
      "frontMatter": {
        "description": "If your markdown includes a front matter block, you can include it here as a set of objects describing the data. This is optional but may be more convenient for some systems to have it separate. It is expected that if you include this field that the front matter block is not included in the raw markdown text field. It would likely be parsed out of a YAML block and transformed into this array of objects or an array holding a single object.",
        "type": "array",
        "items": {
          "type": "union",
          "closed": false,
          "refs": []
        },
        examples: [[{
          title: "Hello World",
          author: "Aram Zucker-Scharff"
        }],
        [{
          "@type": "org.schema.article",
          headline: "Hello World",
          "atproto:feed": "at://did:plc:abc123xyz456/app.bsky.feed.generator/atproto-news"
        }]],
        optional: true,
      }
    },
  },
  markpubText,
  require('./lexicon/baseFormatting.js'),
  require('./lexicon/baseBlocks.js'),
  require('./lexicon/lens.js'),
];
