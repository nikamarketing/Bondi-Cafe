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

const HERO_URL = 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1600&q=80';

const faqs = [
  {
    question: 'What coffee does Aaron’s Koshe serve?',
    answer: 'We pour single-origin, ethically sourced beans roasted for us in small batches. The espresso blend rotates with the seasons, and our baristas re-dial the grinders every morning for the best possible shot. We also brew 18-hour cold brew, ceremonial-grade matcha and house-made chai.',
  },
  {
    question: 'Do you have dairy-free milk options in Bondi Beach?',
    answer: 'Yes — oat, almond, soy and macadamia milk are always available for any coffee for a small surcharge. Just ask when you order.',
  },
  {
    question: 'How early does Aaron’s Koshe open for coffee?',
    answer: 'We pour our first coffee at 5:00 AM every single day — one of the earliest opens on Campbell Parade. Perfect before a sunrise swim, a surf or an early shift.',
  },
  {
    question: 'Can I get coffee and pastries to take away?',
    answer: 'Absolutely. Everything on the coffee and pastry menu is available to take away, and you can also order through Uber Eats, DoorDash and Hungry Panda. Our croissants and banana bread are baked fresh each morning.',
  },
];

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');
  if (!app) return;

  app.innerHTML = `
    ${renderHeader()}
    <main id="main">
      <section class="hero hero-page" aria-label="Specialty Coffee" style="background: url('${HERO_URL}') center/cover no-repeat;">
        <div class="hero-overlay"></div>
        <div class="hero-content">
          <h1>Specialty Coffee in Bondi Beach</h1>
          <p>Single-origin espresso, 18-hour cold brew and pastries baked at dawn</p>
          <a href="${config.reservationUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-accent" style="margin-top: 1rem;">Reserve a Table</a>
        </div>
      </section>
      ${renderBreadcrumbs([{ name: 'Home', url: '/' }, { name: 'Menu', url: '/menu' }, { name: 'Specialty Coffee', url: '/coffee' }])}

      <!-- SEO intro -->
      <section class="section" aria-labelledby="coffee-intro-heading">
        <div class="container">
          <div class="grid-2 animate-fade-up">
            <div>
              <h2 id="coffee-intro-heading" style="color: var(--color-primary); margin-bottom: 1rem;">Serious Coffee on Campbell Parade</h2>
              <div class="section-divider" style="margin: 1rem 0;"></div>
              <p>At Aaron's Koshe, coffee is a craft. Our beans are single origin and ethically sourced, roasted for us in small batches and cupped by our baristas every week. The grinders are re-dialled each morning, because a great shot yesterday isn't good enough for today.</p>
              <p>From a textbook flat white to slow-steeped cold brew and ceremonial-grade matcha, every drink is made to order from 5 AM daily — and it pairs dangerously well with a warm almond croissant, straight from the morning bake.</p>
              <a href="/menu" class="btn btn-primary" style="margin-top: 1rem;">View Full Menu</a>
            </div>
            <div style="min-height: 22rem; border-radius: var(--radius-md); overflow: hidden;">
              <img src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=1200&q=80" alt="Barista pouring specialty coffee at Aaron's Koshe" loading="lazy" decoding="async" width="800" height="600" style="width: 100%; height: 100%; object-fit: cover; border-radius: var(--radius-md);">
            </div>
          </div>
        </div>
      </section>

      <!-- Coffee menu grid -->
      <section class="section" style="background: var(--color-white);" aria-labelledby="coffee-menu-heading">
        <div class="container">
          <div class="section-header animate-fade-up">
            <h2 id="coffee-menu-heading">Our Coffee Menu</h2>
            <div class="section-divider"></div>
            <p>Single origin, ethically sourced — dairy-free milks always available</p>
          </div>
          <div class="animate-fade-up">${renderCategoryGrid('coffee')}</div>
        </div>
      </section>

      <!-- Pastries grid -->
      <section class="section" aria-labelledby="pastry-menu-heading">
        <div class="container">
          <div class="section-header animate-fade-up">
            <h2 id="pastry-menu-heading">Pastries &amp; Sweets</h2>
            <div class="section-divider"></div>
            <p>Baked fresh every morning — the perfect coffee companions</p>
          </div>
          <div class="animate-fade-up">${renderCategoryGrid('pastries')}</div>
        </div>
      </section>

      <!-- Why -->
      <section class="section" style="background: var(--color-white);" aria-labelledby="coffee-why-heading">
        <div class="container">
          <div class="section-header animate-fade-up">
            <h2 id="coffee-why-heading">Why Our Coffee Stands Out</h2>
            <div class="section-divider"></div>
          </div>
          <div class="grid-3 animate-fade-up">
            <div class="cuisine-card">
              <div class="cuisine-icon" aria-hidden="true">${ICONS.star}</div>
              <h3>Single Origin</h3>
              <p>Ethically sourced beans, roasted in small batches and rotated with the seasons so there's always something new in the hopper.</p>
            </div>
            <div class="cuisine-card">
              <div class="cuisine-icon" aria-hidden="true">${ICONS.clock}</div>
              <h3>First Pour at 5 AM</h3>
              <p>One of the earliest opens on the beach. Sunrise swimmers, surfers and early workers — your coffee is ready when you are.</p>
            </div>
            <div class="cuisine-card">
              <div class="cuisine-icon" aria-hidden="true">${ICONS.mapPin}</div>
              <h3>Steps from the Sand</h3>
              <p>Drink it in at 94 Campbell Parade or take it across the road to the beach — either way, the view comes free.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- FAQ -->
      <section class="section" aria-labelledby="coffee-faq-heading">
        <div class="container">
          <div class="section-header animate-fade-up">
            <h2 id="coffee-faq-heading">Coffee FAQs</h2>
            <div class="section-divider"></div>
          </div>
          <div class="animate-fade-up">${renderFaq(faqs)}</div>
        </div>
      </section>

      <!-- CTA -->
      <section class="cta-banner" aria-label="Reserve a Table">
        <div class="container animate-fade-up" style="text-align:center;">
          <h2>Craving a Proper Coffee?</h2>
          <p>Drop in from 5 AM daily, or book a table at Aaron's Koshe for a longer stay.</p>
          <div style="margin-top: var(--space-4); display:flex; gap:1rem; justify-content:center; flex-wrap:wrap;">
            <a href="${config.reservationUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-accent" style="font-size: 1.125rem; padding: 0.875rem 2.5rem;">Reserve a Table</a>
            <a href="tel:${loc.phone}" class="btn btn-outline-white" style="font-size: 1.125rem; padding: 0.875rem 2.5rem;">${loc.phoneFormatted}</a>
          </div>
        </div>
      </section>
    </main>
    ${renderFooter()}

    <script type="application/ld+json">${generateCategoryPageSchema({ name: 'Specialty Coffee in Bondi Beach', description: 'Single-origin specialty coffee, cold brew, matcha and house-baked pastries at Aaron\'s Koshe, 94 Campbell Parade, Bondi Beach.', path: '/coffee' })}</script>
    <script type="application/ld+json">${generateMenuSectionSchema('coffee')}</script>
    <script type="application/ld+json">${generateMenuSectionSchema('pastries')}</script>
    <script type="application/ld+json">${generateRestaurantSchema()}</script>
    <script type="application/ld+json">${generateFAQSchema(faqs)}</script>
    <script type="application/ld+json">${generateBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Menu', url: '/menu' },
      { name: 'Specialty Coffee', url: '/coffee' },
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
