'use client';

import { usePathname, useRouter } from '@/i18n/navigation';
import { useParams } from 'next/navigation';
import { routing, type Locale } from '@/i18n/routing';
import { cn } from '@/lib/cn';

export function LocaleToggle() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const current = (params.locale as Locale) ?? routing.defaultLocale;

  return (
    <div className="flex items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.2em]">
      {routing.locales.map((locale, i) => (
        <span key={locale} className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              // biome-ignore lint/suspicious/noExplicitAny: pathname is typed as the union of app pathnames
              router.replace(pathname as any, { locale });
            }}
            aria-current={current === locale ? 'true' : undefined}
            className={cn(
              'transition-colors',
              current === locale ? 'text-parchment' : 'text-parchment/40 hover:text-parchment/70',
            )}
          >
            {locale.toUpperCase()}
          </button>
          {i < routing.locales.length - 1 ? (
            <span aria-hidden="true" className="text-stone/40">
              /
            </span>
          ) : null}
        </span>
      ))}
    </div>
  );
}
