import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Figure } from '@/components/ui/Figure';
import { TrackedLink } from '@/components/ui/TrackedLink';
import { Link } from '@/i18n/navigation';
import { type Locale, routes } from '@/i18n/routing';
import { getFoodChapters, getPage } from '@/lib/content';
import { buildMenuSchema, buildPageMetadata } from '@/lib/seo';

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
  const chapters = getFoodChapters();
  const t = await getTranslations('menu');
  const tw = await getTranslations('wine');
  const tc = await getTranslations('cocktails');
  const currency = t('currency');
  const menuSchema = buildMenuSchema(chapters, locale);

  return (
    <article className="mx-auto max-w-3xl px-6 py-24 md:py-32">
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD needs raw injection
        dangerouslySetInnerHTML={{ __html: JSON.stringify(menuSchema) }}
      />
      <div className="h-px w-16 bg-ember" />
      <h1 className="mt-6 font-display text-5xl tracking-tight text-ink md:text-6xl">
        {page.title}
      </h1>
      {page.description ? <p className="mt-6 text-lg text-ink/80">{page.description}</p> : null}

      <TrackedLink
        event="menu_pdf_download"
        href="/Menu.pdf"
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
      </TrackedLink>

      <Figure
        src="/images/VIC00002.webp"
        alt={
          locale === 'da'
            ? 'Sæsonens råvarer anrettet med et glas vin'
            : 'Seasonal produce plated, with a glass of wine'
        }
        aspect="aspect-[16/9]"
        sizes="(min-width: 768px) 48rem, 100vw"
        position="50% 55%"
        priority
        className="mt-12"
      />

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
                  {section.label ? (
                    <div className="flex items-center gap-4">
                      <h3 className="font-mono text-[0.7rem] uppercase tracking-[0.25em] text-ink/45">
                        {section.label[locale]}
                      </h3>
                      <span aria-hidden="true" className="h-px flex-1 bg-stone/15" />
                    </div>
                  ) : null}
                  {section.note ? (
                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink/55">
                      {section.note[locale]}
                    </p>
                  ) : null}

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

      <div className="mt-16 border-t border-ink/10 pt-8">
        <p className="font-display text-xl tracking-tight text-ink md:text-2xl">
          {t('closingTitle')}
        </p>
        <p className="mt-4 max-w-xl text-ink/70">{t('closing')}</p>
        <p className="mt-8 text-sm text-ink/50">{t('allergens')}</p>
      </div>

      <div className="mt-16 flex flex-col gap-4">
        <Link
          href={routes.wine}
          className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-ember transition-colors hover:text-ink"
        >
          {tw('fromMenu')}
          <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </Link>
        <Link
          href={routes.cocktails}
          className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-ember transition-colors hover:text-ink"
        >
          {tc('viewAll')}
          <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>
    </article>
  );
}
