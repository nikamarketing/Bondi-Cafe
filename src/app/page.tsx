import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';

export const metadata: Metadata = {
  title: 'Bondi Cafe | Specialty Coffee & Fresh Food · Bondi Beach',
  description: 'Specialty coffee, all-day breakfast, and fresh seasonal food on Campbell Parade, Bondi Beach. Open daily 5:00 AM – 11:00 PM.',
  openGraph: {
    title: 'Bondi Cafe | Specialty Coffee & Fresh Food',
    description: 'Specialty coffee, all-day breakfast, and fresh seasonal food overlooking Bondi Beach.',
  },
};

const menuPreview = [
  {
    src: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80&fit=crop&auto=format',
    label: 'Specialty Coffee',
  },
  {
    src: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=600&q=80&fit=crop&auto=format',
    label: 'All Day Breakfast',
  },
  {
    src: 'https://images.unsplash.com/photo-1504754524776-8f4f37790c4f?w=600&q=80&fit=crop&auto=format',
    label: 'Brunch & Lunch',
  },
  {
    src: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=600&q=80&fit=crop&auto=format',
    label: 'Cocktails & Drinks',
  },
];

const experienceImages = [
  'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80&fit=crop&auto=format',
  'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&q=80&fit=crop&auto=format',
  'https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=800&q=80&fit=crop&auto=format',
];

const stats = [
  { value: 'Daily', label: 'Fresh Baked' },
  { value: '100%', label: 'Ethically Sourced' },
  { value: 'Open', label: '5 AM – 11 PM' },
];

