---
title: Markpub.at Markdown Lexicon
contentTitle: Hello, here's the Markpub.at Markdown Lexicon
description: Providing a Lexicon for putting Markdown in the ATmosphere.
layout: index.11ty.js
---

This is a quick intro to the `at.markpub.markdown` lexicon object for ATProto, intended to have a well-formatted way to put Markdown on your PDS. 

This set of Lexicons is intended to give the most flexibility to put Markdown into any larger document like [Standard.Site](https://standard.site/). It gives you options to use YAML, to upload your Markdown as a Blob in storage on your PDS, or specify formatting using supplied facets, or any facets you choose. 

The goal is not for this to be an independent record, but rather to be inside other records that support passing an object to describe your text. [In ATProto's terms this Lexicon is intended to be used in a property that is of type `union`](https://atproto.com/specs/lexicon#union). 

The Lexicons here are published but still [taking feedback, you can do so via GitHub](https://github.com/AramZS/markpub.at). The current update was published at June 26 2026 (11:45PM ET).

More questions? Check out our [FAQ](/faq).

The lexicons supply all the tools to make it as clear as possible how to render your Markdown, but also extremely simple to do the basics to get your Markdown into the ATmosphere. Here's two examples of the most minimal version of the object, to place in your Standard.Site document or elsewhere: 

Smallest possible: 

```json
{
  "$type": "at.markpub.markdown",
  "text": {
    "$type": "at.markpub.text",
    "markdown": "# Hello World\nThis is a sample markdown text."
  }
}
```

A little extra information for renderers:


```json
{
  "$type": "at.markpub.markdown",
  "text": {
    "$type": "at.markpub.text",
    "markdown": "# Hello World\nThis is a sample markdown text.",
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
            "markdown": "# Hello World\nThis is a sample markdown text.",
            "facets": [{
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
            }],
            "lenses": [
                {
                    "$type": "at.markpub.lens",
                    "outputDescription": "This lens outputs bold or strong styling on web text.",
                    "facets": [
                        {"$type": "at.markpub.facets.baseFormatting#strong"}, 
                        {"$type":"pub.leaflet.richtext.facet#bold"}
                    ],
                    "outputCode": "function renderWithLens(text, facets) { return `<strong>${test}</strong>` }",
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

You can [take a look at the above example in a PDS](https://pdsls.dev/at://did:plc:t5xmf33p5kqgkbznx22p7d7g/site.standard.document/3mdbvp5q2kz2l).

[Give feedback on Github](https://github.com/AramZS/markpub.at) or on [Bluesky](https://bsky.app/profile/markpubat.bsky.social)!
<a id="lexicons"></a>
