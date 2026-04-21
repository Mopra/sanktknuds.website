import { useTranslations } from 'next-intl';
import { cn } from '@/lib/cn';

export function FooterMarque({ className }: { className?: string }) {
  const t = useTranslations('values');
  const values = [t('history'), t('quality'), t('craft'), t('closeness'), t('goodTimes')];

  return (
    <div
      className={cn(
        'flex flex-wrap items-center justify-center gap-x-6 gap-y-2 border-y border-stone/15 py-6 font-mono text-[0.6875rem] uppercase tracking-[0.35em] text-parchment/60',
        className,
      )}
    >
      {values.map((value, i) => (
        <span key={value} className="flex items-center gap-6">
          <span>{value}</span>
          {i < values.length - 1 ? (
            <span aria-hidden="true" className="text-stone/40">
              ·
            </span>
          ) : null}
        </span>
      ))}
    </div>
  );
}
