import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { getPage, getMenuSections } from '@/lib/content';
import { buildPageMetadata } from '@/lib/seo';
import type { Locale } from '@/i18n/routing';

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
  const sections = getMenuSections(locale);

  return (
    <article className="mx-auto max-w-3xl px-6 py-24">
      <h1 className="font-display text-5xl tracking-tight md:text-6xl">{page.title}</h1>
      {page.description ? (
        <p className="mt-6 text-lg text-parchment/80">{page.description}</p>
      ) : null}

      <div className="mt-16 space-y-20">
        {sections.map((section) => (
          <section key={section.slug}>
            <h2 className="font-display text-3xl tracking-tight">{section.title}</h2>
            {section.description ? (
              <p className="mt-2 text-parchment/70">{section.description}</p>
            ) : null}
            <ul className="mt-8 divide-y divide-stone/20">
              {section.items.map((item) => (
                <li key={item.name} className="flex items-baseline justify-between gap-6 py-5">
                  <div className="flex-1">
                    <h3 className="font-display text-xl">{item.name}</h3>
                    {item.description ? (
                      <p className="mt-1 text-sm text-parchment/70">{item.description}</p>
                    ) : null}
                  </div>
                  {item.price !== undefined ? (
                    <span className="font-mono text-sm tabular-nums text-ember">{item.price}</span>
                  ) : null}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </article>
  );
}
