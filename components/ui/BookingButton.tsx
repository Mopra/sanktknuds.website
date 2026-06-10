'use client';

import { useTranslations } from 'next-intl';
import { tv, type VariantProps } from 'tailwind-variants';
import { site } from '#content';
import { cn } from '@/lib/cn';

const button = tv({
  base: 'inline-flex items-center justify-center text-xs uppercase tracking-[0.2em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember focus-visible:ring-offset-2 focus-visible:ring-offset-bone disabled:opacity-60',
  variants: {
    variant: {
      primary: 'bg-ink text-bone hover:bg-ember hover:text-bone',
      outline: 'border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-bone',
    },
    size: {
      sm: 'px-4 py-2',
      md: 'px-5 py-3',
      lg: 'px-8 py-4 text-sm',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});

type BookingButtonProps = VariantProps<typeof button> & {
  className?: string;
};

export function BookingButton({ variant, size, className }: BookingButtonProps) {
  const t = useTranslations('booking');

  return (
    <a
      href={site.bookingUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(button({ variant, size }), className)}
    >
      {t('cta')}
    </a>
  );
}
