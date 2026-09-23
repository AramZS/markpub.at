
const getPersonObj = (me, site) => {

  const metadata = site; 
  me = me || {};

  return {
    "@type": "Person",
    //"name": me?.name || metadata?.author?.name || "",
    "url": me?.url || metadata?.url || "https://aramzs.xyz/",
    "sameAs": me?.sameAs || [],
    "name": {
        "@type": "PronounceableText",
        "inLanguage": "en-US",
        "textValue": me?.name || metadata?.author?.name || "",
        "speechToTextMarkup": "IPA",
        "phoneticText": "/ˌæ.ɹəm ˈt͡sʊ.kɚ 'ʃɑɹf/"
    },
    "description": me.description || "Aram Zucker-Scharff is Software Engineer at The Washington Post, writer, and consultant. Tech solutions for journo problems.",
    "disambiguatingDescription": "A media-focused developer and strategist." || "",
    "sameAs": "http://aramzs.github.io/aramzs/",
    "image": me?.avatar ? {
        "@type": "ImageObject",
        "url": me?.avatar || "",
    } : undefined,
    "givenName": me?.givenName || "Aram",
    "familyName": me?.familyName || "Zucker-Scharff",
    "alternateName": me?.alternateName || "AramZS",
    "publishingPrinciples": me?.publishingPrinciples || metadata?.publishingPrinciples || "http://aramzs.github.io/about/"
  };
};

module.exports = getPersonObj;
