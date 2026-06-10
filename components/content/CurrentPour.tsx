'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { Link } from '@/i18n/navigation';
import { type Locale, routes } from '@/i18n/routing';
import type { RecommendedWine } from '@/lib/content';

const STORAGE_KEY = 'sk:currentPour';

export function CurrentPour({ locale, wines }: { locale: string; wines: RecommendedWine[] }) {
  const t = useTranslations('currentPour');
  const tWine = useTranslations('wine');
  // Server render shows the first wine; after mount we advance to the next one
  // so every reload rotates through the list (looping back to the start).
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (wines.length === 0) return;
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const prev = raw === null ? -1 : Number.parseInt(raw, 10);
    const next = (Number.isFinite(prev) ? prev + 1 : 0) % wines.length;
    setIndex(next);
    window.localStorage.setItem(STORAGE_KEY, String(next));
  }, [wines.length]);

  const wine = wines[index] ?? wines[0];
  if (!wine) return null;

  const category = wine.category?.[locale as Locale];
  const meta = [category, wine.glass ? `${wine.glass} ${tWine('currency')}` : null]
    .filter(Boolean)
    .join(' · ');

  return (
    <section className="border-l-2 border-ember/70 pl-6">
      <p className="text-xs uppercase tracking-[0.3em] text-ember">{t('label')}</p>
      <p className="mt-2 font-display text-2xl italic leading-snug text-ink/90">{wine.name}</p>
      {meta ? <p className="mt-1.5 font-mono text-xs tracking-wide text-ink/50">{meta}</p> : null}
      <Link
        href={routes.wine}
        className="group mt-4 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-ink/60 hover:text-ink"
      >
        {tWine('fromMenu')}
        <span
          aria-hidden="true"
          className="text-ember/80 transition-transform group-hover:translate-x-0.5"
        >
          →
        </span>
      </Link>
    </section>
  );
}
