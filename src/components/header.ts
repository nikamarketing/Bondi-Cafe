import { SITE_CONFIG } from '../utils/config';

export function initHeader(): void {
  const header = document.querySelector('.site-header') as HTMLElement;
  const hamburger = document.querySelector('.hamburger') as HTMLElement;
  const navLinks = document.querySelector('.nav-links') as HTMLElement;

  if (!header) return;

  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 80);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
      document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  const currentPath = window.location.pathname;
  navLinks?.querySelectorAll('a').forEach(link => {
    const href = link.getAttribute('href') || '';
    if (
      (currentPath === '/' && href === '/') ||
      (currentPath === '/' && href === '/') ||
      (href !== '/' && !href.startsWith('http') && currentPath.includes(href))
    ) {
      link.classList.add('active');
    }
  });

  // Keep the "Menu" link highlighted on the menu and its sub-pages
  const menuPages = ['/menu', '/coffee', '/breakfast', '/drinks'];
  if (menuPages.some(p => currentPath.includes(p))) {
    document.querySelector('.nav-links a[href="/menu"]')?.classList.add('active');
  }

  document.querySelectorAll('.mobile-nav-item').forEach(item => {
    const href = item.getAttribute('href') || '';
    if (
      (currentPath === '/' && href === '/') ||
      (currentPath === '/' && href === '/') ||
      (href !== '/' && !href.startsWith('tel:') && !href.startsWith('http') && currentPath.includes(href))
    ) {
      item.classList.add('active');
    }
  });
}

export function renderHeader(): string {
  const config = SITE_CONFIG;
  const loc = config.locations[0];

  return `
  <a href="#main" class="skip-link">Skip to main content</a>

  <!-- Top Bar: social | phone | order online -->
  <div class="top-bar">
    <div class="top-bar-inner">

      <!-- Left: social icons -->
      <div class="top-bar-social">
        <a href="${config.social.instagram}" target="_blank" rel="noopener noreferrer" aria-label="Instagram" class="top-bar-social-link">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
        </a>
        <a href="${config.social.facebook}" target="_blank" rel="noopener noreferrer" aria-label="Facebook" class="top-bar-social-link">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
        </a>
        <!-- Delivery icon -->
        <span class="top-bar-social-link" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13"/><path d="M16 8h4l3 5v3h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
        </span>
      </div>

      <!-- Center: phone -->
      <a href="tel:${loc.phone}" class="top-bar-phone">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
        <strong>${loc.phoneFormatted}</strong>
      </a>

      <!-- Right: Order Online delivery buttons -->
      <div class="top-bar-delivery">
        <span class="top-bar-delivery-label">Order Online:</span>
        <a href="${config.delivery.uberEats}" target="_blank" rel="noopener noreferrer" class="delivery-btn delivery-btn--uber" aria-label="Order on Uber Eats">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/></svg>
          Uber Eats
        </a>
        <a href="${config.delivery.doorDash}" target="_blank" rel="noopener noreferrer" class="delivery-btn delivery-btn--doordash" aria-label="Order on DoorDash">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/></svg>
          DoorDash
        </a>
        <a href="${config.delivery.hungryPanda}" target="_blank" rel="noopener noreferrer" class="delivery-btn delivery-btn--panda" aria-label="Order on Hungry Panda">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/></svg>
          Hungry Panda
        </a>
      </div>

    </div>
  </div>

  <!-- Main Header (transparent → solid on scroll) -->
  <header class="site-header" role="banner">
    <!-- Yacht animation: sails left → right along the header -->
    <div class="header-yacht" aria-hidden="true">
      <svg width="58" height="36" viewBox="0 0 58 36" fill="none">
        <!-- wake lines trailing behind -->
        <g class="yacht-wake" stroke="#7CC7E3" stroke-width="1.6" stroke-linecap="round" opacity="0.7">
          <line x1="0" y1="27" x2="9" y2="27"/>
          <line x1="2" y1="31" x2="10" y2="31"/>
        </g>
        <g class="yacht-hull-group">
          <!-- mast -->
          <line x1="30" y1="3" x2="30" y2="24" stroke="#F5F8FB" stroke-width="1.8" stroke-linecap="round"/>
          <!-- mainsail (aft of mast) -->
          <path d="M28.5 5 L28.5 23 L15 23 Z" fill="#F5F8FB"/>
          <!-- jib (fore of mast) -->
          <path d="M31.5 7 L31.5 23 L44 23 Z" fill="#7CC7E3"/>
          <!-- pennant flag -->
          <path d="M30 3 L36 5 L30 7 Z" fill="#3FA9D0"/>
          <!-- hull -->
          <path d="M12 26 L48 26 L42 32 L17 32 Z" fill="#F5F8FB"/>
          <line x1="12" y1="26" x2="48" y2="26" stroke="#3FA9D0" stroke-width="1.4" stroke-linecap="round"/>
        </g>
        <!-- bow waves under the hull -->
        <g class="yacht-waves" stroke="#7CC7E3" stroke-width="1.6" stroke-linecap="round" fill="none" opacity="0.85">
          <path d="M14 34 q3 -2.5 6 0 t6 0"/>
          <path d="M32 34 q3 -2.5 6 0 t6 0"/>
        </g>
      </svg>
    </div>
    <div class="header-inner">
      <a href="/" class="header-logo" aria-label="${config.brand.fullName} — Home">
        <img src="/assets/images/logo-white.png" alt="${config.brand.fullName}" style="height:56px;width:auto;max-width:55vw;object-fit:contain;display:block;" width="700" height="448">
      </a>

      <nav class="nav-links" role="navigation" aria-label="Main navigation">
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/menu">Menu</a>
        <a href="/gallery">Gallery</a>
        <a href="/blog">Blog</a>
        <a href="/contact">Contact</a>
        <a href="${config.reservationUrl}" target="_blank" rel="noopener noreferrer" class="nav-reserve">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          Reserve
        </a>
      </nav>

      <button class="hamburger" aria-label="Toggle menu" aria-expanded="false">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  </header>`;
}
