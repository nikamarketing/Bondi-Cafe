// ============================================================
// posts.ts — Aaron's Koshe blog articles
// Each post is a static, SEO-targeted article. Add new posts
// here, create a matching <slug>.html shell, and register it
// in vite.config.ts and public/sitemap.xml.
// ============================================================

export interface BlogPost {
  slug: string;            // filename without .html
  title: string;           // on-page H1
  metaTitle: string;       // <title> (also used for og/twitter)
  description: string;     // meta description
  datePublished: string;   // ISO date
  readTime: string;
  category: string;
  image: string;
  imageAlt: string;
  keywords: string[];
  contentHtml: string;     // article body (h2/h3/p/ul markup)
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'specialty-coffee-guide',
    title: 'What Makes Specialty Coffee Special — and How We Brew It in Bondi',
    metaTitle: 'Specialty Coffee Guide | Aaron’s Koshe Bondi Blog',
    description:
      'What actually makes coffee "specialty"? Learn about single-origin beans, ethical sourcing, dialling in espresso and 18-hour cold brew — and how Aaron’s Koshe brews it all at Bondi Beach.',
    datePublished: '2026-07-18',
    readTime: '5 min read',
    category: 'Coffee',
    image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1200&q=80',
    imageAlt: 'Freshly roasted single-origin coffee beans',
    keywords: ['specialty coffee guide', 'single origin coffee Bondi', 'best flat white Sydney', 'cold brew coffee'],
    contentHtml: `
      <p>"Specialty coffee" gets thrown around so much it can feel like marketing. It isn't — it's a defined standard, scored by graders, and it changes everything about what lands in your cup. At <a href="/coffee">Aaron's Koshe</a>, every bean we buy meets it. Here's what that actually means, and how to taste the difference a few steps from the sand at Bondi Beach.</p>

      <h2>It starts at origin — a single one</h2>
      <p>Most supermarket coffee is a blend of beans from many countries, roasted dark to hide inconsistency. Specialty coffee flips that: beans from a single farm or region, picked ripe, processed carefully and scored 80+ points by certified graders. A single origin tastes like a place — an Ethiopian lot might sing with blueberry and jasmine, a Colombian with caramel and red apple. Our house espresso rotates through the seasons, so the hopper always holds something at its peak.</p>

      <h2>Ethical sourcing isn't a sticker</h2>
      <p>Specialty pricing works because quality is traceable to the people who grew it. We buy beans that are ethically sourced through roasters with direct relationships at origin — farmers paid well above commodity rates to reward the meticulous picking and processing that great coffee demands. Better lives at origin, better coffee at Bondi. That's the deal.</p>

      <h2>Dialling in: the daily ritual</h2>
      <p>Espresso is unforgiving. Humidity, bean age and grind size all shift the shot, which is why our baristas "dial in" every morning before open — adjusting the grinder, weighing doses, timing extractions and tasting until it's right. A few grams or seconds either way is the difference between syrupy-sweet and sour. When we open at 5 AM, the first flat white has already been rehearsed.</p>

      <h2>Beyond espresso</h2>
      <ul>
        <li><strong>Cold brew.</strong> Steeped for 18 hours in cold water for a smooth, chocolatey glass with zero bitterness — our summer bestseller.</li>
        <li><strong>Matcha.</strong> Ceremonial-grade Japanese matcha, whisked to order — a gentler caffeine curve with no crash.</li>
        <li><strong>House chai.</strong> Our own spice blend, simmered rather than syruped.</li>
        <li><strong>Alternative milks.</strong> Oat, almond, soy and macadamia — properly textured, not just steamed.</li>
      </ul>

      <h2>Taste it for yourself in Bondi</h2>
      <p>Theory only gets you so far. Visit us at 94 Campbell Parade from 5 AM any day, watch the bar at work, and order whatever the barista is excited about — or browse the full <a href="/coffee">specialty coffee menu</a> first. See you at sunrise.</p>
    `,
  },
  {
    slug: 'bondi-breakfast-guide',
    title: 'The Bondi Breakfast Guide: How to Do Mornings Like a Local',
    metaTitle: 'Bondi Breakfast Guide — All-Day Breakfast | Aaron’s Koshe Blog',
    description:
      'From dawn swims to 2 PM eggs benedict — a local’s guide to breakfast culture in Bondi Beach, and why all-day breakfast at Aaron’s Koshe is the only schedule you need.',
    datePublished: '2026-07-18',
    readTime: '6 min read',
    category: 'Breakfast',
    image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=1200&q=80',
    imageAlt: 'Full cooked breakfast with eggs, bacon and sourdough',
    keywords: ['breakfast Bondi Beach', 'all day breakfast Sydney', 'best brunch Bondi', 'smashed avo Bondi'],
    contentHtml: `
      <p>Bondi takes breakfast more seriously than almost anywhere on earth. It's the meal the whole suburb is built around — before work, after a swim, halfway through a hangover. Here's how the locals do it, from the team at <a href="/breakfast">Aaron's Koshe</a> on Campbell Parade.</p>

      <h2>The dawn shift: 5–7 AM</h2>
      <p>Bondi mornings start in the dark. The ocean swimmers hit the water at first light, the surfers check the banks at Icebergs' end, and the run clubs loop the coastal path. This crowd needs coffee <em>early</em> — which is exactly why we open at 5 AM daily. A flat white and a warm banana bread on the way to the sand is the most Bondi breakfast there is.</p>

      <h2>The classic window: 7–11 AM</h2>
      <p>This is peak Bondi: smashed avo with Persian feta and dukkah, eggs benedict with house-cured salmon, or the Big Bondi Breakfast if the morning swim earned it. Order a fresh juice or a <a href="/drinks">smoothie</a> on the side — the Bondi Sunrise (mango, passionfruit, orange, pineapple) tastes like the beach looks at 7 AM.</p>

      <h2>The sleep-in service: 11 AM – 3 PM</h2>
      <p>Here's the thing about "all-day breakfast": most cafes quietly stop at 11:30. We don't. The full breakfast menu runs until the kitchen closes at 3 PM, alongside the brunch and lunch list — barramundi bowls, fish tacos, the Bondi Beef Burger. Eggs at 2 PM isn't a compromise; it's a lifestyle.</p>

      <h2>Local rules for a proper Bondi breakfast</h2>
      <ul>
        <li><strong>Swim first.</strong> Everything tastes better with salt still on your skin.</li>
        <li><strong>Sourdough always.</strong> If the bread isn't proper, the breakfast isn't either. Ours arrives from a local bakery at dawn.</li>
        <li><strong>Share the sweet thing.</strong> One French toast for the table, extra forks. No exceptions.</li>
        <li><strong>Book the weekend.</strong> Saturday and Sunday 9 AM–midday are the rush — <a href="/contact">reserve online</a> to skip the wait.</li>
      </ul>

      <h2>Come hungry</h2>
      <p>Find us at 94 Campbell Parade, directly opposite the beach, kitchen open 5 AM – 3 PM every day. Browse the full <a href="/breakfast">breakfast &amp; brunch menu</a> and come do mornings properly.</p>
    `,
  },
  {
    slug: 'cafe-culture-bondi-beach',
    title: 'A Local’s Guide to Cafe Culture in Bondi Beach',
    metaTitle: 'Cafe Culture in Bondi Beach — A Local’s Guide | Aaron’s Koshe Blog',
    description:
      'When to go, what to order and how to spend a whole Bondi day in one cafe — from sunrise flat whites to golden-hour milkshakes at Aaron’s Koshe on Campbell Parade.',
    datePublished: '2026-07-18',
    readTime: '5 min read',
    category: 'Bondi Beach',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1200&q=80',
    imageAlt: 'Relaxed beachside cafe interior with morning light',
    keywords: ['cafe Bondi Beach', 'best cafe Campbell Parade', 'Bondi coffee culture', 'sunset drinks Bondi'],
    contentHtml: `
      <p>Bondi Beach is famous for surf and sand, but ask a local what actually holds the suburb together and they'll point across the road — to the cafes. Coffee here isn't a transaction; it's the town square. Here's how to do a full Bondi day in one room, by the team at <a href="/">Aaron's Koshe</a> on Campbell Parade.</p>

      <h2>Sunrise: the quiet hour</h2>
      <p>Between 5 and 6:30 AM, Bondi belongs to the locals. The light comes up gold over the Pacific, the first swimmers cross the bay, and the espresso machine hisses its first shots of the day. Take a window seat, order a flat white and watch the beach wake up — it's the best free show in Sydney, and you'll have it almost to yourself.</p>

      <h2>Mid-morning: the social hours</h2>
      <p>By 9 AM the room hums — prams and paddleboards, laptops and long blacks, half of Sydney's eastern suburbs catching up over <a href="/breakfast">smashed avo</a>. Bondi cafe etiquette is simple: dogs get water bowls, wetsuits get towels on chairs, and nobody rushes you. Order a second coffee. Everyone does.</p>

      <h2>Afternoon: the long lunch drift</h2>
      <p>As the kitchen winds toward its 3 PM close, lunch stretches out — fish tacos and kombucha, a barramundi bowl, maybe a slice of acai cheesecake because the ocean air demands it. This is the hour for watching the sails drift across the horizon and deciding the emails can wait.</p>

      <h2>Golden hour: the sweetest shift</h2>
      <p>As the afternoon fades, the same single-origin espresso that made your morning flat white goes into an <a href="/drinks">iced latte</a>, and the blender switches to milkshakes and thickshakes. The east-facing beach means the light turns pink and gold behind Campbell Parade — order a dessert, share some pastries left from the morning bake, and stay until the streetlights take over. We pour until 11 PM.</p>

      <h2>Make it yours</h2>
      <ul>
        <li><strong>Best seat:</strong> the window bench at sunrise; the corner table at golden hour.</li>
        <li><strong>Best order:</strong> flat white before 10, cold brew after, a thickshake after 5.</li>
        <li><strong>Best day:</strong> any day — we're open 5 AM to 11 PM, every single one.</li>
      </ul>
      <p>Aaron's Koshe is at 94 Campbell Parade, directly opposite the beach. <a href="/contact">Book a table</a> or just follow the smell of coffee. See you by the water.</p>
    `,
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find(p => p.slug === slug);
}
