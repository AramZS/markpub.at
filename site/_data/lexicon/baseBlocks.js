module.exports = {
  lexicon: 1,
  id: "at.markpub.facets.baseBlocks",
  type: 'object',
  description: "A block facet is a facet intended to insert an HTML element before a specific single byte index in the text. This is useful for things like line breaks, dividers, or any other element that doesn't have a clear character range to apply to. It can be thought of as a point annotation rather than a range annotation like the slice facets. Where a range is specified with a start and end index, the intention is to replace that text with the target element.",
  object: {
    type: 'object',
    "byteSlice": {
      "type": "object",
      "description": "Specifies the sub-string range a facet feature applies to. Start index is inclusive, end index is exclusive. Indices are zero-indexed, counting bytes of the UTF-8 encoded text. NOTE: some languages, like Javascript, use UTF-16 or Unicode codepoints for string slice indexing; in these languages, convert to byte arrays before working with facets. Byte slices can overlap.",
      "internalRequired": [
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
      },
      optional: true
    },
    "yaml-front-matter": {
      "type": "object",
      "description": "Identify a block of front matter at the top of the Markdown block. It is expected that this has a byteStart and byteEnd.",
      "required": [],
      "properties": {
      },
      optional: true
    },
    "raw": {
      "type": "object",
      "description": "Place raw text at the provided byte index. This is a powerful escape hatch for anything that can't be achieved with the other facet features, but use it with caution as it can easily break things if used incorrectly. Do not expect systems to render it.",
      "required": [
      ],
      "properties": {
      },
      optional: true
    }
  }
};
