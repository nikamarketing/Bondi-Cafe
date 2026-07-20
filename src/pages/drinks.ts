import { SITE_CONFIG } from '../utils/config';
import { renderHeader, initHeader } from '../components/header';
import { renderFooter } from '../components/footer';
import { generateCategoryPageSchema, generateMenuSectionSchema, generateFAQSchema, generateRestaurantSchema } from '../components/schema';
import { generateBreadcrumbSchema, renderBreadcrumbs } from '../utils/seo';
import { initTracking } from '../components/tracking';
import { initAnimations } from '../utils/animations';
import { renderCategoryGrid, renderFaq, initFaqAccordion } from '../utils/category';
import { openLightbox } from '../utils/lightbox';
import { ICONS } from '../utils/icons';

const config = SITE_CONFIG;
const loc = config.locations[0];

const HERO_URL = 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=1600&q=80';

const faqs = [
  {
    question: 'Does Aaron’s Koshe serve alcohol?',
    answer: 'No. Aaron’s Koshe is fully alcohol-free. Our drinks list is built on specialty coffee, fresh juices, smoothies, milkshakes and teas, served from open to close every day.',
  },
  {
    question: 'What drinks do you serve?',
    answer: 'All day we blend fresh smoothies and squeeze juices to order, alongside iced coffees, milkshakes, thickshakes and a full tea list.',
  },
  {
    question: 'Can I come just for drinks at sunset?',
    answer: 'Of course. You’re welcome to drop in for a fresh juice, milkshake or iced coffee without ordering food — golden hour over Bondi Beach from our windows is the best free show in Sydney.',
  },
  {
    question: 'Do you take evening reservations at Bondi Beach?',
    answer: 'We take table reservations online via Quandoo and by phone, and walk-ins are always welcome. Find us at 94 Campbell Parade — open until 11 PM daily.',
  },
];

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');
  if (!app) return;

  app.innerHTML = `
    ${renderHeader()}
    <main id="main">
      <section class="hero hero-page" aria-label="Drinks and Juices" style="background: url('${HERO_URL}') center/cover no-repeat;">
        <div class="hero-overlay"></div>
        <div class="hero-content">
          <h1>Drinks &amp; Juices in Bondi Beach</h1>
          <p>Fresh smoothies, juices, milkshakes and iced coffee, all day</p>
          <a href="${config.reservationUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-accent" style="margin-top: 1rem;">Reserve a Table</a>
        </div>
      </section>
      ${renderBreadcrumbs([{ name: 'Home', url: '/' }, { name: 'Menu', url: '/menu' }, { name: 'Drinks & Juices', url: '/drinks' }])}

      <!-- SEO intro -->
      <section class="section" aria-labelledby="drinks-intro-heading">
        <div class="container">
          <div class="grid-2 animate-fade-up">
            <div>
              <h2 id="drinks-intro-heading" style="color: var(--color-primary); margin-bottom: 1rem;">From Sunrise Smoothies to Sunset Juices</h2>
              <div class="section-divider" style="margin: 1rem 0;"></div>
              <p>The drinks list at Aaron's Koshe follows the Bondi day. Mornings belong to fresh smoothies and cold-pressed juices — mango, passionfruit, spinach, coconut — blended to order while the beach fills up.</p>
              <p>As the afternoon rolls in, iced coffees, milkshakes and thickshakes take over, every glass built on the same fresh ingredients as the morning menu and poured right through to close at 11 PM.</p>
              <a href="/menu" class="btn btn-primary" style="margin-top: 1rem;">View Full Menu</a>
            </div>
            <div style="min-height: 22rem; border-radius: var(--radius-md); overflow: hidden;">
              <img src="https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=1200&q=80" alt="Fresh juices at Aaron's Koshe" loading="lazy" decoding="async" width="800" height="600" style="width: 100%; height: 100%; object-fit: cover; border-radius: var(--radius-md);">
            </div>
          </div>
        </div>
      </section>

      <!-- Smoothies list -->
      <section class="section" style="background: var(--color-white);" aria-labelledby="smoothie-list-heading">
        <div class="container">
          <div class="section-header animate-fade-up">
            <h2 id="smoothie-list-heading">Smoothies &amp; Cold Drinks</h2>
            <div class="section-divider"></div>
            <p>Blended fresh to order, all day</p>
          </div>
          <div class="animate-fade-up">${renderCategoryGrid('smoothies')}</div>
        </div>
      </section>

      <!-- Fresh Juices -->
      <section class="section" aria-labelledby="bar-list-heading">
        <div class="container">
          <div class="section-header animate-fade-up">
            <h2 id="bar-list-heading">Fresh Juices</h2>
            <div class="section-divider"></div>
            <p>Squeezed fresh to order</p>
          </div>
          <div class="animate-fade-up">${renderCategoryGrid('juices')}</div>
        </div>
      </section>

      <!-- Highlights -->
      <section class="section" style="background: var(--color-white);" aria-labelledby="drinks-why-heading">
        <div class="container">
          <div class="section-header animate-fade-up">
            <h2 id="drinks-why-heading">At Our Counter</h2>
            <div class="section-divider"></div>
          </div>
          <div class="grid-3 animate-fade-up">
            <div class="cuisine-card">
              <div class="cuisine-icon" aria-hidden="true">${ICONS.star}</div>
              <h3>Barista-Grade Iced Coffee</h3>
              <p>Every iced latte and cold brew is pulled on the same single-origin shots as the morning coffee — no syrupy shortcuts.</p>
            </div>
            <div class="cuisine-card">
              <div class="cuisine-icon" aria-hidden="true">${ICONS.clock}</div>
              <h3>Golden-Hour Ritual</h3>
              <p>Milkshakes and fresh juices as the sun drops behind Campbell Parade — the local way to end a beach day.</p>
            </div>
            <div class="cuisine-card">
              <div class="cuisine-icon" aria-hidden="true">${ICONS.mapPin}</div>
              <h3>Open Late by the Beach</h3>
              <p>Pouring until 11 PM every night at 94 Campbell Parade. Walk-ins always welcome.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- FAQ -->
      <section class="section" aria-labelledby="drinks-faq-heading">
        <div class="container">
          <div class="section-header animate-fade-up">
            <h2 id="drinks-faq-heading">Drinks FAQs</h2>
            <div class="section-divider"></div>
          </div>
          <div class="animate-fade-up">${renderFaq(faqs)}</div>
        </div>
      </section>

      <!-- CTA -->
      <section class="cta-banner" aria-label="Reserve a Table">
        <div class="container animate-fade-up" style="text-align:center;">
          <h2>Book a Table for Golden Hour</h2>
          <p>Reserve your spot at Aaron's Koshe for smoothies, juices and sunsets by the beach.</p>
          <div style="margin-top: var(--space-4); display:flex; gap:1rem; justify-content:center; flex-wrap:wrap;">
            <a href="${config.reservationUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-accent" style="font-size: 1.125rem; padding: 0.875rem 2.5rem;">Reserve a Table</a>
            <a href="tel:${loc.phone}" class="btn btn-outline-white" style="font-size: 1.125rem; padding: 0.875rem 2.5rem;">${loc.phoneFormatted}</a>
          </div>
        </div>
      </section>
    </main>
    ${renderFooter()}

    <script type="application/ld+json">${generateCategoryPageSchema({ name: 'Drinks & Juices in Bondi Beach', description: 'Fresh smoothies, juices, milkshakes and iced coffee at Aaron\'s Koshe, 94 Campbell Parade, Bondi Beach — served all day.', path: '/drinks' })}</script>
    <script type="application/ld+json">${generateMenuSectionSchema('smoothies')}</script>
    <script type="application/ld+json">${generateMenuSectionSchema('juices')}</script>
    <script type="application/ld+json">${generateRestaurantSchema()}</script>
    <script type="application/ld+json">${generateFAQSchema(faqs)}</script>
    <script type="application/ld+json">${generateBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Menu', url: '/menu' },
      { name: 'Drinks & Juices', url: '/drinks' },
    ])}</script>
  `;

  initHeader();
  initTracking();
  initAnimations();
  initFaqAccordion();
  initImageLightbox();
});

function initImageLightbox(): void {
  document.querySelectorAll<HTMLElement>('.mi-card--has-img .mi-card-img').forEach(imgDiv => {
    imgDiv.style.cursor = 'pointer';
    imgDiv.addEventListener('click', () => {
      const src = imgDiv.getAttribute('data-src');
      if (src) openLightbox([src], 0);
    });
  });
}
