import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ReviewCard } from '@/components/content/GoogleReviews';
import { BookingButton } from '@/components/ui/BookingButton';
import { Figure } from '@/components/ui/Figure';
import { Link } from '@/i18n/navigation';
import { type Locale, routes } from '@/i18n/routing';
import { getLunchQuotes, getPage } from '@/lib/content';
import { buildPageMetadata } from '@/lib/seo';

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
