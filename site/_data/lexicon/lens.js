module.exports = {
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
      description: "A list of facet types that this lens can translate bidirectionally between. For example, if you include `pub.leaflet.richtext.facet#bold` and `at.markpub.facet#strong` then this lens can be used to translate between those two facet types and any renderer that understands either of those facet types can use this lens to render the facets it understands.",
      "type": "array",
      "items": {
        "type": "union",
        "closed": false,
        "refs": [],
        examples: ['[{"$type": "at.markpub.facets.baseFormatting#strong"}, {"$type":"pub.leaflet.richtext.facet#bold"}]']
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
      "description": "An optional HTML snippet that shows what the output of this lens is intended to look like. This is optional but can be helpful for documentation purposes and for anyone trying to understand how to use the lens.",
      optional: true,
      type: "string",
      examples: ["&lt;strong&gt;&lt;/strong&gt;", "&lt;a&gt;"]
    }
  }
}
