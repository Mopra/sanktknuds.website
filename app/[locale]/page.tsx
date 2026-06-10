import type { Metadata } from 'next';
import Image from 'next/image';
import { setRequestLocale } from 'next-intl/server';
import { site } from '#content';
import { CocktailBar } from '@/components/content/CocktailBar';
import { MenuTease } from '@/components/content/MenuTease';
import { ReceptionInvite } from '@/components/content/ReceptionInvite';
import { BookingButton } from '@/components/ui/BookingButton';
import { TrustpilotRating } from '@/components/ui/TrustpilotRating';
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
      {/* Hero — type-led, light and airy. The name carries the room. */}
      <section className="bg-bone">
        <div className="mx-auto w-full max-w-6xl px-6 pt-16 md:px-10 md:pt-24 lg:px-16 lg:pt-28">
          {page.eyebrow ? (
            <p className="text-xs uppercase tracking-[0.3em] text-stone">{page.eyebrow}</p>
          ) : null}
          <h1 className="mt-6 max-w-[16ch] font-display text-[clamp(3rem,9vw,7.5rem)] leading-[0.95] tracking-[-0.02em] text-ink">
            {page.title}
          </h1>

          <div className="mt-12 flex flex-col gap-8 border-t border-ink/10 pt-8 sm:flex-row sm:items-end sm:justify-between md:mt-16">
            <p className="max-w-md text-lg leading-relaxed text-ink-soft md:text-xl">{tagline}</p>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-8">
              <TrustpilotRating />
              <BookingButton size="lg" />
            </div>
          </div>
        </div>

        {/* The room — one wide, quiet photograph */}
        <div className="relative mt-12 h-[60vh] md:mt-16 md:h-[75vh]">
          <Image
            src="/hero-bar.jpg"
            alt={heroAlt}
            fill
            priority
            quality={90}
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
      </section>

      {/* Opening reception — timely announcement, given prominence near the top */}
      <ReceptionInvite locale={locale} />

      {/* Editorial intro — text and a full-height glimpse of the glass, side by side */}
      <section className="border-t border-ink/10 bg-bone">
        <div className="mx-auto grid max-w-6xl lg:grid-cols-2">
          <div className="px-6 py-24 md:px-10 md:py-32 lg:py-36 lg:pr-16">
            <div className="h-px w-16 bg-ember/70" />
            {page.description ? (
              <h2 className="mt-8 font-display text-2xl leading-[1.2] tracking-tight text-ink md:text-3xl">
                {page.description}
              </h2>
            ) : null}
            <div
              className="prose mt-10 max-w-none"
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

      {/* The bar — cocktails after the kitchen, in a darker register */}
      <CocktailBar locale={locale} />
    </>
  );
}
