'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from '@/i18n/navigation';
import { routes } from '@/i18n/routing';
import { cn } from '@/lib/cn';

type Dish = {
  src: string;
  name: { da: string; en: string };
  note: { da: string; en: string };
  alt: { da: string; en: string };
};

/**
 * The plates we lead with. Copy mirrors content/food/card.md — prices are left
 * to the menu page so this section never drifts out of date.
 */
const DISHES: Dish[] = [
  {
    src: '/images/Caviar.jpg',
    name: { da: 'Caviar fra Stokkebye', en: 'Caviar from Stokkebye' },
    note: {
      da: 'Crème fraîche, purløg og løg-/kartoffelchips — eller dild, crème fraîche og vaffel',
      en: 'Crème fraîche, chives and onion/potato crisps — or dill, crème fraîche and waffle',
    },
    alt: {
      da: 'Caviar serveret på is med crème fraîche, purløg, rødløg og dild',
      en: 'Caviar served on ice with crème fraîche, chives, red onion and dill',
    },
  },
  {
    src: '/images/Argentinske rejer.jpg',
    name: { da: 'Argentinske rejer', en: 'Argentine prawns' },
    note: {
      da: 'Frisk chili, hvidløg, varmt smør og frisk brød',
      en: 'Fresh chilli, garlic, warm butter and fresh bread',
    },
    alt: {
      da: 'Argentinske rejer i varmt hvidløgssmør med purløg',
      en: 'Argentine prawns in warm garlic butter with chives',
    },
  },
  {
    src: '/images/Blåmuslinger.jpg',
    name: { da: 'Blåmuslinger', en: 'Blue mussels' },
    note: {
      da: 'Dampet i hvidvin og ingefær med urter',
      en: 'Steamed in white wine and ginger with herbs',
    },
    alt: {
      da: 'En skål dampede blåmuslinger med pommes frites ved vinduesbordet',
      en: 'A bowl of steamed blue mussels with fries at the window table',
    },
  },
  {
    src: '/images/Pizza 1.jpg',
    name: { da: 'Pizza Diavola', en: 'Pizza Diavola' },
    note: {
      da: 'Salami Ventricina, dehydreret tomat, frisk mozzarella og citron',
      en: 'Ventricina salami, dehydrated tomato, fresh mozzarella and lemon',
    },
    alt: {
      da: 'Pizza Diavola med salami, basilikum og frisk mozzarella',
      en: 'Pizza Diavola with salami, basil and fresh mozzarella',
    },
  },
  {
    src: '/images/Cæsar salat 2.jpg',
    name: { da: 'Cæsarsalat', en: 'Caesar salad' },
    note: {
      da: 'Hjertesalat med croutoner og dressing',
      en: 'Romaine hearts with croutons and dressing',
    },
    alt: {
      da: 'Cæsarsalat med sprøde croutoner og revet parmesan',
      en: 'Caesar salad with crisp croutons and grated parmesan',
    },
  },
  {
    src: '/images/Citrontærte 1.jpg',
    name: { da: 'Tærte', en: 'Tart' },
    note: {
      da: 'Med citroncreme og vaniljecremefraiche',
      en: 'With lemon cream and vanilla crème fraîche',
    },
    alt: {
      da: 'Citrontærte med mynte, serveret med en cappuccino',
      en: 'Lemon tart with mint, served with a cappuccino',
    },
  },
];

type Arrow = 'prev' | 'next';

