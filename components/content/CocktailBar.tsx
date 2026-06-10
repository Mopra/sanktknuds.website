import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { type Locale, routes } from '@/i18n/routing';
import { getCocktailCard } from '@/lib/content';

export function CocktailBar({ locale }: { locale: Locale }) {
  const t = useTranslations('cocktails');
  const card = getCocktailCard();

  // Lead with the opening section — the lighter aperitifs that set the tone.
  const featured = card.sections[0]?.cocktails.slice(0, 4) ?? [];

  return (
    <section className="border-t border-ink/10 bg-ink text-bone">
      <div className="mx-auto grid max-w-6xl lg:grid-cols-2">
        {/* The bar, in low light */}
        <div className="relative order-last min-h-[60vh] lg:order-first lg:min-h-0">
          <Image
            src="/images/patrick-tomasso-GXXYkSwndP4-unsplash.jpg"
            alt={locale === 'da' ? 'Baren i aftenlys' : 'The bar in evening light'}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>

        <div className="px-6 py-24 md:px-10 md:py-32 lg:py-36 lg:pl-16">
          {card.home.eyebrow ? (
            <p className="text-xs uppercase tracking-[0.3em] text-ember">
              {card.home.eyebrow[locale]}
            </p>
          ) : null}
          <h2 className="mt-5 font-display text-3xl leading-[1.05] tracking-tight text-bone md:text-4xl lg:text-5xl">
            {card.home.title[locale]}
          </h2>
          {card.home.description ? (
            <p className="mt-6 max-w-md text-lg leading-relaxed text-bone/75">
              {card.home.description[locale]}
            </p>
          ) : null}

          {featured.length > 0 ? (
            <ul className="mt-10 divide-y divide-bone/15 border-y border-bone/15">
              {featured.map((cocktail) => (
                <li key={cocktail.name} className="py-4">
                  <p className="font-display text-lg tracking-tight text-bone/90">
                    {cocktail.name}
                  </p>
                  {cocktail.notes ? (
                    <p className="mt-1 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-ember/80">
                      {cocktail.notes[locale]}
                    </p>
                  ) : null}
                </li>
              ))}
            </ul>
          ) : null}

          <Link
            href={routes.cocktails}
            className="group mt-10 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-ember transition-colors hover:text-bone"
          >
            {t('viewAll')}
            <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
