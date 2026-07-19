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

const HERO_URL = 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=1600&q=80';

const faqs = [
  {
    question: 'Does Aaron’s Koshe really serve breakfast all day?',
    answer: 'Yes — the full breakfast menu runs from 5:00 AM until the kitchen closes at 3:00 PM, every day. Eggs Benedict at 2 PM is not just allowed, it’s encouraged.',
  },
  {
    question: 'Do you cater for vegan, vegetarian and gluten-free diets?',
    answer: 'Plenty of options: our Garden Green Bowl is vegan and gluten-free, the Acai Bowl and Avo Toast are easily veganised, and gluten-free sourdough is available for any toast dish. Tell our team about any allergies and the kitchen will look after you.',
  },
  {
    question: 'Do I need to book for breakfast or brunch at Bondi Beach?',
    answer: 'Walk-ins are always welcome, but weekends between 9 AM and midday are our busiest hours — booking online via Quandoo guarantees your table with a view.',
  },
  {
    question: 'What are the most popular dishes at Aaron’s Koshe?',
    answer: 'The Big Bondi Breakfast, Smashed Avo & Feta and the Acai Bowl lead the morning; the Bondi Beef Burger and Crispy Fish Tacos take over at lunch. All served daily until 3 PM.',
  },
];

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');
  if (!app) return;

  app.innerHTML = `
    ${renderHeader()}
    <main id="main">
      <section class="hero hero-page" aria-label="All-Day Breakfast and Brunch" style="background: url('${HERO_URL}') center/cover no-repeat;">
        <div class="hero-overlay"></div>
        <div class="hero-content">
          <h1>All-Day Breakfast &amp; Brunch in Bondi Beach</h1>
          <p>Free-range eggs, local sourdough and fresh seasonal plates until 3 PM</p>
          <a href="${config.reservationUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-accent" style="margin-top: 1rem;">Reserve a Table</a>
        </div>
      </section>
      ${renderBreadcrumbs([{ name: 'Home', url: '/' }, { name: 'Menu', url: '/menu.html' }, { name: 'Breakfast & Brunch', url: '/breakfast.html' }])}

      <!-- SEO intro -->
      <section class="section" aria-labelledby="bf-intro-heading">
        <div class="container">
          <div class="grid-2 animate-fade-up">
            <div>
              <h2 id="bf-intro-heading" style="color: var(--color-primary); margin-bottom: 1rem;">Breakfast the Bondi Way</h2>
              <div class="section-divider" style="margin: 1rem 0;"></div>
              <p>Breakfast is Bondi's true religion, and Aaron's Koshe is its earliest church — doors open at 5 AM for the swimmers and surfers, and the full breakfast menu runs all the way to 3 PM for everyone who slept in.</p>
              <p>Everything is built on proper ingredients: free-range eggs poached to order, sourdough from a local bakery, house-cured salmon, Persian feta and seasonal fruit. From a quick avo toast to the full Big Bondi Breakfast, it's honest food with a sea view.</p>
              <a href="/menu.html" class="btn btn-primary" style="margin-top: 1rem;">View Full Menu</a>
            </div>
            <div style="min-height: 22rem; border-radius: var(--radius-md); overflow: hidden;">
              <img src="https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=1200&q=80" alt="Big Bondi Breakfast at Aaron's Koshe" loading="lazy" decoding="async" width="800" height="600" style="width: 100%; height: 100%; object-fit: cover; border-radius: var(--radius-md);">
            </div>
          </div>
        </div>
      </section>

      <!-- Breakfast menu grid -->
      <section class="section" style="background: var(--color-white);" aria-labelledby="bf-menu-heading">
        <div class="container">
          <div class="section-header animate-fade-up">
            <h2 id="bf-menu-heading">All-Day Breakfast</h2>
            <div class="section-divider"></div>
            <p>Served daily 5:00 AM – 3:00 PM</p>
          </div>
          <div class="animate-fade-up">${renderCategoryGrid('breakfast')}</div>
        </div>
      </section>

      <!-- Brunch menu grid -->
      <section class="section" aria-labelledby="brunch-menu-heading">
        <div class="container">
          <div class="section-header animate-fade-up">
            <h2 id="brunch-menu-heading">Brunch &amp; Lunch</h2>
            <div class="section-divider"></div>
            <p>Served daily 9:00 AM – 3:00 PM</p>
          </div>
          <div class="animate-fade-up">${renderCategoryGrid('brunch')}</div>
        </div>
      </section>

      <!-- Why -->
      <section class="section" style="background: var(--color-white);" aria-labelledby="bf-why-heading">
        <div class="container">
          <div class="section-header animate-fade-up">
            <h2 id="bf-why-heading">Why Breakfast Here Hits Different</h2>
            <div class="section-divider"></div>
          </div>
          <div class="grid-3 animate-fade-up">
            <div class="cuisine-card">
              <div class="cuisine-icon" aria-hidden="true">${ICONS.clock}</div>
              <h3>5 AM Start, 3 PM Finish</h3>
              <p>The earliest eggs on Campbell Parade and an all-day menu that doesn't judge your wake-up time.</p>
            </div>
            <div class="cuisine-card">
              <div class="cuisine-icon" aria-hidden="true">${ICONS.star}</div>
              <h3>Made In-House</h3>
              <p>Granola, hollandaise, falafel, cured salmon and every sauce — made from scratch in our kitchen, never from a packet.</p>
            </div>
            <div class="cuisine-card">
              <div class="cuisine-icon" aria-hidden="true">${ICONS.mapPin}</div>
              <h3>A Table with a View</h3>
              <p>Watch the swimmers, the surfers and the sails over breakfast — 94 Campbell Parade, directly opposite the beach.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- FAQ -->
      <section class="section" aria-labelledby="bf-faq-heading">
        <div class="container">
          <div class="section-header animate-fade-up">
            <h2 id="bf-faq-heading">Breakfast &amp; Brunch FAQs</h2>
            <div class="section-divider"></div>
          </div>
          <div class="animate-fade-up">${renderFaq(faqs)}</div>
        </div>
      </section>

      <!-- CTA -->
      <section class="cta-banner" aria-label="Reserve a Table">
        <div class="container animate-fade-up" style="text-align:center;">
          <h2>Hungry Yet?</h2>
          <p>Book your breakfast table at Aaron's Koshe, or just roll in after your swim.</p>
          <div style="margin-top: var(--space-4); display:flex; gap:1rem; justify-content:center; flex-wrap:wrap;">
            <a href="${config.reservationUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-accent" style="font-size: 1.125rem; padding: 0.875rem 2.5rem;">Reserve a Table</a>
            <a href="tel:${loc.phone}" class="btn btn-outline-white" style="font-size: 1.125rem; padding: 0.875rem 2.5rem;">${loc.phoneFormatted}</a>
          </div>
        </div>
      </section>
    </main>
    ${renderFooter()}

    <script type="application/ld+json">${generateCategoryPageSchema({ name: 'All-Day Breakfast & Brunch in Bondi Beach', description: 'All-day breakfast and fresh brunch plates at Aaron\'s Koshe, 94 Campbell Parade, Bondi Beach — served daily 5 AM to 3 PM.', path: '/breakfast.html' })}</script>
    <script type="application/ld+json">${generateMenuSectionSchema('breakfast')}</script>
    <script type="application/ld+json">${generateMenuSectionSchema('brunch')}</script>
    <script type="application/ld+json">${generateRestaurantSchema()}</script>
    <script type="application/ld+json">${generateFAQSchema(faqs)}</script>
    <script type="application/ld+json">${generateBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Menu', url: '/menu.html' },
      { name: 'Breakfast & Brunch', url: '/breakfast.html' },
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
