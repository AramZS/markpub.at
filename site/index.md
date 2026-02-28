---
title: Markpub.at Markdown Lexicon
description: Providing a Lexicon for putting Markdown in the ATmosphere.
layout: index.11ty.js
---

# Hello

This is a quick intro to the `at.markpub.markdown` lexicon object for ATProto, intended to have a well-formatted way to put Markdown on your PDS. 

## Used with [Standard.Site](https://standard.site/)

```json
{
    "$type": "site.standard.document",
    "publishedAt": "2024-06-08T10:00:00.000Z",
    "site": "at://did:plc:t5xmf33p5kqgkbznx22p7d7g/site.standard.publication/3mbrgnnqzrr2q",
    "path": "/essays/the-internet-is-a-series-of-webs/",
    "title": "The Internet is a Series of Webs",
    "description": "The fate of the open web is inextricable from the other ways our world is in crisis. What can we do about it?",
    "coverImage": {
        "$type": "blob",
        "ref": {
            "$link": "bafkreig2247wcpqjkqy2ukjh4gjyqhpl32kg3pva4x55npjmuh4joeware"
        },
        "mimeType": "image/jpeg",
        "size": 347901
      },
    "textContent": "<textContent>",
    "content": {
        "$type": "at.markpub.markdown",
        "flavor": "gfm",
        "renderingRules": "markdown-it",
        "extensions": [
            "LaTeX",
            "YAML"
        ],
        "text": {
            "$type": "at.markpub.text",
            "rawMarkdown": "# Hello World\nThis is a sample markdown text.",
            "facets": {
            "index": {
                "byteStart": 0,
                "byteEnd": 13
            },
            "features": [
                {
                "$type": "at.markpub.baseFormattingFacets#header",
                "level": 1
                },
                {
                "$type": "at.markpub.baseFormattingFacets#idify"
                }
            ]
            },
            "lenses": [
            {
                "$type": "at.markpub.lens",
                "outputDescription": "This lens outputs bold or strong styling on web text.",
                "facets": [
                "at.markpub.facet#strong",
                "pub.leaflet.richtext.facet#bold"
                ],
                "outputCode": "function renderWithLens(text, facets) { /* code to render text with facets */ }",
                "outputTargetHTML": "<strong></strong>"
            }
            ]
        }
    },
    "bskyPostRef": {
        "$type": "com.atproto.repo.strongRef",
        "uri": "at://did:plc:t5xmf33p5kqgkbznx22p7d7g/app.bsky.feed.post/3kulbtuuixs27",
        "cid": "bafyreigh7yods3ndrmqeq55cjisda6wi34swt7s6kkduwcotkgq5g5y2oe"
    },
    "tags": ["IndieWeb", "Tech", "The Long Next", "series:The Wild Web"],
    "updatedAt":"2024-06-08T10:30:00.000Z"

}
```

[Give feedback on Github](https://github.com/AramZS/markpub.at) or on [Bluesky](https://bsky.app/profile/markpubat.bsky.social)!
