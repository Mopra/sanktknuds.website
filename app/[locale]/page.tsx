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
    <div className="flex min-h-[100svh] items-center justify-center bg-ink p-4">
      <Image
        src="/sankt-knuds-flyer.jpg"
        alt="Sankt Knuds"
        width={1200}
        height={1600}
        priority
        className="h-auto max-h-[100svh] w-auto max-w-full object-contain"
      />
    </div>
  );
}
