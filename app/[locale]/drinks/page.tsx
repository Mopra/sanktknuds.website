import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { getDrinksChapters, getPage } from '@/lib/content';
import { buildPageMetadata } from '@/lib/seo';

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const page = getPage('drinks', locale);
  return buildPageMetadata({ page, locale, path: '/drinks' });
}

export default async function DrinksPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const page = getPage('drinks', locale);
  const chapters = getDrinksChapters();
  const t = await getTranslations('drinks');
  const currency = t('currency');

  return (
    <article className="mx-auto max-w-3xl px-6 py-24">
      <h1 className="font-display text-5xl tracking-tight md:text-6xl">{page.title}</h1>
      {page.description ? <p className="mt-6 text-lg text-ink/80">{page.description}</p> : null}

      <div className="mt-16 space-y-24">
        {chapters.map((chapter) => (
          <div key={chapter.id} id={chapter.id} className="scroll-mt-28">
            <div className="border-b border-ink/15 pb-4">
              <h2 className="font-display text-3xl tracking-tight md:text-4xl">
                {chapter.label[locale]}
              </h2>
              {chapter.note ? <p className="mt-3 text-ink/60">{chapter.note[locale]}</p> : null}
            </div>

            <div className="mt-10 space-y-12">
              {chapter.sections.map((section) => (
                <section key={section.id}>
                  <div className="flex items-center gap-4">
                    <h3 className="font-mono text-[0.7rem] uppercase tracking-[0.25em] text-ink/45">
                      {section.label[locale]}
                    </h3>
                    <span aria-hidden="true" className="h-px flex-1 bg-stone/15" />
                  </div>

                  <ul className="mt-4 divide-y divide-ink/10">
                    {section.items.map((item) => (
                      <li
                        key={item.name[locale]}
                        className="flex items-baseline justify-between gap-6 py-3"
                      >
                        <div className="min-w-0">
                          <p className="text-[0.95rem] leading-snug text-ink/85">
                            {item.name[locale]}
                          </p>
                          {item.description ? (
                            <p className="mt-1 text-sm text-ink/55">{item.description[locale]}</p>
                          ) : null}
                        </div>
                        {item.price !== undefined ? (
                          <span className="whitespace-nowrap font-mono text-sm tabular-nums text-ember">
                            {item.price} {currency}
                          </span>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}
