/* Navigation is visible without JavaScript; enhancement adds the mobile toggle. */
(() => {
  const button = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('#hauptnavigation');
  if (!button || !navigation) return;
  document.documentElement.classList.add('js');
  const mobile = window.matchMedia('(max-width: 700px)');
  const setOpen = (open, returnFocus = false) => {
    button.setAttribute('aria-expanded', String(open));
    navigation.classList.toggle('is-open', open);
    if (returnFocus) button.focus();
  };
  button.addEventListener('click', () => {
    setOpen(button.getAttribute('aria-expanded') !== 'true');
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && button.getAttribute('aria-expanded') === 'true') {
      setOpen(false, true);
    }
  });
  navigation.addEventListener('click', (event) => {
    if (event.target.closest('a') && mobile.matches) setOpen(false);
  });
  mobile.addEventListener('change', () => {
    const focusInNavigation = navigation.contains(document.activeElement);
    setOpen(false, mobile.matches && focusInNavigation);
  });
  window.addEventListener('pageshow', () => setOpen(false));
})();
