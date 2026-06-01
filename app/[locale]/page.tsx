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
    <div className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-ink p-4 sm:p-8">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute left-[8%] top-[12%] h-[55vmin] w-[55vmin] rounded-full bg-[#f4ead5] opacity-[0.18] blur-[140px]" />
        <div className="absolute left-[28%] top-[8%] h-[60vmin] w-[60vmin] rounded-full bg-[#d97a3a] opacity-30 blur-[160px]" />
        <div className="absolute right-[10%] top-[18%] h-[50vmin] w-[50vmin] rounded-full bg-[#8a2a1a] opacity-35 blur-[150px]" />
        <div className="absolute bottom-[8%] right-[12%] h-[55vmin] w-[55vmin] rounded-full bg-[#c98a3a] opacity-30 blur-[160px]" />
        <div className="absolute bottom-[14%] left-[18%] h-[45vmin] w-[45vmin] rounded-full bg-[#3a1a10] opacity-50 blur-[140px]" />
      </div>

      <div className="relative">
        <div
          aria-hidden="true"
          className="absolute -inset-8 -z-10 rounded-3xl bg-[radial-gradient(ellipse_at_center,_rgba(217,122,58,0.45),_rgba(138,42,26,0.25)_45%,_transparent_75%)] blur-3xl"
        />
        <Image
          src="/sankt-knuds-flyer.jpg"
          alt="Sankt Knuds"
          width={1200}
          height={1600}
          priority
          className="relative h-auto max-h-[92svh] w-auto max-w-full rounded-lg object-contain shadow-[0_30px_90px_-20px_rgba(217,122,58,0.55),0_10px_40px_-10px_rgba(138,42,26,0.45)]"
        />
      </div>
    </div>
  );
}
