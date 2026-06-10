import { useTranslations } from 'next-intl';
import { cn } from '@/lib/cn';

export function FooterMarque({ className }: { className?: string }) {
  const t = useTranslations('values');
  const values = [t('history'), t('quality'), t('craft'), t('closeness'), t('goodTimes')];

  return (
    <div
      className={cn(
        'flex flex-wrap items-center justify-center gap-x-6 gap-y-2 border-y border-ink/10 py-6 text-[0.6875rem] uppercase tracking-[0.3em] text-stone',
        className,
      )}
    >
      {values.map((value, i) => (
        <span key={value} className="flex items-center gap-6">
          <span>{value}</span>
          {i < values.length - 1 ? (
            <span aria-hidden="true" className="text-ink/25">
              ·
            </span>
          ) : null}
        </span>
      ))}
    </div>
  );
}
