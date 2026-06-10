import { getLocale, getTranslations } from 'next-intl/server';
import { site } from '#content';
import { cn } from '@/lib/cn';

// Five-point star inscribed in a 24×24 box — drawn white over the Trustpilot squares.
const STAR = 'M12 3.2 14.5 9.3 21 9.8 16 14 17.6 20.4 12 16.9 6.4 20.4 8 14 3 9.8 9.5 9.3Z';

/** One Trustpilot square: green square + white star, filled left-to-right by `fill` (0–1). */
function Star({ fill, index }: { fill: number; index: number }) {
  const clamped = Math.max(0, Math.min(1, fill));
  const clipId = `tp-star-${index}`;

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6">
      <defs>
        <clipPath id={clipId}>
          <rect width="24" height="24" rx="3" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`}>
        <rect width="24" height="24" fill="#dcdce6" />
        <rect width={24 * clamped} height="24" fill="#00b67a" />
      </g>
      <path d={STAR} fill="#ffffff" />
    </svg>
  );
}

type TrustpilotStarsProps = {
  className?: string;
};

export async function TrustpilotStars({ className }: TrustpilotStarsProps) {
  const tp = site.trustpilot;
  if (!tp) return null;

  const t = await getTranslations('trustpilot');
  const locale = await getLocale();
  const scoreLabel = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(tp.score);

  return (
    <a
      href={tp.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t('rating', { score: scoreLabel })}
      className={cn(
        'group inline-flex flex-col gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember focus-visible:ring-offset-2 focus-visible:ring-offset-bone',
        className,
      )}
    >
      <span className="flex items-center gap-1">
        {[0, 1, 2, 3, 4].map((i) => (
          <Star key={i} index={i} fill={tp.score - i} />
        ))}
      </span>
      <span className="text-[0.7rem] uppercase tracking-[0.18em] text-ink/60 transition-colors group-hover:text-ink">
        {t('score')} {scoreLabel} · Trustpilot
      </span>
    </a>
  );
}
