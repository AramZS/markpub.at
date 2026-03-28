const footer = require("./partials/footer.11ty.js");

module.exports = async function(data, zones) {
  // console.log("layout data", data);
  let templateStyle = '';
  if (zones.template) {
    templateStyle = `<link rel="stylesheet" href="/assets/css/template-${zones.template}.css">`;
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

	</head>
	<body>
  <div class="main-screen">
    <header class="header-area">
      <div class="sidebar__triangle-wrapper">
        <aside class="sidebar__triangle">
          <button class="sidebar__icon" aria-label="home" title="Home">

            <img src="/assets/imgs/markpubat-logo-transparent.png" alt="Home icon" class="sidebar__icon-img" aria-hidden="true">
            </button>
        </aside>
      </div>
      <h1>${data.contentTitle}</h1>
    </header>
    <aside class="sidebar" aria-label="Sidebar controls">
      
  
    <div class="nameplate" aria-label="Site name">
       <h1 class="nameplate__title">${data.site.titleShort}</h1>
    </div>

    <div><p>src</p></div>

 
    <div class="sidebar__line" aria-hidden="true"></div>
 
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
        <a href="#examples">
          <tspan font-size="16" fill="#f0f0f0" letter-spacing="2">Examples</tspan>
        </a>
      </textPath>
    </text>

    <text font-family="Rajdhani, sans-serif" font-weight="600" text-anchor="middle">
      <textPath href="#arc2" startOffset="50%">
        <tspan font-size="11" fill="#f0f0f0" letter-spacing="2">Lexicons</tspan>
      </textPath>
    </text>

    <text font-family="Rajdhani, sans-serif" font-weight="600" text-anchor="middle">
      <textPath href="#arc3" startOffset="50%">
        <tspan font-size="10" fill="#f5c400" letter-spacing="1">FAQ</tspan>
      </textPath>
    </text>

  </svg>
</aside>

		<main id="inner-body">
      ${zones?.innerBody ? zones.innerBody : zones.content}
		</main>
    ${await footer(data, zones)}
 
    <!-- ══════════════════════════════════
         MESSAGE BUTTON — Bottom left circle
         ══════════════════════════════════ -->
    <button class="msg-btn" aria-label="Open message log" title="Message log">
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
      <p class="dialog-box__text" id="dialog-text" contenteditable="true" spellcheck="false" aria-multiline="true">
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
  </div><!-- /.game-screen -->
 
 
  <!-- ══════════════════════════════════
       Minimal JS — AUTO toggle only
       ══════════════════════════════════ -->
  <script>
    const autoBtn = document.getElementById('hide-btn');
    autoBtn.addEventListener('click', () => {
      const isActive = autoBtn.classList.toggle('is-active');
      autoBtn.setAttribute('aria-pressed', String(isActive));
    });
  </script>
	</body>
</html>`;
};
