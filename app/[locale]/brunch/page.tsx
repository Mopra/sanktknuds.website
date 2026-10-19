import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { BookingCta } from '@/components/ui/BookingCta';
import type { Locale } from '@/i18n/routing';
import { getPage } from '@/lib/content';
import { getSiteUrl } from '@/lib/seo';

type BrunchItem = { name: { da: string; en: string }; description?: { da: string; en: string } };

const brunchItems: BrunchItem[] = [
  {
    name: { da: 'Det lune', en: 'Warm dish' },
    description: { da: 'Røræg, bacon og pølser', en: 'Scrambled eggs, bacon and sausages' },
  },
  {
    name: { da: 'Toast', en: 'Toast' },
    description: { da: 'Med ost og skinke', en: 'With cheese and ham' },
  },
  {
    name: { da: 'Brød', en: 'Bread' },
    description: {
      da: 'Bolle, rugbrød og pisket smør',
      en: 'Bun, rye bread and whipped butter',
    },
  },
  {
    name: { da: 'Græsk yoghurt', en: 'Greek yoghurt' },
    description: {
      da: 'Med citron, havrecrumble, blommecoulis, ingefærtuile og hot honey',
      en: 'With lemon, oat crumble, plum coulis, ginger tuile and hot honey',
    },
  },
  {
    name: { da: 'Pålæg', en: 'Topping' },
    description: {
      da: 'Hønsesalat med surt og abrikosmarmelade',
      en: 'Chicken salad with pickles and apricot marmalade',
    },
  },
  {
    name: { da: 'Croissant', en: 'Croissant' },
    description: { da: 'Lun croissant', en: 'Warm croissant' },
  },
  {
    name: { da: 'Ost', en: 'Cheese' },
    description: {
      da: 'Applewood cheddar / husets ost med æblekompot',
      en: 'Applewood cheddar / house cheese with apple compote',
    },
  },
  {
    name: { da: 'Frugt', en: 'Fruit' },
    description: { da: 'Vindruer og melon', en: 'Grapes and melon' },
  },
  {
    name: { da: 'Bønnepuré', en: 'Bean purée' },
    description: { da: 'Med hvidløg', en: 'With garlic' },
  },
];

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const page = getPage('brunch', locale);
  const base = getSiteUrl();
  const canonical = `${base}/${locale}/brunch`;
  const title = page.seoTitle ?? page.title;
  return {
    title,
    description: page.description,
    alternates: {
      canonical,
      languages: {
        da: `${base}/da/brunch`,
        en: `${base}/en/brunch`,
        'x-default': `${base}/da/brunch`,
      },
    },
  };
}

export default async function BrunchPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const page = getPage('brunch', locale);

  return (
    <article className="mx-auto max-w-2xl px-6 py-24">
      <div className="h-px w-16 bg-ember" />
      {page.eyebrow ? (
        <p className="mt-6 font-mono text-xs uppercase tracking-[0.3em] text-ember/90">
          {page.eyebrow}
        </p>
      ) : null}
      <h1 className="mt-4 font-display text-5xl tracking-tight md:text-6xl">{page.title}</h1>
      {page.description ? <p className="mt-6 text-lg text-ink/80">{page.description}</p> : null}

      <BookingCta className="mt-8" />

      <div
        className="prose prose-invert mt-12 max-w-none"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: trusted repo-sourced content
        dangerouslySetInnerHTML={{ __html: page.body }}
      />

      <ul className="mt-12 divide-y divide-ink/10">
        {brunchItems.map((item) => (
          <li key={item.name[locale]} className="py-4">
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.25em] text-ink/65">
              {item.name[locale]}
            </p>
            {item.description ? (
              <p className="mt-1 text-[0.95rem] leading-snug text-ink/85">
                {item.description[locale]}
              </p>
            ) : null}
          </li>
        ))}
      </ul>

      <p className="mt-8 font-mono text-sm tabular-nums text-ember">
        {locale === 'da' ? '195,00 kr. pr. person' : '195.00 DKK per person'}
      </p>

      <BookingCta className="mt-16 border-t border-ink/10 pt-8" />
    </article>
  );
}
