import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { getPage } from '@/lib/content';
import { buildPageMetadata } from '@/lib/seo';
import { HoursList } from '@/components/content/HoursList';
import { site } from '#content';
import type { Locale } from '@/i18n/routing';

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

  return (
    <article className="mx-auto max-w-3xl px-6 py-24">
      <h1 className="font-display text-5xl tracking-tight md:text-6xl">{page.title}</h1>
      {page.description ? (
        <p className="mt-6 text-lg text-parchment/80">{page.description}</p>
      ) : null}

      <div className="mt-16 grid gap-16 md:grid-cols-2">
        <section>
          <h2 className="font-mono text-xs uppercase tracking-[0.3em] text-ember/80">
            {locale === 'da' ? 'Adresse' : 'Address'}
          </h2>
          <address className="mt-4 not-italic text-lg leading-relaxed">
            {site.address.streetAddress}
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
          </address>
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
    </article>
  );
}
