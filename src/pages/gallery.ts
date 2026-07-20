import { SITE_CONFIG } from '../utils/config';
import { renderHeader, initHeader } from '../components/header';
import { renderFooter } from '../components/footer';
import { generateImageGallerySchema } from '../components/schema';
import { generateBreadcrumbSchema, renderBreadcrumbs } from '../utils/seo';
import { initTracking } from '../components/tracking';
import { initAnimations } from '../utils/animations';
import { initGalleryLightbox } from '../utils/lightbox';

const config = SITE_CONFIG;

const galleryItems = [
  {
    src: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=800&q=80',
    label: 'Signature flat white with latte art',
  },
  {
    src: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&q=80',
    label: 'Croissants baked fresh each morning',
  },
  {
    src: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=800&q=80',
    label: 'Smashed avo on house sourdough',
  },
  {
    src: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=800&q=80',
    label: 'Acai bowl with seasonal fruit',
  },
  {
    src: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80',
    label: 'The Bondi Beef Burger',
  },
  {
    src: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80',
    label: "Aaron's Koshe cafe interior",
  },
  {
    src: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800&q=80',
    label: 'Our baristas at the brew bar',
  },
  {
    src: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=800&q=80',
    label: 'Freshly squeezed juice at golden hour',
  },
];

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');
  if (!app) return;

  app.innerHTML = `
    ${renderHeader()}
    <main id="main">
      <!-- Hero -->
      <section class="hero hero-page" aria-label="Gallery" style="background: url('https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=1600&q=80') center/cover no-repeat;">
        <div class="hero-overlay"></div>
        <div class="hero-content">
          <h1>A Taste of Aaron's Koshe</h1>
          <p>Glimpses of our coffee, kitchen and beachside atmosphere</p>
        </div>
      </section>
      ${renderBreadcrumbs([{ name: 'Home', url: '/' }, { name: 'Gallery', url: '/gallery.html' }])}

      <section class="section" aria-labelledby="gallery-heading">
        <div class="container">
          <h2 id="gallery-heading" class="sr-only">Gallery</h2>

          <!-- Gallery Grid -->
          <div class="gallery-grid animate-fade-up" id="gallery-grid">
            ${galleryItems.map(item => `
              <div class="gallery-item">
                <img src="${item.src}" alt="${item.label}" loading="lazy" decoding="async" width="800" height="800" onerror="this.closest('.gallery-item').style.display='none'">
              </div>
            `).join('')}
          </div>

          <!-- Social CTA -->
          <div style="display: flex; flex-direction: column; align-items: center; margin-top: var(--space-8); padding: var(--space-6) var(--space-4); background: var(--color-cream); border-radius: var(--radius-md);" class="animate-fade-up">
            <h3 style="color: var(--color-primary); margin-bottom: var(--space-2); font-size: 1.5rem;">Follow Us on Instagram</h3>
            <p style="font-size: 1.125rem; color: var(--color-text-muted); margin-bottom: var(--space-4); text-align: center;">See more of our coffee, plates and Bondi Beach mornings</p>
            <a href="${config.social.instagram}" target="_blank" rel="noopener noreferrer" class="btn btn-accent" style="font-size: 1.125rem; padding: 0.875rem 2rem;">
              Follow ${config.social.instagramHandle}
            </a>
          </div>
        </div>
      </section>
    </main>
    ${renderFooter()}

    <script type="application/ld+json">${generateImageGallerySchema()}</script>
    <script type="application/ld+json">${generateBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Gallery', url: '/gallery.html' },
    ])}</script>
  `;

  initHeader();
  initTracking();
  initAnimations();
  initGalleryLightbox('#gallery-grid');
});