const schemaOrg = {
  '@context': 'https://schema.org',
  '@type': 'CafeOrCoffeeShop',
  name: 'Bondi Cafe',
  servesCuisine: ['Australian', 'Cafe', 'Coffee'],
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '94 Campbell Parade',
    addressLocality: 'Bondi Beach',
    addressRegion: 'NSW',
    postalCode: '2026',
    addressCountry: 'AU',
  },
  url: 'https://www.aaronskoshe.com.au',
  openingHours: ['Mo-Su 05:00-23:00'],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
      />

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=1920&q=80&fit=crop&auto=format"
            alt="Bondi Cafe — specialty coffee at Bondi Beach"
            fill
            className="object-cover"
            priority
          />
          <div className="hero-overlay absolute inset-0" />
          <div className="ember-glow-overlay absolute inset-0" />
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <div className="animate-fade-in-d1 inline-flex items-center gap-3 mb-6">
            <div className="h-px w-10 bg-ember/70" />
            <p className="section-tag !block">Specialty Coffee · Bondi Beach</p>
            <div className="h-px w-10 bg-ember/70" />
          </div>

          <h1 className="animate-slide-up-d2 font-oswald text-5xl md:text-7xl font-bold text-washi mb-6 leading-tight">
            WHERE EVERY<br />
            <span className="text-ember text-glow-ember">MORNING</span><br />
            BEGINS BEAUTIFULLY
          </h1>

          <p className="animate-fade-in-d3 font-open-sans text-washi/80 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
            Specialty coffee, fresh all-day breakfast, and seasonal food — right on the doorstep
            of Australia&apos;s most iconic beach. Open every day, 5:00 AM to 11:00 PM.
          </p>

          <div className="animate-slide-up-d4 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://www.ubereats.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Order on Uber Eats
            </a>
            <a
              href="https://www.doordash.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              Order on DoorDash
            </a>
          </div>
        </div>

        <div className="animate-bounce absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-ember/60 z-10">
          <span className="font-oswald text-[10px] tracking-[0.3em] uppercase">Scroll</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* ── Stats bar ────────────────────────────────────── */}
      <section className="bg-ink py-12 border-y border-ember/20">
        <div className="max-w-4xl mx-auto px-4 grid grid-cols-3 gap-8 text-center">
          {stats.map((s, i) => (
            <ScrollReveal key={s.label} delay={(i + 1) as 1 | 2 | 3}>
              <div className="group cursor-default">
                <div className="font-oswald text-ember text-4xl font-bold group-hover:text-glow-ember transition-all duration-300">
                  {s.value}
                </div>
                <div className="font-open-sans text-washi/60 text-sm mt-1 tracking-wider">{s.label}</div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── Menu Preview ─────────────────────────────────── */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <ScrollReveal className="text-center mb-14">
          <p className="section-tag mb-3">Something for Everyone</p>
          <h2 className="section-title text-4xl md:text-5xl">Our Menu</h2>
          <div className="ember-divider" />
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {menuPreview.map((item, i) => (
            <ScrollReveal key={item.label} delay={(i % 4 + 1) as 1 | 2 | 3 | 4}>
              <div
                className="relative aspect-square overflow-hidden group border border-ember/10 hover:border-ember/40 transition-colors duration-300"
              >
                <Image
                  src={item.src}
                  alt={item.label}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-charcoal/40 group-hover:bg-charcoal/10 transition-colors duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-charcoal/90 to-transparent">
                  <p className="font-oswald text-ember text-xs tracking-widest uppercase text-center">{item.label}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="text-center">
          <Link href="/menu" className="btn-outline">
            Explore Full Menu
          </Link>
        </ScrollReveal>
      </section>

      {/* ── Order Online Banner ──────────────────────────── */}
      <section className="bg-ink py-14 border-y border-ember/20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <ScrollReveal>
            <p className="section-tag mb-3">Delivered to Your Door</p>
            <h2 className="section-title text-3xl md:text-4xl mb-6">Order Online</h2>
            <p className="font-open-sans text-washi/60 text-sm mb-8 max-w-lg mx-auto">
              Can&apos;t make it in? Get Bondi Cafe delivered anywhere in the area via Uber Eats or DoorDash.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://www.ubereats.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-3"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.518 0C5.605 0 0 5.349 0 11.951c0 6.605 5.605 11.954 12.518 11.954 6.912 0 12.517-5.349 12.517-11.954C25.035 5.35 19.43 0 12.518 0zm5.502 17.26H6.508V7.357h2.318v7.66h7.198V17.26h-.004z"/>
                </svg>
                Order on Uber Eats
              </a>
              <a
                href="https://www.doordash.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline inline-flex items-center gap-3"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.5 16.5h-11v-9h2v7h9v2z"/>
                </svg>
                Order on DoorDash
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Story Section ────────────────────────────────── */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image grid */}
          <ScrollReveal>
            <div className="grid grid-cols-2 gap-3 h-[480px]">
              <div className="relative overflow-hidden row-span-2 group">
                <Image src={experienceImages[0]} alt="Bondi Cafe interior" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 ring-1 ring-ember/0 group-hover:ring-ember/30 transition-all duration-300" />
              </div>
              <div className="relative overflow-hidden group">
                <Image src={experienceImages[1]} alt="Coffee at Bondi Cafe" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 ring-1 ring-ember/0 group-hover:ring-ember/30 transition-all duration-300" />
              </div>
              <div className="relative overflow-hidden group">
                <Image src={experienceImages[2]} alt="Fresh food at Bondi Cafe" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 ring-1 ring-ember/0 group-hover:ring-ember/30 transition-all duration-300" />
              </div>
            </div>
          </ScrollReveal>

          {/* Copy */}
          <ScrollReveal delay={2}>
            <p className="section-tag mb-4">Our Story</p>
            <h2 className="section-title text-4xl md:text-5xl mb-2">
              More Than a Cup<br />
              <span className="text-ember text-glow-ember">of Coffee</span>
            </h2>
            <div className="ember-divider-left mb-6" />
            <p className="font-open-sans text-washi/70 text-base leading-relaxed mb-4">
              Bondi Cafe was born from a simple belief: the best part of any day is the first sip of a perfectly made coffee, shared with people you love, in a place that feels like home.
            </p>
            <p className="font-open-sans text-washi/70 text-base leading-relaxed mb-8">
              Perched on Campbell Parade with sweeping views of Bondi Beach, we serve specialty single-origin coffee, house-baked pastries, and fresh seasonal food — all day, every day, from before sunrise to after the last wave.
            </p>
            <Link href="/experience" className="btn-outline">
              Discover Our Story
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="py-24 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-charcoal" />
        <div
          className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'repeating-linear-gradient(45deg, #D4AF37 0, #D4AF37 1px, transparent 0, transparent 50%)', backgroundSize: '20px 20px' }}
        />
        <div className="ember-glow-overlay absolute inset-0 opacity-60" />

        <div className="relative z-10 max-w-2xl mx-auto">
          <ScrollReveal>
            <p className="section-tag mb-4">Come Say Hello</p>
            <h2 className="section-title text-4xl md:text-5xl mb-2">Find Us at Bondi</h2>
            <div className="ember-divider mb-8" />
            <p className="font-open-sans text-washi/60 mb-10">
              94 Campbell Parade, Bondi Beach NSW 2026<br />
              Open every day, 5:00 AM – 11:00 PM
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://maps.google.com/?q=94+Campbell+Parade+Bondi+Beach+NSW+2026"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Get Directions
              </a>
              <Link href="/contact" className="btn-outline">
                Contact Us
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
