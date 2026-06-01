import type { Metadata } from 'next';
import Image from 'next/image';
import { setRequestLocale } from 'next-intl/server';
import { getPage } from '@/lib/content';
import { buildPageMetadata } from '@/lib/seo';
import type { Locale } from '@/i18n/routing';

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const page = getPage('home', locale);
  return buildPageMetadata({ page, locale, path: '/' });
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div
      className="flex min-h-[100svh] items-center justify-center p-4 sm:p-8"
      style={{
        background:
          'radial-gradient(ellipse at center, #3a1f15 0%, #261410 60%, #110906 100%)',
      }}
    >
      <Image
        src="/sankt-knuds-flyer.jpg"
        alt="Sankt Knuds"
        width={1200}
        height={1600}
        priority
        className="h-auto max-h-[92svh] w-auto max-w-full rounded-xl ring-1 ring-white/5"
        style={{
          boxShadow:
            '0 1px 1px rgba(0, 0, 0, 0.4), 0 8px 16px rgba(0, 0, 0, 0.35), 0 30px 60px -12px rgba(0, 0, 0, 0.55), 0 60px 120px -30px rgba(58, 31, 21, 0.55)',
        }}
      />
    </div>
  );
}
