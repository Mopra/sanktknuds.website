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
    <div className="relative isolate flex min-h-[100svh] items-center justify-center overflow-hidden bg-ink p-4 sm:p-8">
      <div className="relative isolate">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 scale-[1.45] rounded-2xl bg-cover bg-center opacity-70 saturate-150"
          style={{
            backgroundImage: 'url(/sankt-knuds-flyer.jpg)',
            filter: 'blur(64px)',
          }}
        />
        <Image
          src="/sankt-knuds-flyer.jpg"
          alt="Sankt Knuds"
          width={1200}
          height={1600}
          priority
          className="relative h-auto max-h-[92svh] w-auto max-w-full rounded-lg object-contain shadow-2xl"
        />
      </div>
    </div>
  );
}
