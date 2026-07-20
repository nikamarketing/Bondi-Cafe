import { SITE_CONFIG } from '../utils/config';
import { renderHeader, initHeader } from '../components/header';
import { renderFooter } from '../components/footer';
import { generateRestaurantSchema, generateOrganizationSchema, generateWebSiteSchema, generateReviewSchema } from '../components/schema';
import { generateBreadcrumbSchema } from '../utils/seo';
import { initTracking } from '../components/tracking';
import { initAnimations, initDragScroll } from '../utils/animations';
import { formatPrice } from '../utils/category';
import { ICONS } from '../utils/icons';

const config = SITE_CONFIG;
const loc = config.locations[0];

const HERO_URL = 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1600&q=80';

const featuredDishes = [
  {
    name: 'Flat White',
    category: 'Specialty Coffee',
    price: 5.5,
    img: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=800&q=80',
  },
  {
    name: 'Smashed Avo & Feta',
    category: 'All-Day Breakfast',
    price: 22,
    img: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=800&q=80',
  },
  {
    name: 'Acai Bowl',
    category: 'All-Day Breakfast',
    price: 22,
    img: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=800&q=80',
  },
  {
    name: 'Bondi Beef Burger',
    category: 'Brunch & Lunch',
    price: 26,
    img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80',
  },
  {
    name: 'Almond Croissant',
    category: 'Pastries',
    price: 7.5,
    img: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&q=80',
  },
  {
    name: 'Fresh Orange Juice',
    category: 'Juices & Smoothies',
    price: 10,
    img: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=800&q=80',
  },
];

