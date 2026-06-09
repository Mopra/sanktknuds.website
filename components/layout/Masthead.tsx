import { getTranslations } from 'next-intl/server';
import { site } from '#content';

export async function Masthead() {
  const t = await getTranslations('masthead');

  return (
    <div className="border-b border-stone/10 bg-ink/60">
      <p className="mx-auto max-w-6xl px-6 py-2 text-center font-mono text-[0.625rem] uppercase tracking-[0.35em] text-parchment/50">
        {site.address.streetAddress} · {site.address.locality} · {t('founded')} {site.foundedYear}
      </p>
    </div>
  );
}
