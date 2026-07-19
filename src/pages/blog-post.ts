// Generic blog article renderer — shared by every post shell.
// It matches window.location.pathname against the post slugs in
// src/utils/posts.ts and renders the corresponding article.
import { SITE_CONFIG } from '../utils/config';
import { BLOG_POSTS, getPostBySlug } from '../utils/posts';
import { renderHeader, initHeader } from '../components/header';
import { renderFooter } from '../components/footer';
import { generateRestaurantSchema } from '../components/schema';
import { generateBreadcrumbSchema, renderBreadcrumbs } from '../utils/seo';
import { initTracking } from '../components/tracking';
import { initAnimations } from '../utils/animations';

const config = SITE_CONFIG;

function articleSchema(slug: string): string {
  const post = getPostBySlug(slug);
  if (!post) return '';
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    image: post.image,
    datePublished: post.datePublished,
    dateModified: post.datePublished,
    inLanguage: 'en-AU',
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${config.seo.siteUrl}/${post.slug}.html` },
    author: { '@type': 'Organization', name: config.brand.name, url: config.seo.siteUrl },
    publisher: {
      '@type': 'Organization',
      name: config.brand.name,
      logo: { '@type': 'ImageObject', url: `${config.seo.siteUrl}${config.brand.logoPath}` },
    },
    keywords: post.keywords.join(', '),
  };
  return JSON.stringify(schema);
}

function currentSlug(): string {
  const path = window.location.pathname;
  const file = path.substring(path.lastIndexOf('/') + 1);
  return file.replace(/\.html$/, '');
}

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');
  if (!app) return;

  const slug = currentSlug();
  const post = getPostBySlug(slug);

  if (!post) {
    window.location.href = '/blog.html';
    return;
  }

  const related = BLOG_POSTS.filter(p => p.slug !== post.slug);
  const dateDisplay = new Date(post.datePublished + 'T00:00:00').toLocaleDateString('en-AU', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  app.innerHTML = `
    ${renderHeader()}
    <main id="main">
      <section class="hero hero-page hero-article" aria-label="${post.title}" style="background: url('${post.image}') center/cover no-repeat;">
        <div class="hero-overlay"></div>
        <div class="hero-content">
          <div class="article-meta-top">
            <span class="post-card-cat">${post.category}</span>
          </div>
          <h1>${post.title}</h1>
          <p>${dateDisplay} · ${post.readTime}</p>
        </div>
      </section>
      ${renderBreadcrumbs([
        { name: 'Home', url: '/' },
        { name: 'Blog', url: '/blog.html' },
        { name: post.category, url: `/${post.slug}.html` },
      ])}

      <article class="section" aria-labelledby="article-title">
        <div class="container article-container">
          <h2 id="article-title" class="sr-only">${post.title}</h2>
          <div class="article-body">
            ${post.contentHtml}
          </div>

          <div class="article-cta">
            <h3>Experience it at Aaron's Koshe</h3>
            <p>94 Campbell Parade, Bondi Beach · Open daily 5 AM – 11 PM · Kitchen until 3 PM · Bar from 5 PM</p>
            <a href="${config.reservationUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">Reserve a Table</a>
          </div>
        </div>
      </article>

      <section class="section" style="background: var(--color-white);" aria-labelledby="related-heading">
        <div class="container">
          <div class="section-header animate-fade-up">
            <h2 id="related-heading">Keep Reading</h2>
            <div class="section-divider"></div>
          </div>
          <div class="grid-2 animate-fade-up" style="max-width: 56rem; margin: 0 auto;">
            ${related.map(p => `
              <a href="/${p.slug}.html" class="post-card">
                <img src="${p.image}" alt="${p.imageAlt}" loading="lazy" decoding="async" width="600" height="400">
                <div class="post-card-body">
                  <div class="post-card-meta">
                    <span class="post-card-cat">${p.category}</span>
                    <span>${p.readTime}</span>
                  </div>
                  <h3>${p.title}</h3>
                  <span class="post-card-link">Read Article →</span>
                </div>
              </a>
            `).join('')}
          </div>
        </div>
      </section>
    </main>
    ${renderFooter()}

    <script type="application/ld+json">${articleSchema(slug)}</script>
    <script type="application/ld+json">${generateRestaurantSchema()}</script>
    <script type="application/ld+json">${generateBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Blog', url: '/blog.html' },
      { name: post.title, url: `/${post.slug}.html` },
    ])}</script>
  `;

  initHeader();
  initTracking();
  initAnimations();
});
