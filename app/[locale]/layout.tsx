import { Fraunces, Geist, Geist_Mono } from 'next/font/google';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Toaster } from 'sonner';
import type { ReactNode } from 'react';
import { routing } from '@/i18n/routing';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PreLaunchOverlay } from '@/components/layout/PreLaunchOverlay';
import { buildRestaurantSchema } from '@/lib/seo';
import { site } from '#content';
import '../globals.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  axes: ['opsz', 'SOFT'],
});

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const messages = await getMessages();
  const schema = buildRestaurantSchema(site, locale);

  const preLaunch = site.preLaunch ?? false;

  return (
    <html
      lang={locale}
      className={`${fraunces.variable} ${geist.variable} ${geistMono.variable}`}
    >
      <body
        className={`bg-ink text-parchment font-sans antialiased ${preLaunch ? 'overflow-hidden' : ''}`}
      >
        <NextIntlClientProvider messages={messages}>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[70] focus:rounded focus:bg-parchment focus:px-3 focus:py-2 focus:text-ink"
          >
            Skip to content
          </a>
          <div
            aria-hidden={preLaunch ? 'true' : undefined}
            className={preLaunch ? 'pointer-events-none select-none' : undefined}
          >
            {/* Header/Footer temporarily hidden while the flyer image stands in for the homepage. */}
            {false && <Header />}
            <main id="main" className="min-h-[60vh]">
              {children}
            </main>
            {false && <Footer />}
          </div>
          {preLaunch ? <PreLaunchOverlay /> : null}
          <Toaster theme="dark" position="bottom-center" />
        </NextIntlClientProvider>
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD needs raw injection
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </body>
    </html>
  );
}
