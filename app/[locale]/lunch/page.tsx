import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ReviewCard } from '@/components/content/GoogleReviews';
import { BookingButton } from '@/components/ui/BookingButton';
import { Figure } from '@/components/ui/Figure';
import { TrackedLink } from '@/components/ui/TrackedLink';
import { Link } from '@/i18n/navigation';
import { type Locale, routes } from '@/i18n/routing';
import { getLunchQuotes, getPage } from '@/lib/content';
import { buildPageMetadata } from '@/lib/seo';

type LunchMenuItem = { name: { da: string; en: string }; price?: number };
type LunchMenuSection = {
  id: string;
  label?: { da: string; en: string };
  note?: { da: string; en: string };
  items: LunchMenuItem[];
};
type LunchMenuChapter = {
  id: string;
  label: { da: string; en: string };
  sections: LunchMenuSection[];
};

const lunchMenuChapters: LunchMenuChapter[] = [
  {
    id: 'lunch-snacks',
    label: { da: 'Snacks', en: 'Snacks' },
    sections: [
      {
        id: 'lunch-oesters',
        label: { da: 'Østers', en: 'Oysters' },
        items: [
          { name: { da: 'Natural', en: 'Natural' }, price: 40 },
          {
            name: { da: 'Champagnecreme og purløg', en: 'Champagne cream and chives' },
            price: 45,
          },
          {
            name: {
              da: 'Tigermælk, urteolie og timian',
              en: "Tiger's milk, herb oil and thyme",
            },
            price: 45,
          },
        ],
      },
      {
        id: 'lunch-caviar',
        label: { da: 'Caviar fra Stokkebye', en: 'Caviar from Stokkebye' },
        note: {
          da: 'Stokkebye i Nyborg opdrætter selv deres stør i store, naturlige søer i Slesvig-Holsten, i fællesskab med naturen. Fås enten med cremefraiche, purløg og løg-/kartoffelchips — eller dild, cremefraiche og vaffel.',
          en: 'Stokkebye in Nyborg raise their own sturgeon in large natural lakes in Schleswig-Holstein, in harmony with nature. Served with crème fraîche, chives and onion/potato crisps — or dill, crème fraîche and waffle.',
        },
        items: [
          { name: { da: 'Baerii 30 g', en: 'Baerii 30 g' }, price: 465 },
          { name: { da: 'Baerii 50 g', en: 'Baerii 50 g' }, price: 725 },
          { name: { da: 'Osietra 30 g', en: 'Osietra 30 g' }, price: 545 },
        ],
      },
      {
        id: 'lunch-rejer',
        label: { da: 'Argentinske rejer', en: 'Argentine prawns' },
        items: [
          {
            name: {
              da: 'Chili, hvidløg og varmt smør',
              en: 'Chilli, garlic and warm butter',
            },
            price: 125,
          },
          {
            name: {
              da: 'Urtemayo, citron, spidskål, brombær og tuile',
              en: 'Herb mayo, lemon, pointed cabbage, blackberry and tuile',
            },
            price: 125,
          },
        ],
      },
      {
        id: 'lunch-kammusling',
        label: { da: 'Kammusling', en: 'Scallop' },
        items: [
          {
            name: {
              da: 'Rimmet, med agurk, urtemayo og dild',
              en: 'Cured, with cucumber, herb mayo and dill',
            },
            price: 59,
          },
        ],
      },
      {
        id: 'lunch-makrel',
        label: { da: 'Makrel', en: 'Mackerel' },
        items: [
          {
            name: {
              da: 'Varmrøget, med peber mayo, radiser, karse og sprødt brød',
              en: 'Hot-smoked, with pepper mayo, radishes, cress and crisp bread',
            },
            price: 75,
          },
        ],
      },
      {
        id: 'lunch-kartoffel',
        label: { da: 'Kartoffel', en: 'Potato' },
        items: [
          {
            name: {
              da: 'Syrlige, sprøde chips med urtemayo',
              en: 'Tangy, crisp potato crisps with herb mayo',
            },
            price: 40,
          },
          {
            name: { da: 'Pommes frites med pebermayo', en: 'French fries with pepper mayo' },
            price: 45,
          },
        ],
      },
      {
        id: 'lunch-kylling',
        label: { da: 'Kylling', en: 'Chicken' },
        items: [
          {
            name: {
              da: 'Friterede underlår i øldej med buffalosauce',
              en: 'Fried chicken thighs in beer batter with buffalo sauce',
            },
            price: 65,
          },
        ],
      },
    ],
  },
  {
    id: 'lunch-sandwiches',
    label: { da: 'Sandwiches og varme retter', en: 'Sandwiches and hot dishes' },
    sections: [
      {
        id: 'lunch-sandwiches-liste',
        items: [
          {
            name: {
              da: 'Croque madame — med ålerøget skinke, applewood cheddar, spejlæg, salat og sennepsvinaigrette',
              en: 'Croque madame — with smoked ham, applewood cheddar, fried egg, lettuce and mustard vinaigrette',
            },
            price: 145,
          },
          {
            name: {
              da: 'Kyllinge sandwich — med kyllingesalat med svampe, cornichoner og løg',
              en: 'Chicken sandwich — with chicken salad, mushrooms, gherkins and onion',
            },
            price: 125,
          },
          {
            name: {
              da: 'Pizza sandwich — med fennikel salami, stracciatella, pesto og salat',
              en: 'Pizza sandwich — with fennel salami, stracciatella, pesto and salad',
            },
            price: 155,
          },
          {
            name: {
              da: 'Rørt oksetatar — med dehydrerede tomater, sprød jordskokke og svampemayo',
              en: 'Hand-stirred beef tartare — with dehydrated tomatoes, crisp Jerusalem artichoke and mushroom mayo',
            },
            price: 155,
          },
          {
            name: {
              da: 'Burger — med okse og lam, friske løg, karamelliseret løg, ristede løg, syrlig løgcreme, applewood cheddar, cornichoner, snittet kål og pommes frites',
              en: 'Burger — with beef and lamb, fresh onions, caramelised onions, fried onions, tangy onion cream, applewood cheddar, cornichons, shaved cabbage and fries',
            },
            price: 225,
          },
          {
            name: {
              da: 'Fettuccine — med cremet tomatsauce, salami ventricina, chili og lime',
              en: 'Fettuccine — with creamy tomato sauce, ventricina salami, chilli and lime',
            },
            price: 179,
          },
          {
            name: {
              da: 'Serrano — fra kastanjefodrede grise, frisk burrata, rapsolie og citronsmør',
              en: 'Serrano — from chestnut-fed pigs, fresh burrata, rapeseed oil and lemon butter',
            },
            price: 149,
          },
          {
            name: {
              da: 'Suppe — italiensk bondesuppe med salsiccia, squash og cannellini bønner',
              en: 'Soup — Italian farmhouse soup with salsiccia, squash and cannellini beans',
            },
            price: 115,
          },
          {
            name: {
              da: 'Froutalia — græsk æggekage med salami ventricina, salat ost, mynte og marineret salat',
              en: 'Froutalia — Greek-style omelette with ventricina salami, salad cheese, mint and marinated salad',
            },
            price: 120,
          },
          {
            name: {
              da: 'Risotto — med jordskokker, citron og sprødt kyllingeskind',
              en: 'Risotto — with Jerusalem artichoke, lemon and crisp chicken skin',
            },
            price: 220,
          },
          {
            name: {
              da: 'Tun — lynstegt med syltet knoldselleri, cashewnødder og solbærsauce',
              en: 'Tuna — seared with pickled celeriac, cashew nuts and blackcurrant sauce',
            },
            price: 135,
          },
        ],
      },
    ],
  },
  {
    id: 'lunch-pizza',
    label: { da: 'Pizza', en: 'Pizza' },
    sections: [
      {
        id: 'lunch-pizza-liste',
        items: [
          { name: { da: 'Margherita', en: 'Margherita' }, price: 125 },
          {
            name: {
              da: 'Kartoffel, ricotta, mozzarella, rosmarin, karamelliseret løg og trøffelolie',
              en: 'Potato, ricotta, mozzarella, rosemary, caramelised onion and truffle oil',
            },
            price: 145,
          },
          {
            name: {
              da: 'Serranoskinke af kastanjefodret gris, frisk mozzarella og rapsolie',
              en: 'Serrano ham from chestnut-fed pork, fresh mozzarella and rapeseed oil',
            },
            price: 165,
          },
          {
            name: {
              da: 'Diavola med salami Ventricina, dehydreret tomat, frisk mozzarella og citron',
              en: 'Diavola with Ventricina salami, dehydrated tomato, fresh mozzarella and lemon',
            },
            price: 149,
          },
          {
            name: {
              da: 'Oksemørbrad, gorgonzola, svampe og syltede løg',
              en: 'Beef tenderloin, gorgonzola, mushrooms and pickled onions',
            },
            price: 189,
          },
        ],
      },
    ],
  },
  {
    id: 'lunch-salat',
    label: { da: 'Salat', en: 'Salad' },
    sections: [
      {
        id: 'lunch-salat-liste',
        items: [
          {
            name: {
              da: 'Cæsarsalat på hjertesalat, med croutoner og dressing',
              en: 'Caesar salad on romaine hearts, with croutons and dressing',
            },
            price: 135,
          },
          {
            name: {
              da: 'Bulgursalat vendt i yoghurt-mynte dressing, salat, bagt græskar, oliven og saltet ost',
              en: 'Bulgur salad tossed in yoghurt-mint dressing, salad, baked pumpkin, olives and salted cheese',
            },
            price: 159,
          },
          {
            name: { da: 'Tilkøb kylling', en: 'Add chicken' },
            price: 50,
          },
          {
            name: {
              da: 'Lynstegt tun, kartoffel, vagtelæg, rødløg, hjertesalat og oliven',
              en: 'Seared tuna, potato, quail egg, red onion, romaine hearts and olives',
            },
            price: 180,
          },
        ],
      },
    ],
  },
  {
    id: 'lunch-desserter',
    label: { da: 'Desserter', en: 'Desserts' },
    sections: [
      {
        id: 'lunch-desserter-liste',
        items: [
          {
            name: {
              da: 'Sandkage — med limemousse og krydret mango',
              en: 'Sand cake — with lime mousse and spiced mango',
            },
            price: 95,
          },
          {
            name: {
              da: 'Ølkage — med kardemommecreme og appelsin',
              en: 'Beer cake — with cardamom cream and orange',
            },
            price: 95,
          },
          {
            name: {
              da: 'Affogato — med baileys is, nougatine og espresso',
              en: 'Affogato — with Baileys ice cream, nougatine and espresso',
            },
            price: 95,
          },
          {
            name: {
              da: 'Æblekompot — med bagt havre, hvid chokoladeskum og ingefærtuile',
              en: 'Apple compote — with baked oats, white-chocolate foam and ginger tuile',
            },
            price: 95,
          },
          {
            name: {
              da: 'Ostetallerken — 3 slags oste med kompot, syltede nødder og knækbrød',
              en: 'Cheese plate — three cheeses with compote, pickled nuts and crispbread',
            },
            price: 95,
          },
        ],
      },
    ],
  },
  {
    id: 'lunch-kaffe',
    label: { da: 'Kaffe og te', en: 'Coffee and tea' },
    sections: [
      {
        id: 'lunch-kaffe-liste',
        items: [
          { name: { da: 'Alm. kaffe', en: 'Regular coffee' }, price: 25 },
          { name: { da: 'Cafe latté', en: 'Café latte' }, price: 45 },
          { name: { da: 'Cappuccino', en: 'Cappuccino' }, price: 45 },
          { name: { da: 'Americano', en: 'Americano' }, price: 35 },
          { name: { da: 'Espresso', en: 'Espresso' }, price: 30 },
          { name: { da: 'Dobbelt espresso', en: 'Double espresso' }, price: 35 },
          { name: { da: 'Flat white', en: 'Flat white' }, price: 45 },
          { name: { da: 'Cortado', en: 'Cortado' }, price: 40 },
          { name: { da: 'The fra A. C. Perch', en: 'Tea from A. C. Perch' }, price: 35 },
        ],
      },
    ],
  },
];


