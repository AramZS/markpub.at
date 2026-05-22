---
title: Frequently Asked Questions about Markpub.at
contentTitle: Frequently Asked Questions about Markpub.at
description: Learn more about this Lexicon for putting Markdown in the ATmosphere.
layout: post.11ty.js
---

### Hey isn't there a Markdown parser with a similar name?

Yeah, you should check them out, they've got a very cool python-based parser: [Markpub.org](https://markpub.org/). They're friends, but we're two separate projects. 

### How do I post Markpub's markdown Lexicon to my PDS?

The `at.markpub.markdown` object isn't intended to be posted solo to your PDS but used with other Lexicons. In the language of ATProto a Lexicon can be for a Record, like [Standard.Site's `site.standard.document`](https://standard.site/), or just a standard object that can be [composed](https://atproto.com/specs/lexicon#union) with other objects. 

Where records provide an "open" `union`, like `site.standard.document` does with it's `content` property, you can place any object with a defined `$type`--a defined Lexicon--to provide data to systems that interact with it.

This Lexicon is intended to be composed in that way, *not* published directly to a PDS. I recommend you compose it with `site.standard.document` to start, but it is useful anywhere you want to have Markdown.

If you are curious how I did it, [you can see a little write up here](https://fightwithtools.dev/posts/projects/aramzsxyz/day-20-updating-a-atproto-doc/#day-20). Or [take a look at my PDS for an example](https://pdsls.dev/at://did:plc:t5xmf33p5kqgkbznx22p7d7g/site.standard.document/3mdbvp5q2kz2l). 

### Is this Lexicon published? 

Yes, [it is now](https://pdsls.dev/at://did:plc:kfxbexqtvw76572grhv2f3on/com.atproto.lexicon.schema)!

### I have a comment

Cool, let's [talk about it on BlueSky](https://bsky.app/profile/chronotope.aramzs.xyz), send me a message via DM or in public and we'll talk about it. I really want to have your feedback and build the best possible set of tools to use Markdown on the ATmosphere. Send me links to your blog posts also! 

### Why do you have `flavor` / `renderingRules` / `extensions` / `facets`?

Flavor is a common term in Markdown implementations that encompasses a set of expectations, features, and rendering styles. This gets us to the main point: Rendering Markdown can happen many different ways and there are no hard and fast rules that Markdown will appear a particular rendering style. To people who don't develop markdown tools, it appears like a singular and fairly basic standard, but there are a lot of things that can be done differently. Big things like tables, or small things like if your headers have IDs. 

Some of these seem catastrophic for rendering, but Markdown is intended to be both flexible and decomposable, so while not having rendered a table may look weird, the basic layout of a table is still there in the characters.

That said, it doesn't stop people from writing Markdown with the expectation that particular features might be there. A good example is an anchor link. If you write a long post you may link internally to other headings of the post via anchor links. If your Markdown tool provides these headings automatically you likely don't even think much about it. But that isn't some default for Markdown! 

- `flavor` gives rendering surfaces a sense of the broad rendering style 
- `renderingRules` meets the reality that no rendering system is really out there defining their tricks and tendencies, the only way to really know what the intended rendering system is will be to state the rendering system you use. 
- `extensions` are a common term in the Markdown world that indicates some commonly accepted features that a rendering tool can employ for Markdown. The biggest are LaTeX support and YAML (neither of which are native Markdown features in many rendering tools).
- `facets` extends from the work done on [atJSON](https://atjson.condenast.io/docs/getting-started) by [Blaine](https://bsky.app/profile/blaine.bsky.social) (who was kind enough to advise me on developing these Lexicons) and many others. It also looks at the work on [richtext](https://docs.bsky.app/docs/advanced-guides/post-richtext) [at Bluesky](https://www.pfrazee.com/blog/why-facets) (also at a number of other ATProto platforms). It allows you to specify transforms for areas of text defined by byte positions. The only way to make sure that your Markdown is being rendered as intended is to ship it with the instructions on how to do it. So we made room for that for Markdown producers who really care. 

### I want to render Markpub.at in my app, do I have to care about X property?

No! As I note on the homepage and in the expectations in the descriptions of each property, the only required field is raw markdown! I don't expect you to use 20 different renderers in your system to follow `renderingRules` (in fact, absolutely **do not do that**). These other properties are tools to render the markdown more accurately on your surface *if you want to*. I expect that some properties will grow popular and some may be entirely ignored. It's up to you, the adopters, to use what you want!

I imagine that there will be a variety of rendering surfaces for Markdown-based documents across the ATmosphere. Some of them will be very simple, like basic RSS readers. Users of tools like those will likely not want complex rendering. But the goal is to enable a future where platforms can have more complex rendering! Those platforms could define own facets, or use the [ever](https://pdsls.dev/at://did:plc:pgjkomf37an4czloay5zeth6/com.atproto.lexicon.schema/app.offprint.block.text) [growing](https://tangled.org/leaflet.pub/leaflet/blob/main/lexicons/pub/leaflet/richtext/facet.json) number that are being written and released.

The spec intentionally leaves it open for you to bring your own facets!

### I see a facet in the standard but not the Lexicon for it

Yes, this project will expand to release its own set of facets in the near future with some standard and also surprising features! 

### What is a lens? 

This leans into the facets by providing a basic way to say that "for the context of this document, these facets may be rendered in exactly the same way", a great way to lean into the expanding nature of the ATmosphere by supporting and working with a variety of facet providers and potentially making it easier for your Markdown to be rendered how you want. 

### Isn't this a lot for something pretty basic?

Yeah, but there's more to come, I promise! - Aram 