export function FoodSlider({ locale }: { locale: 'da' | 'en' }) {
  const t = useTranslations('food');
  const trackRef = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  /**
   * scrollLeft that puts card `i` flush against the track's left gutter.
   * Measured from rects, since offsetLeft is relative to the offset parent and
   * would also swallow the gutter itself.
   */
  const targets = () => {
    const track = trackRef.current;
    if (!track) return [];
    const gutter = Number.parseFloat(getComputedStyle(track).paddingLeft) || 0;
    const trackLeft = track.getBoundingClientRect().left;
    return Array.from(track.children).map(
      (card) => card.getBoundingClientRect().left - trackLeft + track.scrollLeft - gutter,
    );
  };

  // The track is the source of truth — reading it on scroll keeps the dots and
  // the arrows honest whether the user swiped, dragged or clicked.
  const syncFromScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const nearest = targets().reduce(
      (best, target, i) =>
        Math.abs(target - track.scrollLeft) < best.distance
          ? { i, distance: Math.abs(target - track.scrollLeft) }
          : best,
      { i: 0, distance: Number.POSITIVE_INFINITY },
    );
    setIndex(nearest.i);
    setAtStart(track.scrollLeft <= 1);
    setAtEnd(track.scrollLeft >= track.scrollWidth - track.clientWidth - 1);
  }, []);

  useEffect(() => {
    syncFromScroll();
    window.addEventListener('resize', syncFromScroll);
    return () => window.removeEventListener('resize', syncFromScroll);
  }, [syncFromScroll]);

  const scrollTo = (i: number) => {
    const track = trackRef.current;
    const target = targets()[i];
    if (!track || target === undefined) return;
    track.scrollTo({ left: target, behavior: 'smooth' });
  };

  const step = (direction: Arrow) => {
    scrollTo(Math.min(DISHES.length - 1, Math.max(0, index + (direction === 'next' ? 1 : -1))));
  };

  return (
    <section className="border-t border-ink/10 bg-bone-dim py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-10 lg:px-16">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.3em] text-stone">{t('eyebrow')}</p>
            <h2 className="mt-5 font-display text-3xl leading-[1.05] tracking-tight text-ink md:text-4xl lg:text-5xl">
              {t('title')}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-ink-soft">{t('description')}</p>
          </div>

          {/* Arrows sit with the heading, out of the way of the plates */}
          <div className="hidden shrink-0 items-center gap-3 sm:flex">
            {(['prev', 'next'] as const).map((direction) => {
              const disabled = direction === 'prev' ? atStart : atEnd;
              return (
                <button
                  key={direction}
                  type="button"
                  onClick={() => step(direction)}
                  disabled={disabled}
                  aria-label={t(direction)}
                  className={cn(
                    'flex h-11 w-11 items-center justify-center rounded-full border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember focus-visible:ring-offset-2 focus-visible:ring-offset-bone-dim',
                    disabled
                      ? 'cursor-default border-ink/10 text-ink/25'
                      : 'border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-bone',
                  )}
                >
                  <span aria-hidden="true" className="text-lg leading-none">
                    {direction === 'prev' ? '←' : '→'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Full-bleed track — the last plate can run off the edge of the page */}
      <ul
        ref={trackRef}
        onScroll={syncFromScroll}
        // scroll-pl keeps a snapped card aligned with the gutter, not the viewport edge
        className="hide-scrollbar mt-14 flex snap-x snap-mandatory scroll-pl-6 gap-5 overflow-x-auto scroll-smooth px-6 pb-2 md:mt-20 md:scroll-pl-10 md:gap-8 md:px-10 lg:scroll-pl-16 lg:px-16"
      >
        {DISHES.map((dish, i) => (
          <li
            key={dish.src}
            className="w-[78vw] max-w-[26rem] shrink-0 snap-start sm:w-[46vw] lg:w-[30vw]"
          >
            <figure className="group">
              <div className="relative aspect-[4/5] overflow-hidden bg-ink/5">
                <Image
                  src={dish.src}
                  alt={dish.alt[locale]}
                  fill
                  loading={i < 2 ? 'eager' : 'lazy'}
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 78vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transition-none"
                />
              </div>
              <figcaption className="mt-6">
                <h3 className="font-display text-xl tracking-tight text-ink md:text-2xl">
                  {dish.name[locale]}
                </h3>
                <p className="mt-2 max-w-[34ch] text-sm leading-relaxed text-ink-soft">
                  {dish.note[locale]}
                </p>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>

      <div className="mx-auto mt-12 flex max-w-6xl justify-end px-6 md:px-10 lg:px-16">
        <Link
          href={routes.menu}
          className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-ember transition-colors hover:text-ink"
        >
          {t('viewMenu')}
          <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>
    </section>
  );
}
