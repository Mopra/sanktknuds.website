import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Figure } from '@/components/ui/Figure';
import { TrackedLink } from '@/components/ui/TrackedLink';
import type { Locale } from '@/i18n/routing';
import { getDrinksChapters, getPage } from '@/lib/content';
import { buildPageMetadata } from '@/lib/seo';

type Props = { params: Promise<{ locale: Locale }> };

const barSnacksGroups = [
  {
    id: 'caviar',
    label: { da: 'Caviar fra Stokkebye', en: 'Caviar from Stokkebye' },
    note: {
      da: 'Stokkebye i Nyborg opdrætter selv deres stør i store, naturlige søer i Slesvig-Holsten, i fællesskab med naturen. Serveres med cremefraiche, purløg og løg-/kartoffelchips.',
      en: 'Stokkebye in Nyborg raise their own sturgeon in large, natural lakes in Schleswig-Holstein, in partnership with nature. Served with crème fraîche, chives and onion/potato crisps.',
    },
    items: [
      { name: { da: 'Baerii 30 g', en: 'Baerii 30 g' }, price: 465 },
      { name: { da: 'Baerii 50 g', en: 'Baerii 50 g' }, price: 725 },
      { name: { da: 'Osietra 30 g', en: 'Osietra 30 g' }, price: 545 },
    ],
  },
  {
    id: 'nodder',
    label: { da: 'Nødder, ærter og mandler', en: 'Nuts, peas and almonds' },
    items: [
      { name: { da: 'Jordnødder, ristet og saltet', en: 'Peanuts, roasted and salted' }, price: 40 },
      {
        name: {
          da: 'Jordnødder, ristet med cayennepeber',
          en: 'Peanuts, roasted with cayenne pepper',
        },
        price: 65,
      },
      {
        name: { da: 'Cashewnødder, ristet og saltet', en: 'Cashews, roasted and salted' },
        price: 45,
      },
      { name: { da: 'Wasabiærter', en: 'Wasabi peas' }, price: 35 },
      { name: { da: 'Mandler, ristet og saltet', en: 'Almonds, roasted and salted' }, price: 30 },
    ],
  },
  {
    id: 'kartoffel-oliven',
    label: { da: 'Kartoffel og oliven', en: 'Potato and olives' },
    items: [
      {
        name: {
          da: 'Syrlige, sprøde chips med urtemayo',
          en: 'Tangy, crisp potato crisps with herb mayo',
        },
        price: 50,
      },
      { name: { da: 'Pommes frites med pebermayo', en: 'French fries with pepper mayo' }, price: 35 },
      { name: { da: 'Oliven', en: 'Olives' }, price: 35 },
      {
        name: {
          da: 'Friturestegte oliven med cremefraichedressing',
          en: 'Deep-fried olives with crème fraîche dressing',
        },
        price: 40,
      },
    ],
  },
  {
    id: 'kylling',
    label: { da: 'Kylling', en: 'Chicken' },
    items: [
      {
        name: {
          da: 'Friterede underlår i orlydej med buffalosauce',
          en: 'Fried chicken thighs in batter with buffalo sauce',
        },
        price: 35,
      },
    ],
  },
];

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

      <Figure
        src="/images/VIC09841.webp"
        alt={
          locale === 'da'
            ? 'En kold fadøl fra Carlsberg ved bordet'
            : 'A cold Carlsberg draught beer at the table'
        }
        aspect="aspect-[3/2]"
        sizes="(min-width: 768px) 48rem, 100vw"
        position="50% 42%"
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

      <section className="mt-16 border-t border-ink/10 pt-8">
        <h2 className="font-display text-2xl tracking-tight text-ink">
          {locale === 'da' ? 'Bar snacks' : 'Bar snacks'}
        </h2>
        <p className="mt-2 text-ink/70">
          {locale === 'da'
            ? 'Sulten mellem drinks? Se udvalget af snacks til baren.'
            : 'Peckish between drinks? See the selection of bar snacks.'}
        </p>

        <div className="mt-8 space-y-10">
          {barSnacksGroups.map((group) => (
            <div key={group.id}>
              <div className="flex items-center gap-4">
                <h3 className="font-mono text-[0.7rem] uppercase tracking-[0.25em] text-ink/45">
                  {group.label[locale]}
                </h3>
                <span aria-hidden="true" className="h-px flex-1 bg-stone/15" />
              </div>
              {group.note ? (
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink/55">
                  {group.note[locale]}
                </p>
              ) : null}
              <ul className="mt-4 divide-y divide-ink/10">
                {group.items.map((item) => (
                  <li
                    key={item.name[locale]}
                    className="flex items-baseline justify-between gap-6 py-3"
                  >
                    <p className="text-[0.95rem] leading-snug text-ink/85">{item.name[locale]}</p>
                    <span className="whitespace-nowrap font-mono text-sm tabular-nums text-ember">
                      {item.price} {currency}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <TrackedLink
          event="bar_snacks_pdf_download"
          href="/uploads/msnh0wsk-bar-snacks.pdf"
          download
          target="_blank"
          className="group mt-8 inline-flex items-center gap-2 border border-ink/20 px-4 py-2.5 font-mono text-xs uppercase tracking-[0.25em] text-ink/80 transition-colors hover:border-ember/60 hover:text-ink"
        >
          {locale === 'da' ? 'Bar snacks (PDF)' : 'Bar snacks (PDF)'}
          <span
            aria-hidden="true"
            className="text-ember/80 transition-transform group-hover:translate-y-0.5"
          >
            ↓
          </span>
        </TrackedLink>
      </section>
    </article>
  );
}
