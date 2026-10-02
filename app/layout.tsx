import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Cormorant_Garamond } from 'next/font/google';
import './globals.css';
import { TheHeader } from '@/components/TheHeader/TheHeader';
import React from 'react';
import { ThemeProvider } from '@/services/ThemeContext';
import StoreProvider from '@/services/StoreProvider';
import MotionProvider from '@/services/MotionProvider';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Arts Search — Art Institute of Chicago collection',
  description: 'Browse and search artworks from the Art Institute of Chicago collection.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const setInitialTheme = `
    (function() {
      function getInitialTheme() {
        const savedTheme = window.localStorage.getItem('theme');
        return savedTheme || 'light';
      }
      document.documentElement.setAttribute('data-theme', getInitialTheme());
    })();
  `;

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable}`}
      suppressHydrationWarning
    >
      <body>
        <script dangerouslySetInnerHTML={{ __html: setInitialTheme }} />
        <StoreProvider>
          <ThemeProvider>
            <MotionProvider>
              <TheHeader />
              <main>{children}</main>
            </MotionProvider>
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
