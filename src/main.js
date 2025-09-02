// src/main.js
import '/src/style.css';

// ---------- Hjälpare ----------
function normalizePath(pathname) {
  const p = (pathname || '/').replace(/\/+$/, '');
  return p === '' ? '/' : p;
}

function isInternal(url) {
  return url.origin === location.origin;
}

function $(sel, root = document) {
  return root.querySelector(sel);
}
function $all(sel, root = document) {
  return Array.from(root.querySelectorAll(sel));
}

// ---------- DOTNET Fiddle utils ----------
function extractFiddleLink(widgetUrl) {
  try {
    if (!widgetUrl) return null;
    const u = new URL(widgetUrl, location.href);
    const id = u.pathname.split('/').pop();
    return id ? `https://dotnetfiddle.net/${id}` : null;
  } catch {
    return null;
  }
}

function ensureProgramIframeLoaded() {
  const iframe = document.getElementById('csRunner');
  if (!iframe) return;

  // Ladda bara första gången
  if (!iframe.dataset.loaded) {
    const url = iframe.dataset.src || 'https://dotnetfiddle.net/Widget/fx2SpT';
    iframe.src = url;
    iframe.dataset.loaded = '1';

    // Fallback-länken pekar på "view"-URL (inte widget)
    const fb = document.getElementById('runnerFallbackLink');
    if (fb) {
      fb.href = extractFiddleLink(url) || fb.href || '#';
      fb.setAttribute('rel', 'noopener noreferrer');
      fb.setAttribute('target', '_blank');
    }
  }
}

// ---------- UI / Tabbar ----------
function setActivePanel(panelId) {
  // Dölj alla paneler
  $all('.tab-content').forEach((sec) =>
    sec.setAttribute('aria-hidden', 'true')
  );

  // Visa vald
  const panel = document.getElementById(panelId);
  if (panel) panel.setAttribute('aria-hidden', 'false');

  // Uppdatera aria-current på flikar
  $all('.tabs a[data-tab]').forEach((a) => {
    const tab = a.getAttribute('data-tab');
    if (tab === panelId) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  });

  // Lazy-load runnern endast på Program
  if (panelId === 'program') ensureProgramIframeLoaded();
}

function routeTo(pathname) {
  const map = {
    '/': 'program',
    '/program': 'program',
    '/about': 'about'
  };
  const id = map[normalizePath(pathname)] || 'program';
  setActivePanel(id);
}

// ---------- Navigation ----------
function onNavClick(e) {
  const target = e.target.closest('a[data-tab]');
  if (!target) return;

  const href = target.getAttribute('href') || '/';
  const url = new URL(href, location.origin);

  // Intern länk med client-side navigering
  if (isInternal(url)) {
    e.preventDefault();
    history.pushState(null, '', url.pathname);
    routeTo(url.pathname);
  }
}

// Tillåt även keyboard med Enter/Space om knappar/roles på li
function setupNav() {
  const nav = document.querySelector('nav');
  if (nav) nav.addEventListener('click', onNavClick);
}

// ---------- Hash-backcompat & popstate ----------
function migrateHashToPathIfNeeded() {
  if (location.hash === '#program') {
    history.replaceState(null, '', '/program');
  } else if (location.hash === '#about') {
    history.replaceState(null, '', '/about');
  }
}

window.addEventListener('popstate', () => routeTo(location.pathname));

// ---------- Boot ----------
window.addEventListener('DOMContentLoaded', () => {
  setupNav();

  // Backcompat för gamla bokmärken
  migrateHashToPathIfNeeded();

  // Starta rätt vy
  routeTo(location.pathname);
});

// ---------- Hamburgermeny ----------
(function () {
  function init() {
    const btn = document.getElementById('hamburgerMenu');
    const menu = document.getElementById('navLinks');
    if (!btn || !menu) return;

    const OPEN = 'active';

    // lite ARIA
    btn.setAttribute('role', 'button');
    btn.setAttribute('aria-controls', 'navLinks');
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('tabindex', '0');

    function open() {
      if (menu.classList.contains(OPEN)) return;
      menu.classList.add(OPEN);
      btn.setAttribute('aria-expanded', 'true');
      // Globala lyssnare medan menyn är öppen
      document.addEventListener('click', onDocClick, true);
      document.addEventListener('keydown', onKeyDown, true);
    }

    function close() {
      if (!menu.classList.contains(OPEN)) return;
      menu.classList.remove(OPEN);
      btn.setAttribute('aria-expanded', 'false');
      document.removeEventListener('click', onDocClick, true);
      document.removeEventListener('keydown', onKeyDown, true);
    }

    function toggle() {
      menu.classList.contains(OPEN) ? close() : open();
    }

    function onDocClick(e) {
      const t = e.target;
      if (t === btn || btn.contains(t)) return; // klick på knappen
      if (menu.contains(t)) return; // klick i menyn
      close(); // klick utanför stänger
    }

    function onKeyDown(e) {
      if (e.key === 'Escape') close();
      if ((e.key === 'Enter' || e.key === ' ') && e.target === btn) {
        e.preventDefault();
        toggle();
      }
    }

    // Enda permanenta lyssnarna
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggle();
    });
    menu.addEventListener('click', (e) => {
      e.stopPropagation();
    });

    // Stäng om fönstret ändrar storlek
    window.addEventListener('resize', () => {
      if (menu.classList.contains(OPEN)) close();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
