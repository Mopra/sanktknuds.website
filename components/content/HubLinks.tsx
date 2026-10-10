import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { type AppPathname, hubs, type Locale } from '@/i18n/routing';
import { cn } from '@/lib/cn';
import { getLandings, type LandingHub } from '@/lib/content';

type Card = {
  key: string;
  href: AppPathname | { pathname: AppPathname; params: { slug: string } };
  eyebrow?: string;
  title: string;
  teaser: string;
};

/**
 * Cards linking a hub page to its landing pages. This is how the long-tail pages
 * get found (by guests and by Google) without adding anything to the header nav.
 */
export async function HubLinks({
  hub,
  locale,
  exclude,
  extra = [],
  className,
}: {
  hub: LandingHub;
  locale: Locale;
  /** Slug to leave out, so a landing page doesn't link to itself. */
  exclude?: string;
  /** Cards for pages outside the landing collection, e.g. the Christmas lunch. */
  extra?: Card[];
  className?: string;
}) {
  const t = await getTranslations('landing');
  const cards: Card[] = [
    ...extra,
    ...getLandings(locale, hub)
      .filter((page) => page.slug !== exclude)
      .map((page) => ({
        key: page.slug,
        href: { pathname: hubs[hub].child, params: { slug: page.slug } },
        eyebrow: page.eyebrow,
        title: page.title,
        teaser: page.teaser,
      })),
  ];

  if (cards.length === 0) return null;

  return (
    <section className={cn('border-t border-ink/10 pt-10', className)} aria-label={t('related')}>
      <h2 className="font-mono text-xs uppercase tracking-[0.3em] text-ember/90">{t('related')}</h2>
      <ul className="mt-6 grid gap-4 md:grid-cols-2">
        {cards.map((card) => (
          <li key={card.key}>
            <Link
              // biome-ignore lint/suspicious/noExplicitAny: href is one of the typed app pathnames
              href={card.href as any}
              className="group flex h-full flex-col border border-ink/15 p-6 transition-colors hover:border-ember/60"
            >
              {card.eyebrow ? (
                <span className="font-mono text-[0.7rem] uppercase tracking-[0.25em] text-ink/65">
                  {card.eyebrow}
                </span>
              ) : null}
              <span className="mt-2 font-display text-2xl tracking-tight text-ink">
                {card.title}
              </span>
              <span className="mt-3 flex-1 text-sm leading-relaxed text-ink/70">{card.teaser}</span>
              <span
                aria-hidden="true"
                className="mt-4 text-ember transition-transform group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
