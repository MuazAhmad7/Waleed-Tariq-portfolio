import { Analytics } from '@vercel/analytics/react';
import localFont from 'next/font/local';
import './globals.scss';
import './waleed-theme.scss';
import { SVGSprites } from './SVGSprites/SVGSprites';
import Template from './AppTemplate';
// If loading a variable font, you don't need to specify the font weight
const nohemi = localFont({
  src: '../public/fonts/Nohemi-VF.ttf',
  display: 'swap',
  fallback: ['sans-serif'],
  preload: true,
  weight: '100 900',
  variable: '--font-nohemi',
});
const inter = localFont({
  src: '../public/fonts/InterVariable.ttf',
  fallback: ['sans-serif'],
  display: 'auto',
  weight: '100 900',
  variable: '--font-inter',
});

export const metadata = {
  title: 'Portfolio | Design & Development',
  description: 'A portfolio showcasing design and development work.',
  icons: {
    icon: '/shuttlecock1.png',
    shortcut: '/shuttlecock1.png',
    apple: '/shuttlecock1.png',
  },
  openGraph: {
    title: 'Portfolio | Design & Development',
    description: 'A portfolio showcasing design and development work.',
    images: ['/emarald.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portfolio | Design & Development',
    description: 'A portfolio showcasing design and development work.',
    images: ['/emarald.png'],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${nohemi.variable}`}>
      <body>
        <SVGSprites />
        <Template>{children}</Template>
        <Analytics />
      </body>
    </html>
  );
}
