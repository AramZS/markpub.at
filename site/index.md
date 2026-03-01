---
title: Markpub.at Markdown Lexicon
description: Providing a Lexicon for putting Markdown in the ATmosphere.
layout: index.11ty.js
---

# Hello, here's the Markpub.at Markdown Lexicon

This is a quick intro to the `at.markpub.markdown` lexicon object for ATProto, intended to have a well-formatted way to put Markdown on your PDS. 

This set of Lexicons is intended to give the most flexibility to put Markdown into any larger document like Standard.Site. It gives you options to use YAML, to upload your Markdown as a Blob in storage on your PDS, or specify formatting using supplied facets, or any facets you choose. 

The goal is not for this to be an independent record, but rather to be inside other records that support passing an object to describe your text. 

This Lexicon is not yet published but still [taking feedback, you can do so via GitHub](https://github.com/AramZS/markpub.at). The current update was published at Feb 28 2026 (8:15PM EST).

The lexicons supply all the tools to make it as clear as possible how to render your Markdown, but also extremely simple to do the basics to get your Markdown into the ATmosphere. Here's an example of the most minimal version of the object, to place in your Standard.Site document or elsewhere: 

```json
{
  "$type": "at.markpub.markdown",
  "text": {
    "$type": "at.markpub.text",
    "rawMarkdown": "# Hello World\nThis is a sample markdown text.",
    "flavor": "commonmark",
    "renderingRules": "markdown-it"
  }
}
```

Scroll down to see the <a href="#lexicons" class="skip-link">lexicons</a> and more detailed <a href="#examples" class="skip-link">examples</a> 

## Used with [Standard.Site](https://standard.site/)

```json
{
    "$type": "site.standard.document",
    "publishedAt": "2024-06-08T10:00:00.000Z",
    "site": "at://did:plc:t5xmf33p5kqgkbznx22p7d7g/site.standard.publication/3mbrgnnqzrr2q",
    "path": "/essays/hello-world/",
    "title": "Hello World!",
    "description": "Markdown is less simple than it seems.",
    "coverImage": {
        "$type": "blob",
        "ref": {
            "$link": "bafkreig2247wcpqjkqy2ukjh4gjyqhpl32kg3pva4x55npjmuh4joeware"
        },
        "mimeType": "image/jpeg",
        "size": 347901
      },
    "textContent": "Hello World\nThis is a sample markdown text.",
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
                "$type": "at.markpub.facets.baseFormatting#header",
                "level": 1
                },
                {
                "$type": "at.markpub.facets.baseFormatting#idify"
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
    "tags": ["IndieWeb", "Tech", "The Long Next"],
    "updatedAt":"2024-06-08T10:30:00.000Z"

}
```

[Give feedback on Github](https://github.com/AramZS/markpub.at) or on [Bluesky](https://bsky.app/profile/markpubat.bsky.social)!
<a id="lexicons">
