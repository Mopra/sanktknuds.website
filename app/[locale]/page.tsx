import type { Metadata } from 'next';
import Image from 'next/image';
import { setRequestLocale } from 'next-intl/server';
import { site } from '#content';
import { CocktailBar } from '@/components/content/CocktailBar';
import { FoodSlider } from '@/components/content/FoodSlider';
import { GoogleRatingBadge, GoogleReviews } from '@/components/content/GoogleReviews';
import { MenuTease } from '@/components/content/MenuTease';
import { BookingButton } from '@/components/ui/BookingButton';
import { type HeroSlide, HeroSlider } from '@/components/ui/HeroSlider';
import { Link } from '@/i18n/navigation';
import { type Locale, routes } from '@/i18n/routing';
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

  const heroSlides: HeroSlide[] =
    locale === 'da'
      ? [
          {
            src: '/hero-bar-marble.jpg',
            alt: 'Baren med grøn marmor og ophængte glas hos Sankt Knuds Brasseri & Bar, Ryesgade 29, Aarhus C',
            position: 'object-[center_40%]',
          },
          {
            src: '/images/VIC00086.webp',
            alt: 'Gæster i solen på fortovsserveringen foran Sankt Knuds Brasseri & Bar i Ryesgade',
            position: 'object-[center_55%]',
          },
          {
            src: '/images/bar-bottles.jpg',
            alt: 'Spiritusflasker og cocktailværktøj opstillet bag baren',
            position: 'object-center',
          },
        ]
      : [
          {
            src: '/hero-bar-marble.jpg',
            alt: 'The green marble bar with hanging glassware at Sankt Knuds Brasseri & Bar in central Aarhus',
            position: 'object-[center_40%]',
          },
          {
            src: '/images/VIC00086.webp',
            alt: 'Guests in the sun on the pavement terrace outside Sankt Knuds Brasseri & Bar on Ryesgade',
            position: 'object-[center_55%]',
          },
          {
            src: '/images/bar-bottles.jpg',
            alt: 'Spirit bottles and bar tools lined up behind the bar',
            position: 'object-center',
          },
        ];

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

          <div className="mt-12 flex flex-col gap-8 border-t border-ink/10 pt-8 sm:flex-row sm:items-center sm:justify-between md:mt-16">
            <p className="max-w-md text-lg leading-relaxed text-ink-soft md:text-xl">{tagline}</p>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-8">
              <GoogleRatingBadge />
              <BookingButton size="lg" />
            </div>
          </div>
        </div>

        {/* The room — a slow procession of wide, quiet photographs */}
        <HeroSlider slides={heroSlides} className="mt-12 md:mt-16" />
      </section>

      {/* Seasonal banner — points at the Christmas lunch menu on the events page */}
      <section className="border-t border-ink/10 bg-ink text-bone">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-6 py-14 md:flex-row md:items-center md:justify-between md:px-10 md:py-16 lg:px-16">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-ember/80">
              {locale === 'da' ? 'Julefrokost 2026' : 'Christmas Lunch 2026'}
            </p>
            <h2 className="mt-3 font-display text-2xl tracking-tight md:text-3xl">
              {locale === 'da'
                ? 'Saml jeres selskab til en klassisk dansk julefrokost'
                : 'Gather your group for a classic Danish Christmas lunch'}
            </h2>
            <p className="mt-3 max-w-md text-bone/70">
              {locale === 'da'
                ? 'Se hele menuen og skriv til os for at booke — bestilles på forhånd.'
                : 'See the full menu and write to us to book — order in advance.'}
            </p>
          </div>
          <Link
            href={routes.events}
            className="group inline-flex items-center gap-2 border border-bone/25 px-5 py-3 font-mono text-xs uppercase tracking-[0.25em] text-bone transition-colors hover:border-ember/60 hover:text-ember"
          >
            {locale === 'da' ? 'Se menu og book' : 'See menu and book'}
            <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </section>

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
              src="/images/VIC00139.webp"
              alt={
                locale === 'da'
                  ? 'Bartenderen sier en cocktail bag baren'
                  : 'The bartender strains a cocktail behind the bar'
              }
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* The plates themselves — swipe through what leaves the kitchen */}
      <FoodSlider locale={locale} />

      {/* Menu taste test — a curated tease of the kitchen */}
      <MenuTease locale={locale} />

      {/* The bar — cocktails after the kitchen, in a darker register */}
      <CocktailBar locale={locale} />

      {/* What guests actually said — plain HTML, no review markup (see GoogleReviews) */}
      <section className="border-t border-ink/10 bg-bone py-24 md:py-32">
        <GoogleReviews />
      </section>
    </>
  );
}
