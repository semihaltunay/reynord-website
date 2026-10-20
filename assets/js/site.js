(() => {
  // Sticky header border once the page scrolls
  const header = document.querySelector('.site-header');
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Mobile navigation
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('site-nav');
  const setNav = open => {
    toggle.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
  };
  toggle.addEventListener('click', () => setNav(toggle.getAttribute('aria-expanded') !== 'true'));
  nav.addEventListener('click', e => { if (e.target.closest('a')) setNav(false); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setNav(false); });

  // Connector hotspots <-> legend
  const spots = document.querySelectorAll('[data-spot]');
  const setActive = n => spots.forEach(el => el.classList.toggle('is-active', el.dataset.spot === n));
  spots.forEach(el => {
    el.addEventListener('mouseenter', () => setActive(el.dataset.spot));
    el.addEventListener('focus', () => setActive(el.dataset.spot));
    el.addEventListener('click', () => setActive(el.dataset.spot));
  });
  document.querySelectorAll('.ports-grid').forEach(grid =>
    grid.addEventListener('mouseleave', () => setActive(null)));
})();
