import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { TastingGroups } from '@/components/content/TastingGroups';
import { Link } from '@/i18n/navigation';
import { type Locale, routes } from '@/i18n/routing';
import { getTasting } from '@/lib/content';

export function MenuTease({ locale }: { locale: Locale }) {
  const t = useTranslations('tasting');
  const tasting = getTasting('menu', locale);
  if (!tasting) return null;

  return (
    <section className="border-t border-ink/10 bg-bone">
      <div className="mx-auto max-w-6xl px-6 pt-24 md:px-10 md:pt-32 lg:px-16">
        <div className="max-w-2xl">
          {tasting.eyebrow ? (
            <p className="text-xs uppercase tracking-[0.3em] text-stone">{tasting.eyebrow}</p>
          ) : null}
          <h2 className="mt-5 font-display text-3xl leading-[1.05] tracking-tight text-ink md:text-4xl lg:text-5xl">
            {tasting.title}
          </h2>
          {tasting.description ? (
            <p className="mt-6 text-lg leading-relaxed text-ink-soft">{tasting.description}</p>
          ) : null}
        </div>
      </div>

      {/* One full-bleed photograph of the plate — quiet and confident */}
      <div className="relative mt-14 aspect-[4/3] md:mt-20 md:aspect-video">
        <Image
          src="/images/VIC09823.webp"
          alt={
            locale === 'da'
              ? 'Frisk pasta med spanske skinke og en spritz ved bordet'
              : 'Fresh pasta with cured ham and a spritz at the table'
          }
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      <div className="mx-auto max-w-6xl px-6 pb-24 md:px-10 md:pb-32 lg:px-16">
        <TastingGroups groups={tasting.groups} className="mt-16 md:mt-24" />

        <div className="mt-8 flex flex-col gap-6 border-t border-ink/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          {tasting.note ? <p className="max-w-md text-sm text-ink/55">{tasting.note}</p> : <span />}
          <Link
            href={routes.menu}
            className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-ember transition-colors hover:text-ink"
          >
            {t('viewMenu')}
            <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
