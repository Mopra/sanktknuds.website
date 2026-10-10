import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { HubLinks } from '@/components/content/HubLinks';
import { InquiryCta } from '@/components/ui/InquiryCta';
import { type Locale, routes } from '@/i18n/routing';
import { getPage } from '@/lib/content';
import { buildPageMetadata } from '@/lib/seo';

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const page = getPage('events', locale);
  return buildPageMetadata({ page, locale, path: '/events' });
}

export default async function EventsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const page = getPage('events', locale);
  const christmas = getPage('christmas-lunch', locale);
  const nav = await getTranslations('nav');

  return (
    <article className="mx-auto max-w-2xl px-6 py-24">
      <h1 className="font-display text-5xl tracking-tight md:text-6xl">{page.title}</h1>
      {page.description ? <p className="mt-6 text-lg text-ink/80">{page.description}</p> : null}

      <InquiryCta className="mt-8" />
      <div
        className="prose prose-invert mt-12 max-w-none"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: trusted repo-sourced content
        dangerouslySetInnerHTML={{ __html: page.body }}
      />

      <HubLinks
        hub="events"
        locale={locale}
        extra={[
          {
            key: 'christmas-lunch',
            href: routes.christmasLunch,
            eyebrow: nav('christmasLunch'),
            title: christmas.title,
            teaser: christmas.description ?? '',
          },
        ]}
        className="mt-16"
      />
    </article>
  );
}
