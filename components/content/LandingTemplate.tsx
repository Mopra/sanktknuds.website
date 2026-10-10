import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ReviewCard } from '@/components/content/GoogleReviews';
import { HubLinks } from '@/components/content/HubLinks';
import { BackLink } from '@/components/ui/BackLink';
import { BookingCta } from '@/components/ui/BookingCta';
import { Figure } from '@/components/ui/Figure';
import { InquiryCta } from '@/components/ui/InquiryCta';
import { getPathname } from '@/i18n/navigation';
import { hubs, type Locale, routing } from '@/i18n/routing';
import { getLanding, getLandingSlugs, getQuotesMatching, type LandingHub } from '@/lib/content';
import { buildPageMetadata, getSiteUrl } from '@/lib/seo';

export type LandingProps = { params: Promise<{ locale: Locale; slug: string }> };

// The hub's own label in the nav messages, used for the breadcrumb and back link.
const hubNavKey = { events: 'events', menu: 'menu', visit: 'visit' } as const;

export function landingStaticParams(hub: LandingHub) {
  return routing.locales.flatMap((locale) =>
    getLandingSlugs(hub).map((slug) => ({ locale, slug })),
  );
}

export async function landingMetadata(
  hub: LandingHub,
  { params }: LandingProps,
): Promise<Metadata> {
  const { locale, slug } = await params;
  const page = getLanding(hub, slug, locale);
  if (!page) return {};
  return buildPageMetadata({ page, locale, path: { pathname: hubs[hub].child, params: { slug } } });
}

export async function LandingTemplate({ hub, params }: { hub: LandingHub } & LandingProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const page = getLanding(hub, slug, locale);
  if (!page) notFound();

  const nav = await getTranslations('nav');
  const quotes = page.quoteMatch ? getQuotesMatching(page.quoteMatch) : [];
  const hubLabel = nav(hubNavKey[hub]);

  const base = getSiteUrl();
  const breadcrumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { name: 'Sankt Knuds', href: '/' as const },
      { name: hubLabel, href: hubs[hub].href },
      { name: page.title, href: { pathname: hubs[hub].child, params: { slug } } },
    ].map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.name,
      // biome-ignore lint/suspicious/noExplicitAny: href is one of the typed app pathnames
      item: `${base}${getPathname({ href: crumb.href as any, locale })}`,
    })),
  };

  return (
    <article className="mx-auto max-w-3xl px-6 py-24">
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD needs raw injection
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <BackLink href={hubs[hub].href} label={hubLabel} />

      <div className="mt-10 h-px w-16 bg-ember" />
      {page.eyebrow ? (
        <p className="mt-6 font-mono text-xs uppercase tracking-[0.3em] text-ember/90">
          {page.eyebrow}
        </p>
      ) : null}
      <h1 className="mt-4 font-display text-5xl tracking-tight md:text-6xl">{page.title}</h1>
      <p className="mt-6 text-lg text-ink/80">{page.description}</p>

      {page.cta === 'inquiry' ? <InquiryCta className="mt-8" /> : <BookingCta className="mt-8" />}

      {page.image ? (
        <Figure
          src={page.image}
          alt={page.imageAlt ?? ''}
          aspect="aspect-[16/9]"
          sizes="(min-width: 768px) 48rem, 100vw"
          priority
          className="mt-12"
        />
      ) : null}

      <div
        className="prose prose-invert mt-16 max-w-none"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: trusted repo-sourced content
        dangerouslySetInnerHTML={{ __html: page.body }}
      />

      {quotes.length > 0 ? (
        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {quotes.map((quote) => (
            <ReviewCard key={quote.author} quote={quote} />
          ))}
        </div>
      ) : null}

      <div className="mt-16 border-t border-ink/10 pt-8">
        {page.cta === 'inquiry' ? <InquiryCta /> : <BookingCta />}
      </div>

      <HubLinks hub={hub} locale={locale} exclude={slug} className="mt-16" />
    </article>
  );
}
