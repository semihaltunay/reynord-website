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

  // Tabs (software page modules): click, arrow keys, Home / End
  document.querySelectorAll('[data-tabs]').forEach(root => {
    const tabs = [...root.querySelectorAll('[role="tab"]')];
    const select = tab => tabs.forEach(t => {
      const on = t === tab;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
    });
    tabs.forEach((tab, i) => {
      tab.addEventListener('click', () => select(tab));
      tab.addEventListener('keydown', e => {
        const next = {
          ArrowDown: tabs[(i + 1) % tabs.length], ArrowRight: tabs[(i + 1) % tabs.length],
          ArrowUp: tabs[(i - 1 + tabs.length) % tabs.length], ArrowLeft: tabs[(i - 1 + tabs.length) % tabs.length],
          Home: tabs[0], End: tabs[tabs.length - 1],
        }[e.key];
        if (next) { e.preventDefault(); select(next); next.focus(); }
      });
    });
  });
})();
