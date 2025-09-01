import '/src/style.css';

function normalizePath(pathname) {
  const p = (pathname || '/').replace(/\/+$/, '');
  return p === '' ? '/' : p;
}

function extractFiddleLink(widgetUrl) {
  try {
    const u = new URL(widgetUrl, location.href);
    const id = u.pathname.split('/').pop(); //
    return `https://dotnetfiddle.net/${id}`;
  } catch {
    return null;
  }
}

function ensureProgramIframeLoaded() {
  const iframe = document.getElementById('csRunner');
  if (!iframe) return;

  // .NET Fiddle kräver same-origin i sandlådan för att XHR till /Home/Run inte ska bli CORS-blockat
  const base = 'allow-scripts allow-forms';
  const needSameOrigin = true;

  // Viktigt: sätt sandbox INNAN src
  iframe.setAttribute(
    'sandbox',
    needSameOrigin ? `${base} allow-same-origin` : base
  );
  if (!iframe.getAttribute('referrerpolicy'))
    iframe.setAttribute('referrerpolicy', 'no-referrer');
  if (!iframe.getAttribute('allow'))
    iframe.setAttribute('allow', 'clipboard-write');

  if (!iframe.src) {
    const url = iframe.dataset.src;
    if (url) iframe.src = url;
  }

  // Fallback-länk
  const fb = document.getElementById('runnerFallbackLink');
  if (fb) fb.href = extractFiddleLink(iframe.dataset.src || iframe.src) || '#';
}

function setActivePanel(panelId) {
  if (!panelId) return;

  // Dölj alla paneler
  document.querySelectorAll('.tab-content').forEach((sec) => {
    sec.setAttribute('aria-hidden', 'true');
  });

  // Visa vald panel
  const panel = document.getElementById(panelId);
  if (panel) panel.setAttribute('aria-hidden', 'false');

  // Uppdatera aktiv länk (aria-current)
  document.querySelectorAll('.tabs a').forEach((a) => {
    const href = (a.getAttribute('href') || '').replace(/\/+$/, '') || '/';
    const pathMatch =
      href === `/${panelId}` ||
      (panelId === 'program' && href === '/') ||
      href === `#${panelId}`;
    if (pathMatch) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  });

  // Lazy-load av iframen när Program aktiveras
  if (panelId === 'program') ensureProgramIframeLoaded();
}

window.addEventListener('DOMContentLoaded', () => {
  // Route till panel
  const path = normalizePath(location.pathname);
  const routeMap = {
    '/': 'program', // om root inte redan redirectas till /program
    '/program': 'program',
    '/about': 'about'
  };

  // 1) Sätt panel från path (eller hash som fallback)
  const fromRoute = routeMap[path];
  const fromHash = location.hash ? location.hash.slice(1) : null;
  setActivePanel(fromRoute || fromHash || 'program');

  // 2) Stöd för hash-flikar om jag byter href till #program/#about i framtiden
  document.querySelectorAll('.tabs a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const id = a.getAttribute('href').slice(1);
      setActivePanel(id);
      history.replaceState(null, '', `#${id}`);
    });
  });

  // 3) Hash-navigering via back/forward
  window.addEventListener('hashchange', () => {
    const id = location.hash.slice(1);
    if (id) setActivePanel(id);
  });

  // 4) Hamburgermeny (skydda mot null)
  const hamburger = document.getElementById('hamburgerMenu');
  const menu = document.querySelector('nav ul#navLinks');
  if (hamburger && menu) {
    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      menu.classList.toggle('active');
    });
    document.addEventListener('click', (e) => {
      if (menu.classList.contains('active')) {
        if (!menu.contains(e.target) && e.target !== hamburger) {
          menu.classList.remove('active');
        }
      }
    });
  }
});

document.querySelector('meta[http-equiv="Content-Security-Policy"]')?.content;

window.addEventListener('securitypolicyviolation', (e) => {
  console.log(
    'CSP blocked:',
    e.blockedURI,
    e.violatedDirective,
    e.originalPolicy
  );
});

function showProgramPanelOnce() {
  const iframe = document.getElementById('csRunner');
  if (!iframe) return;

  // Sätt sandbox/allow INNAN src, men bara första gången
  if (!iframe.dataset.loaded) {
    iframe.setAttribute(
      'sandbox',
      'allow-scripts allow-forms allow-popups allow-same-origin'
    );
    iframe.setAttribute('referrerpolicy', 'no-referrer');
    iframe.src = iframe.dataset.src || 'https://dotnetfiddle.net/Widget/fx2SpT';
    iframe.dataset.loaded = '1';
  }
}

// Kör vid start om #program eller ingen hash
window.addEventListener('DOMContentLoaded', () => {
  if (!location.hash || location.hash === '#program') showProgramPanelOnce();
});

// Kör vid flikbyte/hoppa till #program
window.addEventListener('hashchange', () => {
  if (location.hash === '#program') showProgramPanelOnce();
});
