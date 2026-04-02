function hideSelf() {
  const button = document.querySelector('.hide-self-button');
  if (button) {
    button.addEventListener('click', function() {
      button.setAttribute('hidden', 'true');
    });
  }
}
