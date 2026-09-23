const getPersonObj = require("./partials/json-ld-objs/person");

/**
 * Strips HTML tags and truncates text to a maximum character length.
 */
const truncateText = (str = "", maxLength = 200) => {
  const stripped = str.replace(/<[^>]+>/g, "");
  return stripped.length > maxLength
    ? `${stripped.substring(0, maxLength)}...`
    : stripped;
};

const JsonLdHeader = (data) => {
  
  const {
    ogtype,
    linkInternal,
    canonical,
    isBasedOn,
    localBasedOn,
    title,
    metadata,
    description,
    finalSocialImage,
    cite,
    site,
    rating,
    content,
    first_air_date,
    release_date,
    page,
  } = data.site;

  const mainPageUrl = `${metadata?.url || ""}${page?.url || ""}`;
  const pageUrl = linkInternal
    ? mainPageUrl
    : canonical || isBasedOn || mainPageUrl;

  // Determine primary Schema @type
  let schemaType = "WebSite";
  if (ogtype === "article") {
    schemaType = "Blog";
  } else if (
    ogtype === "video" ||
    ogtype === "video.movie" ||
    ogtype === "video.tv_show"
  ) {
    schemaType = "Review";
  }

  const person = getPersonObj(data?.me, data.site);

  // Handle single author vs multiple authors
  let author = person;
  if (cite?.author) {
    author = [
      person,
      {
        "@type": "Person",
        "name": cite.author,
      },
    ];
  }

  // Construct JSON-LD schema structure
  const schema = {
    "@context": "http://schema.org",
    "@type": schemaType,
    "url": pageUrl,
    "headline": title || metadata?.title,
    "about": description || metadata?.description,
    "image": finalSocialImage ? [finalSocialImage] : [],
    "isAccessibleForFree": "True",
    "isPartOf": {
      "@type": ["CreativeWork", "Product"],
      "name": metadata?.title,
      "productID": metadata?.url,
    },
    ...(isBasedOn && {
      "isBasedOn": `${localBasedOn ? metadata?.url || "" : ""}${isBasedOn}`,
    }),
    "author": author,
    "editor": person,
    "inLanguage": "en-US",
    "license": "http://creativecommons.org/licenses/by-nc-sa/4.0/",
    "additionalType": "CreativeWork",
    "alternateName": site?.site_name,
  };

  // Add Review & Rating schema if applicable
  if (rating) {
    let itemReviewedType = "VideoObject";
    if (ogtype === "video.tv_show") {
      itemReviewedType = "TVSeries";
    } else if (ogtype === "video.movie") {
      itemReviewedType = "Movie";
    }

    schema.reviewRating = {
      "@type": "Rating",
      "ratingValue": rating,
      "worstRating": 1,
      "bestRating": 5,
    };

    if (content) {
      schema.reviewBody = truncateText(content, 200);
    }

    schema.itemReviewed = {
      "@type": itemReviewedType,
      "name": title || metadata?.title,
    };

    if (first_air_date) schema.startDate = first_air_date;
    if (release_date) schema.datePublished = release_date;
  }

  schema.publisher = {
    "@type": "Organization",
    "name": metadata?.title,
    "description": metadata?.description,
    "sameAs": "https://aramzs.xyz/",
    "logo": {
      "@type": "ImageObject",
      "url": `${metadata?.url || ""}/${metadata?.defaultSocialImage || ""}`,
    },
    "publishingPrinciples": "http://aramzs.github.io/about/",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 2) }}
    />
  );
};

module.exports = JsonLdHeader;
