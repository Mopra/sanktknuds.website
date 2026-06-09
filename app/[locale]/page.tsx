import type { Metadata } from 'next';
import Image from 'next/image';
import { setRequestLocale } from 'next-intl/server';
import { site } from '#content';
import { MenuTease } from '@/components/content/MenuTease';
import { ReceptionInvite } from '@/components/content/ReceptionInvite';
import { BookingButton } from '@/components/ui/BookingButton';
import type { Locale } from '@/i18n/routing';
import { getPage } from '@/lib/content';
import { buildPageMetadata } from '@/lib/seo';

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const page = getPage('home', locale);
  return buildPageMetadata({ page, locale, path: '/' });
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const page = getPage('home', locale);
  const tagline = site.tagline[locale];
  const heroAlt =
    locale === 'da'
      ? 'Gæster ved bordene på Sankt Knuds Brasseri & Bar, Ryesgade 29, Aarhus C'
      : 'Guests at the tables of Sankt Knuds Brasseri & Bar in central Aarhus';

  return (
    <>
      {/* Hero — large but a touch under full screen */}
      <section className="relative flex min-h-[90svh] flex-col justify-end overflow-hidden">
        <Image
          src="/images/deepika-murugesan-SDesNGbwjXg-unsplash.jpg"
          alt={heroAlt}
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Scrims — deep at the base for crisp, high-contrast type */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/10"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-ink/75 via-ink/20 to-transparent"
        />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-14 md:px-10 md:pb-20 lg:px-16">
          <div className="h-px w-16 bg-ember" />
          {page.eyebrow ? (
            <p className="mt-5 font-mono text-xs uppercase tracking-[0.35em] text-parchment/70">
              {page.eyebrow}
            </p>
          ) : null}
          <h1 className="mt-5 max-w-[14ch] font-display text-5xl leading-[0.98] tracking-tight text-parchment md:text-7xl lg:text-8xl">
            {page.title}
          </h1>
          <p className="mt-6 max-w-md text-lg text-parchment/85 md:text-xl">{tagline}</p>
          <div className="mt-9">
            <BookingButton size="lg" />
          </div>
        </div>

        {/* Quiet scroll cue — a light segment travelling down a hairline track */}
        <div
          aria-hidden="true"
          className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 sm:block"
        >
          <div className="relative h-12 w-px overflow-hidden bg-parchment/15">
            <div className="absolute inset-x-0 top-0 h-1/2 w-px animate-[scroll-cue_2s_ease-in-out_infinite] bg-parchment/70" />
          </div>
        </div>
      </section>

      {/* Opening reception — timely announcement, given prominence near the top */}
      <ReceptionInvite locale={locale} />

      {/* Editorial intro — text and a full-height glimpse of the glass, side by side */}
      <section className="border-t border-stone/15 bg-ink">
        <div className="mx-auto grid max-w-6xl lg:grid-cols-2">
          <div className="px-6 py-24 md:px-10 md:py-32 lg:py-36 lg:pr-16">
            <div className="h-px w-16 bg-stone/40" />
            {page.description ? (
              <h2 className="mt-8 font-display text-2xl leading-[1.2] tracking-tight text-parchment md:text-3xl">
                {page.description}
              </h2>
            ) : null}
            <div
              className="prose prose-invert mt-10 max-w-none"
              // biome-ignore lint/security/noDangerouslySetInnerHtml: trusted repo-sourced content
              dangerouslySetInnerHTML={{ __html: page.body }}
            />
          </div>
          {/* Image fills its half top-to-bottom — anchored, not floating */}
          <div className="relative min-h-[65vh] lg:min-h-0">
            <Image
              src="/images/kyle-bushnell-GwlMJ2cDkNs-unsplash.jpg"
              alt={locale === 'da' ? 'Fadøl tappet ved baren' : 'Beer poured fresh at the bar'}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Menu taste test — a curated tease of the kitchen */}
      <MenuTease locale={locale} />
    </>
  );
}
