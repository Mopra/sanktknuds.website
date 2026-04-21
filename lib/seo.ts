import type { Metadata } from 'next';
import { getPathname } from '@/i18n/navigation';
import { routing, type AppPathname, type Locale } from '@/i18n/routing';
import type { ContentPage } from './content';

export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://sanktknuds.dk';
  return raw.replace(/\/$/, '');
}

export function buildPageMetadata({
  page,
  locale,
  path,
}: {
  page: ContentPage;
  locale: Locale;
  path: AppPathname;
}): Metadata {
  const base = getSiteUrl();
  const canonical = `${base}${getPathname({ href: path, locale })}`;
  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, `${base}${getPathname({ href: path, locale: l })}`]),
  );

  return {
    metadataBase: new URL(base),
    title: page.title,
    description: page.description,
    alternates: {
      canonical,
      languages,
    },
    openGraph: {
      title: page.title,
      description: page.description,
      url: canonical,
      siteName: 'Sankt Knuds Gastropub',
      locale: locale === 'da' ? 'da_DK' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: page.title,
      description: page.description,
    },
  };
}

type SiteSettings = {
  name: string;
  foundedYear: number;
  address: {
    streetAddress: string;
    locality: string;
    postalCode: string;
    country: string;
    region?: string;
  };
  geo?: { latitude: number; longitude: number };
  phone: string;
  email: string;
  social: { instagram?: string; facebook?: string };
  tagline: { da: string; en: string };
};

export function buildRestaurantSchema(site: SiteSettings, locale: Locale) {
  const base = getSiteUrl();
  const sameAs = [site.social.instagram, site.social.facebook].filter(Boolean);

  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: site.name,
    description: site.tagline[locale],
    url: `${base}/${locale}`,
    telephone: site.phone,
    email: site.email,
    foundingDate: `${site.foundedYear}`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.streetAddress,
      addressLocality: site.address.locality,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
      ...(site.address.region ? { addressRegion: site.address.region } : {}),
    },
    ...(site.geo
      ? {
          geo: {
            '@type': 'GeoCoordinates',
            latitude: site.geo.latitude,
            longitude: site.geo.longitude,
          },
        }
      : {}),
    ...(sameAs.length > 0 ? { sameAs } : {}),
    servesCuisine: ['Danish', 'European'],
    priceRange: '$$',
    acceptsReservations: true,
  };
}
