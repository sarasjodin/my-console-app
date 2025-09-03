// src/navbar.js
import './style.css';

function $(sel, root = document) {
  return root.querySelector(sel);
}

(function () {
  function init() {
    const btn = $('#hamburgerMenu');
    const menu = $('#navLinks');
    if (!btn || !menu) return;

    const OPEN = 'active';
    btn.setAttribute('role', 'button');
    btn.setAttribute('aria-controls', 'navLinks');
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('tabindex', '0');

    function open() {
      if (menu.classList.contains(OPEN)) return;
      menu.classList.add(OPEN);
      btn.setAttribute('aria-expanded', 'true');
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
      if (t === btn || btn.contains(t)) return;
      if (menu.contains(t)) return;
      close();
    }
    function onKeyDown(e) {
      if (e.key === 'Escape') close();
      if ((e.key === 'Enter' || e.key === ' ') && e.target === btn) {
        e.preventDefault();
        toggle();
      }
    }

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggle();
    });
    menu.addEventListener('click', (e) => {
      e.stopPropagation();
    });
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
