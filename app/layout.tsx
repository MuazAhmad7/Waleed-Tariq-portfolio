import { Analytics } from '@vercel/analytics/react';
import localFont from 'next/font/local';
import { ViewTransitions } from 'next-view-transitions';
import './globals.scss';
import './waleed-theme.scss';
import { SVGSprites } from './SVGSprites/SVGSprites';
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
    <ViewTransitions>
      <html lang="en" className={`${inter.variable} ${nohemi.variable}`}>
        <body>
          <SVGSprites />
          {children}
          <script
            async
            src="https://kit.fontawesome.com/cf8a647076.js"
            crossOrigin="anonymous"
          ></script>

          <Analytics />
        </body>
      </html>
    </ViewTransitions>
  );
}
