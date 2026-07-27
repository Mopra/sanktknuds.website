import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ReviewCard } from '@/components/content/GoogleReviews';
import { BookingButton } from '@/components/ui/BookingButton';
import { Figure } from '@/components/ui/Figure';
import { TrackedLink } from '@/components/ui/TrackedLink';
import { Link } from '@/i18n/navigation';
import { type Locale, routes } from '@/i18n/routing';
import { getLunchQuotes, getPage } from '@/lib/content';
import { buildPageMetadata } from '@/lib/seo';

type LunchMenuSection = {
  id: string;
  label: { da: string; en: string };
  note?: { da: string; en: string };
  items: { name: { da: string; en: string }; price?: number }[];
};

const lunchMenuSections: LunchMenuSection[] = [
  {
    id: 'lunch-oesters',
    label: { da: 'Østers', en: 'Oysters' },
    items: [
      { name: { da: 'Natural', en: 'Natural' }, price: 40 },
      {
        name: { da: 'Champagnecreme og purløg', en: 'Champagne cream and chives' },
        price: 45,
      },
      {
        name: {
          da: 'Sprød kartoffel, cremet peber og dild',
          en: 'Crisp potato, creamy pepper and dill',
        },
        price: 45,
      },
    ],
  },
  {
    id: 'lunch-caviar',
    label: { da: 'Caviar fra Stokkebye', en: 'Caviar from Stokkebye' },
    note: {
      da: 'Stokkebye i Nyborg opdrætter selv deres stør i store, naturlige søer i Slesvig-Holsten, i fællesskab med naturen. Fås enten med cremefraiche, purløg og løg-/kartoffelchips — eller dild, cremefraiche og vaffel.',
      en: 'Stokkebye in Nyborg raise their own sturgeon in large natural lakes in Schleswig-Holstein, in harmony with nature. Served with crème fraîche, chives and onion/potato crisps — or dill, crème fraîche and waffle.',
    },
    items: [
      { name: { da: 'Baerii 30 g', en: 'Baerii 30 g' }, price: 465 },
      { name: { da: 'Baerii 50 g', en: 'Baerii 50 g' }, price: 725 },
      { name: { da: 'Osietra 30 g', en: 'Osietra 30 g' }, price: 545 },
    ],
  },
  {
    id: 'lunch-rejer',
    label: { da: 'Argentinske rejer', en: 'Argentine prawns' },
    items: [
      {
        name: {
          da: 'Frisk chili, hvidløg, varmt smør og frisk brød',
          en: 'Fresh chilli, garlic, warm butter and fresh bread',
        },
        price: 125,
      },
      {
        name: {
          da: 'Stegt ananas, chimichurri og brød',
          en: 'Seared pineapple, chimichurri and bread',
        },
        price: 125,
      },
    ],
  },
  {
    id: 'lunch-kartoffel',
    label: { da: 'Kartoffel', en: 'Potato' },
    items: [
      {
        name: {
          da: 'Syrlige, sprøde chips med urtemayo',
          en: 'Tangy, crisp potato crisps with herb mayo',
        },
        price: 40,
      },
      {
        name: { da: 'Pommes frites med pebermayo', en: 'French fries with pepper mayo' },
        price: 45,
      },
    ],
  },
  {
    id: 'lunch-kylling',
    label: { da: 'Kylling', en: 'Chicken' },
    items: [
      {
        name: {
          da: 'Friterede underlår i orlydej med buffalosauce',
          en: 'Fried chicken thighs in batter with buffalo sauce',
        },
        price: 65,
      },
    ],
  },
];

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const page = getPage('lunch', locale);
  return buildPageMetadata({ page, locale, path: '/lunch' });
}

export default async function LunchPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const page = getPage('lunch', locale);
  const quotes = getLunchQuotes();
  const t = await getTranslations('lunch');
  const tm = await getTranslations('nav');
  const tMenu = await getTranslations('menu');
  const currency = tMenu('currency');

  return (
    <article className="mx-auto max-w-3xl px-6 py-24">
      <div className="h-px w-16 bg-ember" />
      {page.eyebrow ? (
        <p className="mt-6 font-mono text-xs uppercase tracking-[0.3em] text-ember/80">
          {page.eyebrow}
        </p>
      ) : null}
      <h1 className="mt-4 font-display text-5xl tracking-tight md:text-6xl">{page.title}</h1>
      {page.description ? <p className="mt-6 text-lg text-ink/80">{page.description}</p> : null}

      <TrackedLink
        event="lunch_menu_pdf_download"
        href="/uploads/ms3ezuz2-frokost-kort.pdf"
        download
        target="_blank"
        className="group mt-8 inline-flex items-center gap-2 border border-ink/20 px-4 py-2.5 font-mono text-xs uppercase tracking-[0.25em] text-ink/80 transition-colors hover:border-ember/60 hover:text-ink"
      >
        {t('download')}
        <span
          aria-hidden="true"
          className="text-ember/80 transition-transform group-hover:translate-y-0.5"
        >
          ↓
        </span>
      </TrackedLink>

      <Figure
        src="/images/VIC00086.webp"
        alt={
          locale === 'da'
            ? 'Gæster spiser frokost i solen foran Sankt Knuds i Ryesgade, Aarhus C'
            : 'Guests having lunch in the sun outside Sankt Knuds on Ryesgade, central Aarhus'
        }
        aspect="aspect-[16/9]"
        sizes="(min-width: 768px) 48rem, 100vw"
        position="50% 55%"
        priority
        className="mt-12"
      />

      <div
        className="prose prose-invert mt-16 max-w-none"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: trusted repo-sourced content
        dangerouslySetInnerHTML={{ __html: page.body }}
      />

      {quotes.length > 0 ? (
        <section className="mt-16" aria-labelledby="lunch-quotes">
          <h2
            id="lunch-quotes"
            className="font-mono text-xs uppercase tracking-[0.3em] text-ember/80"
          >
            {t('quotesTitle')}
          </h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {quotes.map((quote) => (
              <ReviewCard key={quote.author} quote={quote} />
            ))}
          </div>
        </section>
      ) : null}

      <div className="mt-16 flex flex-wrap items-center gap-6 border-t border-ink/10 pt-8">
        <BookingButton />
        <Link
          href={routes.menu}
          className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-ember transition-colors hover:text-ink"
        >
          {tm('menu')}
          <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </Link>
        <Link
          href={routes.visit}
          className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-ember transition-colors hover:text-ink"
        >
          {tm('visit')}
          <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>
    </article>
  );
}
