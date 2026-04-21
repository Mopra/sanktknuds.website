import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { getPathname } from '@/i18n/navigation';
import { getSiteUrl } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const pathnames = Object.keys(routing.pathnames) as Array<keyof typeof routing.pathnames>;

  return pathnames.map((href) => {
    const languages = Object.fromEntries(
      routing.locales.map((locale) => [locale, `${base}${getPathname({ href, locale })}`]),
    );
    return {
      url: `${base}${getPathname({ href, locale: routing.defaultLocale })}`,
      alternates: { languages },
      changeFrequency: 'monthly',
      priority: href === '/' ? 1.0 : 0.7,
    };
  });
}
