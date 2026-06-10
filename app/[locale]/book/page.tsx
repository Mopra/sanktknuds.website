import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { getPage } from '@/lib/content';
import { buildPageMetadata } from '@/lib/seo';
import { BookingButton } from '@/components/ui/BookingButton';
import type { Locale } from '@/i18n/routing';

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const page = getPage('book', locale);
  return buildPageMetadata({ page, locale, path: '/book' });
}

export default async function BookPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const page = getPage('book', locale);

  return (
    <article className="mx-auto max-w-2xl px-6 py-24 text-center">
      <h1 className="font-display text-5xl tracking-tight md:text-6xl">{page.title}</h1>
      {page.description ? (
        <p className="mt-6 text-lg text-ink/80">{page.description}</p>
      ) : null}
      <div className="mt-12 flex justify-center">
        <BookingButton size="lg" />
      </div>
      <div
        className="prose prose-invert mx-auto mt-16 max-w-none"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: trusted repo-sourced content
        dangerouslySetInnerHTML={{ __html: page.body }}
      />
    </article>
  );
}
