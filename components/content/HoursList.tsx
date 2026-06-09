import { useTranslations } from 'next-intl';
import { hours } from '#content';
import type { Locale } from '@/i18n/routing';
import { cn } from '@/lib/cn';

type Day = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';

function dayRange(days: Day[], label: (d: Day) => string): string {
  if (days.length === 1) return label(days[0] as Day);
  return `${label(days[0] as Day)}–${label(days[days.length - 1] as Day)}`;
}

export function HoursList({ locale, className }: { locale: Locale; className?: string }) {
  const t = useTranslations('days');
  const label = (d: Day) => t(d.toLowerCase());

  return (
    <div className={cn('font-mono text-sm', className)}>
      {hours.services.map((service) => (
        <section key={service.name.en} className="mt-6 first:mt-0">
          <h3 className="text-xs uppercase tracking-[0.2em] text-ember/80">
            {service.name[locale]}
          </h3>
          <dl className="mt-2 grid grid-cols-[auto_1fr] gap-x-6 gap-y-2">
            {service.schedule.map((row) => (
              <div key={row.days.join('-')} className="contents">
                <dt className="text-parchment/60">{dayRange(row.days as Day[], label)}</dt>
                <dd className="tabular-nums text-parchment">
                  {row.ranges.map((r) => `${r.opens} – ${r.closes}`).join(', ')}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      ))}
      {hours.notes?.[locale] ? (
        <p className="mt-4 text-xs text-parchment/50">{hours.notes[locale]}</p>
      ) : null}
    </div>
  );
}
