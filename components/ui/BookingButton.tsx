'use client';

import { tv, type VariantProps } from 'tailwind-variants';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { cn } from '@/lib/cn';

const button = tv({
  base: 'inline-flex items-center justify-center font-mono text-xs uppercase tracking-[0.25em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember focus-visible:ring-offset-2 focus-visible:ring-offset-ink disabled:opacity-60',
  variants: {
    variant: {
      primary: 'bg-ember text-ink hover:bg-ember/90',
      outline: 'border border-ember/50 text-ember hover:bg-ember/10',
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
    <button
      type="button"
      onClick={() => toast(t('toast'), { description: t('toastDescription') })}
      className={cn(button({ variant, size }), className)}
    >
      {t('cta')}
    </button>
  );
}
