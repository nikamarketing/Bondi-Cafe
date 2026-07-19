import { SITE_CONFIG } from '../utils/config';
import { BLOG_POSTS } from '../utils/posts';
import { renderHeader, initHeader } from '../components/header';
import { renderFooter } from '../components/footer';
import { generateRestaurantSchema } from '../components/schema';
import { generateBreadcrumbSchema, renderBreadcrumbs } from '../utils/seo';
import { initTracking } from '../components/tracking';
import { initAnimations } from '../utils/animations';

const config = SITE_CONFIG;

function blogListSchema(): string {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: `${config.brand.name} Blog`,
    url: `${config.seo.siteUrl}/blog.html`,
    description: 'Guides to specialty coffee, all-day breakfast and cafe culture in Bondi Beach from the team at Aaron\'s Koshe.',
    publisher: {
      '@type': 'Organization',
      name: config.brand.name,
      logo: { '@type': 'ImageObject', url: `${config.seo.siteUrl}${config.brand.logoPath}` },
    },
    blogPost: BLOG_POSTS.map(p => ({
      '@type': 'BlogPosting',
      headline: p.title,
      url: `${config.seo.siteUrl}/${p.slug}.html`,
      datePublished: p.datePublished,
      image: p.image,
      description: p.description,
    })),
  };
  return JSON.stringify(schema);
}

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');
  if (!app) return;

  app.innerHTML = `
    ${renderHeader()}
    <main id="main">
      <section class="hero hero-page" aria-label="Blog" style="background: url('https://images.unsplash.com/photo-1493770348161-369560ae357d?w=1600&q=80') center/cover no-repeat;">
        <div class="hero-overlay"></div>
        <div class="hero-content">
          <h1>Stories from the Cafe</h1>
          <p>Guides to coffee, breakfast and life at Bondi Beach</p>
        </div>
      </section>
      ${renderBreadcrumbs([{ name: 'Home', url: '/' }, { name: 'Blog', url: '/blog.html' }])}

      <section class="section" aria-labelledby="blog-heading">
        <div class="container">
          <h2 id="blog-heading" class="sr-only">Latest Articles</h2>
          <div class="grid-3 animate-fade-up">
            ${BLOG_POSTS.map(post => `
              <a href="/${post.slug}.html" class="post-card">
                <img src="${post.image}" alt="${post.imageAlt}" loading="lazy" decoding="async" width="600" height="400">
                <div class="post-card-body">
                  <div class="post-card-meta">
                    <span class="post-card-cat">${post.category}</span>
                    <span>${post.readTime}</span>
                  </div>
                  <h3>${post.title}</h3>
                  <p>${post.description}</p>
                  <span class="post-card-link">Read Article →</span>
                </div>
              </a>
            `).join('')}
          </div>
        </div>
      </section>

      <section class="cta-banner" aria-label="Reserve a Table">
        <div class="container animate-fade-up" style="text-align:center;">
          <h2>Hungry After All That Reading?</h2>
          <p>Reserve a table at Aaron's Koshe and taste it in person.</p>
          <a href="${config.reservationUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-accent" style="font-size: 1.125rem; padding: 0.875rem 2.5rem; margin-top: var(--space-3);">Reserve a Table</a>
        </div>
      </section>
    </main>
    ${renderFooter()}

    <script type="application/ld+json">${blogListSchema()}</script>
    <script type="application/ld+json">${generateRestaurantSchema()}</script>
    <script type="application/ld+json">${generateBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Blog', url: '/blog.html' },
    ])}</script>
  `;

  initHeader();
  initTracking();
  initAnimations();
});
