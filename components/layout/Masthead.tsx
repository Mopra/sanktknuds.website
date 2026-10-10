import { getTranslations } from 'next-intl/server';
import { site } from '#content';
import { LocaleToggle } from '@/components/ui/LocaleToggle';
import { PhoneLink } from '@/components/ui/PhoneLink';

export async function Masthead() {
  const t = await getTranslations('masthead');

  return (
    <div className="border-b border-ink/10 bg-bone">
      <div className="grid grid-cols-[1fr_auto] items-center md:grid-cols-[1fr_auto_1fr] gap-4 px-6 py-2 md:px-10">
        <PhoneLink className="justify-self-start text-[0.625rem] uppercase tracking-[0.15em] text-ink transition-colors hover:text-ember">
          {t('call')} <span className="text-xs tracking-wide tabular-nums">{site.phone}</span>
        </PhoneLink>
        <p className="hidden text-center text-[0.625rem] uppercase tracking-[0.3em] text-stone md:block">
          {site.address.streetAddress} · {site.address.locality} · {t('founded')} {site.foundedYear}
        </p>
        <div className="flex justify-end">
          <LocaleToggle />
        </div>
      </div>
    </div>
  );
}
