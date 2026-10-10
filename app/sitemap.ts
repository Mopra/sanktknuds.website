import type { MetadataRoute } from 'next';
import { getPathname } from '@/i18n/navigation';
import { type AppPathname, hubs, routing } from '@/i18n/routing';
import { getLandingSlugs, type LandingHub } from '@/lib/content';
import { getSiteUrl } from '@/lib/seo';

type Href = AppPathname | { pathname: AppPathname; params: { slug: string } };

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const pathnames = Object.keys(routing.pathnames) as AppPathname[];

  // Static pages, plus one entry per landing page under each hub.
  const hrefs: Href[] = [
    ...pathnames.filter((href) => !href.includes('[')),
    ...Object.entries(hubs).flatMap(([hub, { child }]) =>
      getLandingSlugs(hub as LandingHub).map((slug) => ({ pathname: child, params: { slug } })),
    ),
  ];

  return hrefs.map((href) => {
    // biome-ignore lint/suspicious/noExplicitAny: href is one of the typed app pathnames
    const url = (locale: string) => `${base}${getPathname({ href: href as any, locale })}`;
    const languages = Object.fromEntries(routing.locales.map((locale) => [locale, url(locale)]));
    return {
      url: url(routing.defaultLocale),
      alternates: { languages },
      changeFrequency: 'monthly',
      priority: href === '/' ? 1.0 : 0.7,
    };
  });
}
