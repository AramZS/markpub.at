let data = {
  title: "Markpub.at - ATProto Lexicons for handling Markdown",
  description:
    "A collection of ATProto lexicons for handling markdown content and metadata.",
  author: "Aram Zucker-Scharff",
  aboutMePage: "https://aramzs.github.io/aramzs/",
  rels: [
    { href: "https://aramzs.glitch.me/", title: "Link in Glitch" },
    {
      href: "https://indieweb.social/@Chronotope",
      title: "Mastodon: IndieWeb",
    },
    { href: "https://cohost.org/Chronotope", title: "Cohost" },
    { href: "https://github.com/aramzs", title: "GitHub" },
    { href: "https://twitter.com/chronotope", title: "Twitter" },
    { href: "https://keybase.io/aramzs", title: "Keybase" },
    { href: "https://bsky.app/profile/chronotope.aramzs.xyz", title: "BlueSky" },
  ],
  bluesky: "@chronotope.aramzs.xyz",
  avatar: "https://raw.githubusercontent.com/AramZS/aramzs.github.io/master/_includes/Aram-Zucker-Scharff-square.jpg"
};

module.exports = (info) => {
  return data;
};
