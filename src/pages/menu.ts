import { SITE_CONFIG } from '../utils/config';
import { MENU_CATEGORIES } from '../utils/menu';
import { renderHeader, initHeader } from '../components/header';
import { renderFooter } from '../components/footer';
import { generateMenuSchema, generateRestaurantSchema } from '../components/schema';
import { generateBreadcrumbSchema, renderBreadcrumbs } from '../utils/seo';
import { initTracking } from '../components/tracking';
import { initAnimations, initDragScroll } from '../utils/animations';
import { openLightbox } from '../utils/lightbox';
import { renderCategoryGrid } from '../utils/category';

const config = SITE_CONFIG;

function renderMenuSections(): string {
  return MENU_CATEGORIES.map(cat => `
    <div class="menu-section" id="${cat.id}" data-category="${cat.id}">
      <h2>${cat.emoji ? `<span class="menu-emoji">${cat.emoji}</span>` : ''}${cat.label}</h2>
      ${cat.note ? `<p class="menu-note">${cat.note}</p>` : ''}
      ${renderCategoryGrid(cat.id)}
    </div>
  `).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');
  if (!app) return;

  app.innerHTML = `
    ${renderHeader()}
    <main id="main">
      <section class="hero hero-page" aria-label="Our Menu" style="background: url('https://images.unsplash.com/photo-1493770348161-369560ae357d?w=1600&q=80') center/cover no-repeat;">
        <div class="hero-overlay"></div>
        <div class="hero-content">
          <h1>Our Menu</h1>
          <p>Specialty coffee, all-day breakfast, brunch, smoothies, pastries &amp; desserts</p>
          <a href="${config.reservationUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-accent" style="margin-top: 1rem;">
            Reserve a Table
          </a>
        </div>
      </section>
      ${renderBreadcrumbs([{ name: 'Home', url: '/' }, { name: 'Menu', url: '/menu' }])}

      <nav class="category-nav" aria-label="Menu categories">
        <div class="category-nav-inner">
          ${MENU_CATEGORIES.map(cat => `
            <button class="category-pill" data-target="${cat.id}" aria-label="Jump to ${cat.label}">
              ${cat.emoji ? `${cat.emoji} ` : ''}${cat.label}
            </button>
          `).join('')}
        </div>
      </nav>

      <div class="container" id="menu-content">
        ${renderMenuSections()}

        <!-- Reserve CTA -->
        <div style="text-align:center; padding: var(--space-8) 0 var(--space-4); background: var(--color-cream); border-radius: var(--radius-md); margin: var(--space-6) 0;">
          <h3 style="color: var(--color-primary); margin-bottom: var(--space-2);">Ready to Order?</h3>
          <p style="color: var(--color-text-muted); margin-bottom: var(--space-4);">Reserve your table online and we'll have it ready for you.</p>
          <a href="${config.reservationUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="font-size: 1.125rem; padding: 0.875rem 2.5rem;">
            Reserve a Table
          </a>
          <p style="margin-top: var(--space-3); color: var(--color-text-muted); font-size: 0.875rem;">Or call us: <a href="tel:${config.locations[0].phone}" style="color: var(--color-primary); font-weight: 700;">${config.locations[0].phoneFormatted}</a></p>
        </div>
      </div>
    </main>
    ${renderFooter()}

    <script type="application/ld+json">${generateMenuSchema()}</script>
    <script type="application/ld+json">${generateRestaurantSchema()}</script>
    <script type="application/ld+json">${generateBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Menu', url: '/menu' },
    ])}</script>
  `;

  initHeader();
  initTracking();
  initAnimations();
  initDragScroll('.category-nav');
  initMenuInteractions();
  initMenuImageLightbox();
});

function initMenuImageLightbox(): void {
  const cards = document.querySelectorAll<HTMLElement>('.mi-card--has-img');
  cards.forEach(card => {
    const imgDiv = card.querySelector('.mi-card-img') as HTMLElement | null;
    if (!imgDiv) return;
    imgDiv.style.cursor = 'pointer';
    imgDiv.addEventListener('click', () => {
      const src = imgDiv.getAttribute('data-src');
      if (src) openLightbox([src], 0);
    });
  });
}

function initMenuInteractions(): void {
  const nav = document.querySelector<HTMLElement>('.category-nav');
  const pills = document.querySelectorAll<HTMLElement>('.category-pill');
  const sections = document.querySelectorAll('.menu-section');

  // Resolve the total sticky header height to a concrete pixel value.
  // (The --total-header-height custom property is a calc() expression,
  // which is not a valid rootMargin, so measure the elements instead.)
  const topBarEl = document.querySelector('.top-bar') as HTMLElement | null;
  const headerEl = document.querySelector('.site-header') as HTMLElement | null;
  const headerOffset = (topBarEl?.offsetHeight || 44) + (headerEl?.offsetHeight || 72);

  // Scroll ONLY the pill bar horizontally; scrolling the pill itself via
  // scrollIntoView can also move the page and fight the user's scroll.
  const centerPill = (pill: HTMLElement) => {
    if (!nav) return;
    const left = pill.offsetLeft - (nav.clientWidth - pill.offsetWidth) / 2;
    nav.scrollTo({ left, behavior: 'smooth' });
  };

  // While a tab-triggered smooth scroll is running, the observer must not
  // react to the sections passing by, or the highlight flickers.
  let suppressObserver = false;
  let suppressTimer: number | undefined;
  window.addEventListener('scroll', () => {
    if (!suppressObserver) return;
    window.clearTimeout(suppressTimer);
    suppressTimer = window.setTimeout(() => { suppressObserver = false; }, 200);
  }, { passive: true });

  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      const targetId = pill.getAttribute('data-target');
      const section = targetId ? document.getElementById(targetId) : null;
      if (!section) return;
      pills.forEach(p => p.classList.toggle('active', p === pill));
      centerPill(pill);
      suppressObserver = true;
      window.clearTimeout(suppressTimer);
      suppressTimer = window.setTimeout(() => { suppressObserver = false; }, 1200);
      const navHeight = nav?.offsetHeight || 0;
      const top = section.getBoundingClientRect().top + window.scrollY - headerOffset - navHeight - 8;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      if (suppressObserver) return;
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('data-category');
          pills.forEach(p => {
            p.classList.toggle('active', p.getAttribute('data-target') === id);
          });
          const activePill = document.querySelector<HTMLElement>(`.category-pill[data-target="${id}"]`);
          if (activePill) centerPill(activePill);
        }
      });
    },
    {
      threshold: 0.2,
      rootMargin: `-${headerOffset}px 0px -60% 0px`,
    }
  );

  sections.forEach(s => observer.observe(s));
}
