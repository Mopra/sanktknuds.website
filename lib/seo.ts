import type { Metadata } from 'next';
import { getPathname } from '@/i18n/navigation';
import { type AppPathname, type Locale, routing } from '@/i18n/routing';
import type { ContentPage, FoodChapter } from './content';

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
  const languages: Record<string, string> = Object.fromEntries(
    routing.locales.map((l) => [l, `${base}${getPathname({ href: path, locale: l })}`]),
  );
  // x-default points at the primary (Danish) market for unmatched locales.
  languages['x-default'] = `${base}${getPathname({ href: path, locale: routing.defaultLocale })}`;

  // Display title (page.title) drives the on-page H1; seoTitle, when set, drives the
  // browser/search <title> with the location + brand keyword pattern.
  const title = page.seoTitle ?? page.title;

  return {
    metadataBase: new URL(base),
    title,
    description: page.description,
    alternates: {
      canonical,
      languages,
    },
    openGraph: {
      title,
      description: page.description,
      url: canonical,
      siteName: 'Sankt Knuds Brasseri & Bar',
      locale: locale === 'da' ? 'da_DK' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: page.description,
    },
  };
}

type SiteSettings = {
  name: string;
  foundedYear: number;
  address: {
    streetAddress: string;
    addressDetail?: string;
    locality: string;
    postalCode: string;
    country: string;
    region?: string;
  };
  cvr?: string;
  geo?: { latitude: number; longitude: number };
  phone: string;
  email: string;
  bookingUrl: string;
  social: { instagram?: string; facebook?: string };
  tagline: { da: string; en: string };
};

type Weekday = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';

type HoursSettings = {
  services: Array<{
    name: { da: string; en: string };
    schedule: Array<{
      days: Weekday[];
      ranges: Array<{ opens: string; closes: string }>;
    }>;
  }>;
  notes?: { da: string; en: string };
};

const SCHEMA_DAYS: Record<Weekday, string> = {
  Mon: 'Monday',
  Tue: 'Tuesday',
  Wed: 'Wednesday',
  Thu: 'Thursday',
  Fri: 'Friday',
  Sat: 'Saturday',
  Sun: 'Sunday',
};

// The venue's opening hours = when guests can be in the room (the "Restaurant & bar"
// service), not the narrower kitchen window. Closed days are simply omitted.
function buildOpeningHoursSpecification(hours: HoursSettings) {
  const service =
    hours.services.find((s) => /bar/i.test(s.name.en)) ?? hours.services[hours.services.length - 1];
  if (!service) return [];

  return service.schedule.flatMap((row) =>
    row.ranges.map((range) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: row.days.map((day) => SCHEMA_DAYS[day]),
      opens: range.opens,
      closes: range.closes,
    })),
  );
}

function buildPostalAddress(address: SiteSettings['address']) {
  return {
    '@type': 'PostalAddress',
    streetAddress: address.addressDetail
      ? `${address.streetAddress}, ${address.addressDetail}`
      : address.streetAddress,
    addressLocality: address.locality,
    postalCode: address.postalCode,
    addressCountry: address.country,
    ...(address.region ? { addressRegion: address.region } : {}),
  };
}

export function buildRestaurantSchema(site: SiteSettings, hours: HoursSettings, locale: Locale) {
  const base = getSiteUrl();
  const sameAs = [site.social.instagram, site.social.facebook].filter(Boolean);
  const openingHoursSpecification = buildOpeningHoursSpecification(hours);
  const menuUrl = `${base}${getPathname({ href: '/menu', locale })}`;
  const mapQuery = encodeURIComponent(
    `${site.name}, ${site.address.streetAddress}, ${site.address.postalCode} ${site.address.locality}`,
  );

  return {
    '@context': 'https://schema.org',
    // A brasserie + bar is both — multi-typing is valid and both share these properties.
    '@type': ['Restaurant', 'BarOrPub'],
    // Stable @id reconciles the da/en renders into one entity (and links the Event node).
    '@id': `${base}/#restaurant`,
    name: site.name,
    description: site.tagline[locale],
    url: base,
    image: [`${base}/hero-bar-marble.jpg`, `${base}/opengraph-image`],
    telephone: site.phone,
    email: site.email,
    foundingDate: `${site.foundedYear}`,
    ...(site.cvr ? { taxID: site.cvr } : {}),
    address: buildPostalAddress(site.address),
    ...(site.geo
      ? {
          geo: {
            '@type': 'GeoCoordinates',
            latitude: site.geo.latitude,
            longitude: site.geo.longitude,
          },
        }
      : {}),
    hasMap: `https://www.google.com/maps/search/?api=1&query=${mapQuery}`,
    areaServed: { '@type': 'City', name: 'Aarhus' },
    ...(sameAs.length > 0 ? { sameAs } : {}),
    servesCuisine: ['Danish', 'European'],
    priceRange: '$$',
    hasMenu: menuUrl,
    menu: menuUrl,
    acceptsReservations: true,
    ...(openingHoursSpecification.length > 0 ? { openingHoursSpecification } : {}),
    potentialAction: {
      '@type': 'ReserveAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: site.bookingUrl,
        inLanguage: locale === 'da' ? 'da-DK' : 'en-US',
        actionPlatform: [
          'https://schema.org/DesktopWebPlatform',
          'https://schema.org/IOSPlatform',
          'https://schema.org/AndroidPlatform',
        ],
      },
      result: {
        '@type': 'FoodEstablishmentReservation',
        name: locale === 'da' ? 'Book bord' : 'Book a table',
      },
    },
  };
}

/**
 * Full Menu → MenuSection → MenuItem graph, generated from the same velite food
 * card the page renders. `@id` matches the Restaurant's `hasMenu` URL, so the two
 * nodes reconcile into one entity rather than competing.
 *
 * Prices are DKK numbers in the content; schema.org wants a bare number plus a
 * currency, which is exactly what `Offer` takes.
 */
export function buildMenuSchema(chapters: FoodChapter[], locale: Locale) {
  const base = getSiteUrl();
  const menuUrl = `${base}${getPathname({ href: '/menu', locale })}`;

  const hasMenuSection = chapters.map((chapter) => ({
    '@type': 'MenuSection',
    name: chapter.label[locale],
    ...(chapter.note ? { description: chapter.note[locale] } : {}),
    hasMenuSection: chapter.sections.map((section) => ({
      '@type': 'MenuSection',
      ...(section.label ? { name: section.label[locale] } : {}),
      ...(section.note ? { description: section.note[locale] } : {}),
      hasMenuItem: section.items.map((item) => ({
        '@type': 'MenuItem',
        name: item.name[locale],
        ...(item.description ? { description: item.description[locale] } : {}),
        ...(item.price !== undefined
          ? {
              offers: {
                '@type': 'Offer',
                price: item.price,
                priceCurrency: 'DKK',
              },
            }
          : {}),
      })),
    })),
  }));

  return {
    '@context': 'https://schema.org',
    '@type': 'Menu',
    '@id': menuUrl,
    name: locale === 'da' ? 'Aften Menu' : 'Menu',
    url: menuUrl,
    inLanguage: locale === 'da' ? 'da-DK' : 'en-US',
    // Ties the menu back to the venue declared in the root layout.
    isPartOf: { '@id': `${base}/#restaurant` },
    hasMenuSection,
  };
}
