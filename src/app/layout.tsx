import type { Metadata } from 'next';
import { Jost } from 'next/font/google';
import './globals.css';

const jost = Jost({ subsets: ['latin'], variable: '--font-jost' });

export const metadata: Metadata = {
  title: 'We Buy Houses for Cash | Fast Cash Offer',
  description: 'Sell your house fast with a fair cash offer. No agents, no repairs, no waiting. Get an offer in 24 hours.',
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
