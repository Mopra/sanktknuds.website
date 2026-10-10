import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { site } from '#content';
import { BookingButton } from '@/components/ui/BookingButton';
import { PhoneLink } from '@/components/ui/PhoneLink';
import type { Locale } from '@/i18n/routing';
import { getPage } from '@/lib/content';
import { buildPageMetadata } from '@/lib/seo';

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
  const t = await getTranslations('booking');

  return (
    <article className="mx-auto max-w-2xl px-6 py-24 text-center">
      <h1 className="font-display text-5xl tracking-tight md:text-6xl">{page.title}</h1>
      {page.description ? <p className="mt-6 text-lg text-ink/80">{page.description}</p> : null}
      <div className="mt-12 flex flex-col items-center gap-6">
        <BookingButton size="lg" />
        <PhoneLink className="group font-mono text-xs uppercase tracking-[0.15em] text-ink/60 transition-colors hover:text-ember">
          {t('call')}{' '}
          <span className="whitespace-nowrap text-sm tracking-normal text-ink tabular-nums transition-colors group-hover:text-ember">
            {site.phone}
          </span>
        </PhoneLink>
      </div>
      <div
        className="prose prose-invert mx-auto mt-16 max-w-none"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: trusted repo-sourced content
        dangerouslySetInnerHTML={{ __html: page.body }}
      />
    </article>
  );
}
