import { getTranslations } from 'next-intl/server';
import { site } from '#content';

export async function Masthead() {
  const t = await getTranslations('masthead');

  return (
    <div className="border-b border-ink/10 bg-bone">
      <p className="mx-auto max-w-6xl px-6 py-2 text-center text-[0.625rem] uppercase tracking-[0.3em] text-stone">
        {site.address.streetAddress} · {site.address.locality} · {t('founded')} {site.foundedYear}
      </p>
    </div>
  );
}
