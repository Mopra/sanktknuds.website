import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { HubLinks } from '@/components/content/HubLinks';
import { BackLink } from '@/components/ui/BackLink';
import { InquiryCta } from '@/components/ui/InquiryCta';
import { type Locale, routes } from '@/i18n/routing';
import { getPage } from '@/lib/content';
import { buildPageMetadata } from '@/lib/seo';

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const page = getPage('christmas-lunch', locale);
  return buildPageMetadata({ page, locale, path: '/christmas-lunch' });
}

// Has its own route (it's in the header nav) but belongs to the Selskaber hub,
// so it is laid out like the landing pages under it.
export default async function ChristmasLunchPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const page = getPage('christmas-lunch', locale);
  const nav = await getTranslations('nav');

  return (
    <article className="mx-auto max-w-3xl px-6 py-24">
      <BackLink href={routes.events} label={nav('events')} />

      <div className="mt-10 h-px w-16 bg-ember" />
      {page.eyebrow ? (
        <p className="mt-6 font-mono text-xs uppercase tracking-[0.3em] text-ember/80">
          {page.eyebrow}
        </p>
      ) : null}
      <h1 className="mt-4 font-display text-5xl tracking-tight md:text-6xl">{page.title}</h1>
      {page.description ? <p className="mt-6 text-lg text-ink/80">{page.description}</p> : null}

      <InquiryCta className="mt-8" />

      <div
        className="prose prose-invert mt-16 max-w-none"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: trusted repo-sourced content
        dangerouslySetInnerHTML={{ __html: page.body }}
      />

      <div className="mt-16 border-t border-ink/10 pt-8">
        <InquiryCta />
      </div>

      <HubLinks hub="events" locale={locale} className="mt-16" />
    </article>
  );
}
