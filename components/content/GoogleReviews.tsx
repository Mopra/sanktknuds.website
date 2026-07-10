import { getLocale, getTranslations } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { cn } from '@/lib/cn';
import type { ReviewQuote } from '@/lib/content';
import { getReviews } from '@/lib/content';

/**
 * Google reviews, rendered as plain HTML on purpose.
 *
 * No Review / aggregateRating JSON-LD: self-serving review markup about your own
 * business is ineligible for rich results and risks a manual action. The stars
 * here are decoration for guests, not a signal for Google.
 */
function Stars({ rating, className }: { rating: number; className?: string }) {
  return (
    <span className={cn('text-ember', className)} aria-hidden="true">
      {'★'.repeat(Math.round(rating))}
    </span>
  );
}

/**
 * What this reader should see, and whether it's the guest's own wording.
 *
 * `verbatim` is true only when we're showing `original` to a reader of the
 * language it was written in. It drives the `lang` attribute and decides whether
 * to offer the "see original" disclosure.
 */
function resolveQuote(quote: ReviewQuote, locale: Locale) {
  if (locale === quote.lang && quote.original) {
    return { text: quote.original, verbatim: true };
  }
  const translation = quote.translated?.[locale];
  if (translation) return { text: translation, verbatim: false };
  // No translation for this locale — fall back to the original rather than nothing.
  return quote.original ? { text: quote.original, verbatim: true } : null;
}

export async function ReviewCard({ quote }: { quote: ReviewQuote }) {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations('reviews');
  const resolved = resolveQuote(quote, locale);
  if (!resolved) return null;

  // Offer the guest's own words when we're showing them a translation of them.
  const showOriginal = !resolved.verbatim && quote.original && quote.lang !== locale;

  return (
    <figure className="flex h-full flex-col border border-ink/10 p-6">
      <Stars rating={quote.rating} className="text-sm tracking-[0.2em]" />
      <blockquote
        lang={resolved.verbatim ? quote.lang : locale}
        className="mt-4 flex-1 text-[0.95rem] leading-relaxed text-ink/80"
      >
        “{resolved.text}”
      </blockquote>

      {showOriginal ? (
        <details className="mt-4">
          <summary className="cursor-pointer font-mono text-[0.65rem] uppercase tracking-[0.2em] text-ember/80 transition-colors hover:text-ember">
            {t('seeOriginal', { lang: t(`langNames.${quote.lang}`) })}
          </summary>
          <p lang={quote.lang} className="mt-3 text-[0.9rem] leading-relaxed text-ink/60">
            “{quote.original}”
          </p>
        </details>
      ) : null}

      <figcaption className="mt-6 font-mono text-[0.7rem] uppercase tracking-[0.25em] text-ink/45">
        {quote.author}
      </figcaption>
    </figure>
  );
}

/** Compact rating line — sits beside the hero's booking CTA. */
export async function GoogleRatingBadge({ className }: { className?: string }) {
  const reviews = getReviews();
  const t = await getTranslations('reviews');
  const locale = await getLocale();
  const ratingText = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(reviews.rating);

  return (
    <a
      href={reviews.googleUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'inline-flex items-center gap-3 text-ink/70 transition-colors hover:text-ink',
        className,
      )}
    >
      <Stars rating={reviews.rating} className="text-sm tracking-[0.15em]" />
      <span className="font-mono text-xs uppercase tracking-[0.15em] tabular-nums">
        {t('summary', { rating: ratingText })}
      </span>
    </a>
  );
}

export async function GoogleReviews({ className }: { className?: string }) {
  const reviews = getReviews();
  const t = await getTranslations('reviews');
  const locale = await getLocale();
  if (reviews.quotes.length === 0) return null;

  // "5,0" in Danish, "5.0" in English — the decimal separator differs.
  const ratingText = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(reviews.rating);

  return (
    <section className={cn('mx-auto max-w-5xl px-6', className)} aria-labelledby="reviews-heading">
      <div className="h-px w-16 bg-ember" />
      <p className="mt-6 font-mono text-xs uppercase tracking-[0.3em] text-ember/80">
        {t('eyebrow')}
      </p>
      <h2 id="reviews-heading" className="mt-4 font-display text-4xl tracking-tight md:text-5xl">
        {t('title')}
      </h2>

      <p className="mt-4 flex flex-wrap items-center gap-3 text-ink/70">
        <Stars rating={reviews.rating} className="tracking-[0.15em]" />
        <span className="font-mono text-sm tabular-nums">
          {t('summary', { rating: ratingText })}
        </span>
      </p>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {reviews.quotes.map((quote) => (
          <ReviewCard key={quote.author} quote={quote} />
        ))}
      </div>

      <div className="mt-10 flex flex-wrap gap-6">
        <a
          href={reviews.googleUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-ember transition-colors hover:text-ink"
        >
          {t('readAll')}
          <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </a>
        {reviews.writeUrl ? (
          <a
            href={reviews.writeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-ink/50 transition-colors hover:text-ink"
          >
            {t('write')}
          </a>
        ) : null}
      </div>
    </section>
  );
}
