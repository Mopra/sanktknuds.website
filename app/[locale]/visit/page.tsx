import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { site } from '#content';
import { HoursList } from '@/components/content/HoursList';
import { Figure } from '@/components/ui/Figure';
import type { Locale } from '@/i18n/routing';
import { getPage } from '@/lib/content';
import { buildPageMetadata } from '@/lib/seo';

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const page = getPage('visit', locale);
  return buildPageMetadata({ page, locale, path: '/visit' });
}

export default async function VisitPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const page = getPage('visit', locale);

  const destination = `${site.address.streetAddress}, ${site.address.postalCode} ${site.address.locality}`;
  const query = encodeURIComponent(destination);
  const latLng = site.geo ? `${site.geo.latitude},${site.geo.longitude}` : '';
  // iPhone users default to Apple Maps; offer both so directions are one tap away.
  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${query}`;
  const appleMapsUrl = `https://maps.apple.com/?daddr=${query}${latLng ? `&ll=${latLng}` : ''}`;
  const mapEmbedUrl = `https://maps.google.com/maps?q=${query}&z=16&output=embed`;

  const directionsLink =
    'inline-flex items-center justify-center border border-ember/50 px-5 py-3 font-mono text-xs uppercase tracking-[0.25em] text-ember transition-colors hover:border-ember hover:bg-ember hover:text-bone';

  return (
    <article className="mx-auto max-w-3xl px-6 py-24">
      <h1 className="font-display text-5xl tracking-tight md:text-6xl">{page.title}</h1>
      {page.description ? (
        <p className="mt-6 text-lg text-ink/80">{page.description}</p>
      ) : null}

      <Figure
        src="/images/nick-hillier-xBXF9pr6LQo-unsplash.jpg"
        alt={
          locale === 'da'
            ? 'Spisesalen hos Sankt Knuds Brasseri & Bar, Ryesgade 29, Aarhus C'
            : 'The dining room at Sankt Knuds Brasseri & Bar in central Aarhus'
        }
        aspect="aspect-[16/9]"
        sizes="(min-width: 768px) 48rem, 100vw"
        priority
        className="mt-12"
      />

      <div className="mt-16 grid gap-16 md:grid-cols-2">
        <section>
          <h2 className="font-mono text-xs uppercase tracking-[0.3em] text-ember/80">
            {locale === 'da' ? 'Adresse' : 'Address'}
          </h2>
          <address className="mt-4 not-italic text-lg leading-relaxed">
            {site.address.streetAddress}
            {site.address.addressDetail ? `, ${site.address.addressDetail}` : ''}
            <br />
            {site.address.postalCode} {site.address.locality}
            <br />
            <a href={`tel:${site.phone.replace(/\s/g, '')}`} className="hover:text-ember">
              {site.phone}
            </a>
            <br />
            <a href={`mailto:${site.email}`} className="hover:text-ember">
              {site.email}
            </a>
            {site.cvr ? (
              <>
                <br />
                <span className="text-ink/50">CVR {site.cvr}</span>
              </>
            ) : null}
          </address>

          <p className="mt-8 font-mono text-xs uppercase tracking-[0.3em] text-ember/80">
            {locale === 'da' ? 'Rutevejledning' : 'Directions'}
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={directionsLink}
            >
              Google Maps
            </a>
            <a
              href={appleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={directionsLink}
            >
              Apple Maps
            </a>
          </div>
        </section>

        <section>
          <h2 className="font-mono text-xs uppercase tracking-[0.3em] text-ember/80">
            {locale === 'da' ? 'Åbningstider' : 'Hours'}
          </h2>
          <HoursList locale={locale} className="mt-4" />
        </section>
      </div>

      <div
        className="prose prose-invert mt-16 max-w-none"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: trusted repo-sourced content
        dangerouslySetInnerHTML={{ __html: page.body }}
      />

      {/* Below-the-fold, lazy-loaded so the map never blocks the page's LCP. */}
      <div className="mt-16 overflow-hidden border border-ink/10">
        <iframe
          title={
            locale === 'da'
              ? 'Kort til Sankt Knuds Brasseri & Bar, Ryesgade 29, Aarhus C'
              : 'Map to Sankt Knuds Brasseri & Bar, Ryesgade 29, Aarhus C'
          }
          src={mapEmbedUrl}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="block h-[320px] w-full border-0 grayscale-[0.2] md:h-[420px]"
        />
      </div>
    </article>
  );
}
