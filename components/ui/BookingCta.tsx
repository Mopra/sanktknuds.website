import { getTranslations } from 'next-intl/server';
import { site } from '#content';
import { BookingButton } from '@/components/ui/BookingButton';
import { PhoneLink } from '@/components/ui/PhoneLink';
import { cn } from '@/lib/cn';

/** Book button with a tap-to-call alternative beside it, for guests who would rather ring. */
export async function BookingCta({ className }: { className?: string }) {
  const t = await getTranslations('booking');

  return (
    <div className={cn('flex flex-wrap items-center gap-x-6 gap-y-4', className)}>
      <BookingButton />
      <PhoneLink className="group font-mono text-xs uppercase tracking-[0.15em] text-ink/60 transition-colors hover:text-ember">
        {t('call')}{' '}
        <span className="whitespace-nowrap text-sm tracking-normal text-ink tabular-nums transition-colors group-hover:text-ember">
          {site.phone}
        </span>
      </PhoneLink>
    </div>
  );
}
