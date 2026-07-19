import { SITE_CONFIG } from '../utils/config';
import { ICONS } from '../utils/icons';

export function renderFooter(): string {
  const config = SITE_CONFIG;
  const loc = config.locations[0];

  return `
  <!-- Mobile Bottom Navigation -->
  <nav class="mobile-nav" aria-label="Mobile navigation">
    <a href="/" class="mobile-nav-item">
      ${ICONS.home}
      <span>Home</span>
    </a>
    <a href="/menu.html" class="mobile-nav-item">
      ${ICONS.menu}
      <span>Menu</span>
    </a>
    <a href="${config.reservationUrl}" target="_blank" rel="noopener noreferrer" class="mobile-nav-item mobile-nav-call" aria-label="Reserve a table">
      ${ICONS.calendar}
    </a>
    <a href="/contact.html" class="mobile-nav-item">
      ${ICONS.mapPin}
      <span>Contact</span>
    </a>
    <a href="${loc.googleMapsUrl}" target="_blank" rel="noopener noreferrer" class="mobile-nav-item">
      ${ICONS.map}
      <span>Map</span>
    </a>
  </nav>
  <footer class="site-footer" role="contentinfo">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <div class="logo-text">Aaron's Koshe</div>
          <p>${config.brand.tagline}</p>
          <div class="social-links" style="margin-top: 1.5rem;">
            <a href="${config.social.facebook}" target="_blank" rel="noopener noreferrer" aria-label="Facebook">${ICONS.facebook}</a>
            <a href="${config.social.instagram}" target="_blank" rel="noopener noreferrer" aria-label="Instagram">${ICONS.instagram}</a>
          </div>
        </div>
        <div class="footer-col">
          <h4>Explore</h4>
          <a href="/">Home</a>
          <a href="/about.html">About Us</a>
          <a href="/menu.html">Full Menu</a>
          <a href="/coffee.html">Specialty Coffee</a>
          <a href="/breakfast.html">Breakfast &amp; Brunch</a>
          <a href="/drinks.html">Drinks &amp; Cocktails</a>
          <a href="/gallery.html">Gallery</a>
          <a href="/blog.html">Blog</a>
          <a href="/contact.html">Contact</a>
          <a href="${config.reservationUrl}" target="_blank" rel="noopener noreferrer">Reserve a Table</a>
        </div>
        <div class="footer-col">
          <h4>Visit Us</h4>
          <p>${loc.address.full}</p>
          <a href="tel:${loc.phone}">${loc.phoneFormatted}</a>
          <p style="margin-top: 0.75rem; font-size: 0.8125rem; color: rgba(255,255,255,0.5);">Open Daily</p>
          <p style="margin-bottom: 0.25rem;">5:00 AM – 11:00 PM</p>
          <p style="font-size: 0.8125rem; color: rgba(255,255,255,0.5);">Kitchen until 3:00 PM · Bar from 5:00 PM</p>
        </div>
        <div class="footer-col footer-map-col">
          <h4>Find Us</h4>
          <div class="footer-map">
            <iframe
              title="Aaron's Koshe location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3313.489!2d151.2716!3d-33.8908!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b12b18c21893a01%3A0x8e3b60be67ca3b1d!2s94%20Campbell%20Parade%2C%20Bondi%20Beach%20NSW%202026!5e0!3m2!1sen!2sau!4v1700000000000"
              width="100%"
              height="180"
              style="border:0; border-radius: 0.375rem; filter: invert(90%) hue-rotate(180deg);"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade">
            </iframe>
            <a href="${loc.googleMapsUrl}" target="_blank" rel="noopener noreferrer" class="footer-map-link">
              ${ICONS.mapPin} Get Directions
            </a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <span>&copy; ${new Date().getFullYear()} ${config.brand.fullName}. All rights reserved.</span>
        <span style="color: rgba(255,255,255,0.3);">${loc.address.full}</span>
      </div>
    </div>
  </footer>`;
}
