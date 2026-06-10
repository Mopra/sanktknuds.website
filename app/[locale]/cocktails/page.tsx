import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { getCocktailSections, getPage } from '@/lib/content';
import { buildPageMetadata } from '@/lib/seo';

type Props = { params: Promise<{ locale: Locale }> };

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI'];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const page = getPage('cocktails', locale);
  return buildPageMetadata({ page, locale, path: '/cocktails' });
}

export default async function CocktailsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const page = getPage('cocktails', locale);
  const sections = getCocktailSections();
  const t = await getTranslations('cocktails');

  return (
    <article className="mx-auto max-w-3xl px-6 py-24">
      <h1 className="font-display text-5xl tracking-tight md:text-6xl">{page.title}</h1>
      {page.description ? <p className="mt-6 text-lg text-ink/80">{page.description}</p> : null}

      <div className="mt-16 space-y-20">
        {sections.map((section, i) => (
          <section key={section.id} id={section.id} className="scroll-mt-28">
            <div className="flex items-baseline gap-4">
              <span aria-hidden="true" className="font-mono text-xs tracking-[0.3em] text-ember/70">
                {ROMAN[i]}
              </span>
              <h2 className="font-display text-3xl tracking-tight md:text-4xl">
                {section.label[locale]}
              </h2>
            </div>
            {section.note ? (
              <p className="mt-3 max-w-2xl text-ink/60">{section.note[locale]}</p>
            ) : null}

            <ul className="mt-8 divide-y divide-ink/10">
              {section.cocktails.map((cocktail) => (
                <li key={cocktail.name} className="py-5">
                  <h3 className="font-display text-xl tracking-tight text-ink">{cocktail.name}</h3>
                  {cocktail.ingredients ? (
                    <p className="mt-1.5 text-[0.95rem] leading-snug text-ink/80">
                      {cocktail.ingredients[locale]}
                    </p>
                  ) : null}
                  {cocktail.notes ? (
                    <p className="mt-1.5 font-mono text-xs uppercase tracking-[0.12em] text-ember/80">
                      {cocktail.notes[locale]}
                    </p>
                  ) : null}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <div className="mt-20 space-y-3 border-t border-ink/10 pt-8 text-sm text-ink/50">
        <p>{t('classicsNote')}</p>
        <p>{t('allergensNote')}</p>
      </div>
    </article>
  );
}
