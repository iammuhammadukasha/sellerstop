import type { Metadata } from 'next';
import { Jost } from 'next/font/google';
import './globals.css';

const jost = Jost({ subsets: ['latin'], variable: '--font-jost' });

export const metadata: Metadata = {
  title: 'Sell My House Fast for Cash | Seller Stop Choice | No Repairs, No Fees',
  description: 'Need to sell your house fast? Get a fair cash offer in 24 hours. No repairs, no agent fees, no hassles. Close in as little as 7 days. Trusted cash home buyers since 2016.',
  keywords: ['sell my house fast', 'cash home buyers', 'we buy houses', 'sell house for cash', 'sell house as is', 'fast cash offer', 'no agent fees', 'sell inherited house', 'sell house without repairs'],
  viewport: { width: 'device-width', initialScale: 1, maximumScale: 5 },
  robots: 'index, follow',
  authors: [{ name: 'Seller Stop Choice' }],
  openGraph: {
    title: 'Sell My House Fast for Cash | Seller Stop Choice',
    description: 'Get a fair cash offer in 24 hours. No repairs, no fees. Close in 7 days. Trusted since 2016.',
    url: 'https://sellerstop.vercel.app',
    siteName: 'Seller Stop Choice',
    type: 'website',
    locale: 'en_US',
    images: [{
      url: '/logo.png',
      width: 1200,
      height: 630,
      alt: 'Seller Stop Choice - We Buy Houses for Cash',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sell My House Fast for Cash | Seller Stop Choice',
    description: 'Get a fair cash offer in 24 hours. No repairs, no fees.',
    images: ['/logo.png'],
  },
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={jost.variable}>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
