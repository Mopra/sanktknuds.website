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
    <section className="border-t border-stone/15 bg-ink-soft">
      <div className="mx-auto max-w-6xl px-6 pt-24 md:px-10 md:pt-32 lg:px-16">
        <div className="max-w-2xl">
          <div className="h-px w-16 bg-ember" />
          {tasting.eyebrow ? (
            <p className="mt-5 font-mono text-xs uppercase tracking-[0.35em] text-ember/80">
              {tasting.eyebrow}
            </p>
          ) : null}
          <h2 className="mt-5 font-display text-3xl leading-[1.05] tracking-tight text-parchment md:text-4xl lg:text-5xl">
            {tasting.title}
          </h2>
          {tasting.description ? (
            <p className="mt-6 text-lg leading-relaxed text-parchment/70">{tasting.description}</p>
          ) : null}
        </div>
      </div>

      {/* Full-bleed glimpse of the plate — two panels, flush edge to edge */}
      <div className="mt-14 grid grid-cols-1 md:mt-20 md:grid-cols-2">
        <div className="relative aspect-[4/3] md:aspect-auto md:h-[30rem] lg:h-[38rem]">
          <Image
            src="/images/edward-howell-R8HoXig87p8-unsplash.jpg"
            alt={locale === 'da' ? 'Anretning fra køkkenet' : 'A plated dish from the kitchen'}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="relative aspect-[4/3] md:aspect-auto md:h-[30rem] lg:h-[38rem]">
          <Image
            src="/images/edward-howell-vvUy1hWVYEA-unsplash.jpg"
            alt={locale === 'da' ? 'Årstidens råvarer på tallerkenen' : 'Seasonal produce, plated'}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 pb-24 md:px-10 md:pb-32 lg:px-16">
        <TastingGroups groups={tasting.groups} className="mt-16 md:mt-24" />

        <div className="mt-8 flex flex-col gap-6 border-t border-stone/15 pt-8 sm:flex-row sm:items-center sm:justify-between">
          {tasting.note ? (
            <p className="max-w-md text-sm text-parchment/50">{tasting.note}</p>
          ) : (
            <span />
          )}
          <Link
            href={routes.menu}
            className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-ember transition-colors hover:text-parchment"
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
