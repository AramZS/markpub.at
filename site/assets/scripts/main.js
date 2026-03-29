const autoBtn = document.getElementById('hide-btn');
autoBtn.addEventListener('click', () => {
  const isActive = autoBtn.classList.toggle('is-active');
  document.body.classList.toggle('hide-markdown-input', isActive);
  autoBtn.setAttribute('aria-pressed', String(isActive));
  autoBtn.innerText = isActive ? 'Show Markdown Input' : 'Hide';
});

const grabBtn = document.getElementById('grab-input');
const textModal = document.getElementById('text-modal');
const modalContent = document.getElementById('modal-content');
const modalClose = textModal.querySelector('.text-modal__close');

grabBtn.addEventListener('click', () => {
  var inputText = document.getElementById('dialog-text').innerText;

  var finalText = `{
  "$type": "at.markpub.markdown",
    "text": {
    "$type": "at.markpub.text",
      "markdown": "${inputText}"
  }
}`
  modalContent.innerHTML = "<pre><code class=\"language-json language.json\">" + finalText + "</code></pre>"
  hljs.highlightElement(modalContent.querySelector('code'));


  textModal.showModal();
});

modalClose.addEventListener('click', () => textModal.close());

textModal.addEventListener('click', (e) => {
  if (e.target === textModal) textModal.close();
});
