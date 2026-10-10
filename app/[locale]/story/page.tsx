import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { BookingCta } from '@/components/ui/BookingCta';
import type { Locale } from '@/i18n/routing';
import { getPage } from '@/lib/content';
import { buildPageMetadata } from '@/lib/seo';

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const page = getPage('story', locale);
  return buildPageMetadata({ page, locale, path: '/story' });
}

export default async function StoryPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const page = getPage('story', locale);

  return (
    <article className="mx-auto max-w-2xl px-6 py-24">
      <h1 className="font-display text-5xl tracking-tight md:text-6xl">{page.title}</h1>
      <div
        className="prose prose-invert mt-12 max-w-none"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: trusted repo-sourced content
        dangerouslySetInnerHTML={{ __html: page.body }}
      />
      <BookingCta className="mt-16 border-t border-ink/10 pt-8" />
    </article>
  );
}
