import { SITE_CONFIG } from '../utils/config';
import { renderHeader, initHeader } from '../components/header';
import { renderFooter } from '../components/footer';
import { generateBreadcrumbSchema, renderBreadcrumbs } from '../utils/seo';
import { initTracking } from '../components/tracking';
import { initAnimations } from '../utils/animations';
import { ICONS } from '../utils/icons';

const config = SITE_CONFIG;
const loc = config.locations[0];

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');
  if (!app) return;

  app.innerHTML = `
    ${renderHeader()}
    <main id="main">
      <!-- Hero -->
      <section class="hero hero-page" aria-label="Contact Us" style="background: url('https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=1600&q=80') center/cover no-repeat;">
        <div class="hero-overlay"></div>
        <div class="hero-content">
          <h1>Get In Touch</h1>
          <p>Reserve a table or contact us — we'd love to hear from you</p>
        </div>
      </section>
      ${renderBreadcrumbs([{ name: 'Home', url: '/' }, { name: 'Contact', url: '/contact' }])}

      <!-- Contact Grid -->
      <section class="section" id="reservation" aria-labelledby="contact-heading">
        <div class="container">
          <h2 id="contact-heading" class="sr-only">Contact Information &amp; Reservation</h2>
          <div class="grid-2 animate-fade-up" style="align-items: flex-start;">
            <!-- Left: Contact Details -->
            <div>
              <h3 style="color: var(--color-primary); margin-bottom: var(--space-4);">Contact Details</h3>

              <div style="margin-bottom: var(--space-5);">
                <div class="location-detail" style="display:flex;gap:0.75rem;margin-bottom:0.75rem;font-size:0.9375rem;color:var(--color-text-muted);line-height:1.4;">
                  <span style="color: var(--color-primary); flex-shrink:0; margin-top:2px;">${ICONS.mapPin}</span>
                  <span>${loc.address.full}</span>
                </div>
                <div class="location-detail" style="display:flex;gap:0.75rem;margin-bottom:0.75rem;font-size:0.9375rem;color:var(--color-text-muted);line-height:1.4;">
                  <span style="color: var(--color-primary); flex-shrink:0; margin-top:2px;">${ICONS.phone}</span>
                  <a href="tel:${loc.phone}" style="color: var(--color-primary); font-weight: 700;">${loc.phoneFormatted}</a>
                </div>
                <div class="location-detail" style="display:flex;gap:0.75rem;margin-bottom:0.75rem;font-size:0.9375rem;color:var(--color-text-muted);line-height:1.4;">
                  <span style="color: var(--color-primary); flex-shrink:0; margin-top:2px;">${ICONS.clock}</span>
                  <span>Open daily: 5:00 AM – 11:00 PM<br>Kitchen until 3:00 PM · Bar from 5:00 PM</span>
                </div>
              </div>

              <div style="padding: var(--space-4); background: var(--color-white); border-radius: var(--radius-md); border-left: 4px solid var(--color-accent); margin-bottom: var(--space-4);">
                <h4 style="margin-bottom: 0.5rem; color: var(--color-primary);">Opening Hours</h4>
                <table class="hours-table" style="margin-top: 0.5rem;">
                  <tbody>
                    <tr><td><strong>Every Day</strong></td><td>5:00 AM – 11:00 PM</td></tr>
                    <tr><td><strong>Kitchen</strong></td><td>5:00 AM – 3:00 PM</td></tr>
                    <tr><td><strong>Bar</strong></td><td>5:00 PM – 11:00 PM</td></tr>
                  </tbody>
                </table>
              </div>

              <h4 style="color: var(--color-primary); margin-bottom: var(--space-2); margin-top: var(--space-4);">Follow Us</h4>
              <div class="social-links" style="gap: 0.75rem;">
                <a href="${config.social.facebook}" target="_blank" rel="noopener noreferrer" aria-label="Facebook" style="background: rgba(21,88,140,0.08); border-color: var(--color-primary); color: var(--color-primary);">${ICONS.facebook}</a>
                <a href="${config.social.instagram}" target="_blank" rel="noopener noreferrer" aria-label="Instagram" style="background: rgba(21,88,140,0.08); border-color: var(--color-primary); color: var(--color-primary);">${ICONS.instagram}</a>
              </div>

              <!-- Google Map embed -->
              <div class="map-embed" style="margin-top: var(--space-5);">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3313.489!2d151.2716!3d-33.8908!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b12b18c21893a01%3A0x8e3b60be67ca3b1d!2s94+Campbell+Parade%2C+Bondi+Beach+NSW+2026!5e0!3m2!1sen!2sau!4v1700000000000"
                  width="100%"
                  height="280"
                  style="border:0;"
                  allowfullscreen=""
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
                  title="Aaron's Koshe location map"
                  aria-label="Map showing Aaron's Koshe at 94 Campbell Parade, Bondi Beach">
                </iframe>
              </div>
            </div>

            <!-- Right: Quandoo Reservation Widget -->
            <div style="display: flex; flex-direction: column; align-items: stretch; text-align: center; padding: var(--space-4); background: var(--color-white); border-radius: var(--radius-md); border: 1px solid var(--color-gray-light);">
              <div style="margin-bottom: var(--space-3);">
                <div style="width: 4rem; height: 4rem; border-radius: 50%; background: var(--color-primary); display: flex; align-items: center; justify-content: center; margin: 0 auto var(--space-2); color: white;">
                  ${ICONS.calendar}
                </div>
                <h3 style="color: var(--color-primary); margin-bottom: 0.5rem;">Reserve a Table</h3>
                <p style="color: var(--color-text-muted); font-size: 0.9375rem; margin-bottom: 0;">Book your table online — quick, easy, instant confirmation.</p>
              </div>

              <!-- Quandoo Widget -->
              <div class="quandoo-widget-wrap" style="margin-bottom: var(--space-3);">
                <iframe
                  src="${config.reservationUrl}"
                  width="100%"
                  height="480"
                  style="border: none; display: block;"
                  title="Reserve a table at Aaron's Koshe via Quandoo"
                  loading="lazy">
                </iframe>
              </div>

              <p style="color: var(--color-text-muted); font-size: 0.875rem; margin-bottom: var(--space-2);">Prefer to call us?</p>
              <a href="tel:${loc.phone}" style="color: var(--color-primary); font-weight: 700; font-size: 1.125rem; display: flex; align-items: center; justify-content: center; gap: 0.5rem;">
                ${ICONS.phone} ${loc.phoneFormatted}
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
    ${renderFooter()}

    <script type="application/ld+json">${JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      name: `Contact ${config.brand.name}`,
      url: `${config.seo.siteUrl}/contact.html`,
    })}</script>
    <script type="application/ld+json">${generateBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Contact', url: '/contact' },
    ])}</script>
  `;

  initHeader();
  initTracking();
  initAnimations();
});
