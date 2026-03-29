const footer = require("./partials/footer.11ty.js");

module.exports = async function(data, zones) {
  // console.log("layout data", data);
  let templateStyle = '';
  if (zones.template) {
    templateStyle = `<link rel="stylesheet" href="/assets/css/template-${zones.template}.css">`;
  }
  let isHome = data.page.url === '/';
  let homeLink = '';
  console.log('Rendering URL:', data.page.url)
  let compassLinks = {
    examples: '#examples',
    lexicons: '#lexicons',
    faq: '/faq'
  }
  if (isHome) {
    homeLink = /*html*/ `<a href="#page-top" title="Go to top">          
    <button class="sidebar__icon" aria-label="home" title="Home">
      <img src="/assets/imgs/markpubat-logo-transparent.png" alt="Home icon" class="sidebar__icon-img" aria-hidden="true">
    </button>
          </a>`;
  } else {
    homeLink = /*html*/ `<a href="/" title="Go to home page">          
    <button class="sidebar__icon" aria-label="home button" title="Home">
      <img src="/assets/imgs/markpubat-logo-transparent.png" alt="Home icon" class="sidebar__icon-img" aria-hidden="false">
    </button>
          </a>`;
    compassLinks = {
      examples: '/#examples',
      lexicons: '/#lexicons',
      faq: '/faq'
    }
  }

  return /*html*/ `<!doctype html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0,minimum-scale=1">
		<title>${data.title || data.site.title}</title>
    <meta name="description" content="${data.description || data.site.description}">
    <script>
		window.pageData = {};
		</script>
    <link rel="stylesheet" href="/assets/css/fonts.css">
    <link rel="stylesheet" href="/assets/css/basic.css">
    <style>
      pre {
        max-width: 900px;
      }
      pre > code {
        white-space: pre-wrap;
      }
    </style>
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
    <link rel="manifest" href="/site.webmanifest">
		${zones.earlyHead || ''}
		${templateStyle}
		${zones.lateHead || ''}
    <!-- Privacy-friendly analytics by Plausible -->
    <script async src="https://plausible.io/js/pa-SbF9f4OaK8xa9S5YQpgOZ.js"></script>
    <script>
      window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};
      plausible.init()
    </script>

    
    <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/highlight.min.js"></script>

    <!-- and it's easy to individually load additional languages -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/languages/js.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/languages/json.min.js"></script>
    <script>
      hljs.highlightAll();
    </script>
    <script>
      var page = ${JSON.stringify(this.page)};
    </script>

	</head>
	<body data-location-home=${isHome}>
  <div class="main-screen">
    <header class="header-area">
      <div class="sidebar__triangle-wrapper">
        <aside class="sidebar__triangle">
          ${homeLink}
        </aside>
      </div>

      <a id="page-top"></a>
      <h2 class="rajdhani-bold">${data.contentTitle}</h2>
    </header>
    <aside class="sidebar" aria-label="Sidebar controls">
  
    <div class="nameplate" aria-label="Site name">
       <h1 class="nameplate__title">${data.site.titleShort}</h1>
    </div>
    <div class="sidebar-item-set">
      <div class="sidebar-item">
        <a href="https://bsky.app/profile/markpub.at" title="Follow us on Bluesky" target="_blank"><svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-5 w-auto"><path d="M4.335 2.18556C6.62833 3.90639 9.09417 7.39639 10 9.26972C10.9058 7.39722 13.3717 3.90639 15.665 2.18556C17.3192 0.943056 20 -0.0177777 20 3.04056C20 3.65056 19.65 8.17056 19.4442 8.90472C18.7308 11.4556 16.1292 12.1064 13.815 11.7131C17.86 12.4014 18.8892 14.6814 16.6667 16.9622C12.4458 21.2922 10.6 15.8756 10.1275 14.4872C10.0408 14.2331 10.0008 14.1139 10 14.2147C10 14.1139 9.95833 14.2331 9.8725 14.4872C9.39917 15.8756 7.55417 21.2922 3.33333 16.9622C1.11083 14.6814 2.14 12.4014 6.185 11.7122C3.87083 12.1064 1.26917 11.4556 0.555833 8.90472C0.35 8.17139 0 3.65056 0 3.04056C0 -0.0177777 2.68083 0.943056 4.335 2.18556Z" fill="currentColor"></path></svg></a>
      </div>
      <div class="sidebar-item src" style="height: 20px;">
        <a href="https://github.com/AramZS/markpub.at" title="View source on GitHub" target="_blank">
          <p>src</p>
        </a>
      </div>
      <div class="sidebar-item"><a title="We're compatible with Standard.Site, check them out." href="https://standard.site" target="_blank"><svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" class="size-7 text-base-content"><path fill-rule="evenodd" clip-rule="evenodd" d="M13.7848 0.065714C13.9147 -0.0219047 14.0853 -0.0219047 14.2152 0.065714C14.3672 0.16831 14.4487 1.17325 14.6113 3.18324L14.6679 3.88175H18.5308C21.5884 3.88179 24.067 6.36063 24.067 9.41828V10.3728H22.1579V9.41828C22.1579 7.415 20.5341 5.79089 18.5308 5.79086H14.8257C14.9975 7.72432 15.1695 8.84869 15.6731 9.76909C16.2205 10.7696 17.0392 11.5976 18.0361 12.1592C19.167 12.7962 20.6187 12.9381 23.522 13.2213L25.1166 13.3766C26.9289 13.5534 27.8355 13.6419 27.9364 13.793C28.0224 13.9222 28.0211 14.0905 27.933 14.2184C27.83 14.368 26.9222 14.4423 25.107 14.5906L24.067 14.6755V18.5819C24.0669 21.6396 21.5884 24.1181 18.5308 24.1182H14.6632L14.6113 24.7719C14.4489 26.8111 14.3676 27.831 14.2155 27.9342C14.0855 28.0219 13.9148 28.0219 13.7848 27.9342C13.6327 27.8315 13.5514 26.8117 13.389 24.7719L13.3368 24.1182H9.36726C6.30968 24.1181 3.83082 21.6395 3.83079 18.5819V17.6274H5.73987V18.5819C5.73991 20.5852 7.36404 22.209 9.36726 22.209H13.1814C13.0072 20.202 12.8353 19.0446 12.3157 18.1037C11.7575 17.0929 10.9223 16.2602 9.90699 15.7024C8.75503 15.0696 7.27799 14.9489 4.32422 14.7075L2.89302 14.5906C1.07778 14.4423 0.170021 14.368 0.0669912 14.2184C-0.0210463 14.0905 -0.0224419 13.9222 0.0635733 13.793C0.164352 13.6418 1.07092 13.5534 2.88339 13.3766L3.83079 13.284V9.41828C3.83079 6.36064 6.30966 3.8818 9.36726 3.88175H13.3324L13.389 3.18324C13.5515 1.17355 13.6328 0.168553 13.7848 0.065714ZM22.1579 14.8352C20.1779 15.0125 19.0285 15.1887 18.0933 15.7024C17.0779 16.2602 16.2425 17.0929 15.6843 18.1037C15.1647 19.0446 14.9928 20.202 14.8186 22.209H18.5308C20.534 22.209 22.1578 20.5852 22.1579 18.5819V14.8352ZM9.36726 5.79086C7.36401 5.7909 5.73987 7.41501 5.73987 9.41828V13.0957C7.82821 12.8811 9.01013 12.6965 9.96385 12.1592C10.9608 11.5976 11.7795 10.7696 12.3269 9.76909C12.8305 8.84869 13.0028 7.72433 13.1746 5.79086H9.36726Z" fill="currentColor"></path></svg></a></div>
      <div class="sidebar-item nexus"><a title="Visit the author's links" href="https://aramzs.nexus" target="_blank"><img src="/assets/imgs/zs-favicon-32x32.png" /></a></div>
      <div class="sidebar-item">
        <a title="Follow the author on Bluesky" href="https://bsky.app/profile/chronotope.aramzs.xyz" target="_blank">
        <svg width="36" height="36" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <mask id="my-mask">
            <!-- White = visible, black = hidden -->
            <path d="M4.335 2.18556C6.62833 3.90639 9.09417 7.39639 10 9.26972C10.9058 7.39722 13.3717 3.90639 15.665 2.18556C17.3192 0.943056 20 -0.0177777 20 3.04056C20 3.65056 19.65 8.17056 19.4442 8.90472C18.7308 11.4556 16.1292 12.1064 13.815 11.7131C17.86 12.4014 18.8892 14.6814 16.6667 16.9622C12.4458 21.2922 10.6 15.8756 10.1275 14.4872C10.0408 14.2331 10.0008 14.1139 10 14.2147C10 14.1139 9.95833 14.2331 9.8725 14.4872C9.39917 15.8756 7.55417 21.2922 3.33333 16.9622C1.11083 14.6814 2.14 12.4014 6.185 11.7122C3.87083 12.1064 1.26917 11.4556 0.555833 8.90472C0.35 8.17139 0 3.65056 0 3.04056C0 -0.0177777 2.68083 0.943056 4.335 2.18556Z" fill="white" transform="scale(1.8)"></path>
          </mask>
        </defs>
        <image href="/assets/imgs/zs-favicon-32x32.png" width="36px" height="36px" mask="url(#my-mask)" />
        </svg>
        </a>
      </div>
    </div>

 
    <div class="sidebar__line" aria-hidden="true"></div>
    <div class="sidebar__links mobile-nav skip-links" aria-hidden="true">
      <ul>
        <li><a href="${compassLinks.examples}" class="skip-link">Examples</a></li>
        <li><a href="${compassLinks.lexicons}" class="skip-link">Lexicons</a></li>
        <li><a href="${compassLinks.faq}" class="skip-link">FAQ</a></li>
      </ul>
    </div>
 
    </aside>

 

<aside class="hud" role="status" aria-label="Game status">
<svg viewBox="0 0 140 140" width="140" height="140" xmlns="http://www.w3.org/2000/svg">

    <!-- Chapter -->
    <defs>
      <path id="arc1" d="M 20,70 A 50,50 0 0,1 120,70"></path>
      <path id="arc2" d="M 39,70 A 31,31 0 0,1 101,70"></path>
      <path id="arc3" d="M 56,70 A 14,14 0 0,1 84,70"></path>
    </defs>

    <text font-family="Rajdhani, sans-serif" font-weight="800" text-anchor="middle">
      <textPath href="#arc1" startOffset="50%">
        <a href="${compassLinks.examples}">
          <tspan font-size="16" fill="#f0f0f0" letter-spacing="2">Examples</tspan>
        </a>
      </textPath>
    </text>

    <text font-family="Rajdhani, sans-serif" font-weight="600" text-anchor="middle">
      <textPath href="#arc2" startOffset="50%">
        <a href="${compassLinks.lexicons}">
        <tspan font-size="11" fill="#f0f0f0" letter-spacing="2">Lexicons</tspan>
        </a>
      </textPath>
    </text>

    <text font-family="Rajdhani, sans-serif" font-weight="600" text-anchor="middle">
      <textPath href="#arc3" startOffset="50%">
        <a href="${compassLinks.faq}">
        <tspan font-size="10" fill="#f5c400" letter-spacing="1">FAQ</tspan>
        </a>
      </textPath>
    </text>

  </svg>
</aside>

		<main id="inner-body">
      ${zones?.innerBody ? zones.innerBody : zones.content}

      ${await footer(data, zones)}
		</main>
 
    <!-- ══════════════════════════════════
         MESSAGE BUTTON — Bottom left circle
         ══════════════════════════════════ -->
    <button id="grab-input" class="msg-btn" aria-label="Open Markdown Input" title="Markdown Input">
      <!-- Speech bubble icon -->
      <svg class="msg-btn__icon" xmlns="http://www.w3.org/2000/svg"
           viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20 2H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h3l3 3 3-3h7a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
      </svg>
    </button>
 
    <!-- ══════════════════════════════════
         INPUT AREA - for text input
         ══════════════════════════════════ -->
    <div class="dialog-box" role="region" aria-label="Input Area">
 
    <!-- ══════════════════════════════════
         CHECKERBOARD STRIP — Decorative
         ══════════════════════════════════ -->
    <div class="checker-strip checker-strip--footer" aria-hidden="true"></div>
      <p class="dialog-box__text" id="dialog-text" contenteditable="true" spellcheck="false" aria-multiline="true" aria-live="true">
        Enter your markdown here to see how it works.
      </p>
    </div>
 
    <!-- ══════════════════════════════════
         HIDE BADGE — Allows user to hide inputs
         ══════════════════════════════════ -->
    <button
      class="hide-badge"
      id="hide-btn"
      aria-pressed="false"
      title="Toggle hide"
    >
      Hide
    </button>
  <!-- ══════════════════════════════════
       TEXT MODAL — shows dialog-box__text content
       ══════════════════════════════════ -->
  <dialog id="text-modal" class="text-modal" aria-label="Markdown text content">
    <div class="text-modal__inner">
      <button class="text-modal__close" aria-label="Close modal">✕</button>
      <pre class="text-modal__content" id="modal-content"></pre>
      <br />
      <p>It's just that simple!</p>
    </div>
  </dialog>

  </div>
 
 
  <!-- ══════════════════════════════════
       Minimal JS — AUTO toggle only
       ══════════════════════════════════ -->
  <script async src="/assets/scripts/main.js"></script>
	</body>
</html>`;
};
