import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { getPage } from '@/lib/content';
import { buildPageMetadata } from '@/lib/seo';
import type { Locale } from '@/i18n/routing';

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const page = getPage('home', locale);
  return buildPageMetadata({ page, locale, path: '/' });
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const page = getPage('home', locale);

  return (
    <article className="mx-auto max-w-3xl px-6 py-24">
      {page.eyebrow ? (
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-ember/80">{page.eyebrow}</p>
      ) : null}
      <h1 className="mt-4 font-display text-5xl leading-[1.05] tracking-tight md:text-7xl">
        {page.title}
      </h1>
      {page.description ? (
        <p className="mt-6 text-lg text-parchment/80">{page.description}</p>
      ) : null}
      <div
        className="prose prose-invert mt-12 max-w-none"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: trusted repo-sourced content
        dangerouslySetInnerHTML={{ __html: page.body }}
      />
    </article>
  );
}
