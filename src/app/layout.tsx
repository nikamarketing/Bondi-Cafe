import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileFooter from '@/components/MobileFooter';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.aaronskoshe.com.au'),
  title: {
    default: 'Bondi Cafe | Specialty Coffee & Fresh Food · Bondi Beach',
    template: '%s | Bondi Cafe',
  },
  description: 'Bondi Cafe — specialty coffee, all-day breakfast, and fresh seasonal food overlooking Bondi Beach. Open daily 5:00 AM – 11:00 PM.',
  keywords: ['bondi cafe', 'bondi beach cafe', 'specialty coffee', 'breakfast bondi', 'brunch bondi', 'campbell parade cafe'],
  openGraph: {
    type: 'website',
    siteName: 'Bondi Cafe',
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;500;600;700&family=Open+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen bg-charcoal overflow-x-hidden">
        <Header />
        <main>{children}</main>
        <Footer />
        <MobileFooter />
      </body>
    </html>
  );
}
