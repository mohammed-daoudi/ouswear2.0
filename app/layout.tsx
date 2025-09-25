import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './providers';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Ouswear - Top off your look. Own your vibe.',
  description: 'Premium streetwear caps and accessories with cutting-edge 3D preview technology.',
  keywords: 'streetwear, caps, hats, fashion, 3D preview, premium',
  openGraph: {
    title: 'Ouswear - Top off your look. Own your vibe.',
    description: 'Premium streetwear caps and accessories with cutting-edge 3D preview technology.',
    type: 'website',
    url: 'https://ouswear.com',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased`}>
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}