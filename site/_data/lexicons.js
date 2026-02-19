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
        type: 'string',
        examples: ['# Hello World\nThis is a sample markdown text.'],
        optional: false,
      },
      flavor: {
        description:
          "Markdown may be rendered in many flavors. The most common are CommonMark and Github Flavored Markdown (GFM). Generally your markdown is one of those two and if you don't know then it is likely CommonMark. At this time the lexicon only recognizes these two flavors. Submit a PR if you think one should be added.",
        type: 'string',
        enum: ['GFM', 'CommonMark'],
        default: 'CommonMark',
        examples: ['GFM', 'CommonMark'],
        optional: false,
      },
      preferredRenderer: {
        description:
          "Different rendering systems for Markdown may introduce slight or significant changes to the resulting HTML. This setting allows you to specify your preferred renderer. Keep in mind that no consuming entity is obligated to honor this preference. Some examples might be `marked`, `pandoc`, `markdown-it` `mdxt`, etc. Generally, this lexicon assumes that you are pulling the Markdown from an existing site that includes an existing rendering process. The processor used for that process to build your site's pages is the one you should include here. If you don\'t know then just leave this field out.",
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
];
