import { getTranslations } from 'next-intl/server';
import { LocaleToggle } from '@/components/ui/LocaleToggle';
import { site } from '#content';

export async function Masthead() {
  const t = await getTranslations('masthead');

  return (
    <div className="border-b border-ink/10 bg-bone">
      <div className="grid grid-cols-[1fr_auto] items-center md:grid-cols-[1fr_auto_1fr] gap-4 px-6 py-2 md:px-10">
        <span aria-hidden="true" className="hidden md:block" />
        <p className="text-left text-[0.625rem] md:text-center uppercase tracking-[0.3em] text-stone">
          {site.address.streetAddress} · {site.address.locality} · {t('founded')} {site.foundedYear}
        </p>
        <div className="flex justify-end">
          <LocaleToggle />
        </div>
      </div>
    </div>
  );
}
