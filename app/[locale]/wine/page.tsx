import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { getPage, getWineSections, type WineSection } from '@/lib/content';
import { buildPageMetadata } from '@/lib/seo';

type Props = { params: Promise<{ locale: Locale }> };

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'];

type Wine = WineSection['groups'][number]['wines'][number];

function formatPrice(wine: Wine, currency: string): string {
  if (wine.glass !== undefined && wine.bottle !== undefined) {
    return `${wine.glass} / ${wine.bottle} ${currency}`;
  }
  const value = wine.bottle ?? wine.glass;
  return value !== undefined ? `${value} ${currency}` : '';
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const page = getPage('wine', locale);
  return buildPageMetadata({ page, locale, path: '/wine' });
}

export default async function WinePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const page = getPage('wine', locale);
  const sections = getWineSections();
  const t = await getTranslations('wine');
  const currency = t('currency');

  return (
    <article className="mx-auto max-w-3xl px-6 py-24">
      <h1 className="font-display text-5xl tracking-tight md:text-6xl">{page.title}</h1>
      {page.description ? (
        <p className="mt-6 text-lg text-ink/80">{page.description}</p>
      ) : null}

      <a
        href="/vinkort.pdf"
        download
        className="group mt-8 inline-flex items-center gap-2 border border-ink/20 px-4 py-2.5 font-mono text-xs uppercase tracking-[0.25em] text-ink/80 transition-colors hover:border-ember/60 hover:text-ink"
      >
        {t('download')}
        <span
          aria-hidden="true"
          className="text-ember/80 transition-transform group-hover:translate-y-0.5"
        >
          ↓
        </span>
      </a>

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
            {section.note ? <p className="mt-3 text-ink/60">{section.note[locale]}</p> : null}

            <div className="mt-8 space-y-10">
              {section.groups.map((group) => (
                <div key={group.label?.en ?? group.wines[0]?.name}>
                  {group.label ? (
                    <div className="flex items-center gap-4">
                      <h3 className="font-mono text-[0.7rem] uppercase tracking-[0.25em] text-ink/45">
                        {group.label[locale]}
                      </h3>
                      <span aria-hidden="true" className="h-px flex-1 bg-stone/15" />
                    </div>
                  ) : null}
                  <ul className="mt-4 divide-y divide-ink/10">
                    {group.wines.map((wine) => (
                      <li
                        key={wine.name}
                        className="flex items-baseline justify-between gap-6 py-3"
                      >
                        <span className="text-[0.95rem] leading-snug text-ink/85">
                          {wine.name}
                          {wine.limited ? (
                            <sup className="ml-0.5 text-ember/70" title={t('limitedNote')}>
                              *
                            </sup>
                          ) : null}
                        </span>
                        <span className="whitespace-nowrap font-mono text-sm tabular-nums text-ember">
                          {formatPrice(wine, currency)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-20 space-y-1.5 border-t border-ink/10 pt-8 text-sm text-ink/50">
        <p>
          <span aria-hidden="true" className="text-ember/70">
            *
          </span>{' '}
          {t('limitedNote')}
        </p>
        <p>{t('priceNote')}</p>
      </div>
    </article>
  );
}
