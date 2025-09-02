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

// ---------- CSP debug ----------
window.addEventListener('securitypolicyviolation', (e) => {
  console.log('CSP blocked:', e.blockedURI, e.violatedDirective);
});

// ---------- Boot ----------
window.addEventListener('DOMContentLoaded', () => {
  setupNav();

  // Backcompat för gamla bokmärken
  migrateHashToPathIfNeeded();

  // Starta rätt vy
  routeTo(location.pathname);
});

// ---------- Hamburgermeny ----------
document.getElementById('hamburgerMenu').addEventListener('click', function () {
  const menu = document.getElementById('navLinks');
  menu.classList.toggle('active'); // Växlar mellan att visa/dölja menyn
  trigger.setAttribute('role', 'button');
  trigger.setAttribute('aria-controls', 'navLinks');
  trigger.setAttribute('aria-expanded', 'false');
  trigger.setAttribute('tabindex', '0');

  // Hjälpare
  const firstFocusable = () =>
    menu.querySelector('a, button, [tabindex]:not([tabindex="-1"])');

  function openMenu() {
    menu.classList.add('open'); // styr visning i CSS
    document.body.classList.add('no-scroll');
    trigger.setAttribute('aria-expanded', 'true');
    const first = firstFocusable();
    if (first) first.focus();
    // Lyssna globalt för att stänga
    window.addEventListener('click', onWindowClick, { capture: true });
    window.addEventListener('keydown', onKeyDown, true);
  }

  function closeMenu() {
    if (!menu.classList.contains('open')) return;
    menu.classList.remove('open');
    document.body.classList.remove('no-scroll');
    trigger.setAttribute('aria-expanded', 'false');
    trigger.focus();
    window.removeEventListener('click', onWindowClick, { capture: true });
    window.removeEventListener('keydown', onKeyDown, true);
  }

  function toggleMenu() {
    if (menu.classList.contains('open')) closeMenu();
    else openMenu();
  }

  // Stäng vid klick utanför men lämna klick inuti menyn i fred
  function onWindowClick(e) {
    const t = e.target;
    if (t === trigger || trigger.contains(t)) return; // klick på knappen
    if (menu.contains(t)) return; // klick inuti menyn
    closeMenu();
  }

  // Stöd för Esc + Enter/Space
  function onKeyDown(e) {
    if (e.key === 'Escape') {
      e.preventDefault();
      closeMenu();
    }
  }
  function onTriggerKey(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleMenu();
    }
  }

  trigger.addEventListener('click', (e) => {
    e.stopPropagation(); // så window-click inte stänger direkt
    toggleMenu();
  });
  trigger.addEventListener('keydown', onTriggerKey);

  // Klick på länk i menyn stänger menyn
  menu.addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if (a) closeMenu();
  });
})();
