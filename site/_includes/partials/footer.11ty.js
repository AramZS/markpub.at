
module.exports = async function(data, zones) {
  // console.log("layout data", data);
  let templateStyle = '';
  let src = "https://github.com/AramZS/markpub.at";
  return /*html*/ `<footer>
<a href="${src}" target="_blank">src</a>. <a href="https://markpub.org/" target="_blank">Looking for the Python Markdown Static Site Generator? Check out Markpub.org.</a>. This site by <a href="https://aramzs.nexus" target="_blank">Aram Zucker-Scharff</a>.
<div class="bluesky-logo"><a href="https://bsky.app/profile/chronotope.aramzs.xyz" target="_blank"><svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-5 w-auto text-muted-content hover:text-muted transition-colors"><path d="M4.335 2.18556C6.62833 3.90639 9.09417 7.39639 10 9.26972C10.9058 7.39722 13.3717 3.90639 15.665 2.18556C17.3192 0.943056 20 -0.0177777 20 3.04056C20 3.65056 19.65 8.17056 19.4442 8.90472C18.7308 11.4556 16.1292 12.1064 13.815 11.7131C17.86 12.4014 18.8892 14.6814 16.6667 16.9622C12.4458 21.2922 10.6 15.8756 10.1275 14.4872C10.0408 14.2331 10.0008 14.1139 10 14.2147C10 14.1139 9.95833 14.2331 9.8725 14.4872C9.39917 15.8756 7.55417 21.2922 3.33333 16.9622C1.11083 14.6814 2.14 12.4014 6.185 11.7122C3.87083 12.1064 1.26917 11.4556 0.555833 8.90472C0.35 8.17139 0 3.65056 0 3.04056C0 -0.0177777 2.68083 0.943056 4.335 2.18556Z" fill="currentColor"></path></svg></a></div>
</footer>`;
};
