// ============================================================
// category.ts — shared helpers for SEO category landing pages
// (Specialty Coffee, Breakfast & Brunch, Drinks & Juices)
// and the full menu.
// ============================================================
import { MENU_CATEGORIES } from './menu';
import type { MenuItem } from './menu';

// Representative imagery for select dishes/drinks. Items without an
// entry fall back to a category emoji placeholder.
export const ITEM_IMAGE_MAP: Record<string, string> = {
  // Specialty coffee
  'flat white': 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=800&q=80',
  'cappuccino': 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=800&q=80',
  'latte': 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800&q=80',
  'cold brew': 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=800&q=80',
  'espresso': 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=800&q=80',
  'matcha latte': 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=800&q=80',
  'chai latte': 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800&q=80',
  // All-day breakfast
  'smashed avo & feta': 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=800&q=80',
  'big bondi breakfast': 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=800&q=80',
  'eggs benedict': 'https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=800&q=80',
  'acai bowl': 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=800&q=80',
  'granola & yoghurt': 'https://images.unsplash.com/photo-1517093157656-b9eccef91cb1?w=800&q=80',
  'french toast': 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=800&q=80',
  // Brunch & lunch
  'bondi beef burger': 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80',
  'chicken caesar wrap': 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=800&q=80',
  'falafel & hummus bowl': 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80',
  'garden green bowl': 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80',
  'crispy fish tacos': 'https://images.unsplash.com/photo-1512838243191-e81e8f66f1fd?w=800&q=80',
  'burrata & heirloom tomato': 'https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=800&q=80',
  // Smoothies & cold drinks
  'bondi sunrise': 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=800&q=80',
  'berry blast': 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=800&q=80',
  'green machine': 'https://images.unsplash.com/photo-1502741224143-90386d7f8c82?w=800&q=80',
  'freshly squeezed orange juice': 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=800&q=80',
  // Pastries & sweets
  'butter croissant': 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&q=80',
  'almond croissant': 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80',
  'chocolate brownie': 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&q=80',
  'acai cheesecake': 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=800&q=80',
  'carrot & walnut cake': 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=800&q=80',
};

export function getItemImage(name: string): string | null {
  return ITEM_IMAGE_MAP[name.toLowerCase()] || null;
}

// Format a price for display: whole dollars stay short ("$22"),
// fractional prices keep cents ("$5.50").
export function formatPrice(price: number): string {
  return Number.isInteger(price) ? `$${price}` : `$${price.toFixed(2)}`;
}

// Render a grid of menu cards for a single category id.
export function renderCategoryGrid(categoryId: string): string {
  const cat = MENU_CATEGORIES.find(c => c.id === categoryId);
  if (!cat) return '';
  return `<div class="menu-items-grid">${cat.items.map(item => renderItemCard(item, cat.emoji)).join('')}</div>`;
}

function renderItemCard(item: MenuItem, emoji?: string): string {
  const imgUrl = getItemImage(item.name);
  return `
    <div class="mi-card${imgUrl ? ' mi-card--has-img' : ''}" data-name="${item.name.toLowerCase()}">
      ${imgUrl
        ? `<div class="mi-card-img" data-src="${imgUrl}"><img src="${imgUrl}" alt="${item.name}" loading="lazy" decoding="async" width="400" height="300" onerror="this.parentElement.classList.add('mi-card-placeholder');this.remove()"></div>`
        : `<div class="mi-card-img mi-card-placeholder"><div style="font-size:3rem;opacity:0.3;">${emoji || '🍽️'}</div></div>`
      }
      <div class="mi-card-body">
        <div class="mi-card-name">${item.name}</div>
        ${item.note ? `<div class="mi-card-desc">${item.note}</div>` : ''}
        <div class="mi-card-price">${formatPrice(item.price)}</div>
      </div>
    </div>`;
}

// Render an accessible FAQ accordion (pairs with initFaqAccordion()).
export function renderFaq(faqs: { question: string; answer: string }[]): string {
  return `
    <div class="faq-list">
      ${faqs.map((faq, i) => `
        <div class="faq-item${i === 0 ? ' open' : ''}">
          <button class="faq-question" aria-expanded="${i === 0 ? 'true' : 'false'}">
            <span>${faq.question}</span>
          </button>
          <div class="faq-answer"><p>${faq.answer}</p></div>
        </div>
      `).join('')}
    </div>`;
}

export function initFaqAccordion(): void {
  document.querySelectorAll<HTMLButtonElement>('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      if (!item) return;
      const isOpen = item.classList.toggle('open');
      btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  });
}
