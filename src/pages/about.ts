import { SITE_CONFIG } from '../utils/config';
import { renderHeader, initHeader } from '../components/header';
import { renderFooter } from '../components/footer';
import { generateRestaurantSchema, generateOrganizationSchema } from '../components/schema';
import { generateBreadcrumbSchema, renderBreadcrumbs } from '../utils/seo';
import { initTracking } from '../components/tracking';
import { initAnimations } from '../utils/animations';

const config = SITE_CONFIG;
const loc = config.locations[0];

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');
  if (!app) return;

  app.innerHTML = `
    ${renderHeader()}
    <main id="main">
      <!-- Hero -->
      <section class="hero hero-page" aria-label="About Us" style="background: url('https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1600&q=80') center/cover no-repeat;">
        <div class="hero-overlay"></div>
        <div class="hero-content">
          <h1>Our Story</h1>
          <p>A passion for great coffee and honest food in the heart of Bondi Beach</p>
        </div>
      </section>
      ${renderBreadcrumbs([{ name: 'Home', url: '/' }, { name: 'About Us', url: '/about' }])}

      <!-- Story -->
      <section class="section" aria-labelledby="story-heading">
        <div class="container">
          <div class="grid-2 animate-fade-up">
            <div>
              <h2 id="story-heading" style="color: var(--color-primary); margin-bottom: 1rem;">Born at First Light on Bondi</h2>
              <div class="section-divider" style="margin: 1rem 0;"></div>
              <p>Aaron's Koshe was born from a simple morning ritual: a swim at sunrise, then the search for a genuinely great coffee. When we couldn't find one open early enough, we decided to build it ourselves — a cafe and restaurant on Campbell Parade that pours its first flat white at 5 AM, while the surfers are still waxing their boards.</p>
              <p>The espresso machine is the beating heart of the room. Our single-origin beans are ethically sourced and roasted for us in small batches, and every barista on the team cups, dials and tastes daily so the first pour of the morning is as good as the hundredth.</p>
              <p>The kitchen keeps pace from dawn to mid-afternoon — free-range eggs, local sourdough, house-cured salmon and seasonal produce — and as the sun starts to drop, the counter turns to house-made desserts, milkshakes and iced coffee until 11 PM. One room, one view, a whole Bondi day.</p>
            </div>
            <div style="min-height: 24rem; border-radius: var(--radius-md); overflow: hidden;">
              <img
                src="https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=1200&q=80"
                alt="Aaron's Koshe cafe interior and team"
                loading="lazy"
                decoding="async"
                width="800"
                height="600"
                style="width: 100%; height: 100%; object-fit: cover; border-radius: var(--radius-md);">
            </div>
          </div>
        </div>
      </section>

      <!-- Philosophy -->
      <section class="section" style="background: var(--color-white);" aria-labelledby="philosophy-heading">
        <div class="container">
          <div class="section-header animate-fade-up">
            <h2 id="philosophy-heading">Our Philosophy</h2>
            <div class="section-divider"></div>
          </div>
          <div class="grid-3 animate-fade-up">
            <div class="philosophy-card">
              <div class="philosophy-icon" aria-hidden="true">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z"/>
                  <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
                  <path d="M15 9h.01"/>
                  <path d="M9 9h.01"/>
                </svg>
              </div>
              <h3>Coffee as a Craft</h3>
              <p>We treat every cup with the respect of a specialty roastery — precise doses, fresh grinds and micro-foam poured with care, from the first espresso at dawn to the last decaf at night.</p>
            </div>
            <div class="philosophy-card">
              <div class="philosophy-icon" aria-hidden="true">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <h3>Fresh &amp; Seasonal</h3>
              <p>Sourdough from a local bakery each dawn, free-range eggs, seasonal fruit and vegetables, and pastries baked in-house every morning. Simple food, done properly.</p>
            </div>
            <div class="philosophy-card">
              <div class="philosophy-icon" aria-hidden="true">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <h3>Everyone's Local</h3>
              <p>Surfers dripping from the ocean, families with prams, laptops at lunch and date nights at dusk — our room belongs to everyone, and our team makes sure it feels that way.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- The Coffee Bar -->
      <section class="section" aria-labelledby="coffeebar-heading">
        <div class="container">
          <div class="grid-2 animate-fade-up">
            <div style="min-height: 20rem; border-radius: var(--radius-md); overflow: hidden;">
              <img
                src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=1200&q=80"
                alt="Barista pouring specialty coffee at Aaron's Koshe"
                loading="lazy"
                decoding="async"
                width="800"
                height="600"
                style="width: 100%; height: 100%; object-fit: cover; border-radius: var(--radius-md);">
            </div>
            <div>
              <h2 id="coffeebar-heading" style="color: var(--color-primary); margin-bottom: 1rem;">The Heart of It All — Our Coffee Bar</h2>
              <div class="section-divider" style="margin: 1rem 0;"></div>
              <p>Our brew bar runs single-origin espresso, 18-hour cold brew and ceremonial-grade matcha side by side. Beans rotate with the seasons, and our baristas re-dial the grinders every morning — because humidity, age and altitude all change the shot, and we chase the sweet spot daily.</p>
              <p>Prefer it slow? Ask for the day's filter. Dairy-free? Oat, almond, soy and macadamia are always on. However you take it, it's poured with the same care.</p>
              <a href="/coffee" class="btn btn-primary" style="margin-top: 1rem;">Explore Our Coffee</a>
            </div>
          </div>
        </div>
      </section>

      <!-- Recognition -->
      <section class="cta-banner" aria-label="Recognition">
        <div class="container animate-fade-up">
          <h2 style="color: var(--color-white); margin-bottom: 2rem;">Bondi Beach's Favourite Cafe</h2>
          <div class="stats-strip" style="padding: 0;">
            <div class="stat-item">
              <div class="stat-value">${loc.googleRating}★</div>
              <div class="stat-label" style="color: rgba(255,255,255,0.7);">Google Rating (${loc.googleReviewCount} reviews)</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">50+</div>
              <div class="stat-label" style="color: rgba(255,255,255,0.7);">Dishes &amp; Drinks</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">18 hrs</div>
              <div class="stat-label" style="color: rgba(255,255,255,0.7);">Open 5 AM – 11 PM Daily</div>
            </div>
          </div>
          <div style="margin-top: var(--space-6);">
            <a href="${config.reservationUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-accent" style="font-size: 1.125rem; padding: 0.875rem 2.5rem;">
              Reserve a Table
            </a>
          </div>
        </div>
      </section>
    </main>
    ${renderFooter()}

    <script type="application/ld+json">${generateRestaurantSchema()}</script>
    <script type="application/ld+json">${generateOrganizationSchema()}</script>
    <script type="application/ld+json">${generateBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'About', url: '/about' },
    ])}</script>
  `;

  initHeader();
  initTracking();
  initAnimations();
});
