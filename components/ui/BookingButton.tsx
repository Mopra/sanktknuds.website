'use client';

import { useTranslations } from 'next-intl';
import { tv, type VariantProps } from 'tailwind-variants';
import { site } from '#content';
import { cn } from '@/lib/cn';

const button = tv({
  base: 'inline-flex items-center justify-center font-mono text-xs uppercase tracking-[0.25em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember focus-visible:ring-offset-2 focus-visible:ring-offset-ink disabled:opacity-60',
  variants: {
    variant: {
      primary: 'bg-ember text-ink hover:bg-parchment hover:text-ink',
      outline: 'border border-ember/50 text-ember hover:border-ember hover:bg-ember hover:text-ink',
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