type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const page = getPage('lunch', locale);
  return buildPageMetadata({ page, locale, path: '/lunch' });
}

export default async function LunchPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const page = getPage('lunch', locale);
  const quotes = getLunchQuotes();
  const t = await getTranslations('lunch');
  const tm = await getTranslations('nav');
  const tMenu = await getTranslations('menu');
  const currency = tMenu('currency');

  return (
    <article className="mx-auto max-w-3xl px-6 py-24">
      <div className="h-px w-16 bg-ember" />
      {page.eyebrow ? (
        <p className="mt-6 font-mono text-xs uppercase tracking-[0.3em] text-ember/80">
          {page.eyebrow}
        </p>
      ) : null}
      <h1 className="mt-4 font-display text-5xl tracking-tight md:text-6xl">{page.title}</h1>
      {page.description ? <p className="mt-6 text-lg text-ink/80">{page.description}</p> : null}

      <TrackedLink
        event="lunch_menu_pdf_download"
        href="/uploads/ms3ezuz2-frokost-kort.pdf"
        download
        target="_blank"
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
        src="/images/VIC00086.webp"
        alt={
          locale === 'da'
            ? 'Gæster spiser frokost i solen foran Sankt Knuds i Ryesgade, Aarhus C'
            : 'Guests having lunch in the sun outside Sankt Knuds on Ryesgade, central Aarhus'
        }
        aspect="aspect-[16/9]"
        sizes="(min-width: 768px) 48rem, 100vw"
        position="50% 55%"
        priority
        className="mt-12"
      />

      <div
        className="prose prose-invert mt-16 max-w-none"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: trusted repo-sourced content
        dangerouslySetInnerHTML={{ __html: page.body }}
      />

      <div className="mt-16 space-y-24" id="lunch-menu">
        {lunchMenuChapters.map((chapter) => (
          <div key={chapter.id} id={chapter.id} className="scroll-mt-28">
            <div className="border-b border-ink/15 pb-4">
              <h2 className="font-display text-3xl tracking-tight md:text-4xl">
                {chapter.label[locale]}
              </h2>
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

        <p className="mt-8 text-sm text-ink/50">{tMenu('allergens')}</p>
      </div>

      {quotes.length > 0 ? (
        <section className="mt-16" aria-labelledby="lunch-quotes">
          <h2
            id="lunch-quotes"
            className="font-mono text-xs uppercase tracking-[0.3em] text-ember/80"
          >
            {t('quotesTitle')}
          </h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {quotes.map((quote) => (
              <ReviewCard key={quote.author} quote={quote} />
            ))}
          </div>
        </section>
      ) : null}

      <div className="mt-16 flex flex-wrap items-center gap-6 border-t border-ink/10 pt-8">
        <BookingButton />
        <Link
          href={routes.menu}
          className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-ember transition-colors hover:text-ink"
        >
          {tm('menu')}
          <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </Link>
        <Link
          href={routes.visit}
          className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-ember transition-colors hover:text-ink"
        >
          {tm('visit')}
          <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>
    </article>
  );
}