const heroSlides = [
  featuredDishes[0].img,
  featuredDishes[2].img,
  featuredDishes[5].img,
];

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');
  if (!app) return;

  app.innerHTML = `
    ${renderHeader()}
    <main id="main">
      <!-- Hero — split layout -->
      <section class="hero hero-split" aria-label="Welcome to ${config.brand.fullName}" style="background: url('${HERO_URL}') center/cover no-repeat;">
        <div class="hero-overlay"></div>
        <div class="container hero-split-inner">

          <!-- Left: text content -->
          <div class="hero-left">
            <div class="hero-badge-pill">☕ Cafe &amp; Restaurant</div>
            <h1 class="hero-split-title">
              Sunrise Coffee, All-Day Dining<br>
              on <span class="hero-highlight">Bondi</span> Beach
            </h1>
            <p class="hero-split-desc">
              Single-origin espresso, all-day breakfast, fresh brunch plates, house-baked pastries and golden-hour desserts — steps from the sand on Campbell Parade.
            </p>
            <div class="hero-ctas">
              <a href="/menu" class="btn btn-primary">Order Now</a>
              <a href="/menu" class="btn btn-outline-white">View Menu</a>
            </div>
            <div class="hero-info-bar">
              <span class="hero-info-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                Bondi Beach, NSW
              </span>
              <span class="hero-info-sep">·</span>
              <span class="hero-info-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                ${loc.phoneFormatted}
              </span>
              <span class="hero-info-sep">·</span>
              <span class="hero-info-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                5 AM – 11 PM Daily
              </span>
            </div>
          </div>

          <!-- Right: circular image slider -->
          <div class="hero-right">
            <div class="hero-circle-wrap">
              <div class="hero-circle">
                <img id="heroCircleImg" src="${heroSlides[0]}" alt="Signature flat white" width="500" height="500">
              </div>
              <div class="hero-badge-float">
                <div class="hero-badge-float-value">From 5 AM</div>
                <div class="hero-badge-float-label">Serving Bondi Daily</div>
              </div>
              <div class="hero-dots" id="heroDots">
                ${heroSlides.map((_, i) => `<button class="hero-dot${i === 0 ? ' active' : ''}" data-idx="${i}" aria-label="Slide ${i + 1}"></button>`).join('')}
              </div>
            </div>
          </div>

        </div>
      </section>

      <!-- About Snippet -->
      <section class="section" aria-labelledby="about-heading">
        <div class="container">
          <div class="grid-2 animate-fade-up">
            <div>
              <h2 id="about-heading" style="color: var(--color-primary); margin-bottom: 1rem;">Bondi Beach's Home of Coffee &amp; All-Day Dining</h2>
              <div class="section-divider" style="margin: 1rem 0;"></div>
              <p>Perched on the iconic Campbell Parade overlooking the Pacific, Aaron's Koshe brings specialty coffee and honest, seasonal food to Australia's most famous beach — from sunrise flat whites for the dawn-patrol surfers to golden-hour desserts as the yachts drift past.</p>
              <p>Our beans are single origin and ethically sourced, our sourdough arrives fresh each morning, and everything from the granola to the hollandaise is made in-house by our chefs — food that tastes like a Bondi summer feels.</p>
              <a href="/about" class="btn btn-primary" style="margin-top: 1rem;">Our Story</a>
            </div>
            <div style="display: flex; flex-direction: column; gap: 1.5rem;">
              <img
                src="https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=1200&q=80"
                alt="Aaron's Koshe cafe interior"
                loading="lazy"
                decoding="async"
                width="600"
                height="400"
                style="width: 100%; border-radius: var(--radius-md); object-fit: cover; aspect-ratio: 3/2;">
              <div class="stats-strip" style="padding: 0; justify-content: flex-start;">
                <div class="stat-item">
                  <div class="stat-value">50+</div>
                  <div class="stat-label">Dishes &amp; Drinks</div>
                </div>
                <div class="stat-item">
                  <div class="stat-value">${loc.googleRating}★</div>
                  <div class="stat-label">Google Rating</div>
                </div>
                <div class="stat-item">
                  <div class="stat-value">5 AM</div>
                  <div class="stat-label">First Pour Daily</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Explore our menu — category links (internal SEO) -->
      <section class="section" aria-labelledby="explore-heading">
        <div class="container">
          <div class="section-header animate-fade-up">
            <h2 id="explore-heading">Explore Aaron's Koshe</h2>
            <div class="section-divider"></div>
            <p>Three ways to enjoy the beach, from first light to last call</p>
          </div>
          <div class="grid-3 animate-fade-up">
            <a href="/coffee" class="explore-card" style="text-decoration:none;">
              <img src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80" alt="Specialty coffee" loading="lazy" decoding="async" width="600" height="400">
              <div class="explore-card-body">
                <h3>Specialty Coffee</h3>
                <p>Single-origin espresso, cold brew and house-baked pastries from 5 AM.</p>
                <span class="explore-card-link">Discover Coffee →</span>
              </div>
            </a>
            <a href="/breakfast" class="explore-card" style="text-decoration:none;">
              <img src="https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=800&q=80" alt="All-day breakfast and brunch" loading="lazy" decoding="async" width="600" height="400">
              <div class="explore-card-body">
                <h3>Breakfast &amp; Brunch</h3>
                <p>All-day breakfast, acai bowls and fresh seasonal brunch plates until 3 PM.</p>
                <span class="explore-card-link">Discover Breakfast →</span>
              </div>
            </a>
            <a href="/drinks" class="explore-card" style="text-decoration:none;">
              <img src="https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=800&q=80" alt="Smoothies and cold drinks" loading="lazy" decoding="async" width="600" height="400">
              <div class="explore-card-body">
                <h3>Drinks &amp; Juices</h3>
                <p>Fresh smoothies, juices, iced coffee and milkshakes, all day long.</p>
                <span class="explore-card-link">Discover Drinks →</span>
              </div>
            </a>
          </div>
        </div>
      </section>

      <!-- Featured Dishes -->
      <section class="section" style="background: var(--color-white);" aria-labelledby="featured-heading">
        <div class="container">
          <div class="section-header animate-fade-up">
            <h2 id="featured-heading">Our Signature Plates &amp; Pours</h2>
            <div class="section-divider"></div>
            <p>From the espresso machine, the kitchen and the bar</p>
          </div>
          <div class="dish-strip">
            ${featuredDishes.map(dish => `
              <div class="dish-card">
                <img src="${dish.img}" alt="${dish.name}" loading="lazy" decoding="async" width="400" height="300" style="width: 100%; aspect-ratio: 4/3; object-fit: cover; border-radius: var(--radius-md) var(--radius-md) 0 0;">
                <div class="card-body">
                  <div class="dish-name">${dish.name}</div>
                  <div class="dish-price">${formatPrice(dish.price)}</div>
                  <span class="dish-category">${dish.category}</span>
                </div>
              </div>
            `).join('')}
          </div>
          <div style="text-align: center; margin-top: var(--space-5);">
            <a href="/menu" class="btn btn-primary">View Full Menu</a>
          </div>
        </div>
      </section>

      <!-- Reserve a Table CTA -->
      <section class="cta-banner" aria-label="Reserve a Table">
        <div class="container animate-fade-up" style="text-align:center;">
          <h2>Reserve Your Table at Aaron's Koshe</h2>
          <p>Join us for breakfast by the beach or desserts at golden hour, overlooking beautiful Bondi. Book online in seconds via Quandoo.</p>
          <div style="display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;margin-bottom:1.5rem;">
            <span style="display:inline-flex;align-items:center;gap:0.375rem;background:rgba(255,255,255,0.15);padding:0.4rem 1rem;border-radius:2rem;font-size:0.875rem;font-weight:600;">
              ${ICONS.clock} Open Daily: 5 AM – 11 PM
            </span>
            <span style="display:inline-flex;align-items:center;gap:0.375rem;background:rgba(255,255,255,0.15);padding:0.4rem 1rem;border-radius:2rem;font-size:0.875rem;font-weight:600;">
              ${ICONS.clock} Kitchen until 3 PM · Bar from 5 PM
            </span>
          </div>
          <a href="${config.reservationUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-accent" style="font-size: 1.125rem; padding: 0.875rem 2.5rem;">
            ${ICONS.calendar} Reserve Now
          </a>
        </div>
      </section>

      <!-- Why Aaron's Koshe -->
      <section class="section" aria-labelledby="why-heading">
        <div class="container">
          <div class="section-header animate-fade-up">
            <h2 id="why-heading">The Aaron's Koshe Difference</h2>
            <div class="section-divider"></div>
          </div>
          <div class="grid-3 animate-fade-up">
            <div class="cuisine-card">
              <div class="cuisine-icon" aria-hidden="true">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M10 18h24v10c0 6-5 11-12 11s-12-5-12-11z"/>
                  <path d="M34 20h4a4 4 0 0 1 0 8h-4"/>
                  <path d="M16 12c0-2 2-2 2-4"/>
                  <path d="M23 12c0-2 2-2 2-4"/>
                  <path d="M30 12c0-2 2-2 2-4"/>
                </svg>
              </div>
              <h3>Serious About Coffee</h3>
              <p>Single-origin beans, ethically sourced and roasted for us, dialled in fresh every morning by baristas who treat every pour as a craft.</p>
            </div>
            <div class="cuisine-card">
              <div class="cuisine-icon" aria-hidden="true">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M24 8l4 8 9 1.3-6.5 6.3 1.5 9L24 28l-8 4.6 1.5-9L11 17.3l9-1.3z"/>
                  <path d="M8 36c4-2 8-3 16-3s12 1 16 3"/>
                </svg>
              </div>
              <h3>Fresh, Seasonal Produce</h3>
              <p>Local sourdough, free-range eggs, house-cured salmon and seasonal fruit and veg — everything made in-house, nothing from a packet.</p>
            </div>
            <div class="cuisine-card">
              <div class="cuisine-icon" aria-hidden="true">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4z"/>
                  <path d="M12 30s3 4 12 4 12-4 12-4"/>
                  <path d="M24 18l-4 6h8l-4-6z"/>
                </svg>
              </div>
              <h3>Beachside Atmosphere</h3>
              <p>Dine just steps from Australia's most iconic beach — sea breeze at breakfast, sails on the horizon at lunch and sunset colours with your milkshake.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Reviews -->
      <section class="section" style="background: var(--color-white);" aria-labelledby="reviews-heading">
        <div class="container">
          <div class="section-header animate-fade-up">
            <h2 id="reviews-heading">What Our Guests Say</h2>
            <div class="section-divider"></div>
          </div>
          <div class="grid-3 animate-fade-up">
            <div class="review-card">
              <div class="review-stars" aria-label="5 stars">★★★★★</div>
              <p>"Best flat white in Sydney, hands down. The beans are incredible and the view of Bondi with your morning coffee is unbeatable."</p>
              <div class="review-author">— Google Review</div>
            </div>
            <div class="review-card">
              <div class="review-stars" aria-label="5 stars">★★★★★</div>
              <p>"The Big Bondi Breakfast after a morning swim is a ritual now. Generous, fresh and the staff remember your order. Highly recommended!"</p>
              <div class="review-author">— TripAdvisor Review</div>
            </div>
            <div class="review-card">
              <div class="review-stars" aria-label="5 stars">★★★★★</div>
              <p>"Came for brunch, stayed for iced lattes at sunset. Beautiful room, warm service and everything we ate was spot on."</p>
              <div class="review-author">— Google Review</div>
            </div>
          </div>
        </div>
      </section>

      <!-- Location Teaser -->
      <section class="section" aria-labelledby="location-heading">
        <div class="container">
          <div class="section-header animate-fade-up">
            <h2 id="location-heading">Find Us at Bondi Beach</h2>
            <div class="section-divider"></div>
            <p>94 Campbell Parade, Bondi Beach NSW 2026</p>
          </div>
          <div class="animate-fade-up" style="background: var(--color-white); border-radius: var(--radius-md); box-shadow: var(--shadow-sm); overflow: hidden;">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0;">
              <div style="padding: var(--space-6);">
                <h3 style="color: var(--color-primary); margin-bottom: var(--space-3);">Opening Hours</h3>
                <table class="hours-table">
                  <tbody>
                    <tr><td><strong>Every Day</strong></td><td>5:00 AM – 11:00 PM</td></tr>
                    <tr><td><strong>Kitchen</strong></td><td>5:00 AM – 3:00 PM</td></tr>
                    <tr><td><strong>Bar</strong></td><td>5:00 PM – 11:00 PM</td></tr>
                  </tbody>
                </table>
                <div style="margin-top: var(--space-4); display: flex; flex-direction: column; gap: 0.75rem;">
                  <div class="location-detail" style="display:flex;gap:0.75rem;align-items:center;font-size:0.9375rem;color:var(--color-text-muted);">
                    <span style="color: var(--color-primary);">${ICONS.mapPin}</span>
                    <span>${loc.address.full}</span>
                  </div>
                  <div class="location-detail" style="display:flex;gap:0.75rem;align-items:center;font-size:0.9375rem;color:var(--color-text-muted);">
                    <span style="color: var(--color-primary);">${ICONS.phone}</span>
                    <a href="tel:${loc.phone}" style="color: var(--color-primary); font-weight: 700;">${loc.phoneFormatted}</a>
                  </div>
                </div>
                <a href="${config.reservationUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="margin-top: var(--space-4);">
                  Reserve a Table
                </a>
              </div>
              <div style="min-height: 20rem;">
                <img
                  src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80"
                  alt="Aaron's Koshe restaurant dining room"
                  loading="lazy"
                  decoding="async"
                  width="600"
                  height="400"
                  style="width: 100%; height: 100%; object-fit: cover;">
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
    ${renderFooter()}

    <script type="application/ld+json">${generateRestaurantSchema()}</script>
    <script type="application/ld+json">${generateOrganizationSchema()}</script>
    <script type="application/ld+json">${generateWebSiteSchema()}</script>
    ${generateReviewSchema()}
    <script type="application/ld+json">${generateBreadcrumbSchema([
      { name: 'Home', url: '/' },
    ])}</script>
  `;

  initHeader();
  initTracking();
  initAnimations();
  initDragScroll('.dish-strip');
  initHeroSlider();
});

function initHeroSlider(): void {
  const img = document.getElementById('heroCircleImg') as HTMLImageElement | null;
  const dots = document.querySelectorAll<HTMLButtonElement>('.hero-dot');
  if (!img || !dots.length) return;

  let current = 0;

  function goTo(idx: number): void {
    current = idx;
    img!.style.opacity = '0';
    setTimeout(() => {
      img!.src = heroSlides[idx];
      img!.style.opacity = '1';
    }, 250);
    dots.forEach((d, i) => d.classList.toggle('active', i === idx));
  }

  dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));

  const timer = setInterval(() => goTo((current + 1) % heroSlides.length), 3500);

  // Stop auto-play when user interacts
  dots.forEach(dot => dot.addEventListener('click', () => {
    clearInterval(timer);
  }));
}
