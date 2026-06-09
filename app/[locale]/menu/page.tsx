import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { TastingGroups } from '@/components/content/TastingGroups';
import { Figure } from '@/components/ui/Figure';
import { Link } from '@/i18n/navigation';
import { type Locale, routes } from '@/i18n/routing';
import { getPage, getTasting } from '@/lib/content';
import { buildPageMetadata } from '@/lib/seo';

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const page = getPage('menu', locale);
  return buildPageMetadata({ page, locale, path: '/menu' });
}

export default async function MenuPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const page = getPage('menu', locale);
  const tasting = getTasting('menu', locale);
  const t = await getTranslations('wine');

  return (
    <article className="mx-auto max-w-5xl px-6 py-24 md:px-10 md:py-32">
      <div className="h-px w-16 bg-ember" />
      <h1 className="mt-6 font-display text-5xl tracking-tight text-parchment md:text-6xl">
        {page.title}
      </h1>
      {page.description ? (
        <p className="mt-6 max-w-2xl text-lg text-parchment/80">{page.description}</p>
      ) : null}

      <Link
        href={routes.wine}
        className="group mt-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-ember transition-colors hover:text-parchment"
      >
        {t('fromMenu')}
        <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
          →
        </span>
      </Link>

      <Figure
        src="/images/jay-wennington-N_Y88TWmGwA-unsplash.jpg"
        alt={
          locale === 'da'
            ? 'Anretning serveret ved bordet med vin'
            : 'A dish served at the table with wine'
        }
        aspect="aspect-[16/9]"
        sizes="(min-width: 768px) 64rem, 100vw"
        priority
        className="mt-12"
      />

      {tasting ? (
        <>
          <TastingGroups groups={tasting.groups} className="mt-16" />
          {tasting.note ? (
            <p className="mt-8 border-t border-stone/15 pt-8 text-sm text-parchment/50">
              {tasting.note}
            </p>
          ) : null}
        </>
      ) : null}
    </article>
  );
}
