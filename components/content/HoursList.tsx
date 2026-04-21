import { useTranslations } from 'next-intl';
import { hours } from '#content';
import { cn } from '@/lib/cn';
import type { Locale } from '@/i18n/routing';

type Day = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';

function dayRange(days: Day[], label: (d: Day) => string): string {
  if (days.length === 1) return label(days[0] as Day);
  return `${label(days[0] as Day)}–${label(days[days.length - 1] as Day)}`;
}

export function HoursList({ locale, className }: { locale: Locale; className?: string }) {
  const t = useTranslations('days');
  const label = (d: Day) => t(d.toLowerCase());

  return (
    <dl className={cn('grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 font-mono text-sm', className)}>
      {hours.schedule.map((row, i) => (
        <div key={i} className="contents">
          <dt className="text-parchment/60">{dayRange(row.days as Day[], label)}</dt>
          <dd className="tabular-nums text-parchment">
            {row.opens} – {row.closes}
          </dd>
        </div>
      ))}
      {hours.notes?.[locale] ? (
        <p className="col-span-2 mt-3 text-xs text-parchment/50">{hours.notes[locale]}</p>
      ) : null}
    </dl>
  );
}
