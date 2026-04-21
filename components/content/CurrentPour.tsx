import { useTranslations } from 'next-intl';
import { site } from '#content';
import type { Locale } from '@/i18n/routing';

export function CurrentPour({ locale }: { locale: string }) {
  const t = useTranslations('currentPour');
  const text = site.currentPour?.[locale as Locale];
  if (!text) return null;

  return (
    <section className="border-l-2 border-ember/60 pl-6">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-ember/80">{t('label')}</p>
      <p className="mt-2 font-display text-2xl italic leading-snug text-parchment/90">{text}</p>
    </section>
  );
}
