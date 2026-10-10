import { getTranslations } from 'next-intl/server';
import { site } from '#content';
import { PhoneLink } from '@/components/ui/PhoneLink';
import { TrackedLink } from '@/components/ui/TrackedLink';
import { cn } from '@/lib/cn';

/** Email first for group enquiries, with the phone beside it. */
export async function InquiryCta({ className }: { className?: string }) {
  const t = await getTranslations('landing');

  return (
    <div className={cn('flex flex-wrap items-center gap-x-6 gap-y-4', className)}>
      <TrackedLink
        event="inquiry_click"
        href={`mailto:${site.email}`}
        className="inline-flex items-center justify-center whitespace-nowrap bg-ink px-5 py-3 text-xs uppercase tracking-[0.2em] text-bone transition-colors hover:bg-ember"
      >
        {t('inquiry')}
      </TrackedLink>
      <PhoneLink className="whitespace-nowrap font-mono text-sm tabular-nums text-ink transition-colors hover:text-ember" />
    </div>
  );
}
